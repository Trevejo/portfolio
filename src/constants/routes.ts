/// <reference types="vite/client" />

export const ROUTES = [
  { name: "Home", link: "/", id: "01" },
  { name: "Work", link: "/work", id: "02" },
  { name: "Blog", link: "/blog", id: "03" },
  { name: "About", link: "/about", id: "04" },
] as const;

export type RouteName = (typeof ROUTES)[number]["name"];

export function findRouteByPath(pathname: string): RouteName | undefined {
  const clean = pathname.split("?")[0].split("#")[0];
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  let p = clean;
  if (base && p.startsWith(base)) {
    p = p.slice(base.length) || "/";
  }
  const segs = p.split("/").filter(Boolean);
  if (segs.length === 0) return "Home";
  const route = ROUTES.find((r) => r.link === "/" + segs[0]);
  return route?.name;
}
