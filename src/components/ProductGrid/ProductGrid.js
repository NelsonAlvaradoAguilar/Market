import React from "react";
import "./ProductGrid.scss";
import ProductCard from "../ProductCard/ProductCard";
import { useParams } from "react-router-dom";

const ProductGrid = ({
  items = [],
  addToCart,
  subtotal,
  isSubscribed,
  onRemove,
  cart = [],
  cartFull, // <-- new prop
}) => {
  // Build a quick lookup of productIds that are in the cart
  const cartProductIds = new Set(
    cart.map((cartItem) => cartItem.productId ?? cartItem.id)
  );

  return (
    <ul className="product">
      {items.length > 0 ? (
        items.map((item) => {
          const productId = item.id;
          const isInCart = cartProductIds.has(productId);

          return (
            <li className="product__card" key={item.id}>
              <ProductCard
                isSubscribed={isSubscribed}
                subtotal={subtotal}
                item={item}
                addToCart={addToCart}
                onRemove={onRemove}
                isInCart={isInCart}
                cartFull={cartFull}
                // <-- tell ProductCard if it's in the cart
              />
            </li>
          );
        })
      ) : (
        <li>
          <p>No products found.</p>
        </li>
      )}
    </ul>
  );
};

export default ProductGrid;
