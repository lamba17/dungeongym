import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  generateMembers, generatePayments, generateExpenses,
  getMembersByMonth, getRevenueByMonth, getExpensesByMonth,
  getAttritionByMonth, filterByMonths,
} from "@/lib/mockData";

const tooltipStyle = { contentStyle: { background: "hsl(0,0%,5%)", border: "1px solid hsl(0,0%,12%)", borderRadius: 12, fontSize: 12 }, itemStyle: { color: "hsl(0,0%,96%)" } };

const AnalyticsPage = () => {
  const { timeFilter } = useOutletContext<{ timeFilter: number }>();

  const data = useMemo(() => {
    const members = generateMembers();
    const payments = generatePayments(members);
    const expenses = generateExpenses();
    const revenueByMonth = filterByMonths(getRevenueByMonth(payments), timeFilter);
    const expensesByMonth = filterByMonths(getExpensesByMonth(expenses), timeFilter);
    const growthByMonth = filterByMonths(getMembersByMonth(members), timeFilter);
    const attrition = filterByMonths(getAttritionByMonth(members), timeFilter);

    const profitByMonth = revenueByMonth.map((r) => {
      const exp = expensesByMonth.find((e) => e.month === r.month);
      return { month: r.month, revenue: r.revenue, expenses: exp?.total || 0, profit: r.revenue - (exp?.total || 0) };
    });

    // Cumulative members
    let cumulative = 0;
    const cumulativeGrowth = growthByMonth.map((g) => {
      cumulative += g.count;
      return { month: g.month, total: cumulative };
    });

    return { profitByMonth, cumulativeGrowth, attrition };
  }, [timeFilter]);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-5">
        <h3 className="font-heading text-sm uppercase tracking-wider text-foreground mb-4">Revenue vs Expenses vs Profit</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data.profitByMonth}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,12%)" />
            <XAxis dataKey="month" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
            <YAxis tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey="revenue" fill="hsl(358,95%,45%)" radius={[4, 4, 0, 0]} name="Revenue (₹)" />
            <Bar dataKey="expenses" fill="hsl(0,0%,30%)" radius={[4, 4, 0, 0]} name="Expenses (₹)" />
            <Bar dataKey="profit" fill="hsl(358,80%,55%)" radius={[4, 4, 0, 0]} name="Profit (₹)" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-heading text-sm uppercase tracking-wider text-foreground mb-4">Cumulative Membership</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.cumulativeGrowth}>
              <defs>
                <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(358,95%,45%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(358,95%,45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,12%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
              <Tooltip {...tooltipStyle} />
              <Area type="monotone" dataKey="total" stroke="hsl(358,95%,45%)" fill="url(#cg)" strokeWidth={2} name="Total Members" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-heading text-sm uppercase tracking-wider text-foreground mb-4">Attrition Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.attrition}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,12%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} unit="%" />
              <Tooltip {...tooltipStyle} />
              <Line type="monotone" dataKey="rate" stroke="hsl(358,80%,55%)" strokeWidth={2} dot={{ r: 4, fill: "hsl(358,95%,45%)" }} name="Attrition (%)" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
