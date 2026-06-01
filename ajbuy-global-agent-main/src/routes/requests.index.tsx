import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/ajbuy/AppShell";
import { StatusBadge } from "@/components/ajbuy/StatusBadge";
import { ProductPlaceholder } from "@/components/ajbuy/ProductPlaceholder";
import { purchaseRequests } from "@/lib/mock-data";
import { ChevronRight, Filter, ArrowUpDown, Plus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/requests/")({ component: RequestsList });

const tabs = ["All", "Pending Quote", "Awaiting Payment", "Processing", "Completed"];

function RequestsList() {
  const [tab, setTab] = useState("All");
  const filtered = tab === "All" ? purchaseRequests : purchaseRequests.filter((r) => r.status === tab);
  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-4xl">
        <h1 className="font-display text-2xl md:text-3xl">Purchase Requests</h1>
        <p className="text-sm text-muted-foreground mt-1">Track every request from quote to delivery.</p>

        <div className="mt-5 flex items-center gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`shrink-0 px-3.5 py-1.5 rounded-full text-sm border ${tab === t ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"}`}>{t}</button>
          ))}
          <div className="ml-auto flex gap-2 shrink-0">
            <button className="h-9 w-9 rounded-full border inline-flex items-center justify-center hover:bg-muted"><ArrowUpDown className="h-4 w-4" /></button>
            <button className="h-9 w-9 rounded-full border inline-flex items-center justify-center hover:bg-muted"><Filter className="h-4 w-4" /></button>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border bg-card divide-y shadow-card">
          {filtered.map((r) => (
            <Link key={r.id} to="/requests/$id" params={{ id: r.id }} className="flex items-center gap-3 p-4 hover:bg-muted/40">
              <ProductPlaceholder className="h-14 w-14 shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="font-medium truncate">{r.title}</div>
                <div className="text-xs text-muted-foreground">{r.id} · Qty {r.qty} · {r.date}</div>
              </div>
              <div className="text-right shrink-0">
                <StatusBadge status={r.status} />
                {r.price && <div className="text-sm mt-1 font-medium">${r.price.toFixed(2)}</div>}
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
            </Link>
          ))}
          {filtered.length === 0 && <div className="p-12 text-center text-sm text-muted-foreground">No requests in this category yet.</div>}
        </div>

        <Link to="/import" className="lg:hidden fixed bottom-20 right-4 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-card-hover inline-flex items-center justify-center">
          <Plus className="h-6 w-6" />
        </Link>
      </div>
    </AppShell>
  );
}