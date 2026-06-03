import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/ajbuy/AppShell";
import { StatusBadge } from "@/components/ajbuy/StatusBadge";
import { ProductPlaceholder } from "@/components/ajbuy/ProductPlaceholder";
import { ChevronRight, Filter, ArrowUpDown, Search as SearchIcon, CreditCard } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/orders/")({ component: OrdersList });

const statuses = [
  "All",
  "Payment pending",
  "Pending order",
  "Outstanding order",
  "Purchase in progress",
  "Ordered from seller",
  "Cancelled",
  "Received",
  "Abandoned",
  "Ready to submit parcel",
  "Warehouse picking",
  "Awaiting collection",
  "Shipped",
  "Returned",
  "Refunded",
  "Completed",
];

const mockOrders = [
  { id: "ORD-001", title: "Wireless Earbuds", qty: 2, date: "Jun 1, 2026", status: "Completed", price: 45.99 },
  { id: "ORD-002", title: "Phone Case", qty: 1, date: "May 28, 2026", status: "Shipped", price: 12.50 },
  { id: "ORD-003", title: "USB Cable", qty: 5, date: "May 25, 2026", status: "Awaiting collection", price: 25.00 },
  { id: "ORD-004", title: "Screen Protector", qty: 3, date: "May 22, 2026", status: "Warehouse picking", price: 18.75 },
  { id: "ORD-005", title: "Power Bank", qty: 1, date: "May 20, 2026", status: "Ready to submit parcel", price: 35.99 },
  { id: "ORD-006", title: "Bluetooth Speaker", qty: 1, date: "May 18, 2026", status: "Ordered from seller", price: 62.50 },
  { id: "ORD-007", title: "Phone Charger", qty: 2, date: "May 15, 2026", status: "Purchase in progress", price: 28.00 },
  { id: "ORD-008", title: "Laptop Stand", qty: 1, date: "May 12, 2026", status: "Payment pending", price: 55.00 },
];

function OrdersList() {
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = mockOrders.filter((o) => {
    const statusMatch = tab === "All" || o.status === tab;
    const searchMatch = search === "" ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.title.toLowerCase().includes(search.toLowerCase());
    return statusMatch && searchMatch;
  });

  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-4xl">
        <h1 className="font-display text-2xl md:text-3xl">My Orders</h1>
        <p className="text-sm text-muted-foreground mt-1">Track orders through the fulfillment pipeline.</p>

        {/* Filter section */}
        <div className="mt-5 flex flex-col md:flex-row items-start md:items-center gap-3">
          {/* Search bar */}
          <div className="flex-1 min-w-0 relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by order ID or title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Status dropdown */}
          <select
            value={tab}
            onChange={(e) => setTab(e.target.value)}
            className="w-full md:w-48 px-4 py-2.5 rounded-lg border border-border bg-background text-sm font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          {/* Action buttons */}
          <div className="flex gap-2 shrink-0">
            <button className="h-10 w-10 rounded-lg border inline-flex items-center justify-center hover:bg-muted transition-colors" title="Sort">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="h-10 w-10 rounded-lg border inline-flex items-center justify-center hover:bg-muted transition-colors" title="Filter">
              <Filter className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Orders list */}
        <div className="mt-4 rounded-2xl border bg-card divide-y shadow-card overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-sm text-muted-foreground">No orders in this status yet.</div>
          ) : (
            filtered.map((order) => (
              <div
                key={order.id}
                className="flex items-center gap-3 p-4 hover:bg-muted/40 transition-colors"
              >
                <Link
                  to="/orders/$id"
                  params={{ id: order.id }}
                  className="flex items-center gap-3 flex-1 min-w-0"
                >
                  <ProductPlaceholder className="h-14 w-14 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium truncate">{order.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {order.id} · Qty {order.qty} · {order.date}
                    </div>
                  </div>
                </Link>
                <div className="text-right shrink-0 flex flex-col items-end gap-2">
                  <div className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary whitespace-nowrap">
                    {order.status}
                  </div>
                  {order.price && <div className="text-sm font-medium">${order.price.toFixed(2)}</div>}
                </div>
                {order.status === "Payment pending" ? (
                  <button className="rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary-deep transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0">
                    <CreditCard className="h-4 w-4" /> Pay now
                  </button>
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}
