if (
  typeof document !== "undefined" &&
  !document.documentElement.hasAttribute("data-fade-in-init")
) {
  document.documentElement.setAttribute("data-fade-in-init", "");
  const apply = (): void => {
    document
      .querySelectorAll<HTMLElement>("[data-fade-in]")
      .forEach((el) => {
        el.classList.add("fade-in-done");
      });
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply, { once: true });
  } else {
    apply();
  }
}

export {};
