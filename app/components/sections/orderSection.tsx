import { memo, useCallback, useState } from "react";
import { CartItem, Order } from "../../interfaces/interfaces";
import OrderList from "../ui/orderList";
import OrderDetails from "../ui/orderDetails";
import { CreditCard } from "lucide-react";
import PaymentModal from "../ui/paymentModal";

interface OrdersSectionProps {
  orders: Order[];
  selectedOrder: Order | null;
  setSelectedOrder: (order: Order | null) => void;
  deleteOrder: (orderId: string) => void;
  updateOrder: (orderId: string, updatedItems: CartItem[]) => void;
  checkoutOrder?: (orderId: string, paymentDetails: { method: "cash" | "card", amount: number }) => void;
}

const OrdersSection = memo(
  ({
    orders,
    selectedOrder,
    setSelectedOrder,
    deleteOrder,
    updateOrder,
    checkoutOrder,
  }: OrdersSectionProps) => {
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const handleCheckout = useCallback(() => {
      if (selectedOrder) {
        setIsPaymentModalOpen(true);
      }
    }, [selectedOrder]);

    const handlePaymentComplete = useCallback((method: "cash" | "card", amount: number) => {
      if (selectedOrder && checkoutOrder) {
        checkoutOrder(selectedOrder.id, { method, amount });
      }
    }, [selectedOrder, checkoutOrder]);

    return (
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OrderList
          orders={orders}
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
        />
        {selectedOrder && (
          <div className="space-y-6">
            <OrderDetails
              selectedOrder={selectedOrder}
              deleteOrder={deleteOrder}
              updateOrder={updateOrder}
              isPaid={selectedOrder.status === "completed"}
            />
            {selectedOrder.status === "pending" && checkoutOrder && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-primary/90 flex items-center justify-center space-x-2"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Checkout Order</span>
                </button>
              </div>
            )}
          </div>
        )}
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          total={selectedOrder?.total || 0}
          onPaymentComplete={handlePaymentComplete}
        />
      </div>
    );
  }
);

OrdersSection.displayName = "OrdersSection";

export default OrdersSection;