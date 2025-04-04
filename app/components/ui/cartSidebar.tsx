import { useCallback } from "react";
import { X, Plus, Minus, ListOrderedIcon } from "lucide-react";
import { CartItem } from "@/app/interfaces/interfaces";
import { memo } from "react";
import CustomButton from "./customButton";

interface CartSidebarProps {
  isOpen: boolean;
  toggleCart: () => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  placeOrder: () => void;
}

const CartSidebar = memo(
  ({
    isOpen,
    toggleCart,
    cart,
    addToCart,
    removeFromCart,
    placeOrder,
  }: CartSidebarProps) => {
    const calculateTotal = useCallback(
      () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      [cart]
    );

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-xl font-bold">Cart</h2>
            <button
              onClick={toggleCart}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4 flex flex-col h-[calc(100vh-200px)] overflow-y-auto">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Your cart is empty</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-2 border-b"
                >
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)} × {item.quantity}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold">Total:</span>
              <span className="font-bold">${calculateTotal().toFixed(2)}</span>
            </div>
            <CustomButton onClick={placeOrder} label="Place Order" icon={<ListOrderedIcon className="h-5 w-5" />}/>
          </div>
        </div>
      </div>
    );
  }
);

CartSidebar.displayName = "CartSidebar";

export default CartSidebar;