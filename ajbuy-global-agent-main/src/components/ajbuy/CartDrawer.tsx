import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function CartDrawer() {
  const { items, open, setOpen, removeItem, updateQty, total, clearCart } = useCart();

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm z-50 bg-background border-l shadow-2xl flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            <span className="font-display text-lg">Cart</span>
            {items.length > 0 && (
              <span className="text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5 font-medium">
                {items.reduce((s, i) => s + i.qty, 0)}
              </span>
            )}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="h-9 w-9 rounded-full inline-flex items-center justify-center hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground p-8 text-center">
              <ShoppingCart className="h-12 w-12 opacity-20" />
              <p className="font-display text-lg">Your cart is empty</p>
              <p className="text-sm">Find something from Taobao or 1688 to get started.</p>
              <button
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary-deep"
              >
                Browse products
              </button>
            </div>
          ) : (
            <ul className="divide-y">
              {items.map((item) => (
                <li key={`${item.id}-${item.color}-${item.size}`} className="flex gap-3 p-4">
                  <div className="h-16 w-16 rounded-xl bg-muted flex items-center justify-center text-2xl shrink-0">
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium line-clamp-1">{item.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {item.color} · {item.size}
                    </div>
                    <div className="text-sm font-medium text-primary mt-1">
                      ${(item.price * item.qty).toFixed(2)}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="inline-flex items-center border rounded-full text-sm">
                        <button
                          onClick={() => updateQty(item.id, item.color, item.size, item.qty - 1)}
                          className="h-7 w-7 inline-flex items-center justify-center hover:bg-muted rounded-full"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 font-medium">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.color, item.size, item.qty + 1)}
                          className="h-7 w-7 inline-flex items-center justify-center hover:bg-muted rounded-full"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.color, item.size)}
                        className="h-7 w-7 inline-flex items-center justify-center rounded-full hover:bg-red-50 text-red-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-5 space-y-3 bg-background">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-display text-lg">${total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Shipping and service fees added at checkout.
            </p>
            <Link
              to="/orders"
              onClick={() => setOpen(false)}
              className="w-full rounded-full bg-primary text-primary-foreground py-3 font-medium text-sm inline-flex items-center justify-center gap-2 hover:bg-primary-deep"
            >
              Request to Buy <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              onClick={clearCart}
              className="w-full rounded-full border py-2.5 text-sm text-muted-foreground hover:bg-muted"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
