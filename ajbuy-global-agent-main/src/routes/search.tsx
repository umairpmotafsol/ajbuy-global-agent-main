import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/ajbuy/AppShell";
import { ProductPlaceholder } from "@/components/ajbuy/ProductPlaceholder";
import { SearchBar } from "@/components/ajbuy/SearchBar";
import { categories, allProducts } from "@/lib/mock-data";
import { Star, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useMemo } from "react";

type SearchParams = { q?: string; category?: string; sort?: string };

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    q: typeof s.q === "string" ? s.q : undefined,
    category: typeof s.category === "string" ? s.category : undefined,
    sort: typeof s.sort === "string" ? s.sort : undefined,
  }),
  head: () => ({ meta: [{ title: "Search — AJBUY" }] }),
  component: SearchPage,
});

const SORTS = [
  { id: "popular", label: "Most Popular" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Top Rated" },
];

function SearchPage() {
  const { q, category, sort } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });

  const activeCategory = category ?? "All";
  const activeSort = sort ?? "popular";

  const results = useMemo(() => {
    let r = [...allProducts];
    if (activeCategory !== "All") r = r.filter((p) => p.category === activeCategory);
    if (q) {
      const needle = q.toLowerCase();
      r = r.filter(
        (p) =>
          p.title.toLowerCase().includes(needle) ||
          p.cn.includes(q) ||
          p.category.toLowerCase().includes(needle),
      );
    }
    switch (activeSort) {
      case "price-asc": r.sort((a, b) => a.price - b.price); break;
      case "price-desc": r.sort((a, b) => b.price - a.price); break;
      case "rating": r.sort((a, b) => b.rating - a.rating); break;
      default: r.sort((a, b) => b.sold - a.sold);
    }
    return r;
  }, [q, activeCategory, activeSort]);

  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-6xl">
        {/* Search bar */}
        <SearchBar initialQuery={q ?? ""} autoFocus />

        {/* Category chips */}
        <div className="mt-5 flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
          <CategoryChip name="All" icon="🛍️" active={activeCategory === "All"} />
          {categories.map((c) => (
            <CategoryChip key={c.name} name={c.name} icon={c.icon} active={activeCategory === c.name} />
          ))}
        </div>

        {/* Results header */}
        <div className="mt-5 flex items-center justify-between gap-3 flex-wrap">
          <div className="text-sm text-muted-foreground">
            <span className="font-display text-foreground text-xl">{results.length}</span> results
            {activeCategory !== "All" && <> in <span className="text-primary font-medium">{activeCategory}</span></>}
            {q && <> for <span className="text-foreground font-medium">"{q}"</span></>}
          </div>
          <div className="flex items-center gap-2">
            <button className="hidden md:inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs hover:bg-muted">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
            </button>
            <div className="relative">
              <select
                value={activeSort}
                onChange={(e) =>
                  navigate({ search: (prev: SearchParams) => ({ ...prev, sort: e.target.value }) })
                }
                className="appearance-none rounded-full border bg-background pl-3 pr-8 py-1.5 text-xs hover:bg-muted cursor-pointer"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
              <ChevronDown className="h-3 w-3 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Grid */}
        {results.length === 0 ? (
          <div className="mt-12 rounded-2xl border bg-card p-12 text-center">
            <div className="text-4xl">🔍</div>
            <h3 className="font-display text-xl mt-3">No products found</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Try a different keyword or browse another category.
            </p>
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {results.map((p) => (
              <Link
                key={p.id}
                to="/product/$id"
                params={{ id: p.id }}
                className="group rounded-2xl border bg-card overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
              >
                <div className="relative">
                  <ProductPlaceholder className="aspect-square w-full rounded-none" />
                  <span
                    className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] text-white font-semibold"
                    style={{ backgroundColor: p.platform === "Taobao" ? "#FF4400" : "#FF6600" }}
                  >
                    {p.platform}
                  </span>
                  {p.oldPrice && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] bg-primary text-primary-foreground font-semibold">
                      -{Math.round((1 - p.price / p.oldPrice) * 100)}%
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <div className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                    {p.title}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{p.cn}</div>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="font-display text-lg text-primary">${p.price.toFixed(2)}</span>
                    {p.oldPrice && (
                      <span className="text-xs text-muted-foreground line-through">${p.oldPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-0.5">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> {p.rating}
                    </span>
                    <span>{p.sold.toLocaleString()} sold</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}

function CategoryChip({ name, icon, active }: Readonly<{ name: string; icon: string; active: boolean }>) {
  return (
    <Link
      to="/search"
      search={(prev: SearchParams) => ({ ...prev, category: name === "All" ? undefined : name })}
      className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors ${
        active ? "bg-primary text-primary-foreground border-primary font-medium" : "bg-background hover:bg-muted"
      }`}
    >
      <span>{icon}</span> {name}
    </Link>
  );
}
