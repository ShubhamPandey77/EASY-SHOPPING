import { type CartItem } from "../../contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onDelete: () => void;
}

function CartItem({ item, onIncrease, onDecrease, onDelete }: CartItemProps) {
  return (
    <Card className="overflow-hidden bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-6 p-6">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={item.thumbnail || "/api/placeholder/120/120"}
            alt={item.title}
            className="w-24 h-24 object-cover rounded-lg bg-gray-100"
            onError={(e) => {
              e.currentTarget.src = "/api/placeholder/120/120";
            }}
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">₹{item.price} per item</p>
          <p className="text-lg font-bold text-gray-900">
            ₹{(item.quantity * item.price).toLocaleString()}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3">
          <Button
            onClick={onDecrease}
            disabled={item.quantity <= 1}
            variant="outline"
            size="sm"
            className="h-9 w-9 p-0 border-gray-300 hover:bg-gray-50 disabled:opacity-50"
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <span className="text-lg font-semibold text-gray-900 min-w-[2rem] text-center">
            {item.quantity}
          </span>
          
          <Button
            onClick={onIncrease}
            variant="outline"
            size="sm"
            className="h-9 w-9 p-0 border-gray-300 hover:bg-gray-50"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Delete Button */}
        <Button
          onClick={onDelete}
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}

export default CartItem;