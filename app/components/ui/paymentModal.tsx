import { memo, useState, useCallback } from "react";
import { CreditCard, Banknote, Loader2, CheckCircle2 } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onPaymentComplete: (paymentMethod: "cash" | "card", amount: number) => void;
}

const PaymentModal = memo(({ isOpen, onClose, total, onPaymentComplete }: PaymentModalProps) => {
  const [selectedMethod, setSelectedMethod] = useState<"cash" | "card" | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const GST_RATE = 0.13; 
  const totalWithTax = total * (1 + GST_RATE);

  const handlePayment = useCallback(async (method: "cash" | "card") => {
    setSelectedMethod(method);
    setIsProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);

    setTimeout(() => {
      onPaymentComplete(method, totalWithTax);
      onClose();
    }, 1500);
  }, [totalWithTax, onPaymentComplete, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Payment</h2>
        
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>GST/HST (13%):</span>
            <span>${(total * GST_RATE).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total:</span>
            <span>${totalWithTax.toFixed(2)}</span>
          </div>
        </div>

        {!selectedMethod ? (
          <div className="space-y-4">
            <button
              onClick={() => handlePayment("cash")}
              className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-primary/90 flex items-center justify-center space-x-2"
            >
              <Banknote className="h-5 w-5" />
              <span>Pay with Cash</span>
            </button>
            <button
              onClick={() => handlePayment("card")}
              className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-primary/90 flex items-center justify-center space-x-2"
            >
              <CreditCard className="h-5 w-5" />
              <span>Pay with Card</span>
            </button>
          </div>
        ) : (
          <div className="text-center py-8">
            {isProcessing ? (
              <div className="space-y-4">
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                <p className="text-gray-600">
                  {selectedMethod === "card" 
                    ? "Processing card payment..." 
                    : "Preparing cash payment..."}
                </p>
              </div>
            ) : isSuccess ? (
              <div className="space-y-4">
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
                <p className="text-gray-600">Payment successful!</p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
});

PaymentModal.displayName = "PaymentModal";

export default PaymentModal; 