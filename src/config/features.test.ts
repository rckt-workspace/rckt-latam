import { afterEach, expect, mock, test } from "bun:test";
import { featureConfig } from "./features";

mock.module("@tanstack/react-router", () => ({
  createFileRoute: () => (options: unknown) => options,
}));

const externalCall = mock(() => {
  throw new Error("Disabled chat must not call external services");
});
mock.module("@/lib/admin-auth", () => ({ verifyAdminSessionFromRequest: externalCall }));
mock.module("@/lib/admin-proxy", () => ({
  fetchWithTimeout: externalCall,
  proxyUpstreamResponse: externalCall,
  handleFetchError: externalCall,
}));

const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
  externalCall.mockClear();
});

test("the single chat switch is disabled", () => {
  expect(featureConfig.chat.enabled).toBe(false);
});

const cases = [
  ["advisor-chat", "POST", () => import("../routes/api/advisor-chat")],
  ["save-chat-lead", "POST", () => import("../routes/api/save-chat-lead")],
  ["admin/ai/config", "GET", () => import("../routes/api/admin/ai/config")],
  ["admin/ai/config", "PUT", () => import("../routes/api/admin/ai/config")],
  ["admin/ai/models", "GET", () => import("../routes/api/admin/ai/models")],
  ["admin/ai/usage", "GET", () => import("../routes/api/admin/ai/usage")],
  ["admin/ai/test-provider", "POST", () => import("../routes/api/admin/ai/test-provider")],
] as const;

for (const [path, method, load] of cases) {
  test(`${method} ${path} returns 503 before parsing or calling services`, async () => {
    globalThis.fetch = externalCall as unknown as typeof fetch;
    const { Route } = await load();
    const options = Route as unknown as {
      server: { handlers: Record<string, (args: { request: Request }) => Promise<Response>> };
    };
    const request = new Request(`https://rckt.lat/api/${path}`, { method });
    const parseBody = mock(() => { throw new Error("Body must not be parsed"); });
    request.json = parseBody;
    const response = await options.server.handlers[method]({ request });
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ ok: false, error: "El agente está desactivado" });
    expect(parseBody).not.toHaveBeenCalled();
    expect(externalCall).not.toHaveBeenCalled();
  });
}