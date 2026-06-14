import { WORK_MODAL_TIME_DURATION } from "../constants/work";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface DatePoint {
  month: string;
  year: number;
}

function buildSequence(
  startMonth: number,
  startYear: number,
  endMonth: number,
  endYear: number,
): DatePoint[] {
  const seq: DatePoint[] = [];
  let m = startMonth;
  let y = startYear;
  let guard = 0;
  while ((y < endYear || (y === endYear && m <= endMonth)) && guard < 600) {
    seq.push({ month: MONTHS[m - 1] ?? "Jan", year: y });
    m++;
    if (m > 12) {
      m = 1;
      y++;
    }
    guard++;
  }
  return seq;
}

function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

function readNumber(el: HTMLElement, key: string): number {
  const raw = el.dataset[key];
  const n = raw ? Number(raw) : NaN;
  return Number.isFinite(n) ? n : 0;
}

function animateTimeline(root: HTMLElement): void {
  if (root.dataset.animated === "true") return;
  root.dataset.animated = "true";
  root.setAttribute("data-state", "visible");

  const monthEl = root.querySelector<HTMLElement>("[data-time-month-end]");
  const yearEl = root.querySelector<HTMLElement>("[data-time-year-end]");
  if (!monthEl || !yearEl) return;

  const startMonth = readNumber(root, "startMonth");
  const startYear = readNumber(root, "startYear");
  const endMonth = readNumber(root, "endMonth");
  const endYear = readNumber(root, "endYear");

  const seq = buildSequence(startMonth, startYear, endMonth, endYear);
  if (seq.length === 0) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducedMotion) {
    const last = seq[seq.length - 1];
    monthEl.textContent = last.month;
    yearEl.textContent = String(last.year);
    return;
  }

  const startTs = performance.now();
  const total = WORK_MODAL_TIME_DURATION;
  const lastIdx = seq.length - 1;

  function frame(now: number): void {
    const elapsed = now - startTs;
    const t = Math.min(1, elapsed / total);
    const eased = easeOutQuad(t);
    const idx = Math.min(lastIdx, Math.round(eased * lastIdx));
    const point = seq[idx];
    if (point && monthEl && yearEl) {
      monthEl.textContent = point.month;
      yearEl.textContent = String(point.year);
    }
    if (t < 1) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
}

function resetTimeline(root: HTMLElement): void {
  root.removeAttribute("data-state");
  delete root.dataset.animated;

  const monthEl = root.querySelector<HTMLElement>("[data-time-month-end]");
  const yearEl = root.querySelector<HTMLElement>("[data-time-year-end]");
  const startMonthEl = root.querySelector<HTMLElement>(
    "[data-time-month-start]",
  );
  const startYearEl = root.querySelector<HTMLElement>(
    "[data-time-year-start]",
  );

  if (monthEl && startMonthEl) monthEl.textContent = startMonthEl.textContent;
  if (yearEl && startYearEl) yearEl.textContent = startYearEl.textContent;
}

function setupTimeline(root: HTMLElement): void {
  if (root.dataset.timelineSetup === "true") return;
  root.dataset.timelineSetup = "true";

  const modal = root.closest<HTMLElement>(".work-modal");

  if (!modal) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateTimeline(entry.target as HTMLElement);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.5 },
    );
    obs.observe(root);
    return;
  }

  const mut = new MutationObserver(() => {
    const open = modal.getAttribute("data-modal-open") === "true";
    if (open) {
      animateTimeline(root);
    } else {
      resetTimeline(root);
    }
  });
  mut.observe(modal, {
    attributes: true,
    attributeFilter: ["data-modal-open"],
  });
}

function init(): void {
  if (document.documentElement.hasAttribute("data-work-modal-time-init")) {
    return;
  }
  document.documentElement.setAttribute("data-work-modal-time-init", "");

  document
    .querySelectorAll<HTMLElement>("[data-work-modal-time]")
    .forEach(setupTimeline);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}

export {};
