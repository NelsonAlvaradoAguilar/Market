import CartItem from "../../components/CartItem/CartItem";
import CartSummary from "../../components/CartSummary/CartSummary";
import "./CartPage.scss";
import { removeFromCart, updateCartQty, getCart } from "../../utils/api";
export default function CartPage({
  cartItems = [],
  onUpdateQty,

  onCheckout,
  setCart,
  onRemove,
}) {
  const increaseQty = async (productId, currentQty) => {
    await onUpdateQty(productId, currentQty + 1);
    const updatedCart = await getCart();
    setCart(updatedCart);
  };

  const decreaseQty = async (productId, currentQty) => {
    if (currentQty <= 1) {
      // Do nothing (or show a message)
      return;
    }
    await onUpdateQty(productId, currentQty - 1);
    const updatedCart = await getCart();
    setCart(updatedCart);
  };

  const remove = async (productId) => {
    await onRemove(productId);
    const updatedCart = await getCart();
    setCart(updatedCart);
  };

  return (
    <div className="cartPage">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: 64 }}>
          <p>Your cart is empty.</p>
          <button
            onClick={() => (window.location.href = "/")}
            style={{ marginTop: 16 }}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <ul className="cartPage__list">
            {cartItems.map((item) => (
              <li
                className="cartPage__item"
                key={item.id || item.name}
                style={{ marginBottom: 24 }}
              >
                <CartItem
                  item={item}
                  onIncrease={() => increaseQty(item.productId, item.quantity)}
                  onDecrease={() => decreaseQty(item.productId, item.quantity)}
                  onRemove={() => remove(item.productId)}
                />
              </li>
            ))}
          </ul>
          <CartSummary items={cartItems} onCheckout={onCheckout} />
        </>
      )}
    </div>
  );
}
