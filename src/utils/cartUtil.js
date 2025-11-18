export const CART_LIMIT = 60;

export const calculateSubtotal = (cart = []) =>
  cart.reduce((sum, item) => {
    const price = Number(item.price ?? item.product_price ?? 0);
    return sum + price * (item.quantity ?? 1);
  }, 0);

export const isCartFull = (cart = []) => {
  const subtotal = calculateSubtotal(cart);
  return subtotal >= CART_LIMIT;
};
