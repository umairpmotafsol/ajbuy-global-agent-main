import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/ajbuy/AdminShell";
import { StatusBadge } from "@/components/ajbuy/StatusBadge";
import { adminQuotations } from "@/lib/mock-data";
import { Search, Plus, Send, Ban, FileText } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/quotations")({ component: AdminQuotations });

const tabs = ["All", "Draft", "Sent", "Accepted", "Expired", "Rejected"];

type Quotation = (typeof adminQuotations)[number];

function AdminQuotations() {
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string>(adminQuotations[0].id);

  const filtered = adminQuotations.filter((q) => {
    const matchTab = tab === "All" || q.status === tab;
    const matchSearch =
      !search ||
      q.id.includes(search) ||
      q.customer.toLowerCase().includes(search.toLowerCase()) ||
      q.requestId.includes(search);
    return matchTab && matchSearch;
  });

  const detail = adminQuotations.find((q) => q.id === selected);

  return (
    <AdminShell>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="font-display text-2xl md:text-3xl">Quotations</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and track all customer quotations.</p>
        </div>
        <button className="rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium inline-flex items-center gap-2 hover:bg-primary-deep">
          <Plus className="h-4 w-4" /> New Quotation
        </button>
      </div>

      <div className="mt-5 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by quote ID, customer, or request…"
          className="w-full rounded-full border pl-9 pr-3 py-2 text-sm bg-background focus:outline-none focus:border-primary"
        />
      </div>

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
        <div className="lg:col-span-2 rounded-2xl border bg-card shadow-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="text-left p-3">Quote</th>
                <th className="text-left p-3 hidden sm:table-cell">Customer</th>
                <th className="text-left p-3">Status</th>
                <th className="text-right p-3">Amount</th>
                <th className="text-right p-3 hidden md:table-cell">Expires</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((q) => (
                <tr
                  key={q.id}
                  onClick={() => setSelected(q.id)}
                  className={`cursor-pointer hover:bg-muted/30 ${selected === q.id ? "bg-primary/5" : ""}`}
                >
                  <td className="p-3">
                    <div className="font-mono text-xs">{q.id}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{q.requestId}</div>
                    <div className="text-xs text-muted-foreground sm:hidden">{q.customer}</div>
                  </td>
                  <td className="p-3 hidden sm:table-cell">{q.customer}</td>
                  <td className="p-3">
                    <StatusBadge status={q.status} />
                  </td>
                  <td className="p-3 text-right font-medium">${q.amount.toFixed(2)}</td>
                  <td className="p-3 text-right text-muted-foreground text-xs hidden md:table-cell">{q.expires}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-12 text-center text-sm text-muted-foreground">No quotations found.</div>
          )}
        </div>

        <aside className="rounded-2xl border bg-card shadow-card p-5">
          {detail ? (
            <QuoteDetail quote={detail} />
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground text-sm">
              Select a quotation to view details
            </div>
          )}
        </aside>
      </div>
    </AdminShell>
  );
}

function QuoteDetail({ quote }: Readonly<{ quote: Quotation }>) {
  const fee = +(quote.amount * (0.12 / 1.12)).toFixed(2);
  const shipping = 12.5;
  const productCost = +(quote.amount - fee - shipping).toFixed(2);

  return (
    <div>
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-mono text-xs text-muted-foreground">{quote.id}</div>
          <div className="font-display text-lg mt-0.5">{quote.customer}</div>
        </div>
        <StatusBadge status={quote.status} />
      </div>

      <div className="mt-4 text-sm space-y-1.5">
        <DetailRow label="Request" value={quote.requestId} />
        <DetailRow label="Product" value={quote.product} />
        <DetailRow label="Created" value={quote.created} />
        <DetailRow label="Expires" value={quote.expires} />
      </div>

      <div className="mt-4 rounded-xl bg-muted/40 p-3 text-sm space-y-1.5">
        <div className="flex justify-between text-muted-foreground">
          <span>Product cost</span>
          <span>${productCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Service fee (12%)</span>
          <span>${fee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-display text-base border-t pt-2 mt-1">
          <span>Total</span>
          <span className="text-primary">${quote.amount.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {(quote.status === "Draft" || quote.status === "Expired") && (
          <button className="w-full rounded-full bg-primary text-primary-foreground py-2.5 text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-primary-deep">
            <Send className="h-4 w-4" />
            {quote.status === "Draft" ? "Send to Customer" : "Resend Quotation"}
          </button>
        )}
        {quote.status === "Sent" && (
          <button className="w-full rounded-full bg-primary text-primary-foreground py-2.5 text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-primary-deep">
            <Send className="h-4 w-4" /> Resend Reminder
          </button>
        )}
        <Link
          to="/admin/requests"
          className="w-full rounded-full border py-2.5 text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-muted"
        >
          <FileText className="h-4 w-4" /> View Original Request
        </Link>
        {(quote.status === "Draft" || quote.status === "Sent") && (
          <button className="w-full rounded-full border border-red-200 text-red-600 py-2.5 text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-red-50">
            <Ban className="h-4 w-4" /> Void Quotation
          </button>
        )}
      </div>
    </div>
  );
}

function DetailRow({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
