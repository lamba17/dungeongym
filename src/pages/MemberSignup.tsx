import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Phone, Lock, AlertCircle, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const planOptions = [
  { name: "Monthly", price: "₹1,500/mo", desc: "Flexible month-to-month" },
  { name: "Quarterly", price: "₹4,000/3mo", desc: "Save ₹500" },
  { name: "Half-Yearly", price: "₹7,500/6mo", desc: "Save ₹1,500" },
  { name: "Annual", price: "₹13,000/yr", desc: "Best value — Save ₹5,000" },
];

const MemberSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState("Monthly");
  const [error, setError] = useState("");
  const { signupMember } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    const success = signupMember({ name, email, phone, password, plan });
    if (success) {
      navigate("/member/dashboard");
    } else {
      setError("An account with this email already exists");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link to="/" className="font-heading text-3xl uppercase tracking-wider">
            <span className="text-gradient">Dungeon</span> <span className="text-foreground">Gym</span>
          </Link>
          <p className="text-muted-foreground mt-2 font-body text-sm">Join the Dungeon — Sign Up</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 red-border-glow">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 rounded-lg p-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block font-body">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Your Name" required />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block font-body">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="you@email.com" required />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block font-body">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="+91 9XXXXXXXXX" required />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block font-body">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Min 6 characters" required />
              </div>
            </div>

            {/* Plan selection */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block font-body">Select Membership Plan</label>
              <div className="grid grid-cols-2 gap-3">
                {planOptions.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setPlan(p.name)}
                    className={`relative text-left p-3 rounded-xl border transition-all ${
                      plan === p.name
                        ? "border-primary bg-primary/10 red-border-glow"
                        : "border-border bg-secondary hover:border-muted-foreground/30"
                    }`}
                  >
                    {plan === p.name && (
                      <Check className="absolute top-2 right-2 w-4 h-4 text-primary" />
                    )}
                    <p className="font-heading text-sm text-foreground">{p.name}</p>
                    <p className="text-primary font-heading text-xs mt-0.5">{p.price}</p>
                    <p className="text-muted-foreground text-[10px] font-body mt-0.5">{p.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="w-full btn-primary-premium py-3 text-sm">Create Account</button>
          </form>

          <p className="text-center text-muted-foreground text-xs mt-5 font-body">
            Already a member?{" "}
            <Link to="/login" className="text-primary hover:underline">Login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default MemberSignup;
