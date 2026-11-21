import { onMounted, onBeforeUnmount } from "vue";
import { mixHex, scrollProgress } from "../utils/scrollColor";

const FROM = "#8DAFE4";
const TO = "#FFFFFC";

// Sets --page-bg on <html> to a color between FROM and TO based on scroll position.
export function useScrollBackground() {
  let frame = 0;

  const update = () => {
    frame = 0;
    const doc = document.documentElement;
    const p = scrollProgress(window.scrollY, doc.scrollHeight, window.innerHeight);
    doc.style.setProperty("--page-bg", mixHex(FROM, TO, p));
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  onMounted(() => {
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    if (frame) cancelAnimationFrame(frame);
  });
}
