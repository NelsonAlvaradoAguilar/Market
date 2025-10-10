import "./Cart.scss";

const Cart = ({ cart, removeFromCart }) => (
  <section className="cart">
    <div className="cart__container">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart__list">
          {cart.map((item) => (
            <li key={item.name} className="cart__item">
              <span className="cart__t">{item.name}</span>
              <span className="cart__t"> {item.quantity}</span>
              <button
                className="cart__t"
                onClick={() => removeFromCart(item.name)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
    {/* Add total, checkout, etc. as needed */}
  </section>
);
export default Cart;
