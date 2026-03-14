import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import MemberLogin from "./pages/MemberLogin";
import MemberSignup from "./pages/MemberSignup";
import AdminLayout from "./components/admin/AdminLayout";
import MemberLayout from "./components/member/MemberLayout";
import DashboardHome from "./pages/admin/DashboardHome";
import MembersPage from "./pages/admin/MembersPage";
import RevenuePage from "./pages/admin/RevenuePage";
import ExpensesPage from "./pages/admin/ExpensesPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import PendingPaymentsPage from "./pages/admin/PendingPaymentsPage";
import MemberDashboard from "./pages/member/MemberDashboard";
import MakePayment from "./pages/member/MakePayment";
import PaymentHistory from "./pages/member/PaymentHistory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/login" element={<MemberLogin />} />
            <Route path="/signup" element={<MemberSignup />} />
            <Route path="/admin" element={<AdminLogin />} />

            {/* Member Portal */}
            <Route path="/member" element={<MemberLayout />}>
              <Route path="dashboard" element={<MemberDashboard />} />
              <Route path="pay" element={<MakePayment />} />
              <Route path="history" element={<PaymentHistory />} />
            </Route>

            {/* Admin Dashboard */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<DashboardHome />} />
              <Route path="members" element={<MembersPage />} />
              <Route path="revenue" element={<RevenuePage />} />
              <Route path="expenses" element={<ExpensesPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="payments" element={<PendingPaymentsPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
