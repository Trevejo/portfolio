import {
  THEMES,
  getStoredTheme,
  setStoredTheme,
  type Theme,
} from "../styles/themes";

type ThemeVarMap = Record<string, string>;

const LIGHT_VARS: ThemeVarMap = {
  background: "#e3e3e3",
  black: "#1d1d1d",
  white: "#e3e3e3",
  gray: "#747474",
  accent: "#e08c8c",
  textColor: "#000000",
  textColorInverted: "#e3e3e3",
  codeColor: "#2a2c2d",
  codeBackground: "#f0f0f0",
  codeBorder: "1px solid rgba(0, 0, 0, 0.2)",
  workCircleDiameter: "150px",
};

const DARK_VARS: ThemeVarMap = {
  background: "#1d1d1d",
  black: "#e3e3e3",
  white: "#1d1d1d",
  gray: "#747474",
  accent: "#00777F",
  textColor: "#e3e3e3",
  textColorInverted: "#000000",
  codeColor: "#e6e6e6",
  codeBackground: "#2a2c2d",
  codeBorder: "1px solid rgba(255, 255, 255, 0.2)",
  workCircleDiameter: "150px",
};

const THEME_VARS: Record<Theme, ThemeVarMap> = {
  [THEMES.LIGHT]: LIGHT_VARS,
  [THEMES.DARK]: DARK_VARS,
};

function killTransitions(): void {
  const style = document.createElement("style");
  style.appendChild(
    document.createTextNode(
      `* {
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        -ms-transition: none !important;
        transition: none !important;
      }`,
    ),
  );
  document.head.appendChild(style);
  void window.getComputedStyle(style).opacity;
  window.setTimeout(() => {
    document.head.removeChild(style);
  }, 50);
}

function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  const vars = THEME_VARS[theme];
  for (const [key, value] of Object.entries(vars)) {
    document.documentElement.style.setProperty(`--${key}`, value);
  }
}

function currentTheme(): Theme {
  const stored = getStoredTheme();
  if (stored) return stored;
  return THEMES.LIGHT;
}

let activeTheme: Theme = currentTheme();
applyTheme(activeTheme);
setStoredTheme(activeTheme);

export function getCurrentTheme(): Theme {
  return activeTheme;
}

export function toggleTheme(): void {
  const next: Theme =
    activeTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
  killTransitions();
  applyTheme(next);
  setStoredTheme(next);
  activeTheme = next;
}
