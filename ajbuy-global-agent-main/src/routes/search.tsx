import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/ajbuy/AppShell";
import { ProductPlaceholder } from "@/components/ajbuy/ProductPlaceholder";
import { categories } from "@/lib/mock-data";
import { Search, Star, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

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

type Product = {
  id: string;
  title: string;
  cn: string;
  price: number;
  oldPrice?: number;
  rating: number;
  sold: number;
  platform: "Taobao" | "1688";
  category: string;
  location: string;
};

const ALL_PRODUCTS: Product[] = [
  { id: "P-1001", title: "Wireless Earbuds Pro", cn: "无线蓝牙耳机 Pro", price: 10.8, oldPrice: 14.5, rating: 4.8, sold: 1284, platform: "Taobao", category: "Electronics", location: "Guangdong" },
  { id: "P-1002", title: "Smart Watch Series 9", cn: "智能手表 S9", price: 24.6, rating: 4.7, sold: 942, platform: "1688", category: "Electronics", location: "Shenzhen" },
  { id: "P-1003", title: "USB-C Fast Charger 65W", cn: "65W 快充充电器", price: 6.4, oldPrice: 9.0, rating: 4.9, sold: 5320, platform: "1688", category: "Electronics", location: "Dongguan" },
  { id: "P-1004", title: "Mechanical Keyboard RGB", cn: "机械键盘 RGB", price: 32.0, rating: 4.6, sold: 410, platform: "Taobao", category: "Electronics", location: "Shenzhen" },
  { id: "P-1005", title: "Cotton Oversized Hoodie", cn: "宽松卫衣", price: 12.2, rating: 4.7, sold: 2100, platform: "Taobao", category: "Clothing", location: "Hangzhou" },
  { id: "P-1006", title: "Linen Summer Shirt", cn: "亚麻衬衫", price: 9.8, rating: 4.5, sold: 870, platform: "1688", category: "Clothing", location: "Guangzhou" },
  { id: "P-1007", title: "Cargo Pants Streetwear", cn: "工装裤", price: 14.5, oldPrice: 18.0, rating: 4.6, sold: 1402, platform: "Taobao", category: "Clothing", location: "Hangzhou" },
  { id: "P-1008", title: "Running Sneakers Mesh", cn: "运动跑鞋", price: 16.9, rating: 4.7, sold: 3100, platform: "1688", category: "Shoes", location: "Fujian" },
  { id: "P-1009", title: "Leather Loafers", cn: "皮鞋乐福鞋", price: 28.4, rating: 4.5, sold: 220, platform: "Taobao", category: "Shoes", location: "Wenzhou" },
  { id: "P-1010", title: "Leather Crossbody Bag", cn: "皮革斜挎包", price: 22.0, oldPrice: 29.0, rating: 4.8, sold: 980, platform: "Taobao", category: "Bags", location: "Guangzhou" },
  { id: "P-1011", title: "Canvas Tote Bag", cn: "帆布包", price: 5.4, rating: 4.6, sold: 4200, platform: "1688", category: "Bags", location: "Hangzhou" },
  { id: "P-1012", title: "Ceramic Vase Set (3pc)", cn: "陶瓷花瓶套装", price: 18.0, rating: 4.7, sold: 312, platform: "Taobao", category: "Home Decor", location: "Jingdezhen" },
  { id: "P-1013", title: "LED Strip Lights 5m", cn: "LED 灯带 5米", price: 4.9, rating: 4.8, sold: 7600, platform: "1688", category: "Home Decor", location: "Zhongshan" },
  { id: "P-1014", title: "Matte Lipstick Set", cn: "哑光口红套装", price: 7.2, rating: 4.6, sold: 1820, platform: "Taobao", category: "Beauty", location: "Shanghai" },
  { id: "P-1015", title: "Jade Roller & Gua Sha", cn: "玉石滚轮刮痧板", price: 3.8, rating: 4.7, sold: 5400, platform: "1688", category: "Beauty", location: "Yiwu" },
  { id: "P-1016", title: "Plush Bear Giant 80cm", cn: "毛绒熊", price: 19.5, rating: 4.9, sold: 640, platform: "Taobao", category: "Toys", location: "Yangzhou" },
  { id: "P-1017", title: "Building Blocks 500pc", cn: "积木玩具", price: 11.0, rating: 4.5, sold: 1240, platform: "1688", category: "Toys", location: "Shantou" },
  { id: "P-1018", title: "Yoga Mat Non-Slip", cn: "瑜伽垫", price: 8.4, rating: 4.7, sold: 2800, platform: "1688", category: "Sports", location: "Ningbo" },
  { id: "P-1019", title: "Adjustable Dumbbells Pair", cn: "可调哑铃", price: 42.0, rating: 4.6, sold: 380, platform: "Taobao", category: "Sports", location: "Qingdao" },
  { id: "P-1020", title: "Cycling Jersey Pro", cn: "骑行服", price: 15.8, rating: 4.5, sold: 510, platform: "1688", category: "Sports", location: "Tianjin" },
];

const SORTS = [
  { id: "popular", label: "Most Popular" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Top Rated" },
];

function SearchPage() {
  const { q, category, sort } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const [query, setQuery] = useState(q ?? "");

  const activeCategory = category ?? "All";
  const activeSort = sort ?? "popular";

  const results = useMemo(() => {
    let r = [...ALL_PRODUCTS];
    if (activeCategory !== "All") r = r.filter((p) => p.category === activeCategory);
    if (q) {
      const needle = q.toLowerCase();
      r = r.filter((p) => p.title.toLowerCase().includes(needle) || p.cn.includes(q) || p.category.toLowerCase().includes(needle));
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ search: (prev: SearchParams) => ({ ...prev, q: query || undefined }) });
          }}
          className="flex items-center gap-2 rounded-full border bg-card pl-4 pr-1 py-1 shadow-card focus-within:border-primary"
        >
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, brands, or paste a Taobao/1688 link…"
            className="flex-1 bg-transparent outline-none text-sm py-2"
          />
          <button type="submit" className="rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm font-medium hover:bg-primary-deep">
            Search
          </button>
        </form>

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
                onChange={(e) => navigate({ search: (prev: SearchParams) => ({ ...prev, sort: e.target.value }) })}
                className="appearance-none rounded-full border bg-background pl-3 pr-8 py-1.5 text-xs hover:bg-muted cursor-pointer"
              >
                {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
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
            <p className="text-sm text-muted-foreground mt-2">Try a different keyword or browse another category.</p>
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
                  <div className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">{p.title}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{p.cn}</div>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="font-display text-lg text-primary">${p.price.toFixed(2)}</span>
                    {p.oldPrice && <span className="text-xs text-muted-foreground line-through">${p.oldPrice.toFixed(2)}</span>}
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

function CategoryChip({ name, icon, active }: { name: string; icon: string; active: boolean }) {
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
