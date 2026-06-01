import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/ajbuy/AppShell";
import { StatusBadge } from "@/components/ajbuy/StatusBadge";
import { packages } from "@/lib/mock-data";
import { useState } from "react";
import {
  ChevronDown, Camera, ShieldCheck, Bell, Package,
  Weight, Ruler, ChevronRight, Box, AlertTriangle,
  PackageCheck, Wrench, X,
} from "lucide-react";

export const Route = createFileRoute("/warehouse")({ component: WarehousePage });

const shippingEstimates = [
  { method: "Air Express (DHL)", price: 28.5, eta: "4–6 days" },
  { method: "Standard Air (EMS)", price: 18.5, eta: "7–12 days" },
  { method: "Sea Freight", price: 9.2, eta: "30–45 days" },
];

const tabs = ["All", "Awaiting QC", "QC Complete", "Ready to Ship"] as const;
type Tab = typeof tabs[number];

function WarehousePage() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [modModal, setModModal] = useState(false);
  const [modPkg, setModPkg] = useState<string | null>(null);
  const [mods, setMods] = useState({ fragile: false, repack: false, removeBox: false, bubbleWrap: false });

  const toggle = (id: string) => setSelected((s) => {
    const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n;
  });

  const filtered = activeTab === "All" ? packages : packages.filter((p) => p.status === activeTab);
  const qcReady = packages.filter((p) => p.status === "QC Complete");

  const selectedWeight = [...selected].reduce((s, id) => {
    const p = packages.find((x) => x.id === id);
    return s + parseFloat(p?.weight ?? "0");
  }, 0);

  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-4xl space-y-5">
        <div>
          <h1 className="font-display text-2xl md:text-3xl">My Warehouse</h1>
          <p className="text-sm text-muted-foreground mt-1">Review QC results, consolidate packages, and arrange shipment.</p>
        </div>

        {/* QC ready notification */}
        {qcReady.length > 0 && (
          <div className="rounded-2xl bg-green-50 border border-green-200 p-4 flex items-start gap-3">
            <Bell className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-medium text-green-900 text-sm">
                QC inspection complete — {qcReady.length} package{qcReady.length > 1 ? "s" : ""} ready for review
              </div>
              <div className="text-xs text-green-700 mt-0.5">Review inspection photos and approve to proceed with shipping.</div>
            </div>
            <Link to="/warehouse" className="text-xs text-green-700 font-medium hover:underline shrink-0">
              View →
            </Link>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total packages", value: packages.length, icon: Package, color: "text-foreground" },
            { label: "Awaiting QC", value: packages.filter(p => p.status === "Awaiting QC").length, icon: AlertTriangle, color: "text-amber-600" },
            { label: "QC Complete", value: packages.filter(p => p.status === "QC Complete").length, icon: PackageCheck, color: "text-green-600" },
            { label: "Ready to Ship", value: packages.filter(p => p.status === "Ready to Ship").length, icon: Box, color: "text-primary" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="rounded-2xl border bg-card shadow-card p-4 flex items-center gap-3">
                <Icon className={`h-5 w-5 shrink-0 ${s.color}`} />
                <div>
                  <div className={`font-display text-2xl ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-muted-foreground leading-tight">{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {tabs.map((t) => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-sm border transition-colors ${activeTab === t ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Package cards */}
        <div className="space-y-3">
          {filtered.map((p) => (
            <div key={p.id} className="rounded-2xl border bg-card shadow-card overflow-hidden">
              {/* Row */}
              <div className="flex items-center gap-3 p-4">
                <input type="checkbox" checked={selected.has(p.id)} onChange={() => toggle(p.id)}
                  className="accent-primary h-4 w-4 shrink-0" />

                {/* Package icon */}
                <div className="h-14 w-14 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <Package className="h-7 w-7 text-muted-foreground" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium">{p.id}</span>
                    <StatusBadge status={p.status} />
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground flex-wrap">
                    <span className="inline-flex items-center gap-1">
                      <Weight className="h-3 w-3" /> {p.weight}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Ruler className="h-3 w-3" /> {p.dims}
                    </span>
                    <span>Arrived {p.arrived}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {p.status !== "Awaiting QC" && (
                    <Link to="/warehouse/$id/qc" params={{ id: p.id }}
                      className="text-xs text-primary hover:underline hidden sm:inline font-medium">
                      QC Report
                    </Link>
                  )}
                  <button onClick={() => { setModPkg(p.id); setModModal(true); }}
                    className="h-8 w-8 rounded-full hover:bg-muted inline-flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                    title="Packaging modifications">
                    <Wrench className="h-4 w-4" />
                  </button>
                  <button onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                    className="h-9 w-9 rounded-full inline-flex items-center justify-center hover:bg-muted">
                    <ChevronDown className={`h-4 w-4 transition-transform ${expanded === p.id ? "rotate-180" : ""}`} />
                  </button>
                </div>
              </div>

              {/* Expanded detail */}
              {expanded === p.id && (
                <div className="border-t p-4 bg-muted/20 space-y-4">
                  {/* Photos */}
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Warehouse Photos</div>
                    <div className="grid grid-cols-4 gap-2">
                      {["ph-1","ph-2","ph-3","ph-4"].map((k) => (
                        <div key={k} className="aspect-square bg-muted rounded-xl flex items-center justify-center cursor-pointer hover:bg-muted/70 transition-colors group">
                          <Camera className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Package detail */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                    {[
                      { label: "Weight", value: p.weight },
                      { label: "Dimensions", value: p.dims },
                      { label: "Arrived", value: p.arrived },
                    ].map((d) => (
                      <div key={d.label} className="rounded-xl bg-background border p-3">
                        <div className="text-xs text-muted-foreground">{d.label}</div>
                        <div className="font-medium mt-0.5">{d.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* QC status */}
                  <div className={`rounded-xl p-3 flex items-center gap-2 text-sm ${
                    p.status === "Awaiting QC" ? "bg-amber-50 border border-amber-200 text-amber-800"
                    : "bg-green-50 border border-green-200 text-green-800"
                  }`}>
                    {p.status === "Awaiting QC"
                      ? <AlertTriangle className="h-4 w-4 shrink-0" />
                      : <ShieldCheck className="h-4 w-4 shrink-0" />
                    }
                    {p.status === "Awaiting QC"
                      ? "QC inspection scheduled within 24 hours. You'll be notified when results are ready."
                      : "QC inspection passed. All items verified against your order."
                    }
                  </div>

                  {p.status !== "Awaiting QC" && (
                    <Link to="/warehouse/$id/qc" params={{ id: p.id }}
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium">
                      View full QC report <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="rounded-2xl border bg-card p-12 text-center text-muted-foreground text-sm">
              No packages in this category.
            </div>
          )}
        </div>

        {/* Consolidation bar */}
        {selected.size > 0 && (
          <div className="fixed bottom-20 lg:bottom-6 inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 z-30 w-full md:w-auto md:min-w-[600px] max-w-2xl">
            <div className="rounded-2xl bg-foreground text-background p-4 shadow-card-hover">
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="text-sm font-medium">{selected.size} package{selected.size > 1 ? "s" : ""} selected · ~{selectedWeight.toFixed(1)} kg</span>
                <button onClick={() => setSelected(new Set())} className="text-background/60 hover:text-background">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {shippingEstimates.map((e) => (
                  <div key={e.method} className="rounded-xl bg-background/10 p-2 text-center">
                    <div className="text-xs text-background/70 leading-tight">{e.method}</div>
                    <div className="font-display text-lg mt-0.5">${e.price.toFixed(2)}</div>
                    <div className="text-[10px] text-background/50">{e.eta}</div>
                  </div>
                ))}
              </div>
              <Link to="/shipping/$id" params={{ id: "consol-1" }}
                className="block w-full rounded-full bg-primary text-primary-foreground py-2.5 text-sm font-semibold text-center hover:bg-primary-deep transition-colors">
                Consolidate & Ship →
              </Link>
            </div>
          </div>
        )}

        {/* Packaging modification modal */}
        {modModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={() => setModModal(false)} />
            <div className="relative bg-background rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg">Packaging Modifications</h3>
                <button onClick={() => setModModal(false)} className="h-8 w-8 rounded-full hover:bg-muted inline-flex items-center justify-center">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground">Select any special packaging requests for {modPkg}.</p>
              <div className="space-y-3">
                {[
                  { key: "fragile" as const, label: "Fragile padding", desc: "Extra bubble wrap around the item", price: "+$1.00" },
                  { key: "repack" as const, label: "Repacking", desc: "Repack into a new box", price: "+$2.00" },
                  { key: "removeBox" as const, label: "Remove original box", desc: "Remove outer packaging to reduce volume", price: "Free" },
                  { key: "bubbleWrap" as const, label: "Bubble wrap entire package", desc: "Wrap the whole shipment for extra safety", price: "+$1.50" },
                ].map((opt) => (
                  <label key={opt.key} className={`flex items-start gap-3 rounded-xl border-2 p-3 cursor-pointer transition-colors ${mods[opt.key] ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                    <input type="checkbox" checked={mods[opt.key]}
                      onChange={(e) => setMods((m) => ({ ...m, [opt.key]: e.target.checked }))}
                      className="accent-primary mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{opt.label}</div>
                      <div className="text-xs text-muted-foreground">{opt.desc}</div>
                    </div>
                    <span className="text-xs text-primary font-medium shrink-0">{opt.price}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setModModal(false)}
                  className="flex-1 rounded-full border py-2.5 text-sm hover:bg-muted transition-colors">Cancel</button>
                <button onClick={() => setModModal(false)}
                  className="flex-1 rounded-full bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:bg-primary-deep transition-colors">Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
