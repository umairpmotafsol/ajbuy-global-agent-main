import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/ajbuy/Logo";
import { ThemeToggle } from "@/components/ajbuy/ThemeToggle";
import { SearchBar } from "@/components/ajbuy/SearchBar";
import { categories, featuredProducts, howItWorks, testimonials } from "@/lib/mock-data";
import { ArrowRight, Star, Globe, ShieldCheck, Sparkles, Truck, Heart } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AJBUY — Shop Like a Millionaire" },
      { name: "description", content: "Source anything from Taobao & 1688. We buy, inspect, and ship worldwide." },
      { property: "og:title", content: "AJBUY — Shop Like a Millionaire" },
      { property: "og:description", content: "Cross-border shopping agent from China to the world." },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/src/assets/ajbuy-logo.png" },
    ],
  }),
  component: Landing,
});

const CHANNELS = ["Taobao", "1688"] as const;

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-background/70 backdrop-blur-xl border-b border-border">
        <div className="mx-auto max-w-7xl flex h-14 items-center justify-between px-4 md:px-6">
          <Logo size="md" />
          <nav className="hidden md:flex items-center gap-1 text-sm">
            <a href="#how" className="px-3 py-1.5 rounded-full text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition">How it works</a>
            <a href="#categories" className="px-3 py-1.5 rounded-full text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition">Categories</a>
            <a href="#estimator" className="px-3 py-1.5 rounded-full text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition">Shipping</a>
            <Link to="/login" className="px-3 py-1.5 rounded-full text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition">Sign in</Link>
            <Link to="/register" className="ml-1 inline-flex items-center rounded-full bg-primary px-4 py-2 text-primary-foreground text-sm font-semibold shadow-glow-primary hover:brightness-110 transition">
              Get Started
            </Link>
            <ThemeToggle className="ml-1" />
          </nav>
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Link to="/login" className="text-sm font-medium text-primary">Sign in</Link>
          </div>
        </div>
      </header>

      {/* Hero Bento — tighter */}
      <section className="px-3 md:px-6 lg:px-10 pt-4 md:pt-6 pb-8 md:pb-10">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          {/* Hero card */}
          <div className="md:col-span-8 bg-card rounded-3xl p-6 md:p-9 flex flex-col justify-between relative ring-soft min-h-[300px] md:min-h-[420px]">
            <div className="relative z-10 flex flex-col gap-5 md:gap-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-4 md:mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="font-display text-primary text-[10px] font-semibold tracking-[0.18em] uppercase">Live global sourcing</span>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05]">
                  Shop Like a<br /><span className="text-primary">Millionaire.</span>
                </h1>
                <p className="mt-3 md:mt-4 text-sm md:text-base text-foreground/60 max-w-md leading-relaxed">
                  Source anything from Taobao & 1688. We buy, inspect, and ship worldwide — at insider prices.
                </p>
              </div>

              {/* Prominent search */}
              <div className="w-full max-w-xl">
                <SearchBar size="lg" />
                <p className="mt-2.5 text-xs text-foreground/40 pl-1">
                  Paste a product URL or search by name — we'll quote it within hours.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <a href="#estimator" className="inline-flex items-center gap-1.5 rounded-xl bg-foreground/5 border border-border px-4 py-2 text-foreground font-semibold text-sm hover:bg-foreground/10 transition">
                  Estimate Shipping <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a href="#how" className="inline-flex items-center gap-1.5 rounded-xl bg-foreground/5 border border-border px-4 py-2 text-foreground/70 font-semibold text-sm hover:bg-foreground/10 transition">
                  How it works
                </a>
              </div>
            </div>

            {/* Decorations — clipped independently so the search dropdown can overflow */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-40 bg-dot-grid [mask-image:radial-gradient(closest-side,black,transparent)]" />
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/15 blur-[110px] rounded-full" />
            </div>
          </div>

          {/* Logo / brand card (replaces mascot) */}
          <div className="md:col-span-4 bg-primary rounded-3xl p-5 md:p-6 flex flex-col items-center justify-center relative overflow-hidden group min-h-[200px] md:min-h-auto">
            <div className="absolute inset-0 bg-dot-grid opacity-20" />
            <div className="relative z-10 w-32 h-32 md:w-36 md:h-36 bg-white rounded-2xl flex items-center justify-center shadow-xl transition-transform group-hover:scale-[1.03]">
              <Logo size="xl" asLink={false} />
            </div>
            <div className="mt-4 text-center relative z-10">
              <p className="font-display text-white font-bold text-base md:text-lg">Your Personal Agent</p>
              <p className="text-white/80 text-xs md:text-sm mt-0.5">Inspected by AJBUY</p>
            </div>
          </div>

          {/* Tracking */}
          <div className="md:col-span-5 bg-card rounded-3xl p-5 md:p-6 ring-soft flex flex-col justify-between min-h-[140px]">
            <div>
              <p className="font-display text-foreground/40 uppercase tracking-[0.18em] text-[10px] font-bold mb-3">Active Shipment</p>
              <div className="flex justify-between items-end gap-4">
                <div>
                  <p className="font-display text-xl md:text-2xl font-bold">HKG → DXB</p>
                  <p className="text-primary text-xs md:text-sm mt-1 inline-flex items-center gap-1.5">
                    <Truck className="h-3.5 w-3.5" /> Out for delivery
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-foreground/40 text-[11px]">Arrival</p>
                  <p className="font-medium text-sm">Today 14:00</p>
                </div>
              </div>
            </div>
            <div className="mt-5 h-1 w-full bg-foreground/5 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-4/5 shadow-[0_0_10px_rgb(255_90_90)]" />
            </div>
          </div>

          {/* Marketplaces — 2 channels only */}
          <div className="md:col-span-4 bg-card rounded-3xl p-5 md:p-6 ring-soft min-h-[140px]">
            <p className="font-display text-foreground/40 uppercase tracking-[0.18em] text-[10px] font-bold mb-4">Supported Channels</p>
            <div className="grid grid-cols-2 gap-2.5">
              {CHANNELS.map((m) => (
                <div key={m} className="bg-background p-3 md:p-4 rounded-2xl border border-border flex items-center justify-center hover:border-primary/40 transition-colors cursor-pointer">
                  <span className="font-display font-bold text-sm">{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust */}
          <div className="md:col-span-3 bg-card rounded-3xl p-5 md:p-6 ring-soft flex flex-col items-center justify-center text-center min-h-[140px]">
            <div className="font-display text-2xl md:text-3xl font-extrabold">12.4k+</div>
            <p className="text-foreground/50 text-xs mt-0.5">Shoppers globally</p>
            <div className="mt-3 flex -space-x-2.5">
              {["bg-neutral-800", "bg-neutral-700", "bg-neutral-600"].map((b, i) => (
                <div key={i} className={`w-7 h-7 rounded-full ${b} border-2 border-card`} />
              ))}
              <div className="w-7 h-7 rounded-full bg-primary border-2 border-card flex items-center justify-center text-[9px] text-white font-bold">+80</div>
            </div>
          </div>

          {/* Live ticker */}
          <div className="md:col-span-12 bg-card rounded-3xl p-3.5 ring-soft overflow-hidden">
            <div className="flex items-center gap-10 animate-marquee whitespace-nowrap">
              {[...Array(2)].map((_, k) =>
                [
                  "Order #AJ-10293 paid · London, UK",
                  "Package WH-4421 arrived in Guangzhou warehouse",
                  "QC passed on Smart Watch S9 · 3 photos uploaded",
                  "Shipment AJ-10277 cleared customs · Dubai",
                  "New shopper from Los Angeles joined",
                  "Refund processed · REQ-00427",
                ].map((t, i) => (
                  <span key={`${k}-${i}`} className="text-xs text-foreground/50 inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgb(16_185_129)]" />
                    {t}
                    <span className="text-foreground/20 ml-6">•</span>
                  </span>
                )),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex items-end justify-between flex-wrap gap-3 mb-6 md:mb-8">
            <div>
              <p className="font-display text-primary text-[10px] uppercase tracking-[0.18em] font-bold">Process</p>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mt-1.5">How It Works</h2>
            </div>
            <p className="text-sm text-foreground/60 max-w-sm">Four steps from product link to your doorstep.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {howItWorks.map((s) => (
              <div key={s.step} className="relative rounded-2xl bg-card p-4 md:p-5 ring-soft hover:-translate-y-0.5 hover:shadow-card-hover transition-all">
                <div className="flex items-center justify-between">
                  <div className="font-display text-foreground/30 text-lg font-bold">0{s.step}</div>
                  <div className="text-xl">{s.icon}</div>
                </div>
                <h3 className="font-display text-base mt-4">{s.title}</h3>
                <p className="text-xs text-foreground/60 mt-1.5">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories + product cards */}
      <section id="categories" className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex items-end justify-between flex-wrap gap-3 mb-6 md:mb-8">
            <div>
              <p className="font-display text-primary text-[10px] uppercase tracking-[0.18em] font-bold">Browse</p>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mt-1.5">Featured Categories</h2>
            </div>
            <Link to="/search" className="text-sm text-foreground/70 hover:text-primary inline-flex items-center gap-1">
              See all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Category chips */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-2 md:gap-3">
            {categories.map((c) => (
              <Link
                key={c.name}
                to="/search"
                search={{ category: c.name }}
                className="group relative rounded-2xl bg-card ring-soft p-3 md:p-4 flex flex-col items-center gap-1.5 hover:-translate-y-0.5 hover:shadow-card-hover transition-all overflow-hidden text-center"
              >
                {c.popular && (
                  <span className="absolute top-1.5 right-1.5 text-[9px] uppercase font-bold bg-primary text-primary-foreground rounded-full px-1.5 py-0.5">Hot</span>
                )}
                <div className="text-xl md:text-2xl">{c.icon}</div>
                <div className="font-display font-bold text-xs md:text-sm leading-tight">{c.name}</div>
              </Link>
            ))}
          </div>

          {/* Featured products */}
          <div className="mt-6 md:mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {featuredProducts.map((p) => (
              <Link
                key={p.id}
                to="/product/$id"
                params={{ id: p.id }}
                className="group relative rounded-2xl bg-card ring-soft overflow-hidden hover:-translate-y-0.5 hover:shadow-card-hover transition-all"
              >
                <div className="relative aspect-square bg-gradient-to-br from-foreground/5 to-foreground/[0.02] flex items-center justify-center text-4xl md:text-5xl">
                  {p.emoji}
                  <span
                    className="absolute top-2 left-2 px-1.5 py-0.5 rounded-full text-[9px] text-white font-semibold"
                    style={{ backgroundColor: p.platform === "Taobao" ? "#FF4400" : "#FE8E12" }}
                  >
                    {p.platform}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); }}
                    className="absolute top-1.5 right-1.5 h-7 w-7 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-foreground/60 hover:text-primary"
                    aria-label="Add to wishlist"
                  >
                    <Heart className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="p-2.5 md:p-3">
                  <div className="text-xs md:text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">{p.title}</div>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="font-display text-sm md:text-base text-primary font-bold">${p.price.toFixed(2)}</span>
                    {p.oldPrice && <span className="text-[10px] text-foreground/40 line-through">${p.oldPrice.toFixed(2)}</span>}
                  </div>
                  <div className="mt-1 inline-flex items-center gap-1 text-[10px] text-foreground/50">
                    <Truck className="h-3 w-3" /> {p.shipping}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Estimator */}
      <FreightEstimator />

      {/* Why us strip */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { icon: ShieldCheck, title: "QC Inspected", desc: "Every order photographed before shipment." },
            { icon: Sparkles, title: "Insider Prices", desc: "Direct-from-factory rates from 1688." },
            { icon: Globe, title: "80+ Countries", desc: "Door-to-door consolidated shipping." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl bg-card ring-soft p-4 md:p-5 flex gap-3 items-start">
              <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <div className="font-display text-sm md:text-base">{title}</div>
                <p className="text-xs md:text-sm text-foreground/60 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-center">Shoppers love us</h2>
          <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-2xl bg-card ring-soft p-4 md:p-5">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (<Star key={j} className="h-3.5 w-3.5 fill-primary text-primary" />))}
                </div>
                <p className="mt-3 text-sm text-foreground/90 leading-relaxed">"{t.text}"</p>
                <div className="mt-3 text-xs text-foreground/50">— {t.name}, {t.country}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-6">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="col-span-2 md:col-span-1">
            <Logo size="lg" />
            <p className="text-xs md:text-sm text-foreground/60 mt-3">Shop Like a Millionaire.</p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-2 text-sm">Company</h4>
            <ul className="space-y-1.5 text-xs md:text-sm text-foreground/60">
              <li>About</li><li>Careers</li><li>Press</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-2 text-sm">Help</h4>
            <ul className="space-y-1.5 text-xs md:text-sm text-foreground/60">
              <li>FAQ</li><li>Shipping</li><li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-2 text-sm">Preferences</h4>
            <div className="flex gap-2">
              <select className="bg-foreground/5 border border-border rounded-lg px-2 py-1 text-xs"><option>EN</option><option>AR</option><option>FR</option></select>
              <select className="bg-foreground/5 border border-border rounded-lg px-2 py-1 text-xs"><option>USD</option><option>AED</option><option>EUR</option></select>
            </div>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto max-w-7xl px-4 md:px-6 py-4 text-[11px] text-foreground/50 text-center">
            © 2026 AJBUY. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FreightEstimator() {
  const [method, setMethod] = useState("Air");
  return (
    <section id="estimator" className="py-10 md:py-14">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="text-center mb-6 md:mb-8">
          <p className="font-display text-primary text-[10px] uppercase tracking-[0.18em] font-bold">Calculator</p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mt-1.5">Shipping Estimator</h2>
          <p className="text-sm text-foreground/60 mt-2">Get a rough estimate. Sign up for an exact quote.</p>
        </div>
        <div className="rounded-3xl bg-card ring-soft p-5 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <Field label="From"><input disabled value="China 🇨🇳" className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-sm" /></Field>
            <Field label="To"><select className="w-full rounded-xl border border-border px-3 py-2 text-sm bg-background">
              <option>United Arab Emirates</option><option>United Kingdom</option><option>France</option><option>United States</option>
            </select></Field>
            <Field label="Weight (kg)"><input type="number" defaultValue={2.5} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" /></Field>
            <Field label="Dimensions (L×W×H cm)">
              <div className="grid grid-cols-3 gap-2">
                <input defaultValue={30} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
                <input defaultValue={20} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
                <input defaultValue={15} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
              </div>
            </Field>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Air", "Sea", "Express", "Economy"].map((m) => (
              <button key={m} onClick={() => setMethod(m)} className={`px-3.5 py-1.5 rounded-full text-xs border transition ${method === m ? "bg-primary text-primary-foreground border-primary shadow-glow-primary" : "border-border hover:bg-foreground/5"}`}>
                {m}
              </button>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { name: "DHL Express", price: 28.5, eta: "4–6 days" },
              { name: "EMS Standard", price: 18.5, eta: "7–12 days" },
              { name: "Sea Freight", price: 9.2, eta: "30–45 days" },
            ].map((q) => (
              <div key={q.name} className="rounded-2xl border border-border bg-background p-4">
                <div className="text-xs text-foreground/50">{method}</div>
                <div className="font-display text-base mt-1">{q.name}</div>
                <div className="text-xs text-foreground/60 mt-0.5">{q.eta}</div>
                <div className="font-display text-xl text-primary mt-2">${q.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] font-semibold text-foreground/50 uppercase tracking-[0.14em]">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
