import { memo, useCallback } from "react";
import { twJoin } from "tailwind-merge";
import { Order } from "../../interfaces/interfaces";

interface OrderListProps {
  orders: Order[];
  selectedOrder: Order | null;
  setSelectedOrder: (order: Order | null) => void;
}

const OrderList = memo(({ orders, selectedOrder, setSelectedOrder }: OrderListProps) => {
  const handleSelectOrder = useCallback(
    (order: Order) => setSelectedOrder(order),
    [setSelectedOrder]
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Orders List</h3>
      <div className="space-y-4">
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No orders yet</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className={twJoin(
                "border rounded-lg p-4 cursor-pointer transition-all",
                selectedOrder?.id === order.id
                  ? "border-primary bg-primary/5"
                  : "hover:border-gray-300"
              )}
              onClick={() => handleSelectOrder(order)}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{order.id}</h4>
                  <p className="text-sm text-gray-500">
                    {new Date(order.date).toLocaleString()}
                  </p>
                </div>
                <span className="font-semibold">${order.total.toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-600">
                {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
});

OrderList.displayName = "OrderList";

export default OrderList;