import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/ajbuy/AppShell";
import { StatusBadge } from "@/components/ajbuy/StatusBadge";
import { ProductPlaceholder } from "@/components/ajbuy/ProductPlaceholder";
import { activeOrders, purchaseRequests, user } from "@/lib/mock-data";
import { PackageSearch, Truck, Warehouse, ShieldCheck, Wallet, LifeBuoy, Gift, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

const quickActions = [
  { to: "/import", label: "Import Product", icon: PackageSearch },
  { to: "/tracking/AJ-10277", label: "Track Order", icon: Truck },
  { to: "/warehouse", label: "Warehouse", icon: Warehouse },
  { to: "/warehouse/WH-4421/qc", label: "QC Review", icon: ShieldCheck },
  { to: "/wallet", label: "Recharge", icon: Wallet },
  { to: "/support", label: "Support", icon: LifeBuoy },
];

function Dashboard() {
  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-6 max-w-5xl">
        {/* Welcome + wallet */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 md:justify-between">
          <div>
            <h1 className="font-display text-2xl md:text-3xl">Welcome back, Ahmed 👋</h1>
            <p className="text-sm text-muted-foreground mt-1">Here's what's happening with your orders.</p>
          </div>
          <Link to="/wallet" className="rounded-2xl border bg-card p-4 shadow-card flex items-center gap-4 hover:shadow-card-hover transition-shadow">
            <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center"><Wallet className="h-5 w-5" /></div>
            <div>
              <div className="text-xs text-muted-foreground">Wallet balance</div>
              <div className="font-display text-xl">${user.wallet.toFixed(2)} <span className="text-xs text-muted-foreground font-sans">+ ${user.bonus.toFixed(2)} bonus</span></div>
            </div>
            <ChevronRight className="h-4 w-4 ml-2 text-muted-foreground" />
          </Link>
        </div>

        {/* Quick actions */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-6">
          {quickActions.map((a) => {
            const Icon = a.icon;
            return (
              <Link key={a.label} to={a.to} className="shrink-0 md:shrink min-w-[110px] rounded-2xl border bg-card p-4 hover:border-primary hover:shadow-card-hover transition-all text-center">
                <Icon className="h-5 w-5 mx-auto text-primary" />
                <div className="text-xs mt-2 font-medium">{a.label}</div>
              </Link>
            );
          })}
        </div>

        {/* Active orders */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-xl">Active Orders</h2>
            <Link to="/requests" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3">
            {activeOrders.map((o) => (
              <div key={o.id} className="shrink-0 md:shrink w-72 md:w-auto rounded-2xl border bg-card p-4 shadow-card">
                <div className="flex gap-3">
                  <ProductPlaceholder className="h-14 w-14 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-muted-foreground">{o.id}</div>
                    <div className="font-medium truncate">{o.title}</div>
                    <StatusBadge status={o.status} />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-[10px] uppercase text-muted-foreground mb-1">
                    <span>Purchased</span><span>Warehouse</span><span>QC</span><span>Shipped</span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((s) => (
                      <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= o.step ? "bg-primary" : "bg-muted"}`} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent requests */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-xl">Recent Purchase Requests</h2>
            <Link to="/requests" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="rounded-2xl border bg-card divide-y shadow-card">
            {purchaseRequests.slice(0, 4).map((r) => (
              <Link key={r.id} to="/requests/$id" params={{ id: r.id }} className="flex items-center gap-3 p-4 hover:bg-muted/40">
                <ProductPlaceholder className="h-12 w-12 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="font-medium truncate">{r.title}</div>
                  <div className="text-xs text-muted-foreground">{r.id} · {r.date}</div>
                </div>
                <div className="text-right shrink-0">
                  <StatusBadge status={r.status} />
                  {r.price && <div className="text-sm mt-1 font-medium">${r.price.toFixed(2)}</div>}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Promo banner */}
        <Link to="/affiliate" className="block rounded-2xl bg-gradient-to-r from-primary to-primary-deep text-primary-foreground p-5 md:p-6 shadow-card-hover overflow-hidden relative">
          <div className="flex items-center gap-4">
            <Gift className="h-8 w-8 shrink-0" />
            <div>
              <div className="font-display text-lg">Free QC on orders over $50</div>
              <div className="text-sm opacity-90">Plus earn $5 for every friend you refer.</div>
            </div>
            <ChevronRight className="h-5 w-5 ml-auto" />
          </div>
        </Link>
      </div>
    </AppShell>
  );
}
