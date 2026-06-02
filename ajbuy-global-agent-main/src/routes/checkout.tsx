import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/ajbuy/AppShell";
import { OrderStepper } from "@/components/ajbuy/OrderStepper";
import { useCart } from "@/context/CartContext";
import { user } from "@/lib/mock-data";
import { useState } from "react";
import { Info, ChevronRight, Minus, Plus, X } from "lucide-react";

export const Route = createFileRoute("/checkout")({ component: CheckoutPage });

function CheckoutPage() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const serviceFee = +(subtotal * 0.12).toFixed(2);
  const total = +(subtotal + serviceFee).toFixed(2);

  function handleSubmit() {
    if (!agreed) return;
    clearCart();
    void navigate({ to: "/payment", search: { orderId: `D${Date.now()}`, amount: total } });
  }

  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-5xl space-y-5">
        <div>
          <h1 className="font-display text-2xl md:text-3xl">Confirm Order</h1>
          <p className="text-sm text-muted-foreground mt-1">Review your order details before submitting.</p>
        </div>

        <OrderStepper activeStep={1} />

        {/* Product confirmation */}
        <div className="rounded-2xl border bg-card shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <h2 className="font-display text-lg">Confirm Product Information</h2>
            <Link to="/cart" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
              Return to Cart <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground text-sm">
              Your cart is empty.{" "}
              <Link to="/cart" className="text-primary hover:underline">Go back to cart</Link>
            </div>
          ) : (
            <>
              <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-5 py-3 bg-muted/40 text-xs uppercase text-muted-foreground border-b">
                <span>Product Details</span>
                <span className="text-right">Unit Price</span>
                <span className="text-center">Quantity</span>
                <span className="text-right">Total</span>
              </div>

              <div className="divide-y">
                <div className="flex items-center gap-2 px-5 py-2.5 bg-muted/20">
                  <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">A</div>
                  <span className="text-sm font-medium">AJBuy Store</span>
                </div>

                {items.map((item) => (
                  <div key={`${item.id}-${item.color}-${item.size}`}
                    className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-4 items-center px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-14 w-14 rounded-xl bg-muted flex items-center justify-center text-2xl shrink-0">
                        {item.emoji ?? "📦"}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium line-clamp-2">{item.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">Color: {item.color} · Size: {item.size}</div>
                      </div>
                    </div>
                    <div className="text-sm md:text-right">
                      <span className="md:hidden text-xs text-muted-foreground">Price: </span>
                      ${item.price.toFixed(2)}
                    </div>
                    <div className="flex md:justify-center items-center gap-2">
                      <span className="md:hidden text-xs text-muted-foreground">Qty: </span>
                      <div className="inline-flex items-center border rounded px-2 py-1 text-sm gap-3">
                        <Minus className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium w-4 text-center">{item.qty}</span>
                        <Plus className="h-3 w-3 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-primary md:text-right">
                      ${(item.price * item.qty).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t px-5 py-4 space-y-2 text-sm bg-muted/20">
                <div className="flex justify-between text-muted-foreground">
                  <span>Total of {items.reduce((s, i) => s + i.qty, 0)} goods</span>
                  <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Service fee (12%)</span>
                  <span className="font-medium text-foreground">${serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-1 border-t">
                  <span>Total Price of Goods</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Friendly reminder */}
        <div className="flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
          <Info className="h-4 w-4 shrink-0 mt-0.5 text-amber-600" />
          <p>
            <span className="font-medium">Friendly Reminder: </span>
            After the order is submitted and payment is successful, please wait patiently for the goods to be stored. After storage, you can submit the items for shipment.
          </p>
        </div>

        {/* Service agreement */}
        <div className="rounded-2xl border bg-card shadow-card p-5 space-y-3 text-sm">
          <p className="text-muted-foreground text-xs">
            <span className="text-foreground font-medium">Service Agreement: </span>
            "Purchase Notice", "Prohibited Items Statement", "Terms of Service and User Management", "Return and Exchange Service", "Disclaimer"
          </p>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="accent-primary h-4 w-4 rounded" />
              <span>I have read and agree to the above agreement</span>
            </label>
          </div>
        </div>

        {/* Submit bar */}
        <div className="sticky bottom-20 lg:bottom-0 rounded-2xl border bg-card shadow-card-hover px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            Total Amount to be Paid <span className="text-xs">(international shipping fees are not included)</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-baseline gap-0.5">
              <span className="text-muted-foreground text-sm">$</span>
              <span className="font-display text-3xl text-primary">{total.toFixed(2)}</span>
            </div>
            <button onClick={handleSubmit} disabled={!agreed || items.length === 0}
              className="rounded-full bg-primary text-primary-foreground px-10 py-3 font-semibold text-sm hover:bg-primary-deep transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap">
              Submit Order
            </button>
          </div>
        </div>
      </div>

    </AppShell>
  );
}
