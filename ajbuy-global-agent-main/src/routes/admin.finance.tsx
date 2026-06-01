import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ajbuy/AdminShell";
import { transactions } from "@/lib/mock-data";
import { useState } from "react";

export const Route = createFileRoute("/admin/finance")({ component: AdminFinance });

const tabs = ["Transactions", "Wallet Adjustments", "Refunds"];

function AdminFinance() {
  const [tab, setTab] = useState("Transactions");
  return (
    <AdminShell>
      <h1 className="font-display text-2xl md:text-3xl">Finance</h1>

      <div className="mt-5 flex gap-2 overflow-x-auto scrollbar-hide">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`shrink-0 px-3.5 py-1.5 rounded-full text-sm border ${tab === t ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"}`}>{t}</button>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border bg-card shadow-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="text-left p-3">Description</th>
              <th className="text-left p-3 hidden sm:table-cell">Customer</th>
              <th className="text-left p-3 hidden md:table-cell">Date</th>
              <th className="text-right p-3">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {transactions.map((t) => (
              <tr key={t.id} className="hover:bg-muted/30">
                <td className="p-3">
                  <div>{t.desc}</div>
                  <div className="text-xs text-muted-foreground md:hidden">{t.date}</div>
                </td>
                <td className="p-3 hidden sm:table-cell text-muted-foreground">Ahmed Al-Rashidi</td>
                <td className="p-3 hidden md:table-cell text-muted-foreground">{t.date}</td>
                <td className={`p-3 text-right font-medium ${t.amount > 0 ? "text-green-700" : "text-red-700"}`}>
                  {t.amount > 0 ? "+" : ""}${Math.abs(t.amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
