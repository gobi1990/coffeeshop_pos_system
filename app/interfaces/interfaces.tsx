import { JSX } from "react";

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: "coffee" | "dessert" | "cold";
  icon: JSX.Element;
  description?: string;
  imageUrl?: string;
}

export interface NavItem {
  name: string;
  icon: JSX.Element;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: Date;
  status: "pending" | "completed" | "cancelled";
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  reorderPoint: number;
  category: string;
}

export interface Promotion {
  id: string;
  name: string;
  type: "discount" | "bogo" | "gift";
  startDate: Date;
  endDate: Date;
  active: boolean;
  discountPercent?: number;
  giftItem?: string;
  applicableItems: number[];
}

export interface WeatherData {
  temp: number;
  description: string;
  icon: string;
}

export interface Employee {
  id: string;
  name: string;
  department: string;
  startTime: string;
  endTime: string;
  duration: string;
  shiftType: string;
  date: string;
  role: string;
}