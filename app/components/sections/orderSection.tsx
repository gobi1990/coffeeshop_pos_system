import { memo } from "react";
import { CartItem, Order } from "../../interfaces/interfaces";
import OrderList from "../ui/orderList";
import OrderDetails from "../ui/orderDetails";



interface OrdersSectionProps {
  orders: Order[];
  selectedOrder: Order | null;
  setSelectedOrder: (order: Order | null) => void;
  deleteOrder: (orderId: string) => void;
  updateOrder: (orderId: string, updatedItems: CartItem[]) => void;
}

const OrdersSection = memo(
  ({
    orders,
    selectedOrder,
    setSelectedOrder,
    deleteOrder,
    updateOrder,
  }: OrdersSectionProps) => {
    return (
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OrderList
          orders={orders}
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
        />
        {selectedOrder && (
          <OrderDetails
            selectedOrder={selectedOrder}
            deleteOrder={deleteOrder}
            updateOrder={updateOrder}
          />
        )}
      </div>
    );
  }
);

OrdersSection.displayName = "OrdersSection";

export default OrdersSection;