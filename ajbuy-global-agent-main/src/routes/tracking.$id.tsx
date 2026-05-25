/*import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/ajbuy/AppShell";
import { trackingEvents } from "@/lib/mock-data";
import { ChevronLeft, Copy, Share2, Check } from "lucide-react";

export const Route = createFileRoute("/tracking/$id")({ component: Tracking });

const steps = [
  { label: "Order Placed", done: true, time: "May 12, 09:00" },
  { label: "Purchased from Supplier", done: true, time: "May 13, 14:30" },
  { label: "Arrived at AJBuy Warehouse", done: true, time: "May 15, 16:00" },
  { label: "QC Completed", done: true, time: "May 16, 10:20" },
  { label: "Shipped", done: true, active: true, time: "May 17, 22:45" },
  { label: "In Transit", done: false, time: "Expected May 19" },
  { label: "Delivered", done: false, time: "Expected May 22" },
];

function Tracking() {
  const { id } = Route.useParams();
  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-3xl">
        <Link to="/requests" className="text-sm text-muted-foreground inline-flex items-center gap-1 hover:text-primary"><ChevronLeft className="h-4 w-4" /> Back</Link>

        <div className="mt-3 rounded-2xl border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h1 className="font-display text-2xl">{id}</h1>
              <div className="text-xs text-muted-foreground mt-1">Tracking · DHL Express</div>
            </div>
            <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">Est. delivery May 22</span>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-muted p-3 text-sm font-mono">
            <span className="flex-1">DHL-9384-2941-AJB</span>
            <button className="h-7 w-7 rounded-full hover:bg-background inline-flex items-center justify-center"><Copy className="h-3.5 w-3.5" /></button>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border bg-card p-5 shadow-card">
          <h2 className="font-display text-lg mb-4">Progress</h2>
          <div className="relative">
            <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-muted" />
            <ul className="space-y-5">
              {steps.map((s, i) => (
                <li key={i} className="flex gap-4 items-start relative">
                  <div className={`h-7 w-7 rounded-full shrink-0 flex items-center justify-center text-xs z-10 ${s.done ? "bg-primary text-primary-foreground" : "bg-muted border-2 border-background text-muted-foreground"} ${s.active ? "ring-4 ring-primary/20 animate-pulse" : ""}`}>
                    {s.done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${s.done ? "" : "text-muted-foreground"}`}>{s.label}</div>
                    <div className="text-xs text-muted-foreground">{s.time}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border bg-card p-5 shadow-card">
          <h2 className="font-display text-lg mb-3">Tracking events</h2>
          <ul className="divide-y">
            {trackingEvents.map((e, i) => (
              <li key={i} className="py-3 flex gap-4">
                <div className="text-xs text-muted-foreground w-28 shrink-0">{e.time}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{e.text}</div>
                  <div className="text-xs text-muted-foreground">{e.location}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button className="mt-6 w-full rounded-full border-2 border-primary text-primary py-3 font-medium hover:bg-primary/5 inline-flex items-center justify-center gap-2">
          <Share2 className="h-4 w-4" /> Share tracking link
        </button>
      </div>
    </AppShell>
  );
}*/
