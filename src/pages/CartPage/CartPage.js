import CartItem from "../../components/CartItem/CartItem";
import CartSummary from "../../components/CartSummary/CartSummary";
import "./CartPage.scss";
import { removeFromCart, updateCartQty, getCart } from "../../utils/api";
import { Link } from "react-router-dom";
export default function CartPage({
  cartItems = [],
  onUpdateQty,
  user,
  onCheckout,
  setCart,
  onRemove,
  isSubscribed,
  subtotal,
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
      <h1>Your Box</h1>
      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: 64 }}>
          <p>Your BOX is empty.</p>
          <Link to="/shoppage">Continue Shopping</Link>
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
                  subtotal={subtotal}
                  isSubscribed={isSubscribed}
                  user={user}
                  item={item}
                  onIncrease={() => increaseQty(item.productId, item.quantity)}
                  onDecrease={() => decreaseQty(item.productId, item.quantity)}
                  onRemove={() => remove(item.productId)}
                />
              </li>
            ))}
          </ul>
          <CartSummary
            subtotal={subtotal}
            isSubscribed={isSubscribed}
            user={user}
            items={cartItems}
            onCheckout={onCheckout}
          />
        </>
      )}
    </div>
  );
}
