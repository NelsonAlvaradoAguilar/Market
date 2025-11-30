import React, { useEffect, useState } from "react";
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
  cartFull,
  // <-- new prop
}) => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  // Build a quick lookup of productIds that are in the cart
  const cartProductIds = new Set(
    cart.map((cartItem) => cartItem.productId ?? cartItem.id)
  );
  useEffect(() => {
    if (items.length > 0) {
      setSelectedProductId(items[0].id); // Select first product by default
    } else {
      setSelectedProductId(null);
    }
  }, [items]);
  return (
    <ul className="product">
      {items.length > 0 ? (
        items.map((item) => {
          const productId = item.id;
          const isInCart = cartProductIds.has(productId);

          return (
            <li
              className={`product__card${
                selectedProductId === productId ? " selected" : ""
              }`}
              key={productId}
              onClick={() => setSelectedProductId(productId)}
            >
              <ProductCard
                isSubscribed={isSubscribed}
                subtotal={subtotal}
                item={item}
                addToCart={addToCart}
                onRemove={onRemove}
                isInCart={isInCart}
                cartFull={cartFull}
                selected={selectedProductId === productId}
                // <-- pass selected prop
              />
            </li>
          );
        })
      ) : (
        <li className="product__card product__card--empty">
          <p>No products found.</p>
        </li>
      )}
    </ul>
  );
};

export default ProductGrid;
