import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { AlertTriangle } from "lucide-react";

const PendingPaymentsPage = () => {
  const { allMembers } = useAuth();

  const pendingMembers = allMembers.filter((m) =>
    m.payments.some((p) => p.status === "Pending")
  );

  const activeMembers = allMembers.filter((m) => m.status === "Active");
  const expiringSoon = allMembers.filter((m) => m.status === "Expiring Soon");

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-heading text-xl text-foreground uppercase tracking-wider mb-6">Payment Tracking</h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-card border border-border rounded-2xl p-5">
            <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">Pending Payments</p>
            <p className="font-heading text-2xl text-yellow-400">{pendingMembers.length}</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">Active Members</p>
            <p className="font-heading text-2xl text-green-400">{activeMembers.length}</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">Expiring Soon</p>
            <p className="font-heading text-2xl text-primary">{expiringSoon.length}</p>
          </div>
        </div>

        {/* Pending Payments Alert */}
        {pendingMembers.length > 0 && (
          <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <h3 className="font-heading text-sm text-yellow-400 uppercase tracking-wider">Pending Payments</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {pendingMembers.map((m) => (
                <span key={m.id} className="text-xs font-body bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-3 py-1.5 rounded-full">
                  {m.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Payment Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-xs font-heading text-muted-foreground uppercase tracking-wider">Member</th>
                <th className="text-left px-5 py-3 text-xs font-heading text-muted-foreground uppercase tracking-wider">Plan</th>
                <th className="text-left px-5 py-3 text-xs font-heading text-muted-foreground uppercase tracking-wider">Monthly Fee</th>
                <th className="text-left px-5 py-3 text-xs font-heading text-muted-foreground uppercase tracking-wider">Last Payment</th>
                <th className="text-left px-5 py-3 text-xs font-heading text-muted-foreground uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {allMembers.map((m) => {
                const lastPaid = [...m.payments].filter((p) => p.status === "Paid").sort((a, b) => b.date.localeCompare(a.date))[0];
                const isPending = m.payments.some((p) => p.status === "Pending");
                return (
                  <tr key={m.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                    <td className="px-5 py-3">
                      <p className="text-sm text-foreground font-body">{m.name}</p>
                      <p className="text-[10px] text-muted-foreground font-body">{m.phone}</p>
                    </td>
                    <td className="px-5 py-3 text-sm text-muted-foreground font-body">{m.plan}</td>
                    <td className="px-5 py-3 text-sm text-foreground font-heading">₹{m.fee.toLocaleString()}</td>
                    <td className="px-5 py-3 text-sm text-muted-foreground font-body">
                      {lastPaid ? new Date(lastPaid.date).toLocaleDateString("en-IN") : "—"}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-body px-2.5 py-1 rounded-full ${
                        isPending ? "bg-yellow-500/15 text-yellow-400" : "bg-green-500/15 text-green-400"
                      }`}>
                        {isPending ? "Pending" : "Paid"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default PendingPaymentsPage;
