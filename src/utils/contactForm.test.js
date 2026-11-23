import { describe, it, expect, vi } from "vitest";
import { validate, send } from "./contactForm";

const ok = { name: "Ann", email: "ann@example.com", message: "Hello there, nice site!" };

describe("validate", () => {
  it("accepts a good submission", () => {
    expect(validate(ok)).toEqual({});
  });
  it("requires every field", () => {
    expect(Object.keys(validate({}))).toEqual(["name", "email", "message"]);
  });
  it("treats whitespace as empty", () => {
    expect(validate({ ...ok, name: "   " }).name).toBeTruthy();
  });
  it("rejects bad emails", () => {
    for (const email of ["ann", "ann@", "ann@site", "a n@site.com"]) {
      expect(validate({ ...ok, email }).email).toBeTruthy();
    }
  });
  it("rejects too-short and too-long messages", () => {
    expect(validate({ ...ok, message: "hi" }).message).toBeTruthy();
    expect(validate({ ...ok, message: "x".repeat(5001) }).message).toBeTruthy();
  });
});

describe("send", () => {
  const reply = (status, body) => vi.fn().mockResolvedValue({ ok: status < 300, json: async () => body });

  it("posts trimmed fields with the key and honeypot", async () => {
    const fetchImpl = reply(200, { success: true });
    await send({ ...ok, name: " Ann " }, "KEY", fetchImpl);
    const [url, opts] = fetchImpl.mock.calls[0];
    expect(url).toBe("https://api.web3forms.com/submit");
    const body = JSON.parse(opts.body);
    expect(body).toMatchObject({ access_key: "KEY", name: "Ann", email: ok.email, botcheck: false });
  });
  it("throws without a key", async () => {
    await expect(send(ok, "", vi.fn())).rejects.toThrow(/isn’t set up/);
  });
  it("throws when the service says no", async () => {
    await expect(send(ok, "KEY", reply(400, { success: false }))).rejects.toThrow();
  });
  it("throws on network failure", async () => {
    await expect(send(ok, "KEY", vi.fn().mockRejectedValue(new TypeError()))).rejects.toThrow(/connection/);
  });
});
