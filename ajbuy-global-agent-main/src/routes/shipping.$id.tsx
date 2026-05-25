/*import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/ajbuy/AppShell";
import { shippingMethods } from "@/lib/mock-data";
import { useState } from "react";
import { ChevronLeft, Info } from "lucide-react";

export const Route = createFileRoute("/shipping/$id")({ component: Shipping });

function Shipping() {
  const [method, setMethod] = useState(shippingMethods[1].name);
  const [insurance, setInsurance] = useState(true);
  const [fragile, setFragile] = useState(false);
  const selected = shippingMethods.find((m) => m.name === method)!;
  const total = selected.price + (insurance ? 2.5 : 0) + (fragile ? 1 : 0);

  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-4xl">
        <Link to="/warehouse" className="text-sm text-muted-foreground inline-flex items-center gap-1 hover:text-primary"><ChevronLeft className="h-4 w-4" /> Back</Link>
        <h1 className="mt-3 font-display text-2xl md:text-3xl">Choose shipping</h1>

        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-3">
            {shippingMethods.map((m) => (
              <label key={m.name} className={`block rounded-2xl border-2 p-4 cursor-pointer transition-colors ${method === m.name ? "border-primary bg-primary/5" : "hover:border-primary/40"}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="method" checked={method === m.name} onChange={() => setMethod(m.name)} className="accent-primary" />
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-xs font-bold">{m.carrier.slice(0, 3).toUpperCase()}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{m.name} <span className="text-xs text-muted-foreground">· {m.carrier}</span></div>
                    <div className="text-xs text-muted-foreground">{m.eta}</div>
                  </div>
                  <div className="font-display text-lg">${m.price.toFixed(2)}</div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[10px] uppercase text-muted-foreground w-12">Speed</span>
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${m.speed}%` }} />
                  </div>
                </div>
              </label>
            ))}

            <div className="rounded-2xl border bg-card p-5 mt-2">
              <h3 className="font-display text-lg">Add-ons</h3>
              <div className="mt-3 space-y-3">
                <Toggle label="Shipping insurance" sub="+$2.50" value={insurance} onChange={setInsurance} />
                <Toggle label="Fragile protection" sub="+$1.00" value={fragile} onChange={setFragile} />
                <Toggle label="Remove original packaging" sub="Free" value={false} onChange={() => {}} />
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-5">
              <h3 className="font-display text-lg flex items-center gap-2">Customs declaration <Info className="h-4 w-4 text-muted-foreground" /></h3>
              <div className="grid md:grid-cols-2 gap-3 mt-3">
                <Field label="Category">
                  <select className="w-full rounded-lg border px-3 py-2 text-sm bg-background"><option>Electronics</option><option>Clothing</option><option>Accessories</option></select>
                </Field>
                <Field label="Declared value (USD)"><input type="number" defaultValue={42} className="w-full rounded-lg border px-3 py-2 text-sm" /></Field>
                <div className="md:col-span-2">
                  <Field label="Description"><input defaultValue="Personal use — Bluetooth earbuds" className="w-full rounded-lg border px-3 py-2 text-sm" /></Field>
                </div>
              </div>
            </div>
          </div>

          {/* Summary *}
          <aside className="lg:sticky lg:top-20 lg:self-start rounded-2xl border bg-card p-5 shadow-card">
            <h3 className="font-display text-lg">Order summary</h3>
            <div className="mt-4 space-y-2 text-sm">
              <Row label={`${selected.name} (${selected.carrier})`} value={`$${selected.price.toFixed(2)}`} />
              {insurance && <Row label="Insurance" value="$2.50" />}
              {fragile && <Row label="Fragile protection" value="$1.00" />}
              <div className="border-t pt-3 mt-3 flex justify-between font-display text-xl">
                <span>Total</span><span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
            <Link to="/tracking/$id" params={{ id: "AJ-10277" }} className="mt-5 block text-center w-full rounded-full bg-primary text-primary-foreground py-3 font-medium hover:bg-primary-deep">Confirm & Pay</Link>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}

function Toggle({ label, sub, value, onChange }: { label: string; sub: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!value)} className="w-full flex items-center justify-between gap-3 text-left">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
      <div className={`h-6 w-11 rounded-full transition-colors relative ${value ? "bg-primary" : "bg-muted"}`}>
        <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${value ? "translate-x-5" : "translate-x-0.5"}`} />
      </div>
    </button>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span><div className="mt-1">{children}</div></label>;
}
function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{label}</span><span className="font-medium">{value}</span></div>;
}*/
