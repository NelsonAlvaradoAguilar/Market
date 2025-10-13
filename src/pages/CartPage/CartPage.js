import CartItem from "../../components/CartItem/CartItem";
import CartSummary from "../../components/CartSummary/CartSummary";
import "./CartPage.scss";
export default function CartPage({
  cartItems = [],
  onUpdateQty,
  onRemove,
  onCheckout,
  setCart,
}) {
  const increaseQty = (itemName) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.name === itemName
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };
  const remove = (itemName) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== itemName));
  };
  const decreaseQty = (itemName) => {
    const item = cartItems.find((i) => i.name === itemName);
    if (item) {
      if (item.quantity === 1) {
        onRemove(itemName);
      } else {
        onUpdateQty(itemName, item.quantity - 1);
      }
    }
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
                  onIncrease={increaseQty}
                  onDecrease={decreaseQty}
                  onRemove={remove}
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
