import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, Phone, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const MemberLogin = () => {
  const [mode, setMode] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginMember, loginMemberPhone } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    let success = false;
    if (mode === "email") {
      success = loginMember(email, password);
    } else {
      success = loginMemberPhone(phone, password);
    }
    if (success) {
      navigate("/member/dashboard");
    } else {
      setError("Invalid credentials. Try any member email (e.g. arjun@email.com) with password: member123");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="font-heading text-3xl uppercase tracking-wider">
            <span className="text-gradient">Dungeon</span> <span className="text-foreground">Gym</span>
          </Link>
          <p className="text-muted-foreground mt-2 font-body text-sm">Member Portal Login</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 red-border-glow">
          {/* Mode toggle */}
          <div className="flex mb-6 bg-secondary rounded-lg p-1">
            <button
              onClick={() => setMode("email")}
              className={`flex-1 py-2 text-sm font-heading uppercase tracking-wider rounded-md transition-colors ${mode === "email" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              Email
            </button>
            <button
              onClick={() => setMode("phone")}
              className={`flex-1 py-2 text-sm font-heading uppercase tracking-wider rounded-md transition-colors ${mode === "phone" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              Phone
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 rounded-lg p-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {mode === "email" ? (
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block font-body">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="arjun@email.com"
                    required
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block font-body">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="+91 9XXXXXXXXX"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block font-body">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full btn-primary-premium py-3 text-sm">Login</button>
          </form>

          <p className="text-center text-muted-foreground text-xs mt-5 font-body">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">Sign Up</Link>
          </p>
        </div>

        <p className="text-center text-muted-foreground text-xs mt-6 font-body">
          Demo: arjun@email.com / member123
        </p>
      </motion.div>
    </div>
  );
};

export default MemberLogin;
