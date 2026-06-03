import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/ajbuy/AppShell";
import { user } from "@/lib/mock-data";
import { useState } from "react";
import { User, Mail, Phone, Globe, Lock, Shield, Camera, Check, ChevronRight, MapPin } from "lucide-react";

export const Route = createFileRoute("/account")({ component: AccountPage });

const accountTabs = [
  { id: "profile", label: "Profile" },
  { id: "security", label: "Security" },
  { id: "notifications", label: "Notifications" },
  { id: "kyc", label: "KYC" },
] as const;

type TabId = (typeof accountTabs)[number]["id"];

function AccountPage() {
  const [tab, setTab] = useState<TabId>("profile");

  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-3xl">
        <h1 className="font-display text-2xl md:text-3xl">Account</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your profile, security, and preferences.</p>

        <div className="mt-5 flex gap-1 border-b overflow-x-auto scrollbar-hide">
          {accountTabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`shrink-0 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                tab === t.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "profile" && <ProfileTab />}
          {tab === "security" && <SecurityTab />}
          {tab === "notifications" && <NotificationsTab />}
          {tab === "kyc" && <KYCTab />}
        </div>
      </div>
    </AppShell>
  );
}

function ProfileTab() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-semibold">
            {user.avatar}
          </div>
          <button className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-primary text-primary-foreground border-2 border-background inline-flex items-center justify-center hover:bg-primary-deep">
            <Camera className="h-3.5 w-3.5" />
          </button>
        </div>
        <div>
          <div className="font-display text-xl">{user.name}</div>
          <div className="text-sm text-muted-foreground">{user.email}</div>
        </div>
      </div>

      <div className="rounded-2xl border bg-card shadow-card p-5 space-y-4">
        <h3 className="font-display text-lg">Personal Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <InputField label="Full name" defaultValue={user.name} icon={<User className="h-4 w-4" />} />
          <InputField label="Email address" defaultValue={user.email} icon={<Mail className="h-4 w-4" />} />
          <InputField label="Phone number" defaultValue="+971 50 *** **89" icon={<Phone className="h-4 w-4" />} />
          <InputField label="Country" defaultValue={user.country} icon={<Globe className="h-4 w-4" />} />
          <div className="md:col-span-2">
            <InputField label="Address" defaultValue="Dubai Marina, Dubai, UAE" icon={<MapPin className="h-4 w-4" />} />
          </div>
        </div>
        <button className="rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary-deep">
          Save changes
        </button>
      </div>

      <div className="rounded-2xl border bg-card shadow-card p-5 space-y-3">
        <h3 className="font-display text-lg">Preferences</h3>
        <PrefRow label="Display currency" value="AED — UAE Dirham" />
        <PrefRow label="Language" value="English" />
        <PrefRow label="Time zone" value="Asia/Dubai (GMT+4)" />
      </div>
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border bg-card shadow-card p-5 space-y-4">
        <h3 className="font-display text-lg">Change Password</h3>
        <div className="space-y-3">
          {(["Current password", "New password", "Confirm new password"] as const).map((label) => (
            <label key={label} className="block text-sm">
              <span className="text-muted-foreground text-xs uppercase tracking-wider">{label}</span>
              <input
                type="password"
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary"
              />
            </label>
          ))}
        </div>
        <button className="rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary-deep inline-flex items-center gap-2">
          <Lock className="h-4 w-4" /> Update password
        </button>
      </div>

      <div className="rounded-2xl border bg-card shadow-card p-5 space-y-3">
        <h3 className="font-display text-lg">Two-Factor Authentication</h3>
        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
        <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">Authenticator app</div>
              <div className="text-xs text-muted-foreground">Not enabled</div>
            </div>
          </div>
          <button className="text-xs text-primary hover:underline">Enable</button>
        </div>
      </div>

      <div className="rounded-2xl border border-red-200 bg-card shadow-card p-5 space-y-3">
        <h3 className="font-display text-lg text-red-600">Danger Zone</h3>
        <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data.</p>
        <button className="rounded-full border border-red-300 text-red-600 px-4 py-2 text-sm hover:bg-red-50">
          Delete account
        </button>
      </div>
    </div>
  );
}

const defaultNotifications = [
  { label: "Order status updates", desc: "Get notified when your order status changes", on: true },
  { label: "Quotation received", desc: "Alert when admin sends a new quotation", on: true },
  { label: "Wallet activity", desc: "Notifications for credits and debits", on: true },
  { label: "Promotional offers", desc: "News, discounts, and platform updates", on: false },
  { label: "QC report ready", desc: "When your package QC is completed", on: true },
  { label: "Weekly summary", desc: "A weekly digest of your account activity", on: false },
];

function NotificationsTab() {
  const [prefs, setPrefs] = useState(defaultNotifications.map((n) => n.on));

  return (
    <div className="rounded-2xl border bg-card shadow-card p-5 space-y-4">
      <h3 className="font-display text-lg">Notification Preferences</h3>
      {defaultNotifications.map((n, i) => (
        <div key={n.label} className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-medium">{n.label}</div>
            <div className="text-xs text-muted-foreground">{n.desc}</div>
          </div>
          <button
            onClick={() => setPrefs((prev) => prev.map((v, j) => (j === i ? !v : v)))}
            className={`relative h-6 w-11 rounded-full transition-colors shrink-0 ${prefs[i] ? "bg-primary" : "bg-muted"}`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${prefs[i] ? "translate-x-5" : "translate-x-0.5"}`}
            />
          </button>
        </div>
      ))}
    </div>
  );
}

function KYCTab() {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-green-50 border border-green-200 p-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-green-600 text-white inline-flex items-center justify-center shrink-0">
            <Check className="h-5 w-5" />
          </div>
          <div>
            <div className="font-medium text-green-900">Identity Verified</div>
            <div className="text-sm text-green-700">Your account is fully verified.</div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border bg-card shadow-card p-5 space-y-4">
        <h3 className="font-display text-lg">Submitted Documents</h3>
        {[
          { label: "Government ID", value: "Emirates ID · ****3421" },
          { label: "Proof of address", value: "Utility bill · May 2026" },
          { label: "Selfie verification", value: "Completed May 10" },
        ].map((d) => (
          <div key={d.label} className="flex items-center justify-between text-sm">
            <div>
              <div className="font-medium">{d.label}</div>
              <div className="text-xs text-muted-foreground">{d.value}</div>
            </div>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Verified</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InputField({
  label,
  defaultValue,
  icon,
}: Readonly<{ label: string; defaultValue: string; icon: React.ReactNode }>) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</label>
      <div className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm bg-background focus-within:border-primary">
        <span className="text-muted-foreground shrink-0">{icon}</span>
        <input defaultValue={defaultValue} className="flex-1 bg-transparent focus:outline-none min-w-0" />
      </div>
    </div>
  );
}

function PrefRow({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <button className="flex items-center gap-1 font-medium hover:text-primary">
        {value} <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
