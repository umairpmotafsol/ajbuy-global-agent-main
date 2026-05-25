import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/ajbuy/AdminShell";
import { adminUsers } from "@/lib/mock-data";
import { StatusBadge } from "@/components/ajbuy/StatusBadge";

export const Route = createFileRoute("/admin/users")({ component: AdminUsers });

function AdminUsers() {
  return (
    <AdminShell>
      <h1 className="font-display text-2xl md:text-3xl">Users</h1>
      <div className="mt-5 rounded-2xl border bg-card shadow-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="text-left p-3">Name</th><th className="text-left p-3">Email</th>
              <th className="text-left p-3">Country</th><th className="text-left p-3">KYC</th>
              <th className="text-right p-3">Wallet</th><th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {adminUsers.map((u) => (
              <tr key={u.email} className="hover:bg-muted/30">
                <td className="p-3 font-medium">{u.name}</td>
                <td className="p-3 text-muted-foreground">{u.email}</td>
                <td className="p-3">{u.country}</td>
                <td className="p-3"><StatusBadge status={u.kyc} /></td>
                <td className="p-3 text-right">${u.wallet.toFixed(2)}</td>
                <td className="p-3 text-right text-xs">
                  <button className="text-primary hover:underline mr-3">View</button>
                  <button className="text-red-600 hover:underline">Suspend</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
