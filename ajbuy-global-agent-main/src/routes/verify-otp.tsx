import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout } from "./login";

export const Route = createFileRoute("/verify-otp")({ component: Otp });

function Otp() {
  return (
    <AuthLayout title="Verify your phone" subtitle="We sent a code to +971 *** **89">
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <input key={i} maxLength={1} defaultValue={i < 3 ? String(i + 1) : ""} className="h-14 w-12 text-center text-2xl font-display border-2 rounded-xl focus:outline-none focus:border-primary" />
        ))}
      </div>
      <Link to="/dashboard" className="mt-6 block text-center w-full rounded-full bg-primary py-3 text-primary-foreground font-medium hover:bg-primary-deep">Verify</Link>
      <p className="text-center text-sm text-muted-foreground mt-4">Resend in <span className="text-foreground font-medium">00:42</span></p>
    </AuthLayout>
  );
}
