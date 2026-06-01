import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/ajbuy/AppShell";
import { StatusBadge } from "@/components/ajbuy/StatusBadge";
import { ProductPlaceholder } from "@/components/ajbuy/ProductPlaceholder";
import { packages } from "@/lib/mock-data";
import { useState } from "react";
import { ChevronDown, Camera, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/warehouse")({ component: WarehousePage });

function WarehousePage() {
  const [expanded, setExpanded] = useState<string | null>(packages[0].id);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const toggle = (id: string) => setSelected((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-4xl">
        <h1 className="font-display text-2xl md:text-3xl">My Warehouse</h1>
        <p className="text-sm text-muted-foreground mt-1">Consolidate packages to save on shipping.</p>

        <div className="mt-5 space-y-3">
          {packages.map((p) => (
            <div key={p.id} className="rounded-2xl border bg-card shadow-card overflow-hidden">
              <div className="flex items-center gap-3 p-4">
                <input type="checkbox" checked={selected.has(p.id)} onChange={() => toggle(p.id)} className="accent-primary h-4 w-4" />
                <ProductPlaceholder className="h-14 w-14 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="font-medium">{p.id}</div>
                  <div className="text-xs text-muted-foreground">Arrived {p.arrived} · {p.weight} · {p.dims}</div>
                  <StatusBadge status={p.status} />
                </div>
                <button onClick={() => setExpanded(expanded === p.id ? null : p.id)} className="h-9 w-9 rounded-full inline-flex items-center justify-center hover:bg-muted">
                  <ChevronDown className={`h-4 w-4 transition-transform ${expanded === p.id ? "rotate-180" : ""}`} />
                </button>
              </div>
              {expanded === p.id && (
                <div className="border-t p-4 bg-muted/20 space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    {["photo-1", "photo-2", "photo-3"].map((id) => (
                      <div key={id} className="aspect-square bg-muted rounded-lg flex items-center justify-center text-muted-foreground"><Camera className="h-6 w-6" /></div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ShieldCheck className="h-4 w-4 text-green-600" />
                    QC inspection {p.status === "Awaiting QC" ? "scheduled within 24h" : "passed"}
                  </div>
                  <Link to="/warehouse/$id/qc" params={{ id: p.id }} className="text-xs text-primary hover:underline">View QC report →</Link>
                </div>
              )}
            </div>
          ))}
        </div>

        {selected.size > 0 && (
          <div className="fixed bottom-20 lg:bottom-6 inset-x-4 md:inset-x-auto md:right-6 z-30 rounded-2xl bg-foreground text-background p-4 shadow-card-hover flex items-center justify-between gap-3 max-w-md mx-auto">
            <div className="text-sm">{selected.size} packages selected</div>
            <Link to="/shipping/$id" params={{ id: "consol-1" }} className="rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium">Consolidate & Ship</Link>
          </div>
        )}
      </div>
    </AppShell>
  );
}