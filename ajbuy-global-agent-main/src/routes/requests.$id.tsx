import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/ajbuy/AppShell";
import { ProductPlaceholder } from "@/components/ajbuy/ProductPlaceholder";
import { ChevronLeft, Check, X, RefreshCw, Wallet, CreditCard, Clock } from "lucide-react";
import { user } from "@/lib/mock-data";

export const Route = createFileRoute("/requests/$id")({ component: QuoteDetail });

function QuoteDetail() {
  const { id } = Route.useParams();
  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-3xl">
        <Link to="/requests" className="text-sm text-muted-foreground inline-flex items-center gap-1 hover:text-primary"><ChevronLeft className="h-4 w-4" /> Back</Link>
        <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
          <h1 className="font-display text-2xl md:text-3xl">Quotation #QT-00341</h1>
          <span className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full"><Clock className="h-3 w-3" /> Valid for 47:23</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">For request {id}</div>

        <div className="mt-6 rounded-2xl border bg-card shadow-card overflow-hidden">
          <div className="p-5 flex gap-4 border-b">
            <ProductPlaceholder className="h-20 w-20 shrink-0" />
            <div className="min-w-0">
              <div className="font-display text-lg leading-snug">Wireless Earbuds Pro</div>
              <div className="text-xs text-muted-foreground">Color: Black · Size: Standard · Qty 2</div>
              <div className="text-sm mt-2 text-muted-foreground">Sourced from <span className="text-foreground font-medium">Shenzhen Audio Co.</span></div>
            </div>
          </div>

          <div className="divide-y">
            {[
              { label: "Product cost", value: 42.0, actions: true },
              { label: "AJBuy service fee (12%)", value: 5.0 },
              { label: "Estimated shipping — Air", value: 12.5 },
            ].map((line, i) => (
              <div key={i} className="flex items-center gap-3 p-4">
                <input type="checkbox" defaultChecked className="accent-primary" />
                <div className="flex-1">
                  <div className="text-sm font-medium">{line.label}</div>
                </div>
                <div className="text-sm font-medium">${line.value.toFixed(2)}</div>
                {line.actions && (
                  <div className="flex gap-1">
                    <button title="Approve" className="h-8 w-8 rounded-full border inline-flex items-center justify-center text-green-600 hover:bg-green-50"><Check className="h-4 w-4" /></button>
                    <button title="Exchange" className="h-8 w-8 rounded-full border inline-flex items-center justify-center text-amber-600 hover:bg-amber-50"><RefreshCw className="h-4 w-4" /></button>
                    <button title="Reject" className="h-8 w-8 rounded-full border inline-flex items-center justify-center text-red-600 hover:bg-red-50"><X className="h-4 w-4" /></button>
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center justify-between p-4 bg-muted/30">
              <span className="font-display text-lg">Total</span>
              <span className="font-display text-2xl text-primary">$59.50</span>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border bg-muted/30 p-4 text-sm">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Note from admin</div>
          We confirmed stock and color match the reference image. Production lead time is 2 days before dispatch to our warehouse.
        </div>

        <div className="mt-6 rounded-2xl border bg-card p-5 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Wallet balance</div>
              <div className="font-display text-xl">${user.wallet.toFixed(2)} <span className="text-xs font-sans text-muted-foreground">available</span></div>
            </div>
            <Link to="/wallet" className="text-xs text-primary hover:underline">Top up</Link>
          </div>
          <button className="w-full rounded-full bg-green-600 text-white py-3 font-medium hover:bg-green-700 inline-flex items-center justify-center gap-2">
            <Wallet className="h-4 w-4" /> Pay $59.50 from wallet
          </button>
          <button className="w-full rounded-full border-2 border-primary text-primary py-3 font-medium hover:bg-primary/5 inline-flex items-center justify-center gap-2">
            <CreditCard className="h-4 w-4" /> Pay by card (Stripe)
          </button>
        </div>
      </div>
    </AppShell>
  );
}