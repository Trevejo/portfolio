type PostDTO = {
  id: string;
  title: string;
  date: string;
  displayDate: string;
};

const BASE = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(posts: PostDTO[], year: number): string {
  if (posts.length === 0) {
    return `<p class="post-list-empty">No posts for ${year} yet.</p>`;
  }
  const items = posts
    .map(
      (p) => `
        <li class="post-item">
          <a href="${BASE}/blog/${escapeHtml(p.id)}" class="post-link">
            <span class="post-link-title">${escapeHtml(p.title)}</span>
            <time class="post-link-date" datetime="${escapeHtml(p.date)}">${escapeHtml(p.displayDate)}</time>
          </a>
        </li>`,
    )
    .join("");
  return `<ul class="post-list">${items}</ul>`;
}

function setLoading(content: HTMLElement, loading: boolean): void {
  if (loading) {
    content.setAttribute("data-loading", "");
    content.style.opacity = "0.5";
  } else {
    content.removeAttribute("data-loading");
    content.style.opacity = "";
  }
}

export function initBlogYearSelector(): void {
  document.addEventListener("blog:yearChange", async (ev) => {
    const detail = (ev as CustomEvent<{ year: number }>).detail;
    if (!detail || typeof detail.year !== "number") return;
    const year = detail.year;
    const content = document.getElementById("blog-content");
    if (!content) return;

    setLoading(content, true);
    try {
      const url = `${BASE}/blog/posts-${year}.json`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { posts: PostDTO[]; year: number };
      content.innerHTML = buildHtml(data.posts, data.year);
    } catch (err) {
      console.error("[blog] failed to load year posts", err);
    } finally {
      setLoading(content, false);
    }
  });
}

initBlogYearSelector();
