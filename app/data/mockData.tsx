
import { Employee, InventoryItem, MenuItem, Promotion } from "../interfaces/interfaces";
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
  {
    id: "EMP001",
    name: "John Doe",
    department: "Sales",
    startTime: "09:00 AM",
    endTime: "05:00 PM",
    duration: "8h",
    shiftType: "Day",
    date: "2025-04-02",
    role: "Chef"
  },
  {
    id: "EMP002",
    name: "Jane Smith",
    department: "Kitchen",
    startTime: "02:00 PM",
    endTime: "10:00 PM",
    duration: "8h",
    shiftType: "Evening",
    date: "2025-04-02",
    role: "Barista"
  },
];

export const salesData = [
  { name: "01/01/2025", sales: 10 },
  { name: "02/01/2025", sales: 7 },
  { name: "03/01/2025", sales: 12 },
  { name: "04/01/2025", sales: 14 },
  { name: "05/01/2025", sales: 5 },
];

export const paymentData = [
  { name: "01/01/2025", cash: 1000, card: 500 },
  { name: "02/01/2025", cash: 1200, card: 600 },
  { name: "03/01/2025", cash: 800, card: 400 },
  { name: "04/01/2025", cash: 1000, card: 500 },
  { name: "05/01/2025", cash: 1200, card: 600 },
];

export const initialInventory: InventoryItem[] = [
  {
    id: 1,
    name: "Coffee Beans",
    quantity: 50,
    unit: "kg",
    reorderPoint: 10,
    category: "Raw Materials",
  },
];

export const initialPromotions: Promotion[] = [
  {
    id: "PROMO1",
    name: "Summer Special",
    type: "discount",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-08-31"),
    active: true,
    discountPercent: 20,
    applicableItems: [1, 2, 3],
  },
];

export const employeeList: Employee[] = [
  {
    id: "EMP001",
    name: "John Doe",
    department: "Sales",
    startTime: "09:00 AM",
    endTime: "05:30 PM",
    duration: "8.5",
    shiftType: "Day",
    date: "2025-04-02",
    role: "Cashier"
  },
  {
    id: "EMP002",
    name: "Jane Smith",
    department: "Kitchen",
    startTime: "02:00 PM",
    endTime: "10:00 PM",
    duration: "8",
    shiftType: "Evening",
    date: "2025-04-02",
    role: "Barista"
  },
  {
    id: "EMP003",
    name: "Bob Johnson",
    department: "Sales",
    startTime: "02:00 PM",
    endTime: "10:00 PM",
    duration: "8",
    shiftType: "Evening",
    date: "2025-04-02",
    role: "Cashier"
  },
];
