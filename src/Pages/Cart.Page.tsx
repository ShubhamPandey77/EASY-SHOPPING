import { useCart } from "../Context/CartContext";

function Cart() {
  const { cart, total, updateQuantity, removeFromCart } = useCart();

  if (cart.length === 0)
    return (
      <p className="text-center text-gray-500 text-lg font-medium mt-10">
        🛒 Your Cart Is Currently Empty!!
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🛒 Your Cart</h2>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b border-gray-200 py-4"
        >
          <div>
            <p className="font-semibold text-gray-800">{item.title}</p>
            <p className="text-gray-600 text-sm">
              ${item.price} × {item.quantity}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-3 py-1 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
            >
              ➕
            </button>

            <button
              onClick={() =>
                item.quantity > 1
                  ? updateQuantity(item.id, item.quantity - 1)
                  : removeFromCart(item.id)
              }
              className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            >
              ➖
            </button>

            <button
              onClick={() => removeFromCart(item.id)}
              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              🗑
            </button>
          </div>
        </div>
      ))}

      <h3 className="text-xl font-semibold text-gray-800 mt-6">
        Total: ${total}
      </h3>
    </div>
  );
}

export default Cart;
