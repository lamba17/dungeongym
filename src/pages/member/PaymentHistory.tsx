import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const PaymentHistory = () => {
  const { member } = useAuth();
  if (!member) return null;

  const payments = [...member.payments].reverse();
  const totalPaid = payments.filter((p) => p.status === "Paid").reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-heading text-xl text-foreground uppercase tracking-wider mb-6">Payment History</h2>

        <div className="bg-card border border-border rounded-2xl p-5 mb-6">
          <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">Total Paid</p>
          <p className="font-heading text-2xl text-foreground">₹{totalPaid.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground font-body mt-1">{payments.filter((p) => p.status === "Paid").length} transactions</p>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-xs font-heading text-muted-foreground uppercase tracking-wider">Date</th>
                <th className="text-left px-5 py-3 text-xs font-heading text-muted-foreground uppercase tracking-wider">Amount</th>
                <th className="text-left px-5 py-3 text-xs font-heading text-muted-foreground uppercase tracking-wider">Method</th>
                <th className="text-left px-5 py-3 text-xs font-heading text-muted-foreground uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                  <td className="px-5 py-3 text-sm text-foreground font-body">{new Date(p.date).toLocaleDateString("en-IN")}</td>
                  <td className="px-5 py-3 text-sm text-foreground font-heading">₹{p.amount.toLocaleString()}</td>
                  <td className="px-5 py-3 text-sm text-muted-foreground font-body">{p.method || "—"}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-body px-2.5 py-1 rounded-full ${
                      p.status === "Paid" ? "bg-green-500/15 text-green-400" : "bg-yellow-500/15 text-yellow-400"
                    }`}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentHistory;
