import useCart from "../../hooks/useCart";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/home/Navbar";
import CartItem from "@/components/cart/CartItem";// Adjust path as needed
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../constant/route.constants";
function Cart() {
  const { cart, total, updateQuantity, removeFromCart } = useCart();
 const navigate = useNavigate();
  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
          <Card className="w-full max-w-md mx-auto text-center p-8 border-0 shadow-xl">
            <div className="mb-6">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600">
                Add some items to get started with your shopping!
              </p>
            </div>
            <Button className="w-full bg-black hover:bg-gray-800 text-white"
               onClick={() => navigate(ROUTE.Home)}>
              Continue Shopping
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>
        </div>
      </>
    );
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <ShoppingCart className="w-8 h-8 text-gray-900" />
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
              <Badge variant="secondary" className="text-sm">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </Badge>
            </div>
            <p className="text-gray-600">Review your items before checkout</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                < CartItem
                  key={item.id}
                  item={item}
                  onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                  onDecrease={() =>
                    item.quantity > 1
                      ? updateQuantity(item.id, item.quantity - 1)
                      : removeFromCart(item.id)
                  }
                  onDelete={() => removeFromCart(item.id)}
                />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8 border-0 shadow-xl">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                      <span className="text-gray-900">₹{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-green-600 font-medium">Free</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span className="text-gray-900">Total</span>
                        <span className="text-gray-900">₹{total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-black hover:bg-gray-800 text-white h-12 text-base font-semibold"
                   onClick={() => navigate(ROUTE.Buy)}>
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <Button variant="outline" className="w-full mt-3 border-gray-300 hover:bg-gray-50"
                  onClick={() => navigate(ROUTE.Home)}>
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;