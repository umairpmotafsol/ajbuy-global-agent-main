import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/ajbuy/AppShell";
import { ProductPlaceholder } from "@/components/ajbuy/ProductPlaceholder";
import { ChevronRight, Filter, ArrowUpDown, Search as SearchIcon } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/parcels/")({ component: ParcelsList });

const statuses = ["All parcels", "Payment required", "Pending payment", "Shipped", "Completed / Delivered"];

const mockParcels = [
  { id: "PKG-001", title: "Wireless Earbuds Bundle", qty: 2, date: "Jun 1, 2026", status: "Completed / Delivered", price: 45.99, weight: "0.5 kg" },
  { id: "PKG-002", title: "Phone Case & Screen Protector", qty: 3, date: "May 28, 2026", status: "Shipped", price: 28.50, weight: "0.3 kg" },
  { id: "PKG-003", title: "USB Cables & Chargers", qty: 5, date: "May 25, 2026", status: "Pending payment", price: 42.75, weight: "0.8 kg" },
  { id: "PKG-004", title: "Power Banks (2x)", qty: 2, date: "May 22, 2026", status: "Payment required", price: 62.00, weight: "1.2 kg" },
  { id: "PKG-005", title: "Bluetooth Speaker", qty: 1, date: "May 20, 2026", status: "Completed / Delivered", price: 35.99, weight: "0.6 kg" },
  { id: "PKG-006", title: "Laptop Stand & Mouse", qty: 2, date: "May 18, 2026", status: "Shipped", price: 58.50, weight: "1.5 kg" },
  { id: "PKG-007", title: "Phone Charger (Multi-pack)", qty: 3, date: "May 15, 2026", status: "Pending payment", price: 48.00, weight: "0.7 kg" },
  { id: "PKG-008", title: "Electronics Bundle", qty: 1, date: "May 12, 2026", status: "Payment required", price: 125.00, weight: "2.1 kg" },
];

function ParcelsList() {
  const [tab, setTab] = useState("All parcels");
  const [search, setSearch] = useState("");

  const filtered = mockParcels.filter((p) => {
    const statusMatch = tab === "All parcels" || p.status === tab;
    const searchMatch = search === "" ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.title.toLowerCase().includes(search.toLowerCase());
    return statusMatch && searchMatch;
  });

  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-4xl">
        <h1 className="font-display text-2xl md:text-3xl">My Parcels</h1>
        <p className="text-sm text-muted-foreground mt-1">Track parcel shipments and delivery status.</p>

        {/* Filter section */}
        <div className="mt-5 flex flex-col md:flex-row items-start md:items-center gap-3">
          {/* Search bar */}
          <div className="flex-1 min-w-0 relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by parcel ID or title..."
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

        {/* Parcels list */}
        <div className="mt-4 rounded-2xl border bg-card divide-y shadow-card overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-sm text-muted-foreground">No parcels in this status yet.</div>
          ) : (
            filtered.map((parcel) => (
              <Link
                key={parcel.id}
                to="/parcels/$id"
                params={{ id: parcel.id }}
                className="flex items-center gap-3 p-4 hover:bg-muted/40 transition-colors"
              >
                <ProductPlaceholder className="h-14 w-14 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="font-medium truncate">{parcel.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {parcel.id} · {parcel.weight} · {parcel.date}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className={`text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
                    parcel.status === "Completed / Delivered"
                      ? "bg-green-100 text-green-800"
                      : parcel.status === "Shipped"
                      ? "bg-blue-100 text-blue-800"
                      : parcel.status === "Payment required"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {parcel.status}
                  </div>
                  {parcel.price && <div className="text-sm mt-1 font-medium">${parcel.price.toFixed(2)}</div>}
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </Link>
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}
