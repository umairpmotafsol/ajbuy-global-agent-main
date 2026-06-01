import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/ajbuy/AdminShell";
import { StatusBadge } from "@/components/ajbuy/StatusBadge";
import { adminRecentOrders } from "@/lib/mock-data";
import { Search, Calendar, Download } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/orders")({ component: AdminOrders });

const tabs = ["All", "Pending Quote", "Processing", "Shipped", "Completed"];

const allOrders = [
  ...adminRecentOrders,
  { id: "AJ-10241", customer: "Jin H.", status: "Completed", amount: 64.2, date: "May 14" },
  { id: "AJ-10233", customer: "Marie L.", status: "Processing", amount: 199.0, date: "May 13" },
  { id: "AJ-10228", customer: "Sara K.", status: "Shipped", amount: 47.5, date: "May 12" },
  { id: "AJ-10219", customer: "Omar N.", status: "Completed", amount: 122.8, date: "May 10" },
  { id: "AJ-10204", customer: "Liam B.", status: "Pending Quote", amount: 0, date: "May 09" },
];

function AdminOrders() {
  const [tab, setTab] = useState("All");
  const filtered = tab === "All" ? allOrders : allOrders.filter((o) => o.status === tab);

  return (
    <AdminShell>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="font-display text-2xl md:text-3xl">Orders</h1>
          <p className="text-sm text-muted-foreground mt-1">All customer orders across statuses.</p>
        </div>
        <button className="rounded-full border px-4 py-2 text-sm inline-flex items-center gap-2 hover:bg-muted">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 items-center">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input placeholder="Search by order ID or customer…" className="w-full rounded-full border pl-9 pr-3 py-2 text-sm bg-background focus:outline-none focus:border-primary" />
        </div>
        <button className="rounded-full border px-3 py-2 text-sm inline-flex items-center gap-2 hover:bg-muted">
          <Calendar className="h-4 w-4" /> Date range
        </button>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto scrollbar-hide">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`shrink-0 px-3.5 py-1.5 rounded-full text-sm border ${tab === t ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"}`}>{t}</button>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border bg-card shadow-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="text-left p-3">Order</th>
              <th className="text-left p-3 hidden sm:table-cell">Customer</th>
              <th className="text-left p-3">Status</th>
              <th className="text-right p-3">Amount</th>
              <th className="text-right p-3 hidden md:table-cell">Date</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((o) => (
              <tr key={o.id} className="hover:bg-muted/30">
                <td className="p-3">
                  <div className="font-mono text-xs">{o.id}</div>
                  <div className="text-xs text-muted-foreground sm:hidden">{o.customer}</div>
                </td>
                <td className="p-3 hidden sm:table-cell">{o.customer}</td>
                <td className="p-3"><StatusBadge status={o.status} /></td>
                <td className="p-3 text-right">${o.amount.toFixed(2)}</td>
                <td className="p-3 text-right text-muted-foreground hidden md:table-cell">{o.date}</td>
                <td className="p-3 text-right text-xs">
                  <Link to="/admin/orders/$id" params={{ id: o.id }} className="text-primary hover:underline">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="p-12 text-center text-sm text-muted-foreground">No orders in this status.</div>}
      </div>
    </AdminShell>
  );
}
