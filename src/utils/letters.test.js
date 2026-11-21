import { describe, it, expect } from "vitest";
import { toLetters } from "./letters";

describe("toLetters", () => {
  const segments = [
    { text: "My " },
    { text: "Liza", italic: true },
    { text: ", hi" },
  ];

  it("splits every character, spaces included, in reading order", () => {
    expect(toLetters(segments).map((l) => l.char).join("")).toBe("My Liza, hi");
  });

  it("numbers letters continuously across segments", () => {
    expect(toLetters(segments).map((l) => l.index)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("keeps each segment's italic flag on its letters", () => {
    const italics = toLetters(segments).filter((l) => l.italic).map((l) => l.char).join("");
    expect(italics).toBe("Liza");
  });
});
