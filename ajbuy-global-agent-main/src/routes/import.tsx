import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/ajbuy/AppShell";
import { ProductPlaceholder } from "@/components/ajbuy/ProductPlaceholder";
import { Camera, Upload, Star, Minus, Plus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/import")({ component: ImportPage });

function ImportPage() {
  const [fetched, setFetched] = useState(false);
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState("Black");

  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-4xl space-y-6">
        <div>
          <h1 className="font-display text-2xl md:text-3xl">Import a product</h1>
          <p className="text-sm text-muted-foreground mt-1">Paste any Taobao or 1688 link and we'll source it for you.</p>
        </div>

        <div className="rounded-2xl border bg-card p-4 md:p-5 shadow-card">
          <div className="flex flex-col md:flex-row gap-2">
            <input
              placeholder="https://item.taobao.com/…"
              defaultValue="https://item.taobao.com/item.htm?id=684920293"
              className="flex-1 rounded-full border px-4 py-3 text-sm focus:outline-none focus:border-primary"
            />
            <button onClick={() => setFetched(true)} className="rounded-full bg-primary px-6 py-3 text-primary-foreground font-medium hover:bg-primary-deep">
              Fetch Product
            </button>
          </div>
          <div className="flex gap-2 mt-3">
            <span className="text-[10px] uppercase font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: "#FF4400", color: "white" }}>Taobao</span>
            <span className="text-[10px] uppercase font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: "#FE8E12", color: "white" }}>1688</span>
          </div>
        </div>

        {fetched && (
          <div className="rounded-2xl border bg-card overflow-hidden shadow-card">
            <div className="grid md:grid-cols-2">
              {/* Gallery */}
              <div className="p-4 bg-muted/30">
                <ProductPlaceholder className="aspect-square" />
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <ProductPlaceholder key={i} className="aspect-square" />
                  ))}
                </div>
              </div>
              {/* Info */}
              <div className="p-5 space-y-3">
                <h2 className="font-display text-xl leading-snug">无线蓝牙耳机 Pro</h2>
                <p className="text-sm text-muted-foreground -mt-2">Wireless Bluetooth Earbuds Pro</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">Shenzhen Audio Co.</span>
                  <span className="flex items-center gap-0.5 text-amber-500"><Star className="h-3 w-3 fill-current" /> 4.8</span>
                  <span className="text-muted-foreground">· Guangdong, CN</span>
                </div>
                <div className="font-display text-2xl text-primary">¥45.00 – ¥78.00 <span className="text-sm text-muted-foreground font-sans">(~$6.20–$10.80)</span></div>
                <span className="inline-block text-xs px-2 py-1 bg-muted rounded-full">MOQ: 1 piece</span>

                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Color</div>
                  <div className="flex gap-2">
                    {["Black", "White", "Beige"].map((c) => (
                      <button key={c} onClick={() => setColor(c)} className={`px-3 py-1.5 rounded-full text-xs border ${color === c ? "border-primary bg-primary/10 text-primary" : "hover:bg-muted"}`}>{c}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Size</div>
                  <select className="w-full rounded-lg border px-3 py-2 text-sm bg-background">
                    <option>Standard</option><option>Pro</option>
                  </select>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Quantity</div>
                  <div className="inline-flex items-center border rounded-full">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-9 w-9 inline-flex items-center justify-center hover:bg-muted rounded-full"><Minus className="h-3 w-3" /></button>
                    <span className="px-4 font-medium">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="h-9 w-9 inline-flex items-center justify-center hover:bg-muted rounded-full"><Plus className="h-3 w-3" /></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 border-t space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Notes for our sourcing team</label>
                <textarea rows={3} placeholder="Add special instructions or reference notes…" className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Reference images</label>
                <div className="mt-1 rounded-xl border-2 border-dashed p-6 text-center text-sm text-muted-foreground hover:border-primary hover:text-primary cursor-pointer">
                  <div className="flex justify-center gap-3 mb-2"><Upload className="h-5 w-5" /><Camera className="h-5 w-5" /></div>
                  Drag & drop or tap to upload
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="rounded-full border-2 border-primary text-primary py-3 font-medium hover:bg-primary/5">Save as Draft</button>
                <Link to="/requests" className="text-center rounded-full bg-primary text-primary-foreground py-3 font-medium hover:bg-primary-deep">Submit Request</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
