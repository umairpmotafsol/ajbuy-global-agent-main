import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, ShoppingCart, FileText, Quote, Warehouse, Users, DollarSign, Settings } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { ReactNode } from "react";

const items = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/requests", label: "Purchase Requests", icon: FileText },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { to: "/admin/quotations", label: "Quotations", icon: Quote },
  { to: "/admin/warehouse", label: "Warehouse", icon: Warehouse },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/finance", label: "Finance", icon: DollarSign },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active = (to: string, exact?: boolean) => (exact ? pathname === to : pathname.startsWith(to));

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-40 bg-background border-b">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden md:inline-block text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground font-medium">ADMIN</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/dashboard" className="text-xs text-muted-foreground hover:text-primary">← Back to customer view</Link>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden lg:flex sticky top-14 h-[calc(100vh-3.5rem)] w-60 shrink-0 flex-col border-r bg-background p-3 gap-1">
          {items.map((it) => {
            const Icon = it.icon;
            const a = active(it.to, it.exact);
            return (
              <Link key={it.to} to={it.to} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${a ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted text-foreground/80"}`}>
                <Icon className="h-4 w-4" />
                {it.label}
              </Link>
            );
          })}
        </aside>
        <main className="flex-1 min-w-0 p-4 md:p-6 pb-24 lg:pb-8">{children}</main>
      </div>

      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t bg-background overflow-x-auto scrollbar-hide">
        <div className="flex h-16 min-w-max px-1">
          {items.map((it) => {
            const Icon = it.icon;
            const a = active(it.to, it.exact);
            const short: Record<string, string> = {
              "Purchase Requests": "Requests",
              "Quotations": "Quotes",
            };
            return (
              <Link
                key={it.to}
                to={it.to}
                className={`flex flex-col items-center justify-center gap-0.5 px-4 min-w-[60px] text-[10px] ${a ? "text-primary" : "text-muted-foreground"}`}
              >
                <Icon className="h-[18px] w-[18px]" />
                <span className="whitespace-nowrap">{short[it.label] ?? it.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
