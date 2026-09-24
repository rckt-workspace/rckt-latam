// Captures the original Error out-of-band so server.ts can recover the stack
// when h3 has already swallowed the throw into a generic 500 Response.

let lastCapturedError: { error: unknown; at: number } | undefined;
const TTL_MS = 5_000;

function record(error: unknown) {
  lastCapturedError = { error, at: Date.now() };
}

// h3's HTTPError serializes to {"status":500,"unhandled":true,"message":"HTTPError"} —
// no stack, no cause — so a plain console.error(error) reaches the log pipeline with
// the failure detail stripped. Expand Error-like args into a string that keeps the
// message, stack, and the full cause chain.
const CAUSE_DEPTH_LIMIT = 5;
const DESCRIPTION_LENGTH_LIMIT = 8_000;

export function describeError(error: unknown): string {
  const parts: string[] = [];
  let current: unknown = error;
  for (let depth = 0; depth < CAUSE_DEPTH_LIMIT && current != null; depth++) {
    if (!(current instanceof Error)) {
      parts.push(typeof current === "string" ? current : safeStringify(current));
      break;
    }
    const label = depth === 0 ? "" : "caused by: ";
    const status = describeStatus(current);
    parts.push(`${label}${current.stack ?? `${current.name}: ${current.message}`}${status}`);
    current = current.cause;
  }
  return parts.join("\n").slice(0, DESCRIPTION_LENGTH_LIMIT);
}

function describeStatus(error: Error): string {
  const { status, statusCode } = error as { status?: unknown; statusCode?: unknown };
  const value = status ?? statusCode;
  return typeof value === "number" ? ` (status ${value})` : "";
}

function safeStringify(value: unknown): string {
  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return String(value);
  }
}

function isErrorLike(value: unknown): value is Error {
  return value instanceof Error;
}

function isRequestAbort(error: unknown): boolean {
  let current: unknown = error;

  for (let depth = 0; depth < CAUSE_DEPTH_LIMIT && current != null; depth += 1) {
    if (!(current instanceof Error)) return false;
    if (
      current.name === "AbortError" ||
      current.message === "aborted" ||
      current.message === "The operation was aborted"
    ) {
      return true;
    }
    current = current.cause;
  }

  return false;
}

// Wrap console.error so errors logged by any layer — including h3's internal
// unhandled-error logging, which this file cannot hook directly — are both
// recorded for consumeLastCapturedError and expanded before serialization.
const originalConsoleError = console.error.bind(console);
console.error = (...args: unknown[]) => {
  // A browser refresh, navigation, or closed HMR socket can end an incoming
  // request before its body is read. That is expected transport state, not an
  // application crash, and must not be promoted into preview error telemetry.
  if (args.some(isRequestAbort)) return;

  const expanded = args.map((arg) => {
    if (!isErrorLike(arg)) return arg;
    record(arg);
    return describeError(arg);
  });
  originalConsoleError(...expanded);
};

if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => {
    const error = (event as ErrorEvent).error ?? event;
    if (isRequestAbort(error)) {
      event.preventDefault?.();
      return;
    }
    record(error);
  });
  globalThis.addEventListener("unhandledrejection", (event) => {
    const reason = (event as PromiseRejectionEvent).reason;
    if (isRequestAbort(reason)) {
      event.preventDefault?.();
      return;
    }
    record(reason);
  });
}

// In the Node dev server, a client closing its socket mid-request surfaces
// Node's `abortIncoming` as an unhandled rejection / uncaught exception that
// bypasses console.error. Swallow only those transport aborts; everything
// else keeps Node's default behavior.
type NodeProcess = {
  on?: (event: string, listener: (error: unknown) => void) => void;
  listenerCount?: (event: string) => number;
  exit?: (code: number) => void;
};
const nodeProcess = (globalThis as { process?: NodeProcess }).process;
const ABORT_GUARD = Symbol.for("rckt.abortGuard");
if (
  nodeProcess?.on &&
  !(globalThis as Record<symbol, unknown>)[ABORT_GUARD]
) {
  (globalThis as Record<symbol, unknown>)[ABORT_GUARD] = true;
  nodeProcess.on("unhandledRejection", (reason) => {
    if (isRequestAbort(reason)) return;
    originalConsoleError(describeError(reason));
  });
  nodeProcess.on("uncaughtException", (error) => {
    if (isRequestAbort(error)) return;
    originalConsoleError(describeError(error));
    nodeProcess.exit?.(1);
  });
}

export function consumeLastCapturedError(): unknown {
  if (!lastCapturedError) return undefined;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = undefined;
    return undefined;
  }
  const { error } = lastCapturedError;
  lastCapturedError = undefined;
  return error;
}
