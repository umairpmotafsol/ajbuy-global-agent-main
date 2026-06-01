import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/ajbuy/AppShell";
import {
  ChevronLeft, Camera, Play, AlertTriangle, Check,
  RefreshCw, ArrowLeftRight, X, ZoomIn, CheckCircle2,
  XCircle, MinusCircle, ImagePlus, RotateCcw,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/warehouse/$id/qc")({ component: QCReview });

type Result = "pass" | "minor" | "fail";
type Severity = "minor" | "major";
type ActionType = "photos" | "reinspect" | "replace" | "return";

const inspectionItems: { label: string; result: Result }[] = [
  { label: "Product matches description",   result: "pass" },
  { label: "Correct quantity",              result: "pass" },
  { label: "No physical damage to product", result: "pass" },
  { label: "Functionality test",            result: "pass" },
  { label: "Original packaging intact",     result: "minor" },
  { label: "All accessories included",      result: "pass" },
  { label: "Serial number visible",         result: "pass" },
  { label: "Manufacturer date stamp",       result: "pass" },
];

const defects: { id: string; severity: Severity; location: string; description: string; photoId: string }[] = [
  {
    id: "D-1",
    severity: "minor",
    location: "Outer box — top corner",
    description: "Minor scuff mark on the top-right corner of the outer packaging. Product inside is fully unaffected.",
    photoId: "ph-2",
  },
];

const photos = ["ph-1","ph-2","ph-3","ph-4","ph-5","ph-6"];

type OverallStatus = "passed" | "minor" | "failed";

function getOverallStatus(defs: typeof defects): OverallStatus {
  if (defs.some((d) => d.severity === "major")) return "failed";
  if (defs.some((d) => d.severity === "minor")) return "minor";
  return "passed";
}

function statusBannerClasses(status: OverallStatus) {
  if (status === "passed") return "bg-green-50 border border-green-200";
  if (status === "minor")  return "bg-amber-50 border border-amber-200";
  return "bg-red-50 border border-red-200";
}

function statusTextClasses(status: OverallStatus) {
  if (status === "passed") return "text-green-900";
  if (status === "minor")  return "text-amber-900";
  return "text-red-900";
}

function statusSubTextClasses(status: OverallStatus) {
  if (status === "passed") return "text-green-700";
  if (status === "minor")  return "text-amber-700";
  return "text-red-700";
}

function statusMessage(status: OverallStatus, count: number) {
  if (status === "passed") return "All checks passed — ready to ship";
  if (status === "minor")  return `${count} minor issue${count > 1 ? "s" : ""} found — product unaffected`;
  return "Critical issues found — action required";
}

function resultIcon(result: Result) {
  if (result === "pass")  return <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />;
  if (result === "minor") return <MinusCircle  className="h-4 w-4 text-amber-500 shrink-0" />;
  return <XCircle className="h-4 w-4 text-red-500 shrink-0" />;
}

function resultBadgeClasses(result: Result) {
  if (result === "pass")  return "bg-green-100 text-green-700";
  if (result === "minor") return "bg-amber-100 text-amber-700";
  return "bg-red-100 text-red-700";
}

function resultLabel(result: Result) {
  if (result === "pass")  return "Pass";
  if (result === "minor") return "Minor";
  return "Fail";
}

function defectBannerClasses(severity: Severity) {
  return severity === "minor"
    ? "bg-amber-50 border border-amber-200"
    : "bg-red-50 border border-red-200";
}

function defectBadgeClasses(severity: Severity) {
  return severity === "minor"
    ? "bg-amber-200 text-amber-800"
    : "bg-red-200 text-red-800";
}

function defectTextClasses(severity: Severity) {
  return severity === "minor" ? "text-amber-800" : "text-red-800";
}

function actionLabel(type: ActionType) {
  if (type === "photos")    return "Request More Photos";
  if (type === "reinspect") return "Request Re-inspection";
  if (type === "replace")   return "Request Replacement";
  return "Return Item";
}

function actionPromptLabel(type: ActionType) {
  if (type === "photos")    return "What would you like photos of?";
  if (type === "reinspect") return "Why are you requesting re-inspection?";
  if (type === "replace")   return "Reason for replacement request";
  return "Reason for return";
}

// ── Sub-components ──────────────────────────────────────────────────────────

function statusIcon(status: OverallStatus) {
  if (status === "passed") return CheckCircle2;
  if (status === "minor")  return AlertTriangle;
  return XCircle;
}

function statusIconClass(status: OverallStatus) {
  if (status === "passed") return "text-green-600";
  if (status === "minor")  return "text-amber-600";
  return "text-red-600";
}

function StatusBanner({ status, defectCount }: Readonly<{ status: OverallStatus; defectCount: number }>) {
  const Icon = statusIcon(status);
  const iconClass = statusIconClass(status);
  return (
    <div className={`rounded-2xl p-4 flex items-start gap-3 ${statusBannerClasses(status)}`}>
      <Icon className={`h-5 w-5 shrink-0 ${iconClass}`} />
      <div>
        <div className={`font-semibold text-sm ${statusTextClasses(status)}`}>{statusMessage(status, defectCount)}</div>
        <div className={`text-xs mt-0.5 ${statusSubTextClasses(status)}`}>
          Inspected by AJBuy QC team · {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

function PhotoGallery({ onLightbox }: Readonly<{ onLightbox: (id: string) => void }>) {
  return (
    <div className="rounded-2xl border bg-card shadow-card p-5 space-y-4">
      <h2 className="font-display text-lg">Inspection Photos</h2>
      <div className="grid grid-cols-3 gap-2">
        {photos.map((ph) => (
          <button key={ph} type="button" onClick={() => onLightbox(ph)}
            className="aspect-square bg-muted rounded-xl flex items-center justify-center hover:bg-muted/70 transition-colors group relative overflow-hidden">
            <Camera className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-xl flex items-center justify-center">
              <ZoomIn className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
            {defects.some((d) => d.photoId === ph) && (
              <span className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-amber-500 flex items-center justify-center text-white text-[9px] font-bold">!</span>
            )}
          </button>
        ))}
      </div>
      <button type="button" className="w-full rounded-xl border bg-muted/30 p-4 inline-flex items-center justify-center gap-3 text-sm hover:bg-muted transition-colors">
        <span className="h-9 w-9 rounded-full bg-primary/10 text-primary inline-flex items-center justify-center">
          <Play className="h-4 w-4 fill-primary" />
        </span>
        <span className="text-left">
          <span className="block font-medium">Play inspection video</span>
          <span className="block text-xs text-muted-foreground">Duration: 0:42 · Recorded by inspector</span>
        </span>
      </button>
    </div>
  );
}

function Checklist() {
  return (
    <div className="rounded-2xl border bg-card shadow-card p-5 space-y-3">
      <h2 className="font-display text-lg">Inspection Checklist</h2>
      <div className="space-y-2">
        {inspectionItems.map((item) => (
          <div key={item.label} className="flex items-center gap-3 py-2 border-b last:border-0">
            {resultIcon(item.result)}
            <span className="text-sm flex-1">{item.label}</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${resultBadgeClasses(item.result)}`}>
              {resultLabel(item.result)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DefectNotes() {
  return (
    <div className="rounded-2xl border bg-card shadow-card p-5 space-y-3">
      <h2 className="font-display text-lg">Inspector Notes</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Product matches reference image and order description. Functionality tested — pairing successful and audio quality confirmed good. Manufacturer date stamp is clearly visible. Quantity correct.
      </p>
      {defects.length > 0 && (
        <div className="space-y-3 mt-1">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Defects Noted</div>
          {defects.map((d) => (
            <div key={d.id} className={`rounded-xl p-4 space-y-1.5 ${defectBannerClasses(d.severity)}`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${defectBadgeClasses(d.severity)}`}>
                  {d.severity === "minor" ? "Minor" : "Major"} defect
                </span>
                <span className="text-xs text-muted-foreground">{d.location}</span>
              </div>
              <p className={`text-sm ${defectTextClasses(d.severity)}`}>{d.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ActionModal({
  action, reason, onReasonChange, onClose, onSubmit,
}: Readonly<{
  action: ActionType; reason: string;
  onReasonChange: (v: string) => void;
  onClose: () => void; onSubmit: () => void;
}>) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button type="button" className="absolute inset-0 bg-black/50" onClick={onClose} aria-label="Close modal" />
      <div className="relative bg-background rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg">{actionLabel(action)}</h3>
          <button type="button" onClick={onClose} className="h-8 w-8 rounded-full hover:bg-muted inline-flex items-center justify-center">
            <X className="h-4 w-4" />
          </button>
        </div>
        <label className="block text-sm">
          <span className="text-muted-foreground text-xs uppercase tracking-wider">{actionPromptLabel(action)}</span>
          <textarea value={reason} onChange={(e) => onReasonChange(e.target.value)} rows={4}
            placeholder="Please describe your concern in detail..."
            className="mt-1 w-full rounded-xl border px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary resize-none" />
        </label>
        <div className="flex gap-3">
          <button type="button" onClick={onClose}
            className="flex-1 rounded-full border py-2.5 text-sm hover:bg-muted transition-colors">Cancel</button>
          <button type="button" onClick={onSubmit} disabled={!reason.trim()}
            className="flex-1 rounded-full bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:bg-primary-deep transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

function QCReview() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [action, setAction] = useState<ActionType | null>(null);
  const [reason, setReason] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const overallStatus = getOverallStatus(defects);

  function submitAction() {
    const isApprove = action === null;
    setAction(null);
    setReason("");
    setConfirmed(true);
    if (isApprove) setTimeout(() => void navigate({ to: "/shipping/$id", params: { id } }), 1500);
  }

  function handleApprove() {
    setConfirmed(true);
    setTimeout(() => void navigate({ to: "/shipping/$id", params: { id } }), 1500);
  }

  if (confirmed) {
    return (
      <AppShell>
        <div className="p-4 md:p-6 max-w-2xl">
          <div className="rounded-2xl border bg-card p-12 flex flex-col items-center gap-4 text-center">
            <CheckCircle2 className="h-14 w-14 text-green-500" />
            <div>
              <p className="font-display text-xl">Action submitted</p>
              <p className="text-sm text-muted-foreground mt-1">Our team has been notified and will process your request.</p>
            </div>
            <Link to="/warehouse" className="rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium hover:bg-primary-deep">
              Back to Warehouse
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-3xl space-y-5">
        <Link to="/warehouse" className="text-sm text-muted-foreground inline-flex items-center gap-1 hover:text-primary">
          <ChevronLeft className="h-4 w-4" /> Back to Warehouse
        </Link>

        <div>
          <h1 className="font-display text-2xl md:text-3xl">QC Report — {id}</h1>
          <p className="text-sm text-muted-foreground mt-1">Review inspection results, photos, and approve or request action.</p>
        </div>

        <StatusBanner status={overallStatus} defectCount={defects.length} />
        <PhotoGallery onLightbox={setLightbox} />
        <Checklist />
        <DefectNotes />

        {/* Action buttons */}
        <div className="rounded-2xl border bg-card shadow-card p-5 space-y-3">
          <h2 className="font-display text-lg">Your Decision</h2>
          <p className="text-sm text-muted-foreground">Choose how to proceed with this package.</p>
          <div className="grid sm:grid-cols-2 gap-2">
            <button type="button" onClick={handleApprove}
              className="rounded-full bg-green-600 text-white py-3 font-medium hover:bg-green-700 inline-flex items-center justify-center gap-2 transition-colors">
              <Check className="h-4 w-4" /> Approve & Proceed to Shipping
            </button>
            <button type="button" onClick={() => setAction("photos")}
              className="rounded-full border-2 py-3 font-medium hover:bg-muted inline-flex items-center justify-center gap-2 transition-colors">
              <ImagePlus className="h-4 w-4" /> Request More Photos
            </button>
            <button type="button" onClick={() => setAction("reinspect")}
              className="rounded-full border-2 py-3 font-medium hover:bg-muted inline-flex items-center justify-center gap-2 transition-colors">
              <RefreshCw className="h-4 w-4" /> Request Re-inspection
            </button>
            <button type="button" onClick={() => setAction("replace")}
              className="rounded-full border-2 py-3 font-medium hover:bg-muted inline-flex items-center justify-center gap-2 transition-colors">
              <RotateCcw className="h-4 w-4" /> Request Replacement
            </button>
            <button type="button" onClick={() => setAction("return")}
              className="sm:col-span-2 rounded-full border-2 border-red-300 text-red-600 py-3 font-medium hover:bg-red-50 inline-flex items-center justify-center gap-2 transition-colors">
              <ArrowLeftRight className="h-4 w-4" /> Return Item
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button type="button" onClick={() => setLightbox(null)} aria-label="Close"
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 text-white inline-flex items-center justify-center hover:bg-white/20">
            <X className="h-5 w-5" />
          </button>
          <div className="bg-muted rounded-2xl w-full max-w-lg aspect-square flex items-center justify-center">
            <Camera className="h-16 w-16 text-muted-foreground" />
          </div>
        </div>
      )}

      {/* Action modal */}
      {action && (
        <ActionModal
          action={action}
          reason={reason}
          onReasonChange={setReason}
          onClose={() => { setAction(null); setReason(""); }}
          onSubmit={submitAction}
        />
      )}
    </AppShell>
  );
}
