import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MemberSidebar from "./MemberSidebar";

const MemberLayout = () => {
  const { member } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!member) navigate("/login");
  }, [member, navigate]);

  if (!member) return null;

  return (
    <div className="min-h-screen bg-background flex">
      <MemberSidebar />
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="font-heading text-lg text-foreground uppercase tracking-wider">
            Member <span className="text-primary">Portal</span>
          </h2>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-body px-3 py-1 rounded-full ${
              member.status === "Active" ? "bg-green-500/15 text-green-400 border border-green-500/30" :
              member.status === "Expiring Soon" ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30" :
              "bg-destructive/15 text-destructive border border-destructive/30"
            }`}>
              {member.status}
            </span>
          </div>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MemberLayout;
