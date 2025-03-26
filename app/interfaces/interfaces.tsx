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
