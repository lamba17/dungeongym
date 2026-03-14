import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart,
} from "recharts";
import {
  generateMembers, generatePayments, generateExpenses,
  getMembersByMonth, getRevenueByMonth, getExpensesByMonth,
  getExpensesByCategory, getMemberStatusDistribution, filterByMonths,
} from "@/lib/mockData";
import { useAuth } from "@/contexts/AuthContext";

const COLORS = ["hsl(358,95%,45%)", "hsl(358,60%,30%)", "hsl(0,0%,40%)", "hsl(358,80%,55%)", "hsl(0,0%,25%)"];

const ChartCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-card border border-border rounded-2xl p-5"
  >
    <h3 className="font-heading text-sm uppercase tracking-wider text-foreground mb-4">{title}</h3>
    {children}
  </motion.div>
);

const DashboardHome = () => {
  const [timeFilter, setTimeFilter] = useState(12);
  const { allMembers } = useAuth();

  const totalMembers = allMembers.length;
  const activeMembers = allMembers.filter((m) => m.status === "Active").length;
  const newThisMonth = allMembers.filter((m) => {
    const now = new Date();
    const join = new Date(m.joinDate);
    return join.getMonth() === now.getMonth() && join.getFullYear() === now.getFullYear();
  }).length;
  const expired = allMembers.filter((m) => m.status === "Expired").length;

  const data = useMemo(() => {
    const members = generateMembers();
    const payments = generatePayments(members);
    const expenses = generateExpenses();
    const membersByMonth = filterByMonths(getMembersByMonth(members), timeFilter);
    const revenueByMonth = filterByMonths(getRevenueByMonth(payments), timeFilter);
    const expensesByMonth = filterByMonths(getExpensesByMonth(expenses), timeFilter);
    const expensesByCategory = getExpensesByCategory(expenses);
    const memberStatus = getMemberStatusDistribution(members);

    // Profit
    const profitByMonth = revenueByMonth.map((r) => {
      const exp = expensesByMonth.find((e) => e.month === r.month);
      return { month: r.month, profit: r.revenue - (exp?.total || 0) };
    });

    return { membersByMonth, revenueByMonth, expensesByMonth, expensesByCategory, memberStatus, profitByMonth };
  }, [timeFilter]);

  const tooltipStyle = { contentStyle: { background: "hsl(0,0%,5%)", border: "1px solid hsl(0,0%,12%)", borderRadius: 12, fontSize: 12 }, itemStyle: { color: "hsl(0,0%,96%)" } };

  return (
    <div className="space-y-6">
      {/* Row 1: Growth + Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Membership Growth">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data.membersByMonth}>
              <defs>
                <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(358,95%,45%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(358,95%,45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,12%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
              <Tooltip {...tooltipStyle} />
              <Area type="monotone" dataKey="count" stroke="hsl(358,95%,45%)" fill="url(#growthGrad)" strokeWidth={2} name="New Members" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Revenue Trend">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.revenueByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,12%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="revenue" fill="hsl(358,95%,45%)" radius={[6, 6, 0, 0]} name="Revenue (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 2: Expenses Pie + Profit */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Expense Breakdown">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={data.expensesByCategory} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={100} innerRadius={50} strokeWidth={0}>
                {data.expensesByCategory.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, color: "hsl(0,0%,55%)" }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Profit Trend">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={data.profitByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,12%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
              <Tooltip {...tooltipStyle} />
              <Line type="monotone" dataKey="profit" stroke="hsl(358,80%,55%)" strokeWidth={2} dot={{ r: 4, fill: "hsl(358,95%,45%)" }} name="Profit (₹)" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 3: Member Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Member Status Distribution">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={data.memberStatus} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={100} innerRadius={60} strokeWidth={0}>
                <Cell fill="hsl(358,95%,45%)" />
                <Cell fill="hsl(0,0%,30%)" />
                <Cell fill="hsl(358,60%,30%)" />
              </Pie>
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, color: "hsl(0,0%,55%)" }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Monthly Expenses">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.expensesByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,12%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="total" fill="hsl(358,60%,30%)" radius={[6, 6, 0, 0]} name="Expenses (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default DashboardHome;
