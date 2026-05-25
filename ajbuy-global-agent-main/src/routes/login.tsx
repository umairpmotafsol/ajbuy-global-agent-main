import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/ajbuy/Logo";
import { Phone } from "lucide-react";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your AJBuy account">
      <form className="space-y-4">
        <Input label="Email" type="email" placeholder="you@example.com" />
        <Input label="Password" type="password" placeholder="••••••••" />
        <button type="button" className="text-xs text-primary hover:underline">Forgot password?</button>
        <Link to="/dashboard" className="block text-center w-full rounded-full bg-primary py-3 text-primary-foreground font-medium hover:bg-primary-deep">Sign in</Link>
      </form>
      <Divider />
      <div className="space-y-2">
        <SocialButton icon="G">Continue with Google</SocialButton>
        <SocialButton icon="">Continue with Apple</SocialButton>
        <SocialButton icon={<Phone className="h-4 w-4" />}>Sign in with Phone</SocialButton>
      </div>
      <p className="text-center text-sm text-muted-foreground mt-6">
        No account? <Link to="/register" className="text-primary font-medium hover:underline">Register</Link>
      </p>
    </AuthLayout>
  );
}

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-hero-gradient flex flex-col items-center justify-center px-4 py-10">
      <Logo className="mb-8" />
      <div className="w-full max-w-md rounded-3xl bg-background border shadow-card p-6 md:p-8">
        <h1 className="font-display text-3xl text-center">{title}</h1>
        {subtitle && <p className="text-center text-sm text-muted-foreground mt-2">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

export function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
      <input {...props} className="mt-1 w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
    </label>
  );
}
export function Divider() {
  return <div className="my-6 flex items-center gap-3"><div className="h-px flex-1 bg-border" /><span className="text-xs text-muted-foreground">or continue with</span><div className="h-px flex-1 bg-border" /></div>;
}
export function SocialButton({ children, icon }: { children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <button type="button" className="w-full flex items-center justify-center gap-2 rounded-full border py-2.5 text-sm font-medium hover:bg-muted">
      <span className="inline-flex items-center justify-center h-5 w-5 font-bold">{icon}</span>
      {children}
    </button>
  );
}
