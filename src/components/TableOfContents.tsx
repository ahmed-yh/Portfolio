import { useEffect, useState } from 'react';

/**
 * Sidebar TOC (ported from the blog): reads the article's h2s, highlights the
 * section in view and underlines it with a scribble that draws itself.
 * Uses data-toc for the label so decorations inside a heading stay out of it.
 */
interface Heading {
  id: string;
  text: string;
}

export default function TableOfContents({ contentId = 'article-content', onNavigate }: { contentId?: string; onNavigate?: () => void }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const article = document.getElementById(contentId);
    if (!article) return;
    setHeadings(
      Array.from(article.querySelectorAll<HTMLElement>('h2')).map((h) => ({
        id: h.id,
        text: h.dataset.toc || h.textContent || '',
      }))
    );
  }, [contentId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: [0, 1] }
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <h2 className="toc-header">Table of Contents</h2>
      <hr className="toc-separator" />
      <ol className="space-y-3 font-mono text-sm">
        {headings.map((heading, index) => (
          <li key={heading.id}>
            <div className="relative inline-block">
              <a
                href={`#${heading.id}`}
                aria-current={activeId === heading.id ? 'location' : undefined}
                className={`relative z-10 block transition-colors duration-200 ${
                  activeId === heading.id ? 'font-bold text-ink' : 'text-ink-muted hover:text-ink'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                  window.history.pushState(null, '', `#${heading.id}`);
                  onNavigate?.();
                }}
              >
                <span className="mr-2 opacity-60">{String(index + 1).padStart(2, '0')}</span>
                {heading.text}
              </a>
              {activeId === heading.id && (
                <svg
                  className="pointer-events-none absolute -bottom-1 -left-1 h-[80%] w-[110%] text-sepia opacity-70"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M0 5 Q 50 10 100 5" pathLength={1} fill="none" stroke="currentColor" strokeWidth="4" className="animate-scribble" />
                </svg>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
