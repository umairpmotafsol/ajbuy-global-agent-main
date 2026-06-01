import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, Link2, ArrowRight, Clock, TrendingUp } from "lucide-react";
import { allProducts, recentSearches } from "@/lib/mock-data";

function isUrl(s: string) {
  return (
    s.startsWith("http") ||
    s.includes("taobao.com") ||
    s.includes("1688.com") ||
    s.includes("tmall.com") ||
    s.includes("item.jd")
  );
}

function highlight(text: string, query: string) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-primary/20 text-primary rounded px-0.5 font-medium">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

type Props = {
  size?: "md" | "lg";
  autoFocus?: boolean;
  initialQuery?: string;
};

export function SearchBar({ size = "md", autoFocus, initialQuery = "" }: Readonly<Props>) {
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(-1);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const urlMode = isUrl(query);

  const suggestions = !urlMode && query.trim().length > 0
    ? allProducts
        .filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 6)
    : [];

  const showRecent = !urlMode && query.trim().length === 0;
  const dropdownVisible = open && (urlMode || suggestions.length > 0 || showRecent);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setCursor(-1);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const submit = useCallback(
    (q: string) => {
      setOpen(false);
      setCursor(-1);
      if (!q.trim()) return;
      void navigate({ to: "/search", search: { q: q.trim() } });
    },
    [navigate],
  );

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!dropdownVisible) return;
    const items = urlMode ? 1 : showRecent ? recentSearches.length : suggestions.length;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, items - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, -1));
    } else if (e.key === "Enter") {
      if (cursor >= 0) {
        e.preventDefault();
        if (showRecent) submit(recentSearches[cursor]);
        else if (!urlMode && suggestions[cursor]) submit(suggestions[cursor].title);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setCursor(-1);
    }
  }

  const isLg = size === "lg";

  return (
    <div ref={containerRef} className="relative w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(query);
        }}
      >
        <div
          className={`flex items-center gap-2 rounded-full border bg-card transition-all ${
            isLg
              ? "pl-5 pr-2 py-2 shadow-card-hover border-border/60 focus-within:border-primary focus-within:shadow-[0_0_0_3px_hsl(var(--primary)/0.15)]"
              : "pl-4 pr-1 py-1 shadow-card focus-within:border-primary focus-within:shadow-card-hover"
          }`}
        >
          {urlMode ? (
            <Link2 className={`shrink-0 text-primary ${isLg ? "h-5 w-5" : "h-4 w-4"}`} />
          ) : (
            <Search className={`shrink-0 text-muted-foreground ${isLg ? "h-5 w-5" : "h-4 w-4"}`} />
          )}

          <input
            ref={inputRef}
            autoFocus={autoFocus}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCursor(-1);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search products or paste a Taobao / 1688 link…"
            className={`flex-1 min-w-0 bg-transparent outline-none ${isLg ? "text-base py-2.5" : "text-sm py-2"}`}
          />

          {query && (
            <button
              type="button"
              onClick={() => { setQuery(""); setCursor(-1); inputRef.current?.focus(); }}
              className="shrink-0 h-6 w-6 rounded-full bg-muted text-muted-foreground hover:bg-muted/70 inline-flex items-center justify-center text-xs"
            >
              ✕
            </button>
          )}

          <button
            type="submit"
            className={`shrink-0 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary-deep inline-flex items-center gap-1.5 transition-colors ${
              isLg ? "px-6 py-3 text-sm" : "px-4 py-2 text-sm"
            }`}
          >
            {urlMode ? "Import" : "Search"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>

      {/* Dropdown */}
      {dropdownVisible && (
        <div className="absolute top-full mt-2 inset-x-0 z-50 rounded-2xl border bg-card shadow-card-hover overflow-hidden">
          {urlMode && (
            <button
              onClick={() => submit(query)}
              className="w-full flex items-center gap-3 p-4 hover:bg-muted/40 text-left"
            >
              <div className="h-9 w-9 rounded-full bg-primary/10 text-primary inline-flex items-center justify-center shrink-0">
                <Link2 className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium">Import from link</div>
                <div className="text-xs text-muted-foreground truncate">{query}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-primary shrink-0" />
            </button>
          )}

          {showRecent && (
            <>
              <div className="px-4 pt-3 pb-1 text-[11px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Clock className="h-3 w-3" /> Recent searches
              </div>
              {recentSearches.map((s, i) => (
                <button
                  key={s}
                  onClick={() => submit(s)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${cursor === i ? "bg-muted/60" : "hover:bg-muted/40"}`}
                >
                  <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  {s}
                </button>
              ))}
              <div className="px-4 pt-3 pb-1 text-[11px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 border-t mt-1">
                <TrendingUp className="h-3 w-3" /> Trending
              </div>
              {["Wireless Earbuds", "Oversized Hoodie", "LED Strip Lights"].map((s) => (
                <button
                  key={s}
                  onClick={() => submit(s)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-muted/40"
                >
                  <TrendingUp className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  {s}
                </button>
              ))}
              <div className="h-2" />
            </>
          )}

          {!urlMode && suggestions.length > 0 && (
            <>
              <div className="px-4 pt-3 pb-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                Products
              </div>
              {suggestions.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => submit(p.title)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${cursor === i ? "bg-muted/60" : "hover:bg-muted/40"}`}
                >
                  <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span className="text-sm flex-1 truncate">{highlight(p.title, query)}</span>
                  <span
                    className="shrink-0 text-[10px] px-1.5 py-0.5 rounded font-semibold text-white"
                    style={{ backgroundColor: p.platform === "Taobao" ? "#FF4400" : "#FF6600" }}
                  >
                    {p.platform}
                  </span>
                </button>
              ))}
              <button
                onClick={() => submit(query)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-primary hover:bg-muted/40 border-t font-medium"
              >
                <Search className="h-3.5 w-3.5 shrink-0" />
                Search for "{query}"
                <ArrowRight className="h-3.5 w-3.5 ml-auto shrink-0" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
