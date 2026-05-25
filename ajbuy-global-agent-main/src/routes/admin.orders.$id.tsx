import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/ajbuy/AdminShell";
import { ProductPlaceholder } from "@/components/ajbuy/ProductPlaceholder";
import { StatusBadge } from "@/components/ajbuy/StatusBadge";
import { ChevronLeft, MapPin, Mail, Phone, Truck, Package, Copy, MessageSquare, Printer } from "lucide-react";

export const Route = createFileRoute("/admin/orders/$id")({ component: AdminOrderDetail });

const items = [
  { name: "Wireless Earbuds Pro — Black", qty: 2, unit: 21.0, supplier: "Shenzhen Audio Co." },
  { name: "Charging Case Cover", qty: 2, unit: 3.5, supplier: "Shenzhen Audio Co." },
];

const timeline = [
  { time: "May 20, 14:22", text: "Out for delivery — DXB", who: "DHL" },
  { time: "May 17, 22:45", text: "Shipped via DHL Express", who: "Warehouse" },
  { time: "May 16, 10:20", text: "QC completed — Approved", who: "QC team" },
  { time: "May 15, 16:00", text: "Arrived at AJBuy warehouse", who: "Warehouse" },
  { time: "May 13, 14:30", text: "Purchased from supplier", who: "Sourcing" },
  { time: "May 12, 09:00", text: "Quotation accepted by customer", who: "Customer" },
  { time: "May 12, 08:45", text: "Order created", who: "System" },
];

function AdminOrderDetail() {
  const { id } = Route.useParams();
  const subtotal = items.reduce((s, i) => s + i.qty * i.unit, 0);
  const fee = +(subtotal * 0.12).toFixed(2);
  const shipping = 28.5;
  const total = subtotal + fee + shipping;

  return (
    <AdminShell>
      <Link to="/admin/orders" className="text-sm text-muted-foreground inline-flex items-center gap-1 hover:text-primary"><ChevronLeft className="h-4 w-4" /> Back to orders</Link>
      <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="font-display text-2xl md:text-3xl">{id}</h1>
          <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
            Placed May 12, 2026 · <StatusBadge status="Shipped" />
          </div>
        </div>
        <div className="flex gap-2">
          <button className="rounded-full border px-3 py-2 text-xs inline-flex items-center gap-1.5 hover:bg-muted"><Printer className="h-3.5 w-3.5" /> Invoice</button>
          <button className="rounded-full border px-3 py-2 text-xs inline-flex items-center gap-1.5 hover:bg-muted"><MessageSquare className="h-3.5 w-3.5" /> Message customer</button>
          <button className="rounded-full bg-primary text-primary-foreground px-3 py-2 text-xs font-medium hover:bg-primary-deep">Update status</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Items */}
          <div className="rounded-2xl border bg-card shadow-card overflow-hidden">
            <div className="p-5 border-b flex items-center justify-between">
              <h2 className="font-display text-lg">Items</h2>
              <span className="text-xs text-muted-foreground">{items.length} products</span>
            </div>
            <div className="divide-y">
              {items.map((it, i) => (
                <div key={i} className="flex items-center gap-3 p-4">
                  <ProductPlaceholder className="h-14 w-14 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <Link to="/product/$id" params={{ id: `P-${i + 1}` }} className="font-medium hover:text-primary truncate block">{it.name}</Link>
                    <div className="text-xs text-muted-foreground">Supplier: {it.supplier}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">×{it.qty}</div>
                  <div className="w-20 text-right font-medium">${(it.qty * it.unit).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="p-5 bg-muted/30 space-y-1.5 text-sm">
              <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              <Row label="Service fee (12%)" value={`$${fee.toFixed(2)}`} />
              <Row label="Shipping — Air Express" value={`$${shipping.toFixed(2)}`} />
              <div className="border-t pt-2 mt-2 flex justify-between font-display text-lg">
                <span>Total</span><span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shipment */}
          <div className="rounded-2xl border bg-card shadow-card p-5">
            <h2 className="font-display text-lg flex items-center gap-2"><Truck className="h-5 w-5 text-primary" /> Shipment</h2>
            <div className="mt-3 grid md:grid-cols-2 gap-3 text-sm">
              <Field label="Carrier" value="DHL Express" />
              <Field label="Service" value="Air Express · 4–6 days" />
              <Field label="Tracking" value="DHL-9384-2941-AJB" mono copy />
              <Field label="Weight" value="1.2 kg" />
              <Field label="Dimensions" value="32×24×18 cm" />
              <Field label="Insurance" value="Yes — $2.50" />
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-2xl border bg-card shadow-card p-5">
            <h2 className="font-display text-lg">Activity</h2>
            <ul className="mt-4 space-y-3">
              {timeline.map((t, i) => (
                <li key={i} className="flex gap-3">
                  <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                  <div className="flex-1">
                    <div className="text-sm">{t.text}</div>
                    <div className="text-xs text-muted-foreground">{t.time} · {t.who}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Side */}
        <aside className="space-y-4">
          <div className="rounded-2xl border bg-card shadow-card p-5">
            <h3 className="font-display text-lg">Customer</h3>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground inline-flex items-center justify-center text-xs font-semibold">AA</div>
              <div>
                <div className="font-medium">Ahmed Al-Rashidi</div>
                <Link to="/admin/users" className="text-xs text-primary hover:underline">View profile</Link>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4" /> ahmed@example.com</div>
              <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" /> +971 50 *** **89</div>
            </div>
            <div className="mt-4 flex justify-between text-sm border-t pt-3">
              <span className="text-muted-foreground">Lifetime spend</span>
              <span className="font-medium">$1,284.40</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total orders</span>
              <span className="font-medium">14</span>
            </div>
          </div>

          <div className="rounded-2xl border bg-card shadow-card p-5">
            <h3 className="font-display text-lg flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Shipping address</h3>
            <div className="mt-3 text-sm space-y-0.5">
              <div className="font-medium">Ahmed Al-Rashidi</div>
              <div className="text-muted-foreground">Apartment 1402, Marina Heights</div>
              <div className="text-muted-foreground">Dubai Marina, Dubai</div>
              <div className="text-muted-foreground">United Arab Emirates</div>
            </div>
          </div>

          <div className="rounded-2xl border bg-card shadow-card p-5">
            <h3 className="font-display text-lg flex items-center gap-2"><Package className="h-4 w-4 text-primary" /> Customs</h3>
            <div className="mt-3 text-sm space-y-1">
              <Row label="Category" value="Electronics" />
              <Row label="Declared" value="$42.00" />
              <Row label="Description" value="Bluetooth earbuds" />
            </div>
          </div>
        </aside>
      </div>
    </AdminShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{label}</span><span className="font-medium">{value}</span></div>;
}
function Field({ label, value, mono, copy }: { label: string; value: string; mono?: boolean; copy?: boolean }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-0.5 flex items-center gap-2 ${mono ? "font-mono text-xs" : ""}`}>
        {value}
        {copy && <button className="h-6 w-6 rounded-full hover:bg-muted inline-flex items-center justify-center"><Copy className="h-3 w-3" /></button>}
      </div>
    </div>
  );
}
