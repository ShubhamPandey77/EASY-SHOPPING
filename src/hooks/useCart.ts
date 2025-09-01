import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

// TODO: change file name -> Done
// TODO: make sure to keeps context related hooks either into different folder or next to context itself -> Done

export default function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
