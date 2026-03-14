import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Smartphone, Check, IndianRupee } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const MakePayment = () => {
  const { member, makePayment } = useAuth();
  const [method, setMethod] = useState<"upi" | "card">("upi");
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!member) return null;

  const hasPending = member.payments.some((p) => p.status === "Pending");

  const handlePay = () => {
    setProcessing(true);
    // Simulate Razorpay payment
    setTimeout(() => {
      makePayment(method === "upi" ? "UPI" : "Card");
      setProcessing(false);
      setDone(true);
      toast({ title: "Payment Successful!", description: `₹${member.fee.toLocaleString()} paid via ${method === "upi" ? "UPI" : "Card"}` });
      setTimeout(() => navigate("/member/dashboard"), 2000);
    }, 2000);
  };

  if (done) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
          <div className="w-20 h-20 bg-green-500/15 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="font-heading text-2xl text-foreground uppercase tracking-wider mb-2">Payment Successful</h2>
          <p className="text-muted-foreground font-body text-sm">₹{member.fee.toLocaleString()} paid successfully</p>
          <p className="text-muted-foreground font-body text-xs mt-1">Redirecting to dashboard...</p>
        </motion.div>
      </div>
    );
  }

  if (!hasPending) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="w-20 h-20 bg-green-500/15 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="font-heading text-xl text-foreground uppercase tracking-wider mb-2">All Caught Up!</h2>
          <p className="text-muted-foreground font-body text-sm">You have no pending payments</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-heading text-xl text-foreground uppercase tracking-wider mb-6">Make Payment</h2>

        {/* Amount */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">Amount Due</p>
          <div className="flex items-center gap-2">
            <IndianRupee className="w-6 h-6 text-primary" />
            <span className="font-heading text-3xl text-foreground">{member.fee.toLocaleString()}</span>
          </div>
          <p className="text-xs text-muted-foreground font-body mt-2">{member.plan} Plan</p>
        </div>

        {/* Payment Method */}
        <div className="space-y-3 mb-6">
          <p className="text-sm text-muted-foreground font-body">Select Payment Method</p>
          <button
            onClick={() => setMethod("upi")}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
              method === "upi" ? "border-primary bg-primary/10 red-border-glow" : "border-border bg-card hover:border-muted-foreground/30"
            }`}
          >
            <Smartphone className={`w-5 h-5 ${method === "upi" ? "text-primary" : "text-muted-foreground"}`} />
            <div className="text-left">
              <p className="font-heading text-sm text-foreground">UPI Payment</p>
              <p className="text-xs text-muted-foreground font-body">Google Pay, PhonePe, Paytm</p>
            </div>
            {method === "upi" && <Check className="w-4 h-4 text-primary ml-auto" />}
          </button>

          <button
            onClick={() => setMethod("card")}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
              method === "card" ? "border-primary bg-primary/10 red-border-glow" : "border-border bg-card hover:border-muted-foreground/30"
            }`}
          >
            <CreditCard className={`w-5 h-5 ${method === "card" ? "text-primary" : "text-muted-foreground"}`} />
            <div className="text-left">
              <p className="font-heading text-sm text-foreground">Credit / Debit Card</p>
              <p className="text-xs text-muted-foreground font-body">Visa, Mastercard, RuPay</p>
            </div>
            {method === "card" && <Check className="w-4 h-4 text-primary ml-auto" />}
          </button>
        </div>

        <button
          onClick={handlePay}
          disabled={processing}
          className="w-full btn-primary-premium py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? "Processing..." : `Pay ₹${member.fee.toLocaleString()}`}
        </button>

        <p className="text-center text-muted-foreground text-[10px] font-body mt-4">
          🔒 Powered by Razorpay (Demo Mode)
        </p>
      </motion.div>
    </div>
  );
};

export default MakePayment;
