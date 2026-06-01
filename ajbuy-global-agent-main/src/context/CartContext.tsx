import { createContext, useContext, useState, useMemo } from "react";
import type { ReactNode } from "react";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  qty: number;
  color: string;
  size: string;
  emoji?: string;
};

type CartCtx = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, color: string, size: string) => void;
  updateQty: (id: string, color: string, size: string, qty: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  function addItem(item: CartItem) {
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.id === item.id && i.color === item.color && i.size === item.size,
      );
      if (idx !== -1) {
        return prev.map((i, j) => (j === idx ? { ...i, qty: i.qty + item.qty } : i));
      }
      return [...prev, item];
    });
    setOpen(true);
  }

  function removeItem(id: string, color: string, size: string) {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.color === color && i.size === size)));
  }

  function updateQty(id: string, color: string, size: string, qty: number) {
    if (qty < 1) { removeItem(id, color, size); return; }
    setItems((prev) =>
      prev.map((i) => (i.id === id && i.color === color && i.size === size ? { ...i, qty } : i)),
    );
  }

  function clearCart() { setItems([]); }

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  const value = useMemo(
    () => ({ items, addItem, removeItem, updateQty, clearCart, total, count, open, setOpen }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, open, total, count],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
