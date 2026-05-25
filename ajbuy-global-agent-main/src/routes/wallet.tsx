/*import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/ajbuy/AppShell";
import { transactions, user } from "@/lib/mock-data";
import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Plus, ArrowLeftRight, ArrowDown } from "lucide-react";

export const Route = createFileRoute("/wallet")({ component: Wallet });

function Wallet() {
  const [showTopup, setShowTopup] = useState(false);
  const [tab, setTab] = useState("All");
  const filtered = transactions.filter((t) => tab === "All" || (tab === "Credits" && t.amount > 0) || (tab === "Debits" && t.amount < 0));

  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-3xl space-y-6">
        <h1 className="font-display text-2xl md:text-3xl">Wallet</h1>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-deep text-primary-foreground p-5 shadow-card-hover">
            <div className="text-xs uppercase tracking-wider opacity-80">Wallet</div>
            <div className="font-display text-3xl mt-1">${user.wallet.toFixed(2)}</div>
            <div className="text-xs opacity-80 mt-1">{user.currency} payouts available</div>
          </div>
          <div className="rounded-2xl border bg-card p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Bonus</div>
            <div className="font-display text-3xl mt-1">${user.bonus.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground mt-1">From referrals & promos</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Action icon={<Plus className="h-4 w-4" />} label="Top Up" onClick={() => setShowTopup(!showTopup)} primary />
          <Action icon={<ArrowLeftRight className="h-4 w-4" />} label="Transfer" />
          <Action icon={<ArrowDown className="h-4 w-4" />} label="Withdraw" />
        </div>

        {showTopup && (
          <div className="rounded-2xl border bg-card p-5 shadow-card space-y-4">
            <h3 className="font-display text-lg">Top up wallet</h3>
            <div className="grid grid-cols-4 gap-2">
              {[50, 100, 200, "Custom"].map((amt) => (
                <button key={amt} className="rounded-xl border-2 py-3 text-sm font-medium hover:border-primary hover:text-primary">${amt}</button>
              ))}
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Payment method</div>
              <div className="space-y-2">
                <label className="flex items-center gap-3 rounded-xl border-2 border-primary bg-primary/5 p-3 cursor-pointer">
                  <input type="radio" defaultChecked className="accent-primary" /> <span className="font-medium">Card (Stripe)</span>
                </label>
                <label className="flex items-center gap-3 rounded-xl border-2 p-3 cursor-pointer">
                  <input type="radio" name="m" className="accent-primary" /> <span className="font-medium">Bank Transfer</span>
                </label>
              </div>
            </div>
            <button className="w-full rounded-full bg-primary text-primary-foreground py-3 font-medium hover:bg-primary-deep">Proceed to Payment</button>
          </div>
        )}

        <div className="rounded-2xl border bg-card shadow-card">
          <div className="flex gap-2 p-4 border-b overflow-x-auto scrollbar-hide">
            {["All", "Credits", "Debits", "Refunds"].map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`px-3 py-1.5 rounded-full text-xs border ${tab === t ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"}`}>{t}</button>
            ))}
          </div>
          <ul className="divide-y">
            {filtered.map((t) => (
              <li key={t.id} className="flex items-center gap-3 p-4">
                <div className={`h-9 w-9 rounded-full inline-flex items-center justify-center ${t.amount > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {t.amount > 0 ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{t.desc}</div>
                  <div className="text-xs text-muted-foreground">{t.date}</div>
                </div>
                <div className={`font-medium ${t.amount > 0 ? "text-green-700" : "text-red-700"}`}>
                  {t.amount > 0 ? "+" : ""}${Math.abs(t.amount).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}

function Action({ icon, label, primary, onClick }: { icon: React.ReactNode; label: string; primary?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`rounded-2xl py-4 font-medium inline-flex flex-col items-center gap-1 text-sm ${primary ? "bg-primary text-primary-foreground hover:bg-primary-deep" : "border bg-card hover:bg-muted"}`}>
      {icon}{label}
    </button>
  );
}*/
