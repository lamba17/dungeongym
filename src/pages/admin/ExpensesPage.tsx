import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { generateExpenses, getExpensesByMonth, getExpensesByCategory, filterByMonths } from "@/lib/mockData";

const COLORS = ["hsl(358,95%,45%)", "hsl(358,60%,30%)", "hsl(0,0%,40%)", "hsl(358,80%,55%)", "hsl(0,0%,25%)"];
const tooltipStyle = { contentStyle: { background: "hsl(0,0%,5%)", border: "1px solid hsl(0,0%,12%)", borderRadius: 12, fontSize: 12 }, itemStyle: { color: "hsl(0,0%,96%)" } };

const ExpensesPage = () => {
  const { timeFilter } = useOutletContext<{ timeFilter: number }>();

  const data = useMemo(() => {
    const expenses = generateExpenses();
    const byMonth = filterByMonths(getExpensesByMonth(expenses), timeFilter);
    const byCategory = getExpensesByCategory(expenses);
    const totalExpenses = byMonth.reduce((s, e) => s + e.total, 0);
    return { byMonth, byCategory, totalExpenses };
  }, [timeFilter]);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-xl p-5 inline-block">
        <p className="text-xs text-muted-foreground font-body">Total Expenses</p>
        <p className="text-3xl font-heading text-primary">₹{data.totalExpenses.toLocaleString()}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-heading text-sm uppercase tracking-wider text-foreground mb-4">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie data={data.byCategory} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={110} innerRadius={60} strokeWidth={0}>
                {data.byCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, color: "hsl(0,0%,55%)" }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-heading text-sm uppercase tracking-wider text-foreground mb-4">Monthly Expenses</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data.byMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,12%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="total" fill="hsl(358,60%,30%)" radius={[6, 6, 0, 0]} name="Expenses (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default ExpensesPage;
