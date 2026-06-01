import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/ajbuy/AdminShell";
import { StatusBadge } from "@/components/ajbuy/StatusBadge";
import { adminWarehousePackages, warehouseStats } from "@/lib/mock-data";
import { Search, Camera, Check, AlertTriangle, Truck, Package, MapPin } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/warehouse")({ component: AdminWarehouse });

const tabs = ["All", "Awaiting QC", "QC Complete", "Ready to Ship", "QC Issue", "Shipped"];

type Pkg = (typeof adminWarehousePackages)[number];

const statCards = [
  { label: "Total packages", value: warehouseStats.total, color: "text-foreground" },
  { label: "Awaiting QC", value: warehouseStats.awaitingQC, color: "text-amber-600" },
  { label: "Ready to ship", value: warehouseStats.readyToShip, color: "text-green-600" },
  { label: "QC issues", value: warehouseStats.issues, color: "text-red-600" },
];

function AdminWarehouse() {
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string>(adminWarehousePackages[0].id);

  const filtered = adminWarehousePackages.filter((p) => {
    const matchTab = tab === "All" || p.status === tab;
    const matchSearch =
      !search ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.customer.toLowerCase().includes(search.toLowerCase()) ||
      p.orderId.toLowerCase().includes(search.toLowerCase()) ||
      p.product.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const detail = adminWarehousePackages.find((p) => p.id === selected);

  return (
    <AdminShell>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="font-display text-2xl md:text-3xl">Warehouse</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage incoming packages, QC, and dispatch.</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statCards.map((s) => (
          <div key={s.label} className="rounded-2xl border bg-card shadow-card p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
            <div className={`font-display text-3xl mt-1 ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="mt-5 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by package ID, customer, order, or product…"
          className="w-full rounded-full border pl-9 pr-3 py-2 text-sm bg-background focus:outline-none focus:border-primary"
        />
      </div>

      {/* Tabs */}
      <div className="mt-4 flex gap-2 overflow-x-auto scrollbar-hide">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-sm border ${tab === t ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-4">
        {/* Table */}
        <div className="lg:col-span-2 rounded-2xl border bg-card shadow-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="text-left p-3">Package</th>
                <th className="text-left p-3 hidden sm:table-cell">Customer</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3 hidden md:table-cell">Location</th>
                <th className="text-right p-3 hidden sm:table-cell">Arrived</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => setSelected(p.id)}
                  className={`cursor-pointer hover:bg-muted/30 ${selected === p.id ? "bg-primary/5" : ""}`}
                >
                  <td className="p-3">
                    <div className="font-mono text-xs">{p.id}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 truncate max-w-[160px]">{p.product}</div>
                    <div className="text-xs text-muted-foreground sm:hidden">{p.customer}</div>
                  </td>
                  <td className="p-3 hidden sm:table-cell">{p.customer}</td>
                  <td className="p-3">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="p-3 text-xs text-muted-foreground hidden md:table-cell">{p.location}</td>
                  <td className="p-3 text-right text-xs text-muted-foreground hidden sm:table-cell">{p.arrived}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-12 text-center text-sm text-muted-foreground">No packages found.</div>
          )}
        </div>

        {/* Detail panel */}
        <aside className="rounded-2xl border bg-card shadow-card p-5">
          {detail ? (
            <PackageDetail pkg={detail} />
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground text-sm">
              Select a package to view details
            </div>
          )}
        </aside>
      </div>
    </AdminShell>
  );
}

function PackageDetail({ pkg }: Readonly<{ pkg: Pkg }>) {
  return (
    <div>
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-mono text-xs text-muted-foreground">{pkg.id}</div>
          <div className="font-display text-lg mt-0.5 leading-snug">{pkg.product}</div>
        </div>
        <StatusBadge status={pkg.status} />
      </div>

      {/* Photos */}
      <div className="mt-4 grid grid-cols-3 gap-1.5">
        {["ph-1", "ph-2", "ph-3"].map((id) => (
          <div
            key={id}
            className="aspect-square bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted/70 cursor-pointer"
          >
            <Camera className="h-5 w-5" />
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="mt-4 space-y-1.5 text-sm">
        <DetailRow label="Customer" value={pkg.customer} />
        <DetailRow label="Order" value={pkg.orderId} />
        <DetailRow label="Arrived" value={pkg.arrived} />
        <DetailRow label="Weight" value={pkg.weight} />
        <DetailRow label="Dimensions" value={pkg.dims} />
        <DetailRow label="Location" value={pkg.location} icon={<MapPin className="h-3.5 w-3.5 text-muted-foreground" />} />
      </div>

      {/* Actions */}
      <div className="mt-5 space-y-2">
        {pkg.status === "Awaiting QC" && (
          <button className="w-full rounded-full bg-primary text-primary-foreground py-2.5 text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-primary-deep">
            <Check className="h-4 w-4" /> Mark QC Passed
          </button>
        )}
        {pkg.status === "Awaiting QC" && (
          <button className="w-full rounded-full border border-red-200 text-red-600 py-2.5 text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-red-50">
            <AlertTriangle className="h-4 w-4" /> Flag QC Issue
          </button>
        )}
        {pkg.status === "QC Issue" && (
          <button className="w-full rounded-full bg-amber-500 text-white py-2.5 text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-amber-600">
            <AlertTriangle className="h-4 w-4" /> Resolve Issue
          </button>
        )}
        {(pkg.status === "QC Complete" || pkg.status === "Ready to Ship") && (
          <button className="w-full rounded-full bg-green-600 text-white py-2.5 text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-green-700">
            <Truck className="h-4 w-4" /> Dispatch Package
          </button>
        )}
        <Link
          to="/admin/orders/$id"
          params={{ id: pkg.orderId }}
          className="w-full rounded-full border py-2.5 text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-muted"
        >
          <Package className="h-4 w-4" /> View Order
        </Link>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  icon,
}: Readonly<{ label: string; value: string; icon?: React.ReactNode }>) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium flex items-center gap-1">
        {icon}
        {value}
      </span>
    </div>
  );
}
