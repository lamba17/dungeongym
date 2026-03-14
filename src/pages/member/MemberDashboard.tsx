import { motion } from "framer-motion";
import { Calendar, CreditCard, Clock, IndianRupee } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const MemberDashboard = () => {
  const { member } = useAuth();
  if (!member) return null;

  const hasPending = member.payments.some((p) => p.status === "Pending");
  const lastPaid = [...member.payments].filter((p) => p.status === "Paid").sort((a, b) => b.date.localeCompare(a.date))[0];
  const daysUntilExpiry = Math.max(0, Math.ceil((new Date(member.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

  const cards = [
    { label: "Membership Plan", value: member.plan, icon: CreditCard, color: "text-primary" },
    { label: "Join Date", value: new Date(member.joinDate).toLocaleDateString("en-IN"), icon: Calendar, color: "text-blue-400" },
    { label: "Expiry Date", value: new Date(member.expiryDate).toLocaleDateString("en-IN"), icon: Clock, color: daysUntilExpiry < 15 ? "text-yellow-400" : "text-green-400" },
    { label: "Monthly Fee", value: `₹${member.fee.toLocaleString()}`, icon: IndianRupee, color: "text-primary" },
  ];

  return (
    <div className="space-y-6">
      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-2xl p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <card.icon className={`w-5 h-5 ${card.color}`} />
              <span className="text-xs text-muted-foreground font-body uppercase tracking-wider">{card.label}</span>
            </div>
            <p className="font-heading text-xl text-foreground">{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Payment Alert */}
      {hasPending && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-primary/10 border border-primary/30 rounded-2xl p-6 red-border-glow"
        >
          <h3 className="font-heading text-lg text-foreground uppercase tracking-wider mb-2">Payment Due</h3>
          <p className="text-muted-foreground text-sm font-body mb-4">
            Your membership payment of ₹{member.fee.toLocaleString()} is pending. Pay now to keep your membership active.
          </p>
          <Link to="/member/pay" className="btn-primary-premium text-xs py-2.5 px-6 inline-block">
            Pay Now
          </Link>
        </motion.div>
      )}

      {/* Membership Status */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-heading text-sm uppercase tracking-wider text-foreground mb-4">Membership Status</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted-foreground font-body">Status</p>
            <p className={`font-heading text-lg ${
              member.status === "Active" ? "text-green-400" :
              member.status === "Expiring Soon" ? "text-yellow-400" : "text-destructive"
            }`}>{member.status}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-body">Days Remaining</p>
            <p className="font-heading text-lg text-foreground">{daysUntilExpiry} days</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-body">Last Payment</p>
            <p className="font-heading text-lg text-foreground">
              {lastPaid ? new Date(lastPaid.date).toLocaleDateString("en-IN") : "—"}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Recent Payments */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-sm uppercase tracking-wider text-foreground">Recent Payments</h3>
          <Link to="/member/history" className="text-xs text-primary hover:underline font-body">View All →</Link>
        </div>
        <div className="space-y-2">
          {member.payments.slice(-3).reverse().map((p) => (
            <div key={p.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div>
                <p className="text-sm text-foreground font-body">{new Date(p.date).toLocaleDateString("en-IN")}</p>
                <p className="text-xs text-muted-foreground font-body">{p.method || "—"}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-foreground font-heading">₹{p.amount.toLocaleString()}</p>
                <span className={`text-[10px] font-body px-2 py-0.5 rounded-full ${
                  p.status === "Paid" ? "bg-green-500/15 text-green-400" : "bg-yellow-500/15 text-yellow-400"
                }`}>{p.status}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MemberDashboard;
