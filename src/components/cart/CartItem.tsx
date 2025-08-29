import { type CartItem  } from "../../context/CartContext";

interface CartItemProps {
  item: CartItem ;
  onIncrease: () => void;
  onDecrease: () => void;
  onDelete: () => void;
}

function CartItem({ item, onIncrease, onDecrease, onDelete }: CartItemProps) {
  return (
    <div style={{ border: "1px solid #ccc", margin: "8px", padding: "8px" }}>
      <h4>{item.title}</h4>
      <p>Price: ₹{item.price}</p>
      <p>
        Quantity:{" "}
        <button onClick={onDecrease} disabled={item.quantity <= 1}>
          -
        </button>
        <span style={{ margin: "0 8px" }}>{item.quantity}</span>
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
