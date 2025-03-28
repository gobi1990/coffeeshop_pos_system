/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ClipboardList, CreditCard, DollarSign, MenuIcon, Package, Percent, Users , HomeIcon, Coffee, Cake } from "lucide-react";
import { useCallback, useState } from "react";
import { CartItem, Employee, MenuItem, NavItem, Order } from "./interfaces/interfaces";
import Sidebar from "./components/sideBar";
import Dashboard from "./components/dashboard";
import Header from "./components/header";
import { twJoin } from 'tailwind-merge';
import MenuSection from "./components/menuSection";
import { employees, mockMenuItems, paymentData, salesData } from "./data/mockData";

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




export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState("Home");
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeCategory, setActiveCategory] = useState<"coffee" | "dessert" | "cold">("coffee");
  const [menuItemsList, setMenuItemsList] = useState<MenuItem[]>(mockMenuItems);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);
  
  
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
          {activeNav === "Menu" && (
            <MenuSection
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              menuItems={mockMenuItems}
              addToCart={addToCart}
            />
          )}
        </main>
      </div>
    </div>
  );
}
