
import { Employee, MenuItem } from "../interfaces/interfaces";
import { Coffee, Cake, IceCream } from "lucide-react";

export const mockMenuItems: MenuItem[] = [

  {
    id: 1,
    name: "Espresso",
    price: 3.50,
    category: "coffee",
    description: "A strong, concentrated coffee brewed with high pressure.",
    imageUrl: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400",
    icon: <Coffee className="h-6 w-6" />,
  },
  {
    id: 2,
    name: "Cappuccino",
    price: 4.25,
    category: "coffee",
    description: "Espresso with steamed milk foam, perfect for a morning boost.",
    imageUrl: "https://images.unsplash.com/photo-1473923377535-0002805f57e8?q=80&w=400",
    icon: <Coffee className="h-6 w-6" />,
  },
  {
    id: 3,
    name: "Latte",
    price: 4.75,
    category: "coffee",
    description: "Smooth espresso with a generous amount of steamed milk.",
    imageUrl: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=400",
    icon: <Coffee className="h-6 w-6" />,
  },
  {
    id: 4,
    name: "Chocolate Cake",
    price: 5.50,
    category: "dessert",
    description: "Rich, moist chocolate cake with a creamy ganache topping.",
    imageUrl: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400",
    icon: <Cake className="h-6 w-6" />,
  },
  {
    id: 5,
    name: "Cheesecake",
    price: 6.00,
    category: "dessert",
    description: "Creamy New York-style cheesecake with a graham cracker crust.",
    imageUrl: "https://images.unsplash.com/photo-1702925614886-50ad13c88d3f?q=80&w=400",
    icon: <Cake className="h-6 w-6" />,
  },
  {
    id: 6,
    name: "Croissant",
    price: 3.25,
    category: "dessert",
    description: "Flaky, buttery pastry fresh from the oven.",
    imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400",
    icon: <Cake className="h-6 w-6" />,
  },
  {
    id: 7,
    name: "Mango Smoothie",
    price: 5.25,
    category: "cold",
    description: "Refreshing blend of mango, yogurt, and ice.",
    imageUrl: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?q=80&w=400",
    icon: <IceCream className="h-6 w-6" />,
  },
  {
    id: 8,
    name: "Vanilla Milkshake",
    price: 5.75,
    category: "cold",
    description: "Classic creamy milkshake with vanilla ice cream.",
    imageUrl: "https://images.unsplash.com/photo-1619158401201-8fa932695178?q=80&w=400",
    icon: <IceCream className="h-6 w-6" />,
  },
];

export const employees: Employee[] = [
  { id: 1, name: "John Doe", role: "Barista", present: true },
  { id: 2, name: "Jane Smith", role: "Barista", present: true },
  { id: 3, name: "Bob Johnson", role: "Barista", present: true },
  { id: 4, name: "Alice Brown", role: "Cashier", present: true },
  { id: 5, name: "Mike Davis", role: "Chef", present: true },
  { id: 6, name: "Emily Wilson", role: "Chef", present: true },
];

export const salesData = [
  { name: "01/01/2023", sales: 2400 },
  { name: "02/01/2023", sales: 3000 },
  { name: "03/01/2023", sales: 1800 },
  { name: "04/01/2023", sales: 2400 },
  { name: "05/01/2023", sales: 3000 },
];

export const paymentData = [
  { name: "01/01/2023", cash: 1000, card: 500 },
  { name: "02/01/2023", cash: 1200, card: 600 },
  { name: "03/01/2023", cash: 800, card: 400 },
  { name: "04/01/2023", cash: 1000, card: 500 },
  { name: "05/01/2023", cash: 1200, card: 600 },
];