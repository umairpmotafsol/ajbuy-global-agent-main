import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout, Input } from "./login";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/register")({ component: Register });

function Register() {
  const [showRef, setShowRef] = useState(false);
  return (
    <AuthLayout title="Create account" subtitle="Start shopping smarter today">
      <form className="space-y-4">
        <Input label="Full name" placeholder="Ahmed Al-Rashidi" />
        <Input label="Email" type="email" placeholder="you@example.com" />
        <Input label="Phone" type="tel" placeholder="+971 50 123 4567" />
        <Input label="Password" type="password" />
        <Input label="Confirm password" type="password" />
        <label className="block">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Country</span>
          <select className="mt-1 w-full rounded-lg border px-3 py-2.5 text-sm bg-background">
            <option>United Arab Emirates</option><option>United Kingdom</option><option>France</option><option>Saudi Arabia</option>
          </select>
        </label>
        <button type="button" onClick={() => setShowRef((v) => !v)} className="text-xs text-primary flex items-center gap-1">
          <ChevronDown className={`h-3 w-3 transition-transform ${showRef ? "rotate-180" : ""}`} /> I have a referral code
        </button>
        {showRef && <Input label="Referral code" placeholder="AJBUY-XXXX" />}
        <label className="flex items-start gap-2 text-xs text-muted-foreground">
          <input type="checkbox" className="mt-0.5" /> I agree to the Terms & Privacy Policy.
        </label>
        <Link to="/verify-otp" className="block text-center w-full rounded-full bg-primary py-3 text-primary-foreground font-medium hover:bg-primary-deep">Create account</Link>
      </form>
      <p className="text-center text-sm text-muted-foreground mt-6">
        Already have one? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
      </p>
    </AuthLayout>
  );
}
