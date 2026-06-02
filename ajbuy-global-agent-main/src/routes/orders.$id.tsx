import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/ajbuy/AppShell";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/orders/$id")({ component: OrderDetail });

function OrderDetail() {
  const { id } = Route.useParams();

  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-4xl">
        <Link to="/orders" className="text-sm text-muted-foreground inline-flex items-center gap-1 hover:text-primary">
          <ChevronLeft className="h-4 w-4" /> Back to Orders
        </Link>

        <div className="mt-6 rounded-2xl border bg-card shadow-card p-6 space-y-6">
          <div>
            <h1 className="font-display text-2xl md:text-3xl">{id}</h1>
            <p className="text-sm text-muted-foreground mt-1">Order details and tracking information</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase text-muted-foreground font-semibold">Order Status</p>
                <p className="text-lg font-medium mt-1">Shipped</p>
              </div>
              <div>
                <p className="text-xs uppercase text-muted-foreground font-semibold">Order Date</p>
                <p className="text-lg font-medium mt-1">May 28, 2026</p>
              </div>
              <div>
                <p className="text-xs uppercase text-muted-foreground font-semibold">Total Amount</p>
                <p className="text-lg font-medium mt-1">$12.50</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase text-muted-foreground font-semibold">Tracking Number</p>
                <p className="text-lg font-medium mt-1">DHL-9384-2941-AJB</p>
              </div>
              <div>
                <p className="text-xs uppercase text-muted-foreground font-semibold">Carrier</p>
                <p className="text-lg font-medium mt-1">DHL Express</p>
              </div>
              <div>
                <p className="text-xs uppercase text-muted-foreground font-semibold">Est. Delivery</p>
                <p className="text-lg font-medium mt-1">June 5, 2026</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="font-display text-lg mb-4">Order Items</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <div className="h-12 w-12 rounded bg-muted flex items-center justify-center text-xl">📦</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">Phone Case</p>
                  <p className="text-sm text-muted-foreground">Qty: 1</p>
                </div>
                <p className="font-medium">$12.50</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
