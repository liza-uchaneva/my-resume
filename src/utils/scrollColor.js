const clamp01 = (n) => Math.min(1, Math.max(0, n));

const toRgb = (hex) => {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

// Linear per-channel mix between two #rrggbb colors; t is clamped to 0..1.
export function mixHex(from, to, t) {
  const k = clamp01(t);
  const a = toRgb(from);
  const b = toRgb(to);
  return (
    "#" +
    a
      .map((c, i) => Math.round(c + (b[i] - c) * k).toString(16).padStart(2, "0"))
      .join("")
  );
}

// How far down the page we are, 0 (top) .. 1 (bottom). 0 if the page doesn't scroll.
export function scrollProgress(scrollY, scrollHeight, viewportHeight) {
  const max = scrollHeight - viewportHeight;
  if (max <= 0) return 0;
  return clamp01(scrollY / max);
}
