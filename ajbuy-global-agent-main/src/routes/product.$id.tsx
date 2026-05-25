import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/ajbuy/AppShell";
import { ProductPlaceholder } from "@/components/ajbuy/ProductPlaceholder";
import { ChevronLeft, Star, Heart, Share2, Shield, Truck, RotateCcw, Minus, Plus, MapPin } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/product/$id")({ component: ProductDetail });

const variants = {
  colors: ["Black", "White", "Beige", "Navy"],
  sizes: ["Standard", "Pro", "Pro Max"],
};

const tiers = [
  { qty: "1–9", price: 10.8 },
  { qty: "10–49", price: 8.4 },
  { qty: "50+", price: 6.2 },
];

const reviews = [
  { name: "Sara K.", rating: 5, text: "Sound quality is amazing, exactly as described.", date: "May 10" },
  { name: "Liam B.", rating: 4, text: "Battery life slightly less than advertised but still solid.", date: "May 02" },
  { name: "Marie L.", rating: 5, text: "Great value. Shipped quickly through AJBuy.", date: "Apr 28" },
];

function ProductDetail() {
  const { id } = Route.useParams();
  const [color, setColor] = useState("Black");
  const [size, setSize] = useState("Standard");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"description" | "specs" | "reviews">("description");
  const [mainImg, setMainImg] = useState(0);

  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-5xl">
        <Link to="/dashboard" className="text-sm text-muted-foreground inline-flex items-center gap-1 hover:text-primary">
          <ChevronLeft className="h-4 w-4" /> Back
        </Link>

        <div className="mt-4 grid md:grid-cols-2 gap-6">
          {/* Gallery */}
          <div>
            <ProductPlaceholder className="aspect-square rounded-2xl" />
            <div className="grid grid-cols-5 gap-2 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <button key={i} onClick={() => setMainImg(i)} className={`aspect-square rounded-lg overflow-hidden border-2 ${mainImg === i ? "border-primary" : "border-transparent"}`}>
                  <ProductPlaceholder className="w-full h-full" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-0.5 rounded-full text-white font-semibold" style={{ backgroundColor: "#FF4400" }}>Taobao</span>
              <span className="text-muted-foreground font-mono">{id}</span>
            </div>
            <h1 className="font-display text-2xl md:text-3xl mt-2 leading-tight">无线蓝牙耳机 Pro</h1>
            <p className="text-sm text-muted-foreground mt-1">Wireless Bluetooth Earbuds Pro · Active Noise Cancelling</p>

            <div className="mt-3 flex items-center gap-3 text-sm">
              <div className="flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <span className="text-muted-foreground">4.8 · 1,284 sold</span>
            </div>

            <div className="mt-5 rounded-2xl bg-primary/5 border border-primary/20 p-4">
              <div className="font-display text-3xl text-primary">$6.20 – $10.80</div>
              <div className="text-xs text-muted-foreground mt-1">¥45.00 – ¥78.00 · Volume pricing below</div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {tiers.map((t) => (
                  <div key={t.qty} className="text-center rounded-lg bg-background border p-2">
                    <div className="text-[10px] uppercase text-muted-foreground">{t.qty}</div>
                    <div className="font-medium text-sm">${t.price.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Color · {color}</div>
              <div className="flex flex-wrap gap-2">
                {variants.colors.map((c) => (
                  <button key={c} onClick={() => setColor(c)} className={`px-3 py-1.5 rounded-full text-xs border ${color === c ? "border-primary bg-primary/10 text-primary font-medium" : "hover:bg-muted"}`}>{c}</button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Variant · {size}</div>
              <div className="flex gap-2">
                {variants.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)} className={`px-3 py-1.5 rounded-full text-xs border ${size === s ? "border-primary bg-primary/10 text-primary font-medium" : "hover:bg-muted"}`}>{s}</button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Qty</div>
              <div className="inline-flex items-center border rounded-full">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-9 w-9 inline-flex items-center justify-center hover:bg-muted rounded-full"><Minus className="h-3 w-3" /></button>
                <span className="px-4 font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="h-9 w-9 inline-flex items-center justify-center hover:bg-muted rounded-full"><Plus className="h-3 w-3" /></button>
              </div>
              <span className="text-xs text-muted-foreground">MOQ: 1</span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2">
              <Link to="/import" className="rounded-full border-2 border-primary text-primary py-3 font-medium text-center hover:bg-primary/5">Save to Drafts</Link>
              <Link to="/requests" className="rounded-full bg-primary text-primary-foreground py-3 font-medium text-center hover:bg-primary-deep">Request to Buy</Link>
            </div>
            <div className="mt-2 flex gap-2">
              <button className="flex-1 rounded-full border py-2 text-xs inline-flex items-center justify-center gap-1.5 hover:bg-muted"><Heart className="h-3.5 w-3.5" /> Wishlist</button>
              <button className="flex-1 rounded-full border py-2 text-xs inline-flex items-center justify-center gap-1.5 hover:bg-muted"><Share2 className="h-3.5 w-3.5" /> Share</button>
            </div>

            <div className="mt-6 rounded-2xl border bg-card p-4 space-y-2 text-sm">
              <div className="flex items-center gap-3"><Shield className="h-4 w-4 text-primary shrink-0" /> Free QC inspection on this order</div>
              <div className="flex items-center gap-3"><Truck className="h-4 w-4 text-primary shrink-0" /> Ships from Guangdong, CN in 2–3 days</div>
              <div className="flex items-center gap-3"><RotateCcw className="h-4 w-4 text-primary shrink-0" /> Return window applies before shipment</div>
            </div>
          </div>
        </div>

        {/* Supplier card */}
        <div className="mt-8 rounded-2xl border bg-card p-5 shadow-card flex items-center gap-4 flex-wrap">
          <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary inline-flex items-center justify-center font-display text-lg">SA</div>
          <div className="flex-1 min-w-0">
            <div className="font-medium">Shenzhen Audio Co.</div>
            <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
              <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> 4.8 supplier rating · <MapPin className="h-3 w-3" /> Guangdong, CN · 6 yrs on platform
            </div>
          </div>
          <button className="rounded-full border px-4 py-2 text-xs hover:bg-muted">View supplier</button>
        </div>

        {/* Tabs */}
        <div className="mt-8">
          <div className="flex gap-2 border-b">
            {(["description", "specs", "reviews"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`px-4 py-2.5 text-sm capitalize border-b-2 transition-colors ${tab === t ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                {t === "reviews" ? `Reviews (${reviews.length})` : t}
              </button>
            ))}
          </div>

          <div className="py-5">
            {tab === "description" && (
              <div className="prose prose-sm max-w-none space-y-3 text-sm">
                <p>The latest generation of true wireless earbuds with active noise cancellation, transparency mode, and a customizable EQ. Designed for daily use with a sweat-resistant build (IPX5) and up to 28 hours of total playback with the charging case.</p>
                <p>Each pair is QC-inspected by AJBuy before international shipment — we photograph the seal, test pairing, and confirm battery health before consolidation.</p>
                <ProductPlaceholder className="aspect-[2/1] mt-4" />
              </div>
            )}
            {tab === "specs" && (
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                {[
                  ["Brand", "OEM (white-label)"], ["Bluetooth", "5.3"], ["Driver", "11 mm dynamic"],
                  ["Battery", "28h with case"], ["Charging", "USB-C + Qi wireless"], ["Water rating", "IPX5"],
                  ["Codecs", "SBC, AAC, aptX"], ["Weight", "4.6 g per bud"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b py-2">
                    <span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span>
                  </div>
                ))}
              </div>
            )}
            {tab === "reviews" && (
              <ul className="space-y-4">
                {reviews.map((r, i) => (
                  <li key={i} className="rounded-2xl border bg-card p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-sm">{r.name}</div>
                      <div className="text-xs text-muted-foreground">{r.date}</div>
                    </div>
                    <div className="flex gap-0.5 text-amber-500 mt-1">
                      {Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-current" />)}
                    </div>
                    <p className="text-sm mt-2">{r.text}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
