import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/ajbuy/AppShell";
import { OrderStepper } from "@/components/ajbuy/OrderStepper";
import { user } from "@/lib/mock-data";
import { useEffect, useState } from "react";
import { RefreshCw, ChevronRight, Zap, CheckCircle2 } from "lucide-react";

type PaymentSearch = { orderId?: string; amount?: number };

export const Route = createFileRoute("/payment")({
  validateSearch: (s: Record<string, unknown>): PaymentSearch => ({
    orderId: typeof s.orderId === "string" ? s.orderId : `D${Date.now()}`,
    amount: typeof s.amount === "number" ? s.amount : 0,
  }),
  component: PaymentPage,
});

const CURRENCIES = ["AUD","BRL","CAD","CHF","CNY","DKK","EUR","GBP","GHS","JPY","KRW","MXN","NOK","NZD","PLN","RUB","SEK","USD"];

const CARD_BRANDS = [
  { name: "VISA",     bg: "bg-blue-700",   text: "text-white",       label: "VISA" },
  { name: "MC",       bg: "bg-red-600",    text: "text-white",       label: "MC" },
  { name: "AMEX",     bg: "bg-blue-500",   text: "text-white",       label: "AMEX" },
  { name: "DISCOVER", bg: "bg-orange-500", text: "text-white",       label: "DISC" },
  { name: "JCB",      bg: "bg-green-600",  text: "text-white",       label: "JCB" },
  { name: "DINERS",   bg: "bg-gray-600",   text: "text-white",       label: "DINERS" },
];

const TOTAL_SECONDS = 75 * 60;

function useCountdown(seconds: number) {
  const [remaining, setRemaining] = useState(seconds);
  useEffect(() => {
    if (remaining <= 0) return;
    const id = setInterval(() => setRemaining((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [remaining]);
  const h = Math.floor(remaining / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;
  const fmt = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${fmt(h)}:${fmt(m)}:${fmt(s)}` : `${fmt(m)}:${fmt(s)}`;
}

function PaymentPage() {
  const { orderId, amount } = Route.useSearch();

  const countdown = useCountdown(TOTAL_SECONDS);

  const [currency, setCurrency] = useState("USD");
  const [payMethod, setPayMethod] = useState<"balance" | "card" | null>(null);
  const [paid, setPaid] = useState(false);

  function confirmPayment() {
    if (!payMethod) return;
    setPaid(true);
  }

  if (paid) {
    return (
      <AppShell>
        <div className="p-4 md:p-6 max-w-5xl space-y-5">
          <OrderStepper activeStep={2} />
          <div className="rounded-2xl border bg-card shadow-card flex flex-col items-center justify-center py-20 gap-6 text-center px-6">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <div>
              <p className="font-display text-2xl font-bold">Payment Successful!</p>
              <p className="text-sm text-muted-foreground mt-1">Your order has been placed. We'll start processing it shortly.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/warehouse" className="rounded-full bg-primary text-primary-foreground px-8 py-3 text-sm font-medium hover:bg-primary-deep transition-colors">
                Inspection &amp; Warehousing →
              </Link>
              <Link to="/warehouse/WH-4421/qc" className="rounded-full border-2 border-primary text-primary px-8 py-3 text-sm font-medium hover:bg-primary/5 transition-colors">
                View QC Report
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/shipping/consol-1" className="rounded-full border px-8 py-3 text-sm font-medium hover:bg-muted transition-colors">
                Submit Parcels &amp; Pay Shipping
              </Link>
              <Link to="/tracking/AJ-10277" className="rounded-full border px-8 py-3 text-sm font-medium hover:bg-muted transition-colors">
                Wait for Receipt / Track
              </Link>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-5xl space-y-5">
        <div>
          <h1 className="font-display text-2xl md:text-3xl">Payment</h1>
          <p className="text-sm mt-1">
            Order submitted successfully! Please complete payment within{" "}
            <span className="text-primary font-semibold">{countdown}</span>
            {" "}or it will be canceled.
          </p>
        </div>

        <OrderStepper activeStep={2} />

        <div className="grid lg:grid-cols-[1fr_320px] gap-5">
          {/* ── Left ── */}
          <div className="space-y-4">

            {/* Select currency */}
            <div className="rounded-2xl border bg-card shadow-card p-5 space-y-4">
              <div>
                <h2 className="font-display text-lg">Select Currency</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Payment channels that support this currency</p>
              </div>

              {/* Dropdown */}
              <div className="relative">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full appearance-none rounded-full border border-border bg-background px-5 py-3.5 text-sm font-medium text-foreground focus:outline-none focus:border-primary cursor-pointer shadow-sm hover:border-primary/50 transition-colors"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Balance */}
            <label className={`flex items-start gap-4 rounded-2xl border-2 bg-card shadow-card p-5 cursor-pointer transition-colors ${payMethod === "balance" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
              <input type="radio" name="paymethod" checked={payMethod === "balance"}
                onChange={() => setPayMethod("balance")} className="accent-primary mt-1 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <span className="text-sm font-bold">$</span>
                  </div>
                  <span className="font-medium text-sm flex items-center gap-1">
                    Balance <RefreshCw className="h-3.5 w-3.5 text-muted-foreground" />
                  </span>
                </div>
                <div className="font-display text-xl mt-1">${user.wallet.toFixed(2)}</div>
                <div className="text-sm text-amber-600 mt-1 flex items-center gap-1">
                  You can also top up before paying{" "}
                  <Link to="/wallet" className="text-primary font-medium inline-flex items-center gap-0.5 hover:underline">
                    Recharge <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </label>

            <p className="text-xs text-muted-foreground px-1">Unavailable payment methods hidden</p>

            {/* Online payment */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <Zap className="h-4 w-4 text-primary fill-primary" />
                <span className="font-medium text-sm">Online Payment</span>
              </div>

              <label className={`flex items-center gap-4 rounded-2xl border-2 bg-card shadow-card p-5 cursor-pointer transition-colors ${payMethod === "card" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                <input type="radio" name="paymethod" checked={payMethod === "card"}
                  onChange={() => setPayMethod("card")} className="accent-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium mb-2">Credit Cards / Debit Cards</div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {CARD_BRANDS.map((b) => (
                      <span key={b.name} className={`${b.bg} ${b.text} text-[9px] font-bold px-2 py-0.5 rounded`}>
                        {b.label}
                      </span>
                    ))}
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* ── Right: Payment details ── */}
          <aside className="rounded-2xl border bg-card shadow-card p-5 space-y-4 h-fit sticky top-20">
            <h2 className="font-display text-lg">Payment Details</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b pb-3">
                <span className="text-muted-foreground">Order No.</span>
                <span className="font-mono text-xs">{orderId}</span>
              </div>
              <div className="flex justify-between border-b pb-3">
                <span className="text-muted-foreground">Payment Methods</span>
                <span>{payMethod === "balance" ? "Wallet Balance" : payMethod === "card" ? "Credit Card" : "—"}</span>
              </div>
              <div className="flex justify-between border-b pb-3">
                <span className="text-muted-foreground">Status</span>
                <span className="text-amber-600 font-medium">Pending Payment</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-display text-lg text-primary">${(amount ?? 0).toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={confirmPayment}
              disabled={!payMethod}
              className="w-full rounded-full py-3 font-semibold text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-primary text-primary-foreground hover:bg-primary-deep"
            >
              Confirm payment
            </button>

            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              In case of problems such as unsuccessful payment or payment timeout,{" "}
              <Link to="/support" className="text-primary hover:underline">please contact Pay Service</Link>
            </p>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
