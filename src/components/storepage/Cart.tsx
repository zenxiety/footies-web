import { useContext } from "react";
import CartContext from "./CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, clearCart, totalItems, totalPrice } =
    useContext(CartContext);

  return (
    <div>
      <h2>Shopping Cart ({totalItems} items)</h2>
    </div>
  );
}
