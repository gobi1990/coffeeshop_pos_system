import { memo, useCallback } from "react";
import { Plus, Minus } from "lucide-react";
import { CartItem, Order } from "../interfaces/interfaces";


interface OrderDetailsProps {
  selectedOrder: Order;
  deleteOrder: (orderId: string) => void;
  updateOrder: (orderId: string, updatedItems: CartItem[]) => void;
}

const OrderDetails = memo(({ selectedOrder, deleteOrder, updateOrder }: OrderDetailsProps) => {
  const handleDeleteOrder = useCallback(
    () => deleteOrder(selectedOrder.id),
    [deleteOrder, selectedOrder.id]
  );

  const adjustQuantity = useCallback(
    (orderId: string, itemId: number, delta: number) => {
      const updatedItems = selectedOrder.items
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0);
      updateOrder(orderId, updatedItems);
    },
    [selectedOrder.items, updateOrder]
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Order Details</h3>
        <button
          onClick={handleDeleteOrder}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Delete Order
        </button>
      </div>
      <div className="mb-4">
        <p className="text-gray-600">Order ID: {selectedOrder.id}</p>
        <p className="text-gray-600">
          Date: {new Date(selectedOrder.date).toLocaleString()}
        </p>
        <p className="text-gray-600">Total: ${selectedOrder.total.toFixed(2)}</p>
      </div>
      <div className="space-y-4">
        {selectedOrder.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-2"
          >
            <div>
              <h4 className="font-medium">{item.name}</h4>
              <p className="text-sm text-gray-600">
                ${item.price.toFixed(2)} × {item.quantity}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => adjustQuantity(selectedOrder.id, item.id, -1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => adjustQuantity(selectedOrder.id, item.id, 1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

OrderDetails.displayName = "OrderDetails";

export default OrderDetails;