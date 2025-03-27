"use client";

import { ClipboardList, CreditCard, DollarSign, MenuIcon, Package, Percent, Users , HomeIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Employee, NavItem, Order } from "./interfaces/interfaces";
import Sidebar from "./components/sideBar";
import Dashboard from "./components/dashboard";
import Header from "./components/header";
import { twJoin } from 'tailwind-merge';

const navItems: NavItem[] = [
  { name: "Home", icon: <HomeIcon className="h-5 w-5" /> },
  { name: "Menu", icon: <MenuIcon className="h-5 w-5" /> },
  { name: "Orders", icon: <ClipboardList className="h-5 w-5" /> },
  { name: "Sales", icon: <DollarSign className="h-5 w-5" /> },
  { name: "Promotions", icon: <Percent className="h-5 w-5" /> },
  { name: "Payments", icon: <CreditCard className="h-5 w-5" /> },
  { name: "Inventory", icon: <Package className="h-5 w-5" /> },
  { name: "Employees", icon: <Users className="h-5 w-5" /> },
];

const employees: Employee[] = [
  { id: 1, name: "John Doe", role: "Barista", present: true },
];

const salesData = [
  { name: "4 Days Ago", sales: 2400 },
];

const paymentData = [
  { name: "4 Days Ago", cash: 4000, card: 2400 },
];


export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState("Home");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAddingMenuItem, setIsAddingMenuItem] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [orders, setOrders] = useState<Order[]>([]);
  
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        navItems={navItems}
        activeNav={activeNav}
        setActiveNav={(name) => {
          setActiveNav(name);
        }}
      />
      <div className={twJoin("flex-1 transition-all duration-300", isSidebarOpen ? "ml-64" : "ml-20")}>
        <Header
          activeNav={activeNav}
        />
        <main className="p-6 pt-22">
          {activeNav === "Home" && (
            <Dashboard
              orders={orders}
              employees={employees}
              salesData={salesData}
              paymentData={paymentData}
            />
          )}
        </main>
      </div>
    </div>
  );
}
