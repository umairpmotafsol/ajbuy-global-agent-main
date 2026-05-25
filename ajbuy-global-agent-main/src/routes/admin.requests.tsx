/*import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ajbuy/AdminShell";
import { ProductPlaceholder } from "@/components/ajbuy/ProductPlaceholder";
import { StatusBadge } from "@/components/ajbuy/StatusBadge";
import { purchaseRequests } from "@/lib/mock-data";
import { Search, Calendar } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/requests")({ component: AdminRequests });

function AdminRequests() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <AdminShell>
      <h1 className="font-display text-2xl md:text-3xl">Purchase Requests</h1>

      <div className="mt-5 flex flex-wrap gap-2 items-center">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input placeholder="Search by ID, customer…" className="w-full rounded-full border pl-9 pr-3 py-2 text-sm bg-background focus:outline-none focus:border-primary" />
        </div>
        <button className="rounded-full border px-3 py-2 text-sm inline-flex items-center gap-2 hover:bg-muted"><Calendar className="h-4 w-4" /> Date range</button>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-4">
        <div className="lg:col-span-2 rounded-2xl border bg-card shadow-card divide-y">
          {purchaseRequests.map((r) => (
            <button key={r.id} onClick={() => setSelected(r.id)} className={`w-full flex items-center gap-3 p-4 text-left hover:bg-muted/40 ${selected === r.id ? "bg-primary/5" : ""}`}>
              <ProductPlaceholder className="h-12 w-12 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{r.title}</div>
                <div className="text-xs text-muted-foreground">{r.id} · Ahmed Al-Rashidi · {r.date}</div>
              </div>
              <StatusBadge status={r.status} />
            </button>
          ))}
        </div>

        <aside className="rounded-2xl border bg-card p-5 shadow-card">
          <h3 className="font-display text-lg">Quotation builder</h3>
          <p className="text-xs text-muted-foreground mt-1">For {selected ?? "select a request"}</p>
          <div className="mt-4 space-y-3 text-sm">
            <Row label="Product cost" input defaultValue={42} />
            <Row label="Service fee (12%)" input defaultValue={5.04} readonly />
            <Row label="Shipping estimate" input defaultValue={12.5} />
            <div className="border-t pt-3 flex justify-between font-display text-lg">
              <span>Total</span><span className="text-primary">$59.54</span>
            </div>
            <textarea rows={3} placeholder="Note to customer…" className="w-full rounded-lg border px-3 py-2 text-sm mt-2" />
            <button className="w-full rounded-full bg-primary text-primary-foreground py-2.5 font-medium hover:bg-primary-deep">Send Quotation</button>
          </div>
        </aside>
      </div>
    </AdminShell>
  );
}

function Row({ label, defaultValue, input, readonly }: { label: string; defaultValue: number; input?: boolean; readonly?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-muted-foreground uppercase">{label}</span>
      {input && <input type="number" defaultValue={defaultValue} readOnly={readonly} className="w-24 rounded-lg border px-2 py-1 text-right text-sm" />}
    </div>
  );
}*/
