import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/ajbuy/AppShell";
import { ChevronLeft, Camera, Play, AlertTriangle, Check, RefreshCw, ArrowLeftRight } from "lucide-react";

export const Route = createFileRoute("/warehouse/$id/qc")({ component: QCReview });

function QCReview() {
  const { id } = Route.useParams();
  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-3xl">
        <Link to="/warehouse" className="text-sm text-muted-foreground inline-flex items-center gap-1 hover:text-primary"><ChevronLeft className="h-4 w-4" /> Back</Link>
        <h1 className="mt-3 font-display text-2xl md:text-3xl">QC Report — Package #{id}</h1>

        <div className="mt-4 rounded-2xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
          <div>
            <div className="font-medium text-amber-900">Minor issues found</div>
            <div className="text-sm text-amber-800/80">Inspector flagged 1 minor issue. Review and approve below.</div>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Photo evidence</div>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted/70 cursor-pointer">
                <Camera className="h-6 w-6" />
              </div>
            ))}
          </div>
          <button className="mt-3 w-full rounded-xl border bg-card p-3 inline-flex items-center justify-center gap-2 text-sm hover:bg-muted">
            <Play className="h-4 w-4 text-primary" /> Play inspection video (0:42)
          </button>
        </div>

        <div className="mt-6 rounded-2xl border bg-card p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Inspector notes</div>
          <p className="text-sm mt-2">
            Product matches reference. Function tested — pairing successful, audio quality good. Box has minor scuff on top corner; product itself unaffected. Manufacturer date stamp visible.
          </p>
          <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-3 text-sm">
            <div className="font-medium text-amber-900">1 defect noted</div>
            <div className="text-amber-800/80 text-xs mt-1">Minor scratch on packaging — product unaffected.</div>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <button className="w-full rounded-full bg-green-600 text-white py-3 font-medium hover:bg-green-700 inline-flex items-center justify-center gap-2"><Check className="h-4 w-4" /> Approve & Proceed to Shipping</button>
          <button className="w-full rounded-full border-2 py-3 font-medium hover:bg-muted inline-flex items-center justify-center gap-2"><RefreshCw className="h-4 w-4" /> Request Re-inspection</button>
          <button className="w-full rounded-full border-2 border-primary text-primary py-3 font-medium hover:bg-primary/5 inline-flex items-center justify-center gap-2"><ArrowLeftRight className="h-4 w-4" /> Return Item</button>
        </div>
      </div>
    </AppShell>
  );
}
