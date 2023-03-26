import { createContext, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
});

type Props = {
  children: React.ReactNode;
};

export const CartProvider = ({ children }: Props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const existingCartItemIndex = cartItems.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingCartItemIndex !== -1) {
      const newCartItems = [...cartItems];
      newCartItems[existingCartItemIndex].quantity++;
      setCartItems(newCartItems);
    } else {
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
