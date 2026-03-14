import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) navigate("/admin");
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="font-heading text-lg text-foreground uppercase tracking-wider">
            Dungeon <span className="text-primary">Analytics</span>
          </h2>
          <button
            onClick={() => { logout(); navigate("/admin"); }}
            className="text-xs text-muted-foreground hover:text-primary transition-colors font-body"
          >
            Logout
          </button>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
