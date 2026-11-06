import { afterEach, expect, mock, test } from "bun:test";

mock.module("@tanstack/react-start", () => ({ createServerOnlyFn: (fn) => fn }));
const { getDbConfig, dbFetch } = await import("./db-config.server");
const names = ["RCKT_SUPABASE_URL", "RCKT_SUPABASE_PUBLISHABLE_KEY", "RCKT_SUPABASE_SERVICE_ROLE_KEY"];
const original = names.map((name) => process.env[name]);
const originalFetch = globalThis.fetch;
afterEach(() => {
  names.forEach((name, index) => {
    if (original[index] === undefined) delete process.env[name];
    else process.env[name] = original[index];
  });
  globalThis.fetch = originalFetch;
});

for (const missing of names) {
  test(`missing ${missing} fails without using managed configuration`, () => {
    // Synthetic fixtures only; never inspect or compare real secret values.
    names.forEach((name) => { process.env[name] = "test-fixture"; });
    delete process.env[missing];
    expect(() => getDbConfig()).toThrow(`Falta la variable del servidor ${missing}`);
  });
}

test("opaque keys use apikey without replacing authenticated bearer tokens", async () => {
  const sent = [];
  globalThis.fetch = mock(async (_input, init) => {
    sent.push(new Headers(init.headers));
    return new Response(null, { status: 204 });
  });
  const key = "sb_publishable_test_fixture";
  await dbFetch(key)("https://example.invalid", { headers: { Authorization: `Bearer ${key}` } });
  await dbFetch(key)("https://example.invalid", { headers: { Authorization: "Bearer user-test-fixture" } });
  expect(sent[0].get("apikey")).toBe(key);
  expect(sent[0].has("Authorization")).toBe(false);
  expect(sent[1].get("Authorization")).toBe("Bearer user-test-fixture");
});