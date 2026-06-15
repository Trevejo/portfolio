const FLAG = "__pageFadeInBooted";

function apply(): void {
  document
    .querySelectorAll<HTMLElement>("[data-fade-in]")
    .forEach((el) => {
      el.classList.add("fade-in-done");
    });
}

function focusMain(): void {
  const main = document.getElementById("main-content");
  if (!main) return;
  if (main.contains(document.activeElement)) return;
  const hadFocus =
    document.activeElement &&
    document.activeElement !== document.body;
  if (hadFocus) {
    main.setAttribute("tabindex", "-1");
    main.focus({ preventScroll: true });
  }
}

function init(): void {
  if ((window as unknown as Record<string, unknown>)[FLAG]) {
    apply();
    return;
  }
  (window as unknown as Record<string, unknown>)[FLAG] = true;
  apply();
}

document.addEventListener("DOMContentLoaded", init);
document.addEventListener("astro:page-load", () => {
  apply();
  focusMain();
});
