import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(email, password)) {
      navigate("/admin/dashboard");
    } else {
      setError("Invalid credentials. Try admin@dungeongym.com / dungeon2025");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl text-foreground uppercase tracking-wider">
            Dungeon <span className="text-primary">Gym</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-body text-sm">Admin Dashboard Login</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 red-border-glow">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 rounded-lg p-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block font-body">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="admin@dungeongym.com" required />
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block font-body">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="••••••••" required />
              </div>
            </div>

            <button type="submit" className="w-full btn-primary-premium py-3 text-sm">Login</button>
          </form>
        </div>

        <p className="text-center text-muted-foreground text-xs mt-6 font-body">
          Demo: admin@dungeongym.com / dungeon2025
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
