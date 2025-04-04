/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ClipboardList, CreditCard, DollarSign, MenuIcon, Package, Percent, Users , HomeIcon, Coffee, Cake, IceCream } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { CartItem, InventoryItem, MenuItem, NavItem, Order, Promotion } from "./interfaces/interfaces";
import Sidebar from "./components/ui/sideBar";
import Dashboard from "./components/sections/dashboard";
import Header from "./components/ui/header";
import { twJoin } from 'tailwind-merge';
import MenuSection from "./components/sections/menuSection";
import { employees, initialInventory, initialPromotions, mockMenuItems, paymentData, salesData } from "./data/mockData";
import OrdersSection from "./components/sections/orderSection";
import CartSidebar from "./components/ui/cartSidebar";
import AddMenuItemModal from "./components/ui/addMenuItemModel";
import InventorySection from "./components/sections/inventroySection";
import PromotionsSection from "./components/sections/promotionSection";
import EmployeesSection from "./components/sections/employeeSection";

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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAddingMenuItem, setIsAddingMenuItem] = useState(false);
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);

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

  const removeFromCart = useCallback((itemId: number) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prev.filter((i) => i.id !== itemId);
    });
  }, []);

  const deleteOrder = useCallback((orderId: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
    if (selectedOrder?.id === orderId) setSelectedOrder(null);
  }, [selectedOrder]);

  const updateOrder = useCallback((orderId: string, updatedItems: CartItem[]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              items: updatedItems,
              total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
            }
          : order
      )
    );
  }, []);

  const [newMenuItem, setNewMenuItem] = useState<Partial<MenuItem>>({ category: "coffee" });
  
  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const handleAddMenuItem = useCallback(() => {
    if (!newMenuItem.name || !newMenuItem.price) return;
    const newItem: MenuItem = {
      id: menuItemsList.length + 1,
      name: newMenuItem.name,
      price: newMenuItem.price,
      category: newMenuItem.category as "coffee" | "dessert" | "cold",
      description: newMenuItem.description,
      imageUrl: newMenuItem.imageUrl,
      icon:
        newMenuItem.category === "coffee" ? (
          <Coffee className="h-6 w-6" />
        ) : newMenuItem.category === "dessert" ? (
          <Cake className="h-6 w-6" />
        ) : (
          <IceCream className="h-6 w-6" />
        ),
    };
    setMenuItemsList((prev) => [...prev, newItem]);
    setNewMenuItem({ category: "coffee" });
    setIsAddingMenuItem(false);
  }, [newMenuItem, menuItemsList]);

  const placeOrder = useCallback(() => {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrder: Order = {
      id: `ORD${Date.now()}`,
      items: [...cart],
      total,
      date: new Date(),
      status: "pending",
    };
    setOrders((prev) => [...prev, newOrder]);
    setCart([]);
    setIsCartOpen(false);
  }, [cart]);

  const togglePromotionStatus = useCallback((promotionId: string) => {
    setPromotions((prev) =>
      prev.map((promo) =>
        promo.id === promotionId ? { ...promo, active: !promo.active } : promo
      )
    );
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
              cartCount={cartCount}
              toggleCart={() => setIsCartOpen(true)}
              toggleAddMenuItem={() => setIsAddingMenuItem(true)}
            />
          )}
          {activeNav === "Orders" && (
            <OrdersSection
            orders={orders}
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
            deleteOrder={deleteOrder}
            updateOrder={updateOrder} 
          />
          )}
          {activeNav === "Promotions" && (
            <PromotionsSection
              promotions={promotions}
              menuItems={menuItemsList}
              togglePromotionStatus={togglePromotionStatus}
            />
          )}
          {activeNav === "Inventory" && <InventorySection inventory={inventory} />}
          {activeNav === "Employees" && <EmployeesSection />}
        </main>
      </div>
      <CartSidebar
        isOpen={isCartOpen}
        toggleCart={() => setIsCartOpen(false)}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        placeOrder={placeOrder}
      />
    </div>
  );
}
