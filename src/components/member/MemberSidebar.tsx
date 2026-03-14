import { NavLink } from "react-router-dom";
import { LayoutDashboard, CreditCard, Receipt, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const links = [
  { to: "/member/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/member/pay", icon: CreditCard, label: "Make Payment" },
  { to: "/member/history", icon: Receipt, label: "Payment History" },
];

const MemberSidebar = () => {
  const { member, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="w-56 shrink-0 bg-card border-r border-border min-h-screen flex flex-col">
      <div className="px-5 py-5 border-b border-border">
        <h1 className="font-heading text-xl text-foreground uppercase tracking-wider">
          Dungeon <span className="text-primary">Gym</span>
        </h1>
        <p className="text-[10px] text-muted-foreground font-body mt-0.5">Member Portal</p>
      </div>

      {member && (
        <div className="px-5 py-4 border-b border-border">
          <p className="font-heading text-sm text-foreground truncate">{member.name}</p>
          <p className="text-[10px] text-muted-foreground font-body">{member.plan} Plan</p>
        </div>
      )}

      <nav className="flex-1 py-4 space-y-1 px-3">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition-colors ${
                isActive
                  ? "bg-primary/15 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-2">
        <button
          onClick={() => { logout(); navigate("/"); }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      <div className="px-5 py-4 border-t border-border">
        <a href="/" className="text-xs text-muted-foreground hover:text-primary transition-colors font-body">
          ← Back to Website
        </a>
      </div>
    </aside>
  );
};

export default MemberSidebar;
