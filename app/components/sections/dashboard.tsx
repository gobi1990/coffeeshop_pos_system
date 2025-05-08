import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Legend,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Order, Employee } from "../../interfaces/interfaces";
import {
  Clock,
  Users,
  Coffee,
  Package,
  DollarSign,
} from "lucide-react";

interface DashboardProps {
  orders: Order[];
  employees: Employee[];
  salesData: { name: string; sales: number }[];
  paymentData: { name: string; cash: number; card: number }[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Dashboard = ({
  orders,
  employees,
  salesData,
  paymentData,
}: DashboardProps) => {
  const todaysSales = useMemo(() => {
    const today = new Date();
    return orders
      .filter((order) => new Date(order.date).toDateString() === today.toDateString())
      .reduce((total, order) => total + order.total, 0);
  }, [orders]);

  const getPendingOrders = () => {
    return orders.filter(order => order.status === "pending");
  };

  const getTotalOrdersToday = () => {
    const today = new Date();
    return orders.filter(order => new Date(order.date).toDateString() === today.toDateString()).length;
  };

  const getTopSellingProducts = () => {
    const today = new Date();
    const todayOrders = orders.filter(order => new Date(order.date).toDateString() === today.toDateString());
    
    const productSales = todayOrders.reduce((acc, order) => {
      order.items.forEach(item => {
        if (!acc[item.name]) {
          acc[item.name] = { quantity: 0, sales: 0 };
        }
        acc[item.name].quantity += item.quantity;
        acc[item.name].sales += item.price * item.quantity;
      });
      return acc;
    }, {} as Record<string, { quantity: number; sales: number }>);

    return Object.entries(productSales)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);
  };

  const topProducts = getTopSellingProducts();
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome to Sweet Brew Coffee Shop</h2>
            <p className="text-gray-600 mt-1">{currentDate}</p>
          </div>
          <div className="bg-primary/10 p-3 rounded-full">
            <Coffee className="h-8 w-8 text-primary" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today&apos;s Sales</p>
              <h3 className="text-2xl font-bold">${todaysSales.toFixed(2)}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <h3 className="text-2xl font-bold">{getTotalOrdersToday()}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Orders</p>
              <h3 className="text-2xl font-bold">{getPendingOrders().length}</h3>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Employees</p>
              <h3 className="text-2xl font-bold">{employees.length}</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Today&apos;s Sales Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={paymentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cash" fill="#8884d8" name="Cash" />
                <Bar dataKey="card" fill="#82ca9d" name="Card" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Products and Employees */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Top Selling Products Today</h3>
          {topProducts.length > 0 ? (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topProducts}
                    dataKey="sales"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {topProducts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No sales data available for today
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Present Employees</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {employees.map((employee) => (
              <div key={employee.id} className="bg-gray-50 rounded-lg p-4 flex items-center space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">{employee.name}</h4>
                  <p className="text-sm text-gray-600">{employee.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;