/*import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/ajbuy/AppShell";
import { referralEarnings, referralStats } from "@/lib/mock-data";
import { Copy, Share2, MessageCircle, Send } from "lucide-react";

export const Route = createFileRoute("/affiliate")({ component: Affiliate });

function Affiliate() {
  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-4xl space-y-6">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-primary-deep text-primary-foreground p-6 md:p-8 shadow-card-hover">
          <h1 className="font-display text-3xl md:text-4xl">Earn with AJBuy</h1>
          <p className="opacity-90 mt-2 text-sm">Get 5% commission on every order your friends place.</p>
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-white/15 backdrop-blur p-3 font-mono text-sm">
            <span className="flex-1 truncate">ajbuy.com/r/AHMED-AJ24</span>
            <button className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 inline-flex items-center justify-center"><Copy className="h-3.5 w-3.5" /></button>
          </div>
          <div className="mt-3 flex gap-2">
            <button className="rounded-full bg-white text-primary px-4 py-2 text-sm font-medium inline-flex items-center gap-2"><MessageCircle className="h-4 w-4" /> WhatsApp</button>
            <button className="rounded-full bg-white/15 hover:bg-white/25 px-4 py-2 text-sm font-medium inline-flex items-center gap-2"><Send className="h-4 w-4" /> Telegram</button>
            <button className="rounded-full bg-white/15 hover:bg-white/25 px-4 py-2 text-sm font-medium inline-flex items-center gap-2"><Share2 className="h-4 w-4" /> Share</button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="Total Clicks" value={referralStats.clicks} />
          <Stat label="Signups" value={referralStats.signups} />
          <Stat label="Conversions" value={referralStats.conversions} />
          <Stat label="Total Earned" value={`$${referralStats.earned.toFixed(2)}`} highlight />
        </div>

        <div className="rounded-2xl border bg-card shadow-card overflow-hidden">
          <div className="p-5 border-b flex items-center justify-between flex-wrap gap-2">
            <h2 className="font-display text-lg">Earnings</h2>
            <button className="rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary-deep">Request Payout ($34.50)</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="text-left p-3">Referral</th><th className="text-left p-3">Date</th>
                  <th className="text-right p-3">Order</th><th className="text-right p-3">Commission</th><th className="text-left p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {referralEarnings.map((e, i) => (
                  <tr key={i} className="hover:bg-muted/30">
                    <td className="p-3">{e.ref}</td>
                    <td className="p-3 text-muted-foreground">{e.date}</td>
                    <td className="p-3 text-right">${e.value.toFixed(2)}</td>
                    <td className="p-3 text-right font-medium text-green-700">${e.commission.toFixed(2)}</td>
                    <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full ${e.status === "Paid" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>{e.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Stat({ label, value, highlight }: { label: string; value: React.ReactNode; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl border p-4 ${highlight ? "bg-primary/5 border-primary/40" : "bg-card"}`}>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`font-display text-2xl mt-1 ${highlight ? "text-primary" : ""}`}>{value}</div>
    </div>
  );
}*/
