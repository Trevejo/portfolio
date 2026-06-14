import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { getYears } from "../../lib/helpers";

export const getStaticPaths = async () => {
  const years = getYears(2024);
  return years.map((year) => ({ params: { year: String(year) } }));
};

export const GET: APIRoute = async ({ params }) => {
  const year = Number(params.year);
  if (!Number.isFinite(year)) {
    return new Response(JSON.stringify({ error: "Invalid year" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const allPosts = (
    await getCollection("blog", ({ data }) => !data.draft)
  ).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const posts = allPosts
    .filter((p) => p.data.date.getFullYear() === year)
    .map((p) => ({
      id: p.id,
      title: p.data.title,
      date: p.data.date.toISOString(),
      displayDate: p.data.date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        timeZone: "UTC",
      }),
    }));

  return new Response(JSON.stringify({ posts, year }), {
    headers: { "Content-Type": "application/json" },
  });
};
