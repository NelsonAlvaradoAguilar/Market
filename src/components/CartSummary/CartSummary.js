export default function CartSummary({ items, onCheckout }) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    <div
      style={{
        marginTop: 32,
        padding: 24,
        borderRadius: 12,
        background: "#fafbfc",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ fontWeight: 500, fontSize: 18, marginBottom: 8 }}>
        Subtotal: ${subtotal.toFixed(2)}
      </div>
      <button
        onClick={onCheckout}
        style={{
          marginTop: 16,
          padding: "12px 32px",
          background: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontWeight: 600,
          fontSize: 16,
        }}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
