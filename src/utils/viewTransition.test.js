import { describe, it, expect, vi } from "vitest";
import { withViewTransition, prefersReducedMotion, scrollBehavior } from "./viewTransition";

const env = ({ vt = true, reduce = false } = {}) => {
  const document = {};
  if (vt) {
    document.startViewTransition = vi.fn((cb) => {
      const done = Promise.resolve(cb());
      return { updateCallbackDone: done, finished: done };
    });
  }
  return { document, matchMedia: () => ({ matches: reduce }) };
};

describe("withViewTransition", () => {
  it("runs the update inside a view transition when supported", async () => {
    const e = env();
    const update = vi.fn();
    await withViewTransition(update, e);
    expect(e.document.startViewTransition).toHaveBeenCalledOnce();
    expect(update).toHaveBeenCalledOnce();
  });

  it("runs the update directly when view transitions are unsupported", async () => {
    const update = vi.fn();
    await withViewTransition(update, env({ vt: false }));
    expect(update).toHaveBeenCalledOnce();
  });

  it("skips the transition when the user prefers reduced motion", async () => {
    const e = env({ reduce: true });
    const update = vi.fn();
    await withViewTransition(update, e);
    expect(e.document.startViewTransition).not.toHaveBeenCalled();
    expect(update).toHaveBeenCalledOnce();
  });
});

describe("prefersReducedMotion", () => {
  it("reads the media query", () => {
    expect(prefersReducedMotion(env({ reduce: true }))).toBe(true);
    expect(prefersReducedMotion(env({ reduce: false }))).toBe(false);
  });
});

describe("scrollBehavior", () => {
  it("is instant for reduced-motion users (never falls back to CSS smooth scrolling)", () => {
    expect(scrollBehavior(env({ reduce: true }))).toBe("instant");
  });
  it("is smooth otherwise", () => {
    expect(scrollBehavior(env({ reduce: false }))).toBe("smooth");
  });
});
