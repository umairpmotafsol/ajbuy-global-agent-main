const map: Record<string, string> = {
  "Pending Quote": "bg-amber-100 text-amber-800",
  "Awaiting Payment": "bg-blue-100 text-blue-800",
  Processing: "bg-purple-100 text-purple-800",
  Completed: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
  "In Warehouse": "bg-purple-100 text-purple-800",
  "QC Ready": "bg-amber-100 text-amber-800",
  Shipped: "bg-blue-100 text-blue-800",
  "Awaiting QC": "bg-amber-100 text-amber-800",
  "QC Complete": "bg-green-100 text-green-800",
  "Ready to Ship": "bg-blue-100 text-blue-800",
  Open: "bg-amber-100 text-amber-800",
  Closed: "bg-muted text-muted-foreground",
  Verified: "bg-green-100 text-green-800",
  Pending: "bg-amber-100 text-amber-800",
  Paid: "bg-green-100 text-green-800",
};

export function StatusBadge({ status }: { status: string }) {
  const cls = map[status] ?? "bg-muted text-muted-foreground";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>
      {status}
    </span>
  );
}
