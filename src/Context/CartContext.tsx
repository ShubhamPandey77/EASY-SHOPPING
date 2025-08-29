import { useState, createContext, type ReactNode} from "react";



export interface Product {
  id: number | string;
  title: string; 
  price: number;
  description?: string;
  thumbnail?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (id: number | string, quantity: number) => void;
  removeFromCart: (id: number | string) => void;
  total: number;
}
const CartContext = createContext<CartContextType | undefined>(undefined);


interface CartProviderProps {
  children: ReactNode;
}
//In this we are making a empty array
export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Now here we are seeing that weather product already there in the cart or not, if not add it into empty array
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);

      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

   // Now if the product is already there we are increasing its quantity
  const updateQuantity = (id: number | string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Removing the undesired items from the cart by using the filter function
  const removeFromCart = (id: number | string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };
 
  // Here by using the reduce function which is mainly used in calculations we will get the total value of the cart..
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

return (
  <CartContext.Provider
    value={{ cart, addToCart, updateQuantity, removeFromCart, total }}
  >
    {children}
  </CartContext.Provider>
);
}

export {CartContext}