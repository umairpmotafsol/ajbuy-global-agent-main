import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ajbuy/AdminShell";
import { useState } from "react";
import { Save, Plus, Trash2, Shield, Bell, Globe, DollarSign, Users, Lock } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({ component: AdminSettings });

const settingsTabs = [
  { id: "general", label: "General", icon: Globe },
  { id: "fees", label: "Fees & Pricing", icon: DollarSign },
  { id: "team", label: "Team", icon: Users },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
] as const;

type TabId = (typeof settingsTabs)[number]["id"];

function AdminSettings() {
  const [tab, setTab] = useState<TabId>("general");

  return (
    <AdminShell>
      <h1 className="font-display text-2xl md:text-3xl">Settings</h1>
      <p className="text-sm text-muted-foreground mt-1">Configure platform behaviour, fees, and team access.</p>

      <div className="mt-6 flex gap-4 flex-col lg:flex-row">
        {/* Sidebar nav */}
        <nav className="lg:w-52 shrink-0 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible scrollbar-hide">
          {settingsTabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`shrink-0 flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  tab === t.id
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {t.label}
              </button>
            );
          })}
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-5">
          {tab === "general" && <GeneralTab />}
          {tab === "fees" && <FeesTab />}
          {tab === "team" && <TeamTab />}
          {tab === "notifications" && <NotificationsTab />}
          {tab === "security" && <SecurityTab />}
        </div>
      </div>
    </AdminShell>
  );
}

function GeneralTab() {
  return (
    <>
      <Section title="Platform Identity">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Platform name" defaultValue="AJBuy Global" />
          <Field label="Support email" defaultValue="support@ajbuy.com" />
          <Field label="Primary currency" defaultValue="USD" />
          <Field label="Default language" defaultValue="English" />
          <Field label="Contact phone" defaultValue="+971 4 000 0000" />
          <Field label="Business country" defaultValue="United Arab Emirates" />
        </div>
        <SaveButton />
      </Section>

      <Section title="Quotation Settings">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Quote validity (hours)" defaultValue="24" type="number" />
          <Field label="Max quote revisions" defaultValue="3" type="number" />
          <Field label="Auto-expire reminder (hrs before)" defaultValue="6" type="number" />
        </div>
        <SaveButton />
      </Section>

      <Section title="Order Settings">
        <div className="space-y-3">
          <Toggle label="Auto-assign orders to sourcing team" defaultOn />
          <Toggle label="Require QC for all packages" defaultOn />
          <Toggle label="Allow order cancellations before payment" defaultOn />
          <Toggle label="Send order confirmation emails" defaultOn />
        </div>
        <SaveButton />
      </Section>
    </>
  );
}

function FeesTab() {
  return (
    <>
      <Section title="Service Fees">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Base service fee (%)" defaultValue="12" type="number" />
          <Field label="Min service fee ($)" defaultValue="3.00" type="number" />
          <Field label="Consolidation fee ($)" defaultValue="5.00" type="number" />
          <Field label="QC fee (standard) ($)" defaultValue="0.00" type="number" />
          <Field label="QC fee (detailed) ($)" defaultValue="8.00" type="number" />
          <Field label="Return handling fee ($)" defaultValue="10.00" type="number" />
        </div>
        <SaveButton />
      </Section>

      <Section title="Wallet & Payments">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Min top-up amount ($)" defaultValue="10" type="number" />
          <Field label="Max wallet balance ($)" defaultValue="5000" type="number" />
          <Field label="Referral commission (%)" defaultValue="5" type="number" />
          <Field label="Bonus expiry (days)" defaultValue="90" type="number" />
        </div>
        <div className="mt-4 space-y-3">
          <Toggle label="Enable Stripe payments" defaultOn />
          <Toggle label="Enable bank transfer top-ups" defaultOn />
          <Toggle label="Enable wallet-to-wallet transfers" />
        </div>
        <SaveButton />
      </Section>
    </>
  );
}

const initialTeam = [
  { name: "Nadia Hassan", email: "nadia@ajbuy.com", role: "Super Admin", status: "Active" },
  { name: "Tariq Yusuf", email: "tariq@ajbuy.com", role: "Sourcing Agent", status: "Active" },
  { name: "Mei Lin", email: "mei@ajbuy.com", role: "QC Inspector", status: "Active" },
  { name: "Karim Daoudi", email: "karim@ajbuy.com", role: "Support", status: "Inactive" },
];

function TeamTab() {
  const [members] = useState(initialTeam);

  return (
    <Section title="Team Members">
      <div className="rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Role</th>
              <th className="text-left p-3">Status</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {members.map((m) => (
              <tr key={m.email} className="hover:bg-muted/30">
                <td className="p-3 font-medium">{m.name}</td>
                <td className="p-3 text-muted-foreground">{m.email}</td>
                <td className="p-3 text-xs">
                  <span className="px-2 py-0.5 rounded-full bg-muted">{m.role}</span>
                </td>
                <td className="p-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${m.status === "Active" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                    {m.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button className="text-xs text-primary hover:underline mr-3">Edit</button>
                  <button className="text-xs text-red-600 hover:underline">
                    <Trash2 className="h-3.5 w-3.5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="mt-4 rounded-full border px-4 py-2 text-sm font-medium inline-flex items-center gap-2 hover:bg-muted">
        <Plus className="h-4 w-4" /> Invite team member
      </button>
    </Section>
  );
}

const notifSettings = [
  { label: "New purchase request", desc: "Alert when a customer submits a new request", on: true },
  { label: "Quote accepted", desc: "When a customer accepts a quotation", on: true },
  { label: "Payment received", desc: "When a customer completes a payment", on: true },
  { label: "Package arrived at warehouse", desc: "New package received for processing", on: true },
  { label: "QC issue flagged", desc: "When an inspector flags a package issue", on: true },
  { label: "Low wallet balance alert", desc: "Customer wallet drops below $10", on: false },
  { label: "Daily summary email", desc: "Send a daily order/revenue digest", on: false },
];

function NotificationsTab() {
  const [prefs, setPrefs] = useState(notifSettings.map((n) => n.on));

  return (
    <Section title="Admin Notifications">
      <div className="space-y-4">
        {notifSettings.map((n, i) => (
          <div key={n.label} className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-medium">{n.label}</div>
              <div className="text-xs text-muted-foreground">{n.desc}</div>
            </div>
            <button
              onClick={() => setPrefs((prev) => prev.map((v, j) => (j === i ? !v : v)))}
              className={`relative h-6 w-11 rounded-full transition-colors shrink-0 ${prefs[i] ? "bg-primary" : "bg-muted"}`}
            >
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${prefs[i] ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
        ))}
      </div>
      <SaveButton />
    </Section>
  );
}

function SecurityTab() {
  return (
    <>
      <Section title="Admin Password">
        <div className="space-y-3 max-w-sm">
          {(["Current password", "New password", "Confirm new password"] as const).map((label) => (
            <label key={label} className="block text-sm">
              <span className="text-muted-foreground text-xs uppercase tracking-wider">{label}</span>
              <input type="password" className="mt-1 w-full rounded-lg border px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary" />
            </label>
          ))}
        </div>
        <button className="mt-4 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary-deep inline-flex items-center gap-2">
          <Lock className="h-4 w-4" /> Update password
        </button>
      </Section>

      <Section title="Session & Access">
        <div className="space-y-3">
          <Toggle label="Require 2FA for all admin logins" />
          <Toggle label="Auto-logout after 30 minutes of inactivity" defaultOn />
          <Toggle label="Log all admin actions to audit trail" defaultOn />
          <Toggle label="Restrict admin access to whitelisted IPs" />
        </div>
        <SaveButton />
      </Section>

      <Section title="API Keys">
        <div className="space-y-3 text-sm">
          {[
            { label: "Live API key", value: "ajb_live_••••••••••••••••3f9a" },
            { label: "Test API key", value: "ajb_test_••••••••••••••••7c2d" },
          ].map((k) => (
            <div key={k.label}>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{k.label}</div>
              <div className="flex items-center gap-2 rounded-lg border px-3 py-2 bg-muted/30 font-mono text-xs">
                <span className="flex-1">{k.value}</span>
                <button className="text-xs text-primary hover:underline shrink-0">Reveal</button>
                <button className="text-xs text-muted-foreground hover:underline shrink-0">Rotate</button>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function Section({ title, children }: Readonly<{ title: string; children: React.ReactNode }>) {
  return (
    <div className="rounded-2xl border bg-card shadow-card p-5 space-y-4">
      <h3 className="font-display text-lg">{title}</h3>
      {children}
    </div>
  );
}

function Field({
  label,
  defaultValue,
  type = "text",
}: Readonly<{ label: string; defaultValue: string; type?: string }>) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full rounded-lg border px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary"
      />
    </div>
  );
}

function Toggle({ label, defaultOn }: Readonly<{ label: string; defaultOn?: boolean }>) {
  const [on, setOn] = useState(defaultOn ?? false);
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm">{label}</span>
      <button
        onClick={() => setOn(!on)}
        className={`relative h-6 w-11 rounded-full transition-colors shrink-0 ${on ? "bg-primary" : "bg-muted"}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
}

function SaveButton() {
  return (
    <button className="rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary-deep inline-flex items-center gap-2">
      <Save className="h-4 w-4" /> Save changes
    </button>
  );
}
