import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/ajbuy/AdminShell";
import { adminKpis, adminRecentOrders, adminRevenueSeries } from "@/lib/mock-data";
import { StatusBadge } from "@/components/ajbuy/StatusBadge";
import { DollarSign, ShoppingCart, Quote, Truck } from "lucide-react";

export const Route = createFileRoute("/admin/")({ component: AdminOverview });

function AdminOverview() {
  const max = Math.max(...adminRevenueSeries);
  return (
    <AdminShell>
      <h1 className="font-display text-2xl md:text-3xl">Overview</h1>
      <p className="text-sm text-muted-foreground mt-1">Operational snapshot of the last 30 days.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        <Kpi icon={<DollarSign className="h-4 w-4" />} label="Revenue" value={`$${adminKpis.revenue.toLocaleString()}`} delta="+18%" />
        <Kpi icon={<ShoppingCart className="h-4 w-4" />} label="Orders today" value={adminKpis.ordersToday} delta="+12" />
        <Kpi icon={<Quote className="h-4 w-4" />} label="Pending quotes" value={adminKpis.pendingQuotes} delta="-4" negative />
        <Kpi icon={<Truck className="h-4 w-4" />} label="Active shipments" value={adminKpis.activeShipments} delta="+7" />
      </div>

      <div className="mt-6 rounded-2xl border bg-card p-5 shadow-card">
        <h2 className="font-display text-lg">Revenue (last 30 days)</h2>
        <div className="mt-4">
          <svg viewBox="0 0 600 160" className="w-full h-40">
            <polyline
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              points={adminRevenueSeries.map((v, i) => `${(i / (adminRevenueSeries.length - 1)) * 600},${160 - (v / max) * 140 - 10}`).join(" ")}
              style={{ stroke: "#E74646" }}
            />
            <polyline
              fill="rgba(231,70,70,0.08)"
              stroke="none"
              points={`0,160 ${adminRevenueSeries.map((v, i) => `${(i / (adminRevenueSeries.length - 1)) * 600},${160 - (v / max) * 140 - 10}`).join(" ")} 600,160`}
            />
          </svg>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border bg-card shadow-card overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="font-display text-lg">Recent orders</h2>
          <Link to="/admin/orders" className="text-xs text-primary hover:underline">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
              <tr><th className="text-left p-3">Order</th><th className="text-left p-3">Customer</th><th className="text-left p-3">Status</th><th className="text-right p-3">Amount</th><th className="text-right p-3">Date</th></tr>
            </thead>
            <tbody className="divide-y">
              {adminRecentOrders.map((o) => (
                <tr key={o.id} className="hover:bg-muted/30">
                  <td className="p-3 font-mono text-xs">{o.id}</td>
                  <td className="p-3">{o.customer}</td>
                  <td className="p-3"><StatusBadge status={o.status} /></td>
                  <td className="p-3 text-right">${o.amount.toFixed(2)}</td>
                  <td className="p-3 text-right text-muted-foreground">{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}

function Kpi({ icon, label, value, delta, negative }: { icon: React.ReactNode; label: string; value: React.ReactNode; delta: string; negative?: boolean }) {
  return (
    <div className="rounded-2xl border bg-card p-4">
      <div className="flex items-center justify-between text-muted-foreground">
        <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">{icon}</div>
        <span className={`text-xs ${negative ? "text-red-600" : "text-green-600"}`}>{delta}</span>
      </div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground mt-3">{label}</div>
      <div className="font-display text-2xl mt-1">{value}</div>
    </div>
  );
}
