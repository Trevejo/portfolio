const FOCUS_MEMORY = new WeakMap<HTMLElement, HTMLElement>();

function getModalById(id: string): HTMLElement | null {
  return document.querySelector<HTMLElement>(
    `.work-modal[data-modal-id="${id}"]`,
  );
}

function dispatchModalEvent(name: string, modal: HTMLElement): void {
  modal.dispatchEvent(
    new CustomEvent(name, { detail: { modal }, bubbles: true }),
  );
}

function openModal(id: string): void {
  const modal = getModalById(id);
  if (!modal) return;
  if (modal.getAttribute("data-modal-open") === "true") return;

  const active = document.activeElement;
  if (active instanceof HTMLElement) {
    FOCUS_MEMORY.set(modal, active);
  }

  modal.setAttribute("data-modal-open", "true");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modalLock");

  const closeBtn = modal.querySelector<HTMLElement>("[data-modal-close]");
  if (closeBtn) {
    window.setTimeout(() => closeBtn.focus(), 50);
  }

  dispatchModalEvent("workmodal:open", modal);
}

function closeModal(modal: HTMLElement): void {
  if (modal.getAttribute("data-modal-open") !== "true") return;

  modal.setAttribute("data-modal-open", "false");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modalLock");

  const restore = FOCUS_MEMORY.get(modal);
  if (restore && document.contains(restore)) {
    restore.focus();
  }

  dispatchModalEvent("workmodal:close", modal);
}

function closeAllOpen(): void {
  document
    .querySelectorAll<HTMLElement>('.work-modal[data-modal-open="true"]')
    .forEach(closeModal);
}

function onDocumentClick(e: MouseEvent): void {
  const target = e.target;
  if (!(target instanceof Element)) return;

  const cube = target.closest<HTMLElement>("[data-cube-id]");
  if (cube) {
    const id = cube.dataset.cubeId;
    if (id) openModal(id);
    return;
  }

  const close = target.closest<HTMLElement>("[data-modal-close]");
  if (close) {
    const modal = close.closest<HTMLElement>(".work-modal");
    if (modal) closeModal(modal);
    return;
  }

  const backdrop = target.closest<HTMLElement>("[data-modal-backdrop]");
  if (backdrop) {
    const modal = backdrop.closest<HTMLElement>(".work-modal");
    if (modal) closeModal(modal);
  }
}

function onKeyDown(e: KeyboardEvent): void {
  if (e.key === "Escape") {
    closeAllOpen();
  }
}

function init(): void {
  if (document.documentElement.hasAttribute("data-work-modal-init")) return;
  document.documentElement.setAttribute("data-work-modal-init", "");
  document.addEventListener("click", onDocumentClick);
  document.addEventListener("keydown", onKeyDown);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}

export {};
