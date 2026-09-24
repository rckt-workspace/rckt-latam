import { createStart, createCsrfMiddleware, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { attachSupabaseAuthSafe } from "@/lib/attach-supabase-auth";

function isRequestAbort(error: unknown): boolean {
  let current: unknown = error;

  for (let depth = 0; depth < 4 && current != null; depth += 1) {
    if (current instanceof Error) {
      if (
        current.name === "AbortError" ||
        current.message === "aborted" ||
        current.message === "The operation was aborted"
      ) {
        return true;
      }
      current = current.cause;
      continue;
    }

    if (typeof current === "object" && "cause" in current) {
      current = (current as { cause?: unknown }).cause;
      continue;
    }

    break;
  }

  return false;
}

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    // Browsers routinely cancel in-flight document requests during refreshes,
    // navigation and HMR. Treat that disconnect as a completed request instead
    // of promoting Node's `aborted` signal to the app-wide error boundary.
    if (isRequestAbort(error)) {
      return new Response(null, { status: 204 });
    }
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Start installs this automatically when src/start.ts is absent; defining the
// file opts out, so re-add it explicitly to keep server functions protected
// from cross-site requests.
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuthSafe],
  requestMiddleware: [errorMiddleware, csrfMiddleware],
}));
