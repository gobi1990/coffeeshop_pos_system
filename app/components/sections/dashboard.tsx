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
} from "recharts";
import { Order, Employee } from "../../interfaces/interfaces";
import {
    Clock,
  TrendingUp,
  Users,
} from "lucide-react";
import { paymentData } from "../../data/mockData";

interface DashboardProps {
  orders: Order[];
  employees: Employee[];
  salesData: { name: string; sales: number }[];
  paymentData: { name: string; cash: number; card: number }[];
}

const Dashboard = ({
  orders,
  employees,
  salesData,
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


  return (
    <div className="space-y-6">

      {/* Sales Summary */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today Sales</p>
              <h3 className="text-2xl font-bold">${todaysSales.toFixed(2)}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
          
        </div>
        
      </div>
      
      
      {/* Pending Orders */}
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
      
      {/* Sales Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Sales Trend</h3>
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
      
      {/* Present Employees */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Present Employees</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees
            .map((employee) => (
              <div key={employee.id} className="bg-gray-50 rounded-lg p-4 flex items-center space-x-4 shadow">
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
  );
};

export default Dashboard;