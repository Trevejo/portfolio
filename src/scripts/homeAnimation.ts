import anime from "animejs";

const MOBILE_QUERY = "(max-width: 1100px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function isMobile(): boolean {
  return (
    typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches
  );
}

function runHomeAnimation(): void {
  if (typeof document === "undefined") return;

  const root = document.querySelector<HTMLElement>("[data-home-animation]");
  if (!root) return;

  const doorLeft = root.querySelector<HTMLElement>("[data-door-left]");
  const doorRight = root.querySelector<HTMLElement>("[data-door-right]");
  const wordHello = root.querySelector<HTMLElement>("[data-word-hello]");
  const wordThere = root.querySelector<HTMLElement>("[data-word-there]");

  if (!doorLeft || !doorRight || !wordHello || !wordThere) return;

  const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
  if (reducedMotion) {
    wordHello.style.transform = "translateY(0)";
    wordThere.style.transform = "translateY(0)";
    return;
  }

  const doorWidth = isMobile() ? 75 : 200;

  wordHello.style.transform = "translateY(60px)";
  wordThere.style.transform = "translateY(60px)";

  const timeline = anime.timeline({
    easing: "easeInOutSine",
    duration: 500,
  });

  timeline.add({
    targets: doorLeft,
    width: `${doorWidth}px`,
  });

  timeline.add({
    targets: doorLeft,
    height: "15px",
    duration: 300,
    begin: () => {
      doorLeft.style.border = "1px solid var(--black)";
    },
  });

  timeline.add({
    targets: wordHello,
    translateY: 0,
  });

  timeline.add({
    targets: doorRight,
    width: `${doorWidth}px`,
  });

  timeline.add({
    targets: doorRight,
    height: "15px",
    duration: 300,
    begin: () => {
      doorRight.style.border = "1px solid var(--black)";
    },
  });

  timeline.add({
    targets: wordThere,
    translateY: 0,
  });

  timeline.add({
    targets: [doorLeft, doorRight],
    height: "0px",
    delay: 200,
    complete: () => {
      doorLeft.style.border = "none";
      doorRight.style.border = "none";
    },
  });
}

let booted = false;

function boot(): void {
  if (booted) {
    runHomeAnimation();
    return;
  }
  booted = true;
  runHomeAnimation();
}

document.addEventListener("DOMContentLoaded", boot);
document.addEventListener("astro:page-load", boot);

export default runHomeAnimation;
