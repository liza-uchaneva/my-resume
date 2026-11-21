import { describe, it, expect } from "vitest";
import { mixHex, scrollProgress } from "./scrollColor";

describe("mixHex", () => {
  it("returns endpoints", () => {
    expect(mixHex("#8DAFE4", "#FFFFFC", 0)).toBe("#8dafe4");
    expect(mixHex("#8DAFE4", "#FFFFFC", 1)).toBe("#fffffc");
  });
  it("mixes midway", () => {
    expect(mixHex("#000000", "#ffffff", 0.5)).toBe("#808080");
  });
  it("clamps t", () => {
    expect(mixHex("#8DAFE4", "#FFFFFC", -1)).toBe("#8dafe4");
    expect(mixHex("#8DAFE4", "#FFFFFC", 2)).toBe("#fffffc");
  });
});

describe("scrollProgress", () => {
  it("is 0 at top, 1 at bottom, 0.5 midway", () => {
    expect(scrollProgress(0, 2000, 1000)).toBe(0);
    expect(scrollProgress(1000, 2000, 1000)).toBe(1);
    expect(scrollProgress(500, 2000, 1000)).toBe(0.5);
  });
  it("is 0 when the page does not scroll", () => {
    expect(scrollProgress(0, 800, 1000)).toBe(0);
  });
  it("clamps over-scroll", () => {
    expect(scrollProgress(-50, 2000, 1000)).toBe(0);
    expect(scrollProgress(1200, 2000, 1000)).toBe(1);
  });
});
