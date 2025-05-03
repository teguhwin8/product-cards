import React, { useEffect, useState } from "react";
import { ShoppingCart, X } from "lucide-react";

interface CartNotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const CartNotification: React.FC<CartNotificationProps> = ({
  message,
  isVisible,
  onClose,
}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      onClose();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg
        flex items-center gap-3 max-w-xs z-50 transition-all duration-300
        ${isExiting ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}
    >
      <div className="bg-white/20 rounded-full p-1">
        <ShoppingCart size={18} />
      </div>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button onClick={handleClose} className="text-white/80 hover:text-white">
        <X size={18} />
      </button>
    </div>
  );
};

export default CartNotification;
