// Splits text segments into single characters for letter-by-letter animation.
// Each letter carries its position in reading order (used as an animation
// delay) and its segment's italic flag.
export function toLetters(segments) {
  let index = 0;
  return segments.flatMap(({ text, italic = false }) =>
    [...text].map((char) => ({ char, italic, index: index++ }))
  );
}
