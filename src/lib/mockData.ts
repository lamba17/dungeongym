// Mock data simulating Google Sheets data for Dungeon Gym

export interface Member {
  name: string;
  phone: string;
  plan: string;
  joinDate: string;
  expiryDate: string;
  fee: number;
  status: "Active" | "Expired" | "Expiring Soon";
}

export interface Payment {
  member: string;
  amount: number;
  date: string;
  plan: string;
}

export interface Expense {
  expense: string;
  category: string;
  amount: number;
  date: string;
}

const plans = ["Monthly", "Quarterly", "Half-Yearly", "Annual"];
const expenseCategories = ["Rent", "Equipment", "Staff Salaries", "Maintenance", "Marketing"];
const firstNames = ["Arjun", "Priya", "Rahul", "Sneha", "Vikram", "Anita", "Karan", "Meera", "Rohit", "Divya", "Amit", "Pooja", "Suresh", "Kavita", "Nikhil", "Ritu", "Deepak", "Swati", "Manish", "Neha", "Raj", "Simran", "Aditya", "Nisha", "Gaurav", "Pallavi", "Sanjay", "Komal", "Varun", "Anjali", "Vishal", "Shweta", "Tushar", "Megha", "Pankaj", "Rashi", "Sachin", "Tanvi", "Harsh", "Preeti"];

function randomDate(start: Date, end: Date): string {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString().split("T")[0];
}

function addMonths(date: string, months: number): string {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d.toISOString().split("T")[0];
}

function planMonths(plan: string): number {
  switch (plan) {
    case "Monthly": return 1;
    case "Quarterly": return 3;
    case "Half-Yearly": return 6;
    case "Annual": return 12;
    default: return 1;
  }
}

function planFee(plan: string): number {
  switch (plan) {
    case "Monthly": return 1500;
    case "Quarterly": return 4000;
    case "Half-Yearly": return 7500;
    case "Annual": return 13000;
    default: return 1500;
  }
}

// Generate members
export function generateMembers(): Member[] {
  const now = new Date();
  return firstNames.map((name, i) => {
    const plan = plans[i % plans.length];
    const joinDate = randomDate(new Date("2024-01-01"), new Date("2025-12-01"));
    const expiryDate = addMonths(joinDate, planMonths(plan));
    const expiry = new Date(expiryDate);
    let status: Member["status"] = "Active";
    if (expiry < now) status = "Expired";
    else if (expiry.getTime() - now.getTime() < 15 * 24 * 60 * 60 * 1000) status = "Expiring Soon";
    return {
      name,
      phone: `+91 ${9000000000 + Math.floor(Math.random() * 999999999)}`,
      plan,
      joinDate,
      expiryDate,
      fee: planFee(plan),
      status,
    };
  });
}

// Generate payments from members
export function generatePayments(members: Member[]): Payment[] {
  return members.map((m) => ({
    member: m.name,
    amount: m.fee,
    date: m.joinDate,
    plan: m.plan,
  }));
}

// Generate expenses over 12 months
export function generateExpenses(): Expense[] {
  const expenses: Expense[] = [];
  for (let m = 0; m < 12; m++) {
    const month = new Date(2025, m, 15).toISOString().split("T")[0];
    expenses.push(
      { expense: "Monthly Rent", category: "Rent", amount: 25000 + Math.floor(Math.random() * 5000), date: month },
      { expense: "Equipment Purchase", category: "Equipment", amount: 5000 + Math.floor(Math.random() * 15000), date: month },
      { expense: "Staff Payment", category: "Staff Salaries", amount: 30000 + Math.floor(Math.random() * 10000), date: month },
      { expense: "Gym Maintenance", category: "Maintenance", amount: 2000 + Math.floor(Math.random() * 3000), date: month },
      { expense: "Social Media Ads", category: "Marketing", amount: 3000 + Math.floor(Math.random() * 7000), date: month },
    );
  }
  return expenses;
}

// Aggregate helpers
export function getMembersByMonth(members: Member[]) {
  const map: Record<string, number> = {};
  members.forEach((m) => {
    const key = m.joinDate.substring(0, 7); // YYYY-MM
    map[key] = (map[key] || 0) + 1;
  });
  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, count]) => ({ month, count }));
}

export function getRevenueByMonth(payments: Payment[]) {
  const map: Record<string, number> = {};
  payments.forEach((p) => {
    const key = p.date.substring(0, 7);
    map[key] = (map[key] || 0) + p.amount;
  });
  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, revenue]) => ({ month, revenue }));
}

export function getExpensesByMonth(expenses: Expense[]) {
  const map: Record<string, number> = {};
  expenses.forEach((e) => {
    const key = e.date.substring(0, 7);
    map[key] = (map[key] || 0) + e.amount;
  });
  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, total]) => ({ month, total }));
}

export function getExpensesByCategory(expenses: Expense[]) {
  const map: Record<string, number> = {};
  expenses.forEach((e) => {
    map[e.category] = (map[e.category] || 0) + e.amount;
  });
  return Object.entries(map).map(([category, amount]) => ({ category, amount }));
}

export function getMemberStatusDistribution(members: Member[]) {
  const map: Record<string, number> = { Active: 0, Expired: 0, "Expiring Soon": 0 };
  members.forEach((m) => { map[m.status]++; });
  return Object.entries(map).map(([status, count]) => ({ status, count }));
}

export function getAttritionByMonth(members: Member[]) {
  // Simulate attrition: expired members per month vs total at start
  const months = getMembersByMonth(members);
  let totalAtStart = 0;
  return months.map(({ month, count }) => {
    totalAtStart += count;
    const expired = members.filter(
      (m) => m.status === "Expired" && m.expiryDate.substring(0, 7) === month
    ).length;
    const rate = totalAtStart > 0 ? Math.round((expired / totalAtStart) * 100) : 0;
    return { month, rate };
  });
}

export function filterByMonths<T extends { month: string }>(data: T[], months: number): T[] {
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - months);
  const cutoffStr = cutoff.toISOString().substring(0, 7);
  return data.filter((d) => d.month >= cutoffStr);
}
