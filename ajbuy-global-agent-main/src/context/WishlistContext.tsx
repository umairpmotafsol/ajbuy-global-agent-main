import { createContext, useContext, useState, useMemo } from "react";
import type { ReactNode } from "react";

export type WishlistItem = {
  id: string;
  title: string;
  price: number;
  platform: string;
  emoji?: string;
};

type WishlistCtx = {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  count: number;
};

const WishlistContext = createContext<WishlistCtx | null>(null);

export function WishlistProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [items, setItems] = useState<WishlistItem[]>([]);

  function addItem(item: WishlistItem) {
    setItems((prev) => (prev.find((i) => i.id === item.id) ? prev : [...prev, item]));
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function isWishlisted(id: string) {
    return items.some((i) => i.id === id);
  }

  const value = useMemo(
    () => ({ items, addItem, removeItem, isWishlisted, count: items.length }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
