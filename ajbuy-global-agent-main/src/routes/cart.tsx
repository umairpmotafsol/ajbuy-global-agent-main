import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/ajbuy/AppShell";
import { ValueAddedServices, type ServiceId } from "@/components/ajbuy/ValueAddedServices";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Minus, Plus, Pencil, Trash2, ShoppingBag } from "lucide-react";
import { OrderStepper } from "@/components/ajbuy/OrderStepper";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const { items, removeItem, updateQty, clearCart } = useCart();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [tab, setTab] = useState<"all" | "instock">("all");
  const [selectedServices, setSelectedServices] = useState<ServiceId[]>([]);
  const [serviceRemarks, setServiceRemarks] = useState<Record<string, string>>({});

  const itemKey = (id: string, color: string, size: string) => `${id}-${color}-${size}`;

  function toggleItem(key: string) {
    setSelected((prev) => {
      const n = new Set(prev);
      n.has(key) ? n.delete(key) : n.add(key);
      return n;
    });
  }

  function toggleAll() {
    if (selected.size === items.length) setSelected(new Set());
    else setSelected(new Set(items.map((i) => itemKey(i.id, i.color, i.size))));
  }

  function deleteSelected() {
    selected.forEach((key) => {
      const [id, ...rest] = key.split("-");
      const color = rest.slice(0, -1).join("-");
      const size = rest.at(-1) ?? "";
      removeItem(id, color, size);
    });
    setSelected(new Set());
  }

  const selectedItems = items.filter((i) => selected.has(itemKey(i.id, i.color, i.size)));
  const selectedTotal = selectedItems.reduce((s, i) => s + i.price * i.qty, 0);
  const selectedCount = selectedItems.reduce((s, i) => s + i.qty, 0);

  return (
    <AppShell>
      <div className="p-4 md:p-6 space-y-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl">Cart</h1>
          <p className="text-sm text-muted-foreground mt-1">Review your selected items before placing an order.</p>
        </div>

        {/* Process stepper */}
        <OrderStepper activeStep={0} />

        {items.length === 0 ? (
          <div className="rounded-2xl border bg-card shadow-card flex flex-col items-center justify-center py-24 gap-5 text-center">
            <ShoppingBag className="h-20 w-20 text-primary/20" strokeWidth={1} />
            <div>
              <p className="font-display text-xl">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-1">Go shopping now</p>
            </div>
            <Link to="/search" className="rounded-full bg-primary text-primary-foreground px-8 py-2.5 text-sm font-medium hover:bg-primary-deep transition-colors">
              Go Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex gap-6 border-b">
              {(["all", "instock"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`pb-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                >
                  {t === "all" ? "All" : "In Stock"}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="rounded-2xl border bg-card shadow-card overflow-hidden">
              {/* Header */}
              <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 bg-muted/40 text-xs uppercase text-muted-foreground border-b">
                <span>Product Details</span>
                <span className="text-right">Unit Price</span>
                <span className="text-center">Quantity</span>
                <span className="text-right">Amount</span>
                <span className="text-center">Remark</span>
                <span className="text-right w-16">Operate</span>
              </div>

              {/* Group by platform */}
              {Object.entries(
                items.reduce<Record<string, typeof items>>((acc, item) => {
                  const group = item.emoji ?? "Other";
                  if (!acc[group]) acc[group] = [];
                  acc[group].push(item);
                  return acc;
                }, {})
              ).map(([, groupItems]) => (
                <div key={groupItems[0].id + groupItems[0].color} className="border-b last:border-b-0">
                  {/* Store label */}
                  <div className="flex items-center gap-2 px-5 py-3 bg-muted/20 border-b">
                    <input type="checkbox" className="accent-primary h-4 w-4 rounded" />
                    <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">A</div>
                    <span className="text-sm font-medium">AJBuy Store</span>
                  </div>

                  {/* Items */}
                  {groupItems.map((item) => {
                    const key = itemKey(item.id, item.color, item.size);
                    const isChecked = selected.has(key);
                    return (
                      <div key={key} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-4 items-center px-5 py-4 border-t first:border-t-0 hover:bg-muted/20 transition-colors">
                        {/* Product details */}
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleItem(key)}
                            className="accent-primary h-4 w-4 rounded shrink-0"
                          />
                          <div className="h-16 w-16 rounded-xl bg-muted flex items-center justify-center text-3xl shrink-0">
                            {item.emoji ?? "📦"}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-medium line-clamp-2 leading-snug">{item.title}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Color: <span className="text-foreground">{item.color}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Size: <span className="text-foreground">{item.size}</span>
                            </div>
                          </div>
                        </div>

                        {/* Unit price */}
                        <div className="text-sm font-medium md:text-right">
                          <span className="md:hidden text-muted-foreground text-xs">Unit Price: </span>
                          ${item.price.toFixed(2)}
                        </div>

                        {/* Qty stepper */}
                        <div className="flex md:justify-center items-center gap-1">
                          <span className="md:hidden text-muted-foreground text-xs mr-2">Qty: </span>
                          <button
                            onClick={() => updateQty(item.id, item.color, item.size, item.qty - 1)}
                            className="h-7 w-7 rounded border inline-flex items-center justify-center hover:bg-muted text-muted-foreground"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, item.color, item.size, item.qty + 1)}
                            className="h-7 w-7 rounded border inline-flex items-center justify-center hover:bg-muted text-muted-foreground"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Amount */}
                        <div className="text-sm font-semibold text-primary md:text-right">
                          <span className="md:hidden text-muted-foreground text-xs font-normal">Amount: </span>
                          ${(item.price * item.qty).toFixed(2)}
                        </div>

                        {/* Remark */}
                        <div className="flex md:justify-center">
                          <button className="h-7 w-7 rounded inline-flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-primary transition-colors">
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Delete */}
                        <div className="flex md:justify-end">
                          <button
                            onClick={() => removeItem(item.id, item.color, item.size)}
                            className="text-xs text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Value-Added Services */}
            <ValueAddedServices
              selectedServices={selectedServices}
              onSelectionChange={setSelectedServices}
              remarks={serviceRemarks}
              onRemarksChange={setServiceRemarks}
              type="product"
            />

            {/* Bottom bar */}
            <div className="sticky bottom-20 lg:bottom-0 rounded-2xl border bg-card shadow-card-hover px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              {/* Left */}
              <div className="flex items-center gap-4 text-sm flex-wrap">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={selected.size === items.length && items.length > 0}
                    onChange={toggleAll}
                    className="accent-primary h-4 w-4 rounded"
                  />
                  <span>Select All</span>
                </label>
                <button
                  onClick={deleteSelected}
                  disabled={selected.size === 0}
                  className="text-muted-foreground hover:text-red-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Delete Selected Items
                </button>
                <button onClick={clearCart} className="text-primary hover:underline">
                  Clear Invalid Items
                </button>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4 shrink-0 flex-wrap justify-end">
                <span className="text-sm text-muted-foreground">
                  Selected Goods{" "}
                  <span className="text-foreground font-medium">{selectedCount}</span>{" "}
                  <span className="text-xs">(Excluding international shipping)</span>
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground text-sm">$</span>
                  <span className="font-display text-2xl text-primary">{selectedTotal.toFixed(2)}</span>
                </div>
                <Link
                  to="/checkout"
                  className="rounded-full bg-primary text-primary-foreground px-8 py-3 font-semibold text-sm hover:bg-primary-deep transition-colors whitespace-nowrap"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
