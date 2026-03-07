import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState(12);

  useEffect(() => {
    if (sessionStorage.getItem("dungeon_admin") !== "true") {
      navigate("/admin");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="font-heading text-lg text-foreground uppercase tracking-wider">
            Dungeon <span className="text-primary">Analytics</span>
          </h2>
          <div className="flex items-center gap-3">
            <label className="text-xs text-muted-foreground font-body">Period:</label>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(Number(e.target.value))}
              className="bg-secondary border border-border rounded-lg px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value={1}>Last 30 Days</option>
              <option value={3}>Last 3 Months</option>
              <option value={6}>Last 6 Months</option>
              <option value={12}>Last 12 Months</option>
            </select>
            <button
              onClick={() => {
                sessionStorage.removeItem("dungeon_admin");
                navigate("/admin");
              }}
              className="text-xs text-muted-foreground hover:text-primary transition-colors font-body"
            >
              Logout
            </button>
          </div>
        </header>
        <div className="p-6">
          <Outlet context={{ timeFilter }} />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
