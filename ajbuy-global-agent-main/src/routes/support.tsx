import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/ajbuy/AppShell";
import { tickets } from "@/lib/mock-data";
import { useState } from "react";
import { MessageCircle, Send, X, Plus, Paperclip } from "lucide-react";

export const Route = createFileRoute("/support")({ component: Support });

function Support() {
  const [chatOpen, setChatOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);

  return (
    <AppShell>
      <div className="p-4 md:p-6 max-w-3xl space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h1 className="font-display text-2xl md:text-3xl">Support</h1>
          <button onClick={() => setNewOpen(true)} className="rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium inline-flex items-center gap-2"><Plus className="h-4 w-4" /> New Ticket</button>
        </div>

        <div className="rounded-2xl border bg-card shadow-card divide-y">
          {tickets.map((t) => (
            <div key={t.id} className="p-4 flex items-center justify-between gap-3">
              <div>
                <div className="font-medium">{t.subject}</div>
                <div className="text-xs text-muted-foreground">{t.id} · Updated {t.updated}</div>
              </div>
              <span className={`text-xs px-2.5 py-0.5 rounded-full ${t.status === "Open" ? "bg-amber-100 text-amber-800" : "bg-muted text-muted-foreground"}`}>{t.status}</span>
            </div>
          ))}
        </div>

        {newOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-end md:items-center justify-center p-0 md:p-4" onClick={() => setNewOpen(false)}>
            <div onClick={(e) => e.stopPropagation()} className="bg-background rounded-t-3xl md:rounded-2xl w-full md:max-w-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xl">New ticket</h3>
                <button onClick={() => setNewOpen(false)} className="h-8 w-8 rounded-full hover:bg-muted inline-flex items-center justify-center"><X className="h-4 w-4" /></button>
              </div>
              <div className="space-y-3">
                <select className="w-full rounded-lg border px-3 py-2 text-sm bg-background"><option>Order issue</option><option>Payment</option><option>Other</option></select>
                <input placeholder="Subject" className="w-full rounded-lg border px-3 py-2 text-sm" />
                <textarea rows={4} placeholder="Describe your issue…" className="w-full rounded-lg border px-3 py-2 text-sm" />
                <button className="text-xs text-primary inline-flex items-center gap-1"><Paperclip className="h-3 w-3" /> Attach file</button>
                <button className="w-full rounded-full bg-primary text-primary-foreground py-2.5 font-medium hover:bg-primary-deep">Submit</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating chat */}
      <button onClick={() => setChatOpen(true)} className="fixed bottom-24 lg:bottom-8 right-4 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-card-hover inline-flex items-center justify-center z-30 hover:bg-primary-deep">
        <MessageCircle className="h-6 w-6" />
      </button>
      {chatOpen && (
        <div className="fixed bottom-0 right-0 lg:bottom-4 lg:right-4 w-full lg:w-96 h-[80vh] lg:h-[500px] bg-background border lg:rounded-2xl shadow-card-hover z-40 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground lg:rounded-t-2xl">
            <div>
              <div className="font-display">Live support</div>
              <div className="text-xs opacity-80">Avg reply 2 min</div>
            </div>
            <button onClick={() => setChatOpen(false)} className="h-8 w-8 rounded-full hover:bg-white/20 inline-flex items-center justify-center"><X className="h-4 w-4" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <Msg agent>Hi Ahmed! How can we help today?</Msg>
            <Msg>I haven't seen QC photos for WH-4421 yet.</Msg>
            <Msg agent>Our QC team is scheduled to inspect it today by 5 PM SGT. We'll notify you the moment it's done.</Msg>
          </div>
          <div className="p-3 border-t flex gap-2">
            <input placeholder="Type a message…" className="flex-1 rounded-full border px-4 py-2 text-sm focus:outline-none focus:border-primary" />
            <button className="h-10 w-10 rounded-full bg-primary text-primary-foreground inline-flex items-center justify-center"><Send className="h-4 w-4" /></button>
          </div>
        </div>
      )}
    </AppShell>
  );
}

function Msg({ children, agent }: { children: React.ReactNode; agent?: boolean }) {
  return (
    <div className={`flex ${agent ? "justify-start" : "justify-end"}`}>
      <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${agent ? "bg-muted" : "bg-primary text-primary-foreground"}`}>{children}</div>
    </div>
  );
}
