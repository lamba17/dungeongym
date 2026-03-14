import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, IndianRupee, Receipt, BarChart3, CreditCard } from "lucide-react";

const links = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/members", icon: Users, label: "Members" },
  { to: "/admin/revenue", icon: IndianRupee, label: "Revenue" },
  { to: "/admin/expenses", icon: Receipt, label: "Expenses" },
  { to: "/admin/payments", icon: CreditCard, label: "Payments" },
  { to: "/admin/analytics", icon: BarChart3, label: "Analytics" },
];

const AdminSidebar = () => (
  <aside className="w-56 shrink-0 bg-card border-r border-border min-h-screen flex flex-col">
    <div className="px-5 py-5 border-b border-border">
      <h1 className="font-heading text-xl text-foreground uppercase tracking-wider">
        Dungeon <span className="text-primary">Gym</span>
      </h1>
      <p className="text-[10px] text-muted-foreground font-body mt-0.5">Admin Panel</p>
    </div>
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
    <div className="px-5 py-4 border-t border-border">
      <a href="/" className="text-xs text-muted-foreground hover:text-primary transition-colors font-body">
        ← Back to Website
      </a>
    </div>
  </aside>
);

export default AdminSidebar;
