import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface MemberAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: string;
  joinDate: string;
  expiryDate: string;
  fee: number;
  status: "Active" | "Expired" | "Expiring Soon";
  payments: MemberPayment[];
}

export interface MemberPayment {
  id: string;
  amount: number;
  date: string;
  method: string;
  status: "Paid" | "Pending";
}

interface AuthContextType {
  member: MemberAccount | null;
  isAdmin: boolean;
  loginMember: (email: string, password: string) => boolean;
  loginMemberPhone: (phone: string, password: string) => boolean;
  signupMember: (data: SignupData) => boolean;
  loginAdmin: (email: string, password: string) => boolean;
  logout: () => void;
  makePayment: (method: string) => void;
  allMembers: MemberAccount[];
}

interface SignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
  plan: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

function planFee(plan: string): number {
  switch (plan) {
    case "Monthly": return 1500;
    case "Quarterly": return 4000;
    case "Half-Yearly": return 7500;
    case "Annual": return 13000;
    default: return 1500;
  }
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

function addMonths(date: string, months: number): string {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d.toISOString().split("T")[0];
}

function randomDate(start: Date, end: Date): string {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString().split("T")[0];
}

const firstNames = ["Arjun", "Priya", "Rahul", "Sneha", "Vikram", "Anita", "Karan", "Meera", "Rohit", "Divya", "Amit", "Pooja", "Suresh", "Kavita", "Nikhil", "Ritu", "Deepak", "Swati", "Manish", "Neha", "Raj", "Simran", "Aditya", "Nisha", "Gaurav", "Pallavi", "Sanjay", "Komal", "Varun", "Anjali", "Vishal", "Shweta", "Tushar", "Megha", "Pankaj", "Rashi", "Sachin", "Tanvi", "Harsh", "Preeti"];
const plans = ["Monthly", "Quarterly", "Half-Yearly", "Annual"];

function generateMockMembers(): MemberAccount[] {
  const now = new Date();
  return firstNames.map((name, i) => {
    const plan = plans[i % plans.length];
    const joinDate = randomDate(new Date("2024-01-01"), new Date("2025-12-01"));
    const expiryDate = addMonths(joinDate, planMonths(plan));
    const expiry = new Date(expiryDate);
    let status: MemberAccount["status"] = "Active";
    if (expiry < now) status = "Expired";
    else if (expiry.getTime() - now.getTime() < 15 * 24 * 60 * 60 * 1000) status = "Expiring Soon";

    const fee = planFee(plan);
    const paymentCount = Math.floor(Math.random() * 4) + 1;
    const payments: MemberPayment[] = [];
    for (let p = 0; p < paymentCount; p++) {
      const pDate = addMonths(joinDate, p * planMonths(plan));
      if (new Date(pDate) <= now) {
        payments.push({
          id: `pay-${i}-${p}`,
          amount: fee,
          date: pDate,
          method: ["UPI", "Card", "Cash"][Math.floor(Math.random() * 3)],
          status: "Paid",
        });
      }
    }

    // Some active members have pending current payment
    if (status === "Active" && Math.random() > 0.6) {
      payments.push({
        id: `pay-${i}-pending`,
        amount: fee,
        date: new Date().toISOString().split("T")[0],
        method: "",
        status: "Pending",
      });
    }

    return {
      id: `member-${i}`,
      name,
      email: `${name.toLowerCase()}@email.com`,
      phone: `+91 ${9000000000 + Math.floor(Math.random() * 999999999)}`,
      plan,
      joinDate,
      expiryDate,
      fee,
      status,
      payments,
    };
  });
}

// Store member passwords (mock)
const memberPasswords: Record<string, string> = {};
firstNames.forEach((name) => {
  memberPasswords[`${name.toLowerCase()}@email.com`] = "member123";
});

const SEED_KEY = "dungeon_members";
const MEMBER_KEY = "dungeon_current_member";
const ADMIN_KEY = "dungeon_admin";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [allMembers, setAllMembers] = useState<MemberAccount[]>(() => {
    const stored = localStorage.getItem(SEED_KEY);
    if (stored) return JSON.parse(stored);
    const members = generateMockMembers();
    localStorage.setItem(SEED_KEY, JSON.stringify(members));
    return members;
  });

  const [member, setMember] = useState<MemberAccount | null>(() => {
    const stored = sessionStorage.getItem(MEMBER_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem(ADMIN_KEY) === "true");

  useEffect(() => {
    localStorage.setItem(SEED_KEY, JSON.stringify(allMembers));
  }, [allMembers]);

  const loginMember = (email: string, password: string): boolean => {
    const found = allMembers.find((m) => m.email === email);
    const storedPass = memberPasswords[email] || "member123";
    if (found && password === storedPass) {
      setMember(found);
      sessionStorage.setItem(MEMBER_KEY, JSON.stringify(found));
      return true;
    }
    return false;
  };

  const loginMemberPhone = (phone: string, password: string): boolean => {
    const found = allMembers.find((m) => m.phone.replace(/\s/g, "").includes(phone.replace(/\s/g, "")));
    if (found && password === "member123") {
      setMember(found);
      sessionStorage.setItem(MEMBER_KEY, JSON.stringify(found));
      return true;
    }
    return false;
  };

  const signupMember = (data: SignupData): boolean => {
    if (allMembers.find((m) => m.email === data.email)) return false;
    const now = new Date().toISOString().split("T")[0];
    const newMember: MemberAccount = {
      id: `member-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      plan: data.plan,
      joinDate: now,
      expiryDate: addMonths(now, planMonths(data.plan)),
      fee: planFee(data.plan),
      status: "Active",
      payments: [{
        id: `pay-${Date.now()}`,
        amount: planFee(data.plan),
        date: now,
        method: "Online",
        status: "Pending",
      }],
    };
    memberPasswords[data.email] = data.password;
    setAllMembers((prev) => [...prev, newMember]);
    setMember(newMember);
    sessionStorage.setItem(MEMBER_KEY, JSON.stringify(newMember));
    return true;
  };

  const loginAdmin = (email: string, password: string): boolean => {
    if (email === "admin@dungeongym.com" && password === "dungeon2025") {
      setIsAdmin(true);
      sessionStorage.setItem(ADMIN_KEY, "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setMember(null);
    setIsAdmin(false);
    sessionStorage.removeItem(MEMBER_KEY);
    sessionStorage.removeItem(ADMIN_KEY);
  };

  const makePayment = (method: string) => {
    if (!member) return;
    const updatedMembers = allMembers.map((m) => {
      if (m.id !== member.id) return m;
      const updatedPayments = m.payments.map((p) =>
        p.status === "Pending" ? { ...p, status: "Paid" as const, method, date: new Date().toISOString().split("T")[0] } : p
      );
      const now = new Date();
      const newExpiry = addMonths(now.toISOString().split("T")[0], planMonths(m.plan));
      return { ...m, payments: updatedPayments, expiryDate: newExpiry, status: "Active" as const };
    });
    setAllMembers(updatedMembers);
    const updated = updatedMembers.find((m) => m.id === member.id)!;
    setMember(updated);
    sessionStorage.setItem(MEMBER_KEY, JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ member, isAdmin, loginMember, loginMemberPhone, signupMember, loginAdmin, logout, makePayment, allMembers }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
