export interface ToolIcon {
  glyph: string;
  color: string;
}

export const TOOL_ICONS: Record<string, ToolIcon> = {
  typescript: { glyph: "TS", color: "#3178C6" },
  javascript: { glyph: "JS", color: "#F7DF1E" },
  react: { glyph: "R", color: "#61DAFB" },
  node: { glyph: "N", color: "#5FA04E" },
  sass: { glyph: "S", color: "#CC6699" },
  astro: { glyph: "A", color: "#FF5D01" },
  bun: { glyph: "B", color: "#F472B6" },
  python: { glyph: "Py", color: "#3776AB" },
  rust: { glyph: "Rs", color: "#CE412B" },
  svelte: { glyph: "S", color: "#FF3E00" },
  vue: { glyph: "V", color: "#42B883" },
  postgresql: { glyph: "Pg", color: "#336791" },
  mongodb: { glyph: "M", color: "#4DB33D" },
  docker: { glyph: "D", color: "#2496ED" },
  figma: { glyph: "F", color: "#A259FF" },
};

export function getToolIcon(name: string): ToolIcon {
  const key = name.toLowerCase();
  return (
    TOOL_ICONS[key] ?? {
      glyph: name.charAt(0).toUpperCase(),
      color: "var(--accent)",
    }
  );
}
