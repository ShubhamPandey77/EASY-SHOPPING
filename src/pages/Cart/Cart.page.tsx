import useCart from "../../hooks/useCart";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Cart() {
  const { cart, total, updateQuantity, removeFromCart } = useCart();

  if (cart.length === 0)
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <p className="text-center text-gray-700 text-lg font-medium">
          🛒 Your Cart Is Currently Empty!!
        </p>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-[100vh]">
      <Card className="w-[60rem] p-[2rem] bg-white text-black shadow-md rounded-2xl">
        <CardContent>
          <h2 className="text-[2rem] font-bold text-gray-900 mb-[2rem] text-center">
            🛒 Your Cart
          </h2>

          <div className="flex flex-col gap-[2rem]">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-300 pb-[1rem]"
              >
                <div>
                  <p className="font-semibold text-gray-900 text-[1.25rem]">
                    {item.title}
                  </p>
                  <p className="text-gray-600 text-sm">
                    ${item.price} × {item.quantity}
                  </p>
                </div>

                <div className="flex items-center gap-[1rem]">
                  <Button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="min-w-[3rem] h-[2.5rem] bg-black text-white rounded-lg hover:bg-gray-800"
                  >
                    ➕
                  </Button>

                  <Button
                    onClick={() =>
                      item.quantity > 1
                        ? updateQuantity(item.id, item.quantity - 1)
                        : removeFromCart(item.id)
                    }
                    className="min-w-[3rem] h-[2.5rem] bg-gray-700 text-white rounded-lg hover:bg-gray-900"
                  >
                    ➖
                  </Button>

                  <Button
                    onClick={() => removeFromCart(item.id)}
                    className="min-w-[3rem] h-[2.5rem] bg-red-600 text-white rounded-lg hover:bg-red-800"
                  >
                    🗑
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-[1.5rem] font-semibold text-gray-900 mt-[2rem] text-right">
            Total: ${total}
          </h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default Cart;
