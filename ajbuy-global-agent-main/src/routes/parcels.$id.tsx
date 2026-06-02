import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/ajbuy/AppShell";
import { ChevronLeft, Copy, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/parcels/$id")({ component: ParcelDetail });

function ParcelDetail() {
  const { id } = Route.useParams();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("DHL-9384-2941-AJB");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-4xl">
        <Link to="/parcels" className="text-sm text-muted-foreground inline-flex items-center gap-1 hover:text-primary">
          <ChevronLeft className="h-4 w-4" /> Back to Parcels
        </Link>

        <div className="mt-6 rounded-2xl border bg-card shadow-card p-6 space-y-6">
          <div>
            <h1 className="font-display text-2xl md:text-3xl">{id}</h1>
            <p className="text-sm text-muted-foreground mt-1">Wireless Earbuds Bundle</p>
          </div>

          {/* Status banner */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-200">
            <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
            <div>
              <p className="font-medium text-green-900">Completed / Delivered</p>
              <p className="text-sm text-green-800">Your parcel was delivered on June 1, 2026</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase text-muted-foreground font-semibold">Tracking Number</p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-lg font-medium font-mono">DHL-9384-2941</p>
                  <button
                    onClick={copyToClipboard}
                    className="h-8 w-8 rounded-lg border inline-flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Copy className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
                {copied && <p className="text-xs text-green-600 mt-1">✓ Copied</p>}
              </div>
              <div>
                <p className="text-xs uppercase text-muted-foreground font-semibold">Carrier</p>
                <p className="text-lg font-medium mt-1">DHL Express</p>
              </div>
              <div>
                <p className="text-xs uppercase text-muted-foreground font-semibold">Weight</p>
                <p className="text-lg font-medium mt-1">0.5 kg</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase text-muted-foreground font-semibold">Order Date</p>
                <p className="text-lg font-medium mt-1">May 28, 2026</p>
              </div>
              <div>
                <p className="text-xs uppercase text-muted-foreground font-semibold">Delivery Date</p>
                <p className="text-lg font-medium mt-1">June 1, 2026</p>
              </div>
              <div>
                <p className="text-xs uppercase text-muted-foreground font-semibold">Total Amount</p>
                <p className="text-lg font-medium mt-1">$45.99</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="font-display text-lg mb-4">Tracking Timeline</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-8 w-8 rounded-full bg-green-100 border-2 border-green-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="w-0.5 h-12 bg-green-200 mt-2" />
                </div>
                <div className="py-1">
                  <p className="font-medium text-sm">Delivered</p>
                  <p className="text-xs text-muted-foreground">June 1, 2026 at 2:30 PM</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 border-2 border-blue-600 flex items-center justify-center shrink-0">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="w-0.5 h-12 bg-blue-200 mt-2" />
                </div>
                <div className="py-1">
                  <p className="font-medium text-sm">Out for Delivery</p>
                  <p className="text-xs text-muted-foreground">June 1, 2026 at 10:15 AM</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 border-2 border-blue-600 flex items-center justify-center shrink-0">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="w-0.5 h-12 bg-gray-200 mt-2" />
                </div>
                <div className="py-1">
                  <p className="font-medium text-sm">In Transit</p>
                  <p className="text-xs text-muted-foreground">May 30, 2026</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-gray-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="py-1">
                  <p className="font-medium text-sm">Shipped</p>
                  <p className="text-xs text-muted-foreground">May 28, 2026</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="font-display text-lg mb-4">Parcel Contents</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <div className="h-12 w-12 rounded bg-muted flex items-center justify-center text-xl">🎧</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">Wireless Earbuds</p>
                  <p className="text-sm text-muted-foreground">Qty: 2</p>
                </div>
                <p className="font-medium">$45.99</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
