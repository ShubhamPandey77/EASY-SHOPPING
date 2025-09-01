import { type CartItem  } from "../../contexts/CartContext";

interface CartItemProps {
  item: CartItem ;
  onIncrease: () => void;
  onDecrease: () => void;
  onDelete: () => void;
}

function CartItem({ item, onIncrease, onDecrease, onDelete }: CartItemProps) {
  return (
    <div className="border border-gray-300 m-2 p-2">
      <h4>{item.title}</h4>
      <p>Price: ₹{item.price}</p>
      <p>
        Quantity:{" "}
        <button onClick={onDecrease} disabled={item.quantity <= 1}>
          -
        </button>
        <span className="mx-2">{item.quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
      <button onClick={onDelete} style={{ color: "red" }}>
        Delete
      </button>
      <p>Subtotal: ₹{item.quantity * item.price}</p>
    </div>
  );
}

export default CartItem;
