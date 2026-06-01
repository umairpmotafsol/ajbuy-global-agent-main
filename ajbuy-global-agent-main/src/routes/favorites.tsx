import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/ajbuy/AppShell";
import { useWishlist } from "@/context/WishlistContext";
import { Star, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const Route = createFileRoute("/favorites")({ component: FavoritesPage });

function FavoritesPage() {
  const { items, removeItem } = useWishlist();
  const { addItem, setOpen } = useCart();

  function handleAddToCart(item: (typeof items)[number]) {
    addItem({ id: item.id, title: item.title, price: item.price, qty: 1, color: "Default", size: "Standard", emoji: item.emoji });
    setOpen(true);
  }

  return (
    <AppShell>
      <div className="p-4 md:p-6">
        <h1 className="font-display text-2xl md:text-3xl">Favorites</h1>
        <p className="text-sm text-muted-foreground mt-1">Products you've saved for later.</p>

        {items.length === 0 ? (
          <div className="mt-6 rounded-2xl border bg-card shadow-card flex flex-col items-center justify-center py-24 px-6 text-center gap-5">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-2 border-primary/20 flex items-center justify-center">
                <Star className="h-10 w-10 text-primary/30" strokeWidth={1.5} />
              </div>
              <span className="absolute -top-1 -right-1 text-primary/30 text-lg">+</span>
              <span className="absolute top-0 -left-3 text-primary/20 text-sm">·</span>
              <span className="absolute -bottom-2 right-2 text-primary/20 text-xs">○</span>
            </div>
            <div>
              <p className="font-medium text-foreground">No Favorites</p>
              <p className="text-sm text-muted-foreground mt-1">Save items you love by tapping the heart on any product.</p>
            </div>
            <Link
              to="/dashboard"
              className="rounded-full bg-primary text-primary-foreground px-8 py-2.5 text-sm font-medium hover:bg-primary-deep transition-colors"
            >
              Go to home page
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {items.map((item) => (
              <div key={item.id} className="rounded-2xl border bg-card shadow-card overflow-hidden group">
                <div className="aspect-square bg-muted flex items-center justify-center text-4xl relative">
                  {item.emoji ?? "📦"}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-2 right-2 h-7 w-7 rounded-full bg-background/80 backdrop-blur inline-flex items-center justify-center text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="p-3 space-y-2">
                  <div className="text-sm font-medium line-clamp-2 leading-tight">{item.title}</div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-primary">${item.price.toFixed(2)}</span>
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded font-semibold text-white"
                      style={{ backgroundColor: item.platform === "Taobao" ? "#FF4400" : "#FF6600" }}
                    >
                      {item.platform}
                    </span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full rounded-full bg-primary/10 text-primary text-xs font-medium py-1.5 hover:bg-primary hover:text-primary-foreground transition-colors inline-flex items-center justify-center gap-1"
                  >
                    <ShoppingCart className="h-3 w-3" /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
