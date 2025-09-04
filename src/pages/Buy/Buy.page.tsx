import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { ROUTE } from "../../constant/route.constants";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/home/Navbar";
import { 
  CreditCard, 
  User, 
  ShoppingBag,
  ArrowLeft,
  CheckCircle,
  Truck,
  Shield,
  MapPin,
  Phone,
  Mail
} from "lucide-react";

function BuyNow() {
  const navigate = useNavigate();
  const { cart, total, removeFromCart } = useCart();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // Form states
  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India"
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: ""
  });

  // Calculate totals based on your cart's total
  const subtotal = total || 0;
  const shipping = subtotal > 2000 ? 0 : 99; // Free shipping over ₹2000
  const tax = subtotal * 0.18; // 18% GST for India
  const finalTotal = subtotal + shipping + tax;

  // Calculate total items from cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleInputChange = (section: 'billing' | 'payment', field: string, value: string) => {
    if (section === 'billing') {
      setBillingInfo(prev => ({ ...prev, [field]: value }));
    } else {
      setPaymentInfo(prev => ({ ...prev, [field]: value }));
    }
  };

  const handlePlaceOrder = async () => {
    // Basic validation
    const requiredBillingFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode'];
    const requiredPaymentFields = ['cardNumber', 'expiryDate', 'cvv', 'cardName'];
    
    const missingBilling = requiredBillingFields.some(field => !billingInfo[field as keyof typeof billingInfo]);
    const missingPayment = requiredPaymentFields.some(field => !paymentInfo[field as keyof typeof paymentInfo]);
    
    if (missingBilling || missingPayment) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      removeFromCart();
      toast.success("Order placed successfully!");
    }, 3000);
  };

  // If cart is empty
  if (!cart || cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">
          <Card className="w-full max-w-md mx-auto text-center p-8 border-0 shadow-xl rounded-2xl">
            <div className="mb-6">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600">
                Add some products to your cart before checkout
              </p>
            </div>
            <Button 
              onClick={() => navigate(ROUTE.Home)}
              className="w-full bg-black hover:bg-gray-800 text-white rounded-xl"
            >
              Continue Shopping
            </Button>
          </Card>
        </div>
      </>
    );
  }

  // Order success page
  if (orderPlaced) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
          <Card className="w-full max-w-md bg-white shadow-2xl rounded-2xl border-0">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Confirmed!</h2>
              <p className="text-gray-600 mb-6">Thank you for your purchase. Your order is being processed.</p>
              <div className="space-y-3">
                <Button 
                  onClick={() => navigate(ROUTE.Home)}
                  className="w-full bg-black hover:bg-gray-800 text-white rounded-xl"
                >
                  Continue Shopping
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    toast("Orders page coming soon!", { icon: '📦' });
                  }}
                  className="w-full rounded-xl border-gray-300 hover:bg-gray-50"
                >
                  View Orders
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200/50 px-6 py-6 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(ROUTE.Cart)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 rounded-xl"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Cart
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-sm text-gray-600 font-medium">Secure Checkout</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Billing Information */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-2xl shadow-xl">
                <CardHeader className="pb-6 border-b border-gray-100">
                  <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
                    <div className="p-2 bg-blue-100 rounded-xl">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    Billing Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-semibold text-gray-800">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        value={billingInfo.firstName}
                        onChange={(e) => handleInputChange('billing', 'firstName', e.target.value)}
                        className="h-12 rounded-xl border-gray-300 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-semibold text-gray-800">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        value={billingInfo.lastName}
                        onChange={(e) => handleInputChange('billing', 'lastName', e.target.value)}
                        className="h-12 rounded-xl border-gray-300 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={billingInfo.email}
                        onChange={(e) => handleInputChange('billing', 'email', e.target.value)}
                        className="h-12 rounded-xl border-gray-300 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone *
                      </Label>
                      <Input
                        id="phone"
                        value={billingInfo.phone}
                        onChange={(e) => handleInputChange('billing', 'phone', e.target.value)}
                        className="h-12 rounded-xl border-gray-300 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Address *
                    </Label>
                    <Input
                      id="address"
                      value={billingInfo.address}
                      onChange={(e) => handleInputChange('billing', 'address', e.target.value)}
                      className="h-12 rounded-xl border-gray-300 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-semibold text-gray-800">City *</Label>
                      <Input
                        id="city"
                        value={billingInfo.city}
                        onChange={(e) => handleInputChange('billing', 'city', e.target.value)}
                        className="h-12 rounded-xl border-gray-300 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-sm font-semibold text-gray-800">State *</Label>
                      <Input
                        id="state"
                        value={billingInfo.state}
                        onChange={(e) => handleInputChange('billing', 'state', e.target.value)}
                        className="h-12 rounded-xl border-gray-300 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode" className="text-sm font-semibold text-gray-800">PIN Code *</Label>
                      <Input
                        id="zipCode"
                        value={billingInfo.zipCode}
                        onChange={(e) => handleInputChange('billing', 'zipCode', e.target.value)}
                        className="h-12 rounded-xl border-gray-300 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-2xl shadow-xl">
                <CardHeader className="pb-6 border-b border-gray-100">
                  <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
                    <div className="p-2 bg-green-100 rounded-xl">
                      <CreditCard className="h-6 w-6 text-green-600" />
                    </div>
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="cardName" className="text-sm font-semibold text-gray-800">
                      Cardholder Name *
                    </Label>
                    <Input
                      id="cardName"
                      value={paymentInfo.cardName}
                      onChange={(e) => handleInputChange('payment', 'cardName', e.target.value)}
                      className="h-12 rounded-xl border-gray-300 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber" className="text-sm font-semibold text-gray-800">
                      Card Number *
                    </Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                      className="h-12 rounded-xl border-gray-300 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate" className="text-sm font-semibold text-gray-800">
                        Expiry Date *
                      </Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
                        className="h-12 rounded-xl border-gray-300 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv" className="text-sm font-semibold text-gray-800">CVV *</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                        className="h-12 rounded-xl border-gray-300 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="space-y-6">
              
              {/* Order Summary */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-2xl shadow-xl sticky top-24">
                <CardHeader className="pb-4 border-b border-gray-100">
                  <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
                    <div className="p-2 bg-purple-100 rounded-xl">
                      <ShoppingBag className="h-6 w-6 text-purple-600" />
                    </div>
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  
                  {/* Cart Items */}
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <img 
                          src={item.thumbnail || "/api/placeholder/60/60"} 
                          alt={item.title}
                          className="w-14 h-14 object-cover rounded-lg bg-gray-200"
                          onError={(e) => {
                            e.currentTarget.src = "/api/placeholder/60/60";
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{item.title}</p>
                          <p className="text-xs text-gray-600">₹{item.price} × {item.quantity}</p>
                        </div>
                        <p className="text-sm font-bold text-gray-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-gray-200" />

                  {/* Price Breakdown */}
                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-600">
                      <span className="font-medium">Subtotal ({totalItems} items)</span>
                      <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-600">
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4" />
                        <span className="font-medium">Shipping</span>
                      </div>
                      <span className="font-semibold">
                        {shipping === 0 ? (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">FREE</Badge>
                        ) : (
                          `₹${shipping.toLocaleString()}`
                        )}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-gray-600">
                      <span className="font-medium">GST (18%)</span>
                      <span className="font-semibold">₹{tax.toLocaleString()}</span>
                    </div>

                    <Separator className="bg-gray-300" />

                    <div className="flex justify-between text-2xl font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-black">₹{finalTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Free Shipping Notice */}
                  {shipping > 0 && (
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
                      <p className="text-sm text-blue-700 text-center font-medium">
                        Add ₹{(2000 - subtotal).toLocaleString()} more for free shipping!
                      </p>
                    </div>
                  )}

                  {/* Place Order Button */}
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white font-bold py-4 h-14 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Processing Order...</span>
                      </div>
                    ) : (
                      <span className="text-lg">Place Order • ₹{finalTotal.toLocaleString()}</span>
                    )}
                  </Button>

                  {/* Security Notice */}
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-4 border-t border-gray-100">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Your payment information is secure and encrypted</span>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Badges */}
              <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-0 rounded-2xl shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4 text-center">Why Shop With Us?</h3>
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex-shrink-0"></div>
                      <span className="font-medium">Free returns within 30 days</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex-shrink-0"></div>
                      <span className="font-medium">24/7 customer support</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex-shrink-0"></div>
                      <span className="font-medium">Secure payment processing</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="font-medium">1 year warranty included</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BuyNow