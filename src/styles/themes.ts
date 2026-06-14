export const THEMES = {
  DARK: "dark",
  LIGHT: "light",
} as const;

export const THEME_STORAGE_KEY = "theme" as const;

export type Theme = (typeof THEMES)[keyof typeof THEMES];

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (value === THEMES.LIGHT || value === THEMES.DARK) return value;
  return null;
}

export function setStoredTheme(theme: Theme): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}
