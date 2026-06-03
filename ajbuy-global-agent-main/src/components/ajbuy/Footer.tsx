import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="col-span-2 md:col-span-1">
          <Logo size="lg" />
          <p className="text-xs md:text-sm text-foreground/60 mt-3">Shop Like a Millionaire.</p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3 text-sm">Shop</h4>
          <ul className="space-y-2 text-xs md:text-sm text-foreground/60">
            <li><Link to="/search" className="hover:text-primary transition-colors">Browse Products</Link></li>
            <li><Link to="/import" className="hover:text-primary transition-colors">Import from URL</Link></li>
            <li><Link to="/orders" className="hover:text-primary transition-colors">My Orders</Link></li>
            <li><Link to="/warehouse" className="hover:text-primary transition-colors">Warehouse</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3 text-sm">Account</h4>
          <ul className="space-y-2 text-xs md:text-sm text-foreground/60">
            <li><Link to="/account" className="hover:text-primary transition-colors">Profile</Link></li>
            <li><Link to="/wallet" className="hover:text-primary transition-colors">Wallet</Link></li>
            <li><Link to="/affiliate" className="hover:text-primary transition-colors">Affiliate</Link></li>
            <li><Link to="/support" className="hover:text-primary transition-colors">Support</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3 text-sm">Preferences</h4>
          <div className="flex flex-col gap-2">
            <select className="bg-muted border border-border rounded-lg px-2 py-1.5 text-xs">
              <option>EN — English</option>
              <option>AR — العربية</option>
              <option>FR — Français</option>
            </select>
            <select className="bg-muted border border-border rounded-lg px-2 py-1.5 text-xs">
              <option>USD — US Dollar</option>
              <option>AED — Dirham</option>
              <option>EUR — Euro</option>
            </select>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-foreground/40">
          <span>© 2026 AJBUY. All rights reserved.</span>
          <div className="flex gap-4">
            <span className="hover:text-foreground/70 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-foreground/70 cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-foreground/70 cursor-pointer transition-colors">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
