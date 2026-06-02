import { Link, useRouterState } from "@tanstack/react-router";
import { Home, PackageSearch, ListOrdered, Warehouse, User, Bell, Globe, Wallet, LifeBuoy, Gift, Truck, Search, ShoppingCart, Heart } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { CartDrawer } from "./CartDrawer";
import { Footer } from "./Footer";
import { NavSearchBar } from "./NavSearchBar";
import { useCart } from "@/context/CartContext";
import { ReactNode } from "react";

const navItems = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/import", label: "Import", icon: PackageSearch },
  { to: "/orders", label: "Orders", icon: ListOrdered },
  { to: "/warehouse", label: "Warehouse", icon: Warehouse },
  { to: "/account", label: "Account", icon: User },
];

const sideExtras = [
  { to: "/cart", label: "Cart", icon: ShoppingCart },
  { to: "/favorites", label: "Favorites", icon: Heart },
  { to: "/parcels", label: "Parcel", icon: Truck },
  { to: "/wallet", label: "Wallet", icon: Wallet },
  { to: "/affiliate", label: "Affiliate", icon: Gift },
  { to: "/support", label: "Support", icon: LifeBuoy },
];

export function AppShell({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string) => pathname === to || (to !== "/dashboard" && pathname.startsWith(to));
  const { count } = useCart();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">
          <Logo />

          {/* Inline search bar — hidden on mobile */}
          <div className="hidden md:flex flex-1 min-w-0">
            <NavSearchBar />
          </div>

          {/* Action icons */}
          <div className="flex items-center gap-1 shrink-0 ml-auto md:ml-0">
            {/* Mobile search */}
            <Link to="/search" className="md:hidden h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-muted" aria-label="Search">
              <Search className="h-4 w-4" />
            </Link>
            <button className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted" aria-label="Language">
              <Globe className="h-4 w-4" />
            </button>
            <ThemeToggle />
            <Link
              to="/cart"
              className="relative h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-muted"
              aria-label="Cart"
            >
              <ShoppingCart className="h-4 w-4" />
              {count > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center font-medium">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </Link>
            <button className="relative h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-muted" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">3</span>
            </button>
            <Link to="/dashboard" className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold hover:opacity-90 transition-opacity" aria-label="User Center">AA</Link>
          </div>
        </div>

        {/* Mobile search row */}
        <div className="md:hidden px-4 pb-3">
          <NavSearchBar />
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl w-full flex-1">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex sticky top-16 h-[calc(100vh-4rem)] w-60 shrink-0 flex-col border-r p-3 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  active ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted text-foreground/80"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <div className="my-3 border-t" />
          {sideExtras.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  active ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted text-foreground/80"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <div className="mt-auto pt-3 border-t">
            <Link to="/admin" className="block text-xs text-muted-foreground hover:text-primary px-3 py-2">
              Admin Panel →
            </Link>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 pb-24 lg:pb-8">{children}</main>
      </div>

      {/* Footer — desktop only */}
      <div className="hidden lg:block">
        <Footer />
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t bg-background/95 backdrop-blur">
        <div className="grid grid-cols-5 h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center justify-center gap-1 text-[11px] transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className={`h-5 w-5 ${active ? "fill-primary/10" : ""}`} />
                {item.label}
                {active && <span className="absolute bottom-1 h-1 w-6 rounded-full bg-primary" />}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Cart drawer */}
      <CartDrawer />
    </div>
  );
}
