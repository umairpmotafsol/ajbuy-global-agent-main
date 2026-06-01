import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/ajbuy/AppShell";
import { StatusBadge } from "@/components/ajbuy/StatusBadge";
import { ProductPlaceholder } from "@/components/ajbuy/ProductPlaceholder";
import { user, purchaseRequests, packages } from "@/lib/mock-data";
import { PackageSearch } from "lucide-react";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

const pendingPayment  = purchaseRequests.filter((r) => r.status === "Awaiting Payment").length;
const pendingPurchase = purchaseRequests.filter((r) => r.status === "Pending Quote").length;
const stored          = packages.length;
const processing      = purchaseRequests.filter((r) => r.status === "Processing").length;
const shipped         = purchaseRequests.filter((r) => r.status === "Completed").length;

const orderStats = [
  { label: "Pending Payment",  value: pendingPayment },
  { label: "Pending Purchase", value: pendingPurchase },
  { label: "Stored",           value: stored },
  { label: "Processing",       value: processing },
  { label: "Shipped",          value: shipped },
];

function Dashboard() {
  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-5xl space-y-4">

        {/* Profile card */}
        <div className="rounded-2xl border bg-card shadow-card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shrink-0">
              {user.avatar}
            </div>
            <div className="min-w-0">
              <div className="font-display text-xl">{user.name}</div>
              <div className="text-sm text-muted-foreground mt-0.5">{user.email}</div>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Verified</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{user.country}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-muted/30 px-5 py-3 flex items-center gap-4 shrink-0 self-start sm:self-auto">
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Balance</div>
              <div className="font-display text-2xl mt-0.5">${user.wallet.toFixed(2)}</div>
            </div>
            <Link
              to="/wallet"
              className="rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary-deep transition-colors whitespace-nowrap"
            >
              Recharge
            </Link>
          </div>
        </div>

        {/* Order stats */}
        <div className="rounded-2xl border bg-card shadow-card overflow-hidden">
          <div className="grid grid-cols-3 sm:grid-cols-5 divide-x divide-y sm:divide-y-0">
            {orderStats.map((s) => (
              <Link
                key={s.label}
                to="/requests"
                className="flex flex-col items-center justify-center py-5 px-2 hover:bg-muted/40 transition-colors text-center gap-1.5"
              >
                <span className="font-display text-3xl leading-none">{s.value}</span>
                <span className="text-xs text-muted-foreground leading-tight">{s.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Orders table */}
        <div className="rounded-2xl border bg-card shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <h2 className="font-display text-lg">My Orders</h2>
            <Link to="/requests" className="text-xs text-primary hover:underline font-medium">View all</Link>
          </div>

          {purchaseRequests.length === 0 ? (
            <div className="py-16 flex flex-col items-center gap-3 text-muted-foreground">
              <PackageSearch className="h-14 w-14 opacity-20" />
              <p className="font-display text-lg text-foreground">No order information</p>
              <p className="text-sm text-center max-w-xs">Submit a purchase request to get started.</p>
              <Link
                to="/import"
                className="mt-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary-deep"
              >
                Import a product
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="text-left p-4">Product Information</th>
                    <th className="text-right p-4 hidden sm:table-cell">Unit Price</th>
                    <th className="text-right p-4 hidden sm:table-cell">Quantity</th>
                    <th className="text-center p-4">Order Status</th>
                    <th className="text-right p-4 hidden md:table-cell">Order Amount</th>
                    <th className="text-right p-4">Operate</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {purchaseRequests.map((r) => (
                    <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <ProductPlaceholder className="h-12 w-12 shrink-0 rounded-lg" />
                          <div className="min-w-0">
                            <div className="font-medium text-sm truncate max-w-[140px] md:max-w-xs">{r.title}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">{r.id} · {r.date}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-right hidden sm:table-cell">
                        {r.price ? `$${(r.price / r.qty).toFixed(2)}` : "—"}
                      </td>
                      <td className="p-4 text-right hidden sm:table-cell">{r.qty}</td>
                      <td className="p-4 text-center">
                        <StatusBadge status={r.status} />
                      </td>
                      <td className="p-4 text-right font-medium hidden md:table-cell">
                        {r.price ? `$${r.price.toFixed(2)}` : "—"}
                      </td>
                      <td className="p-4 text-right">
                        <Link
                          to="/requests/$id"
                          params={{ id: r.id }}
                          className="text-xs text-primary hover:underline font-medium"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </AppShell>
  );
}
