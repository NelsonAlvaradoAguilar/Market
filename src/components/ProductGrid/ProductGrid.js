import "./ProductGrid.scss";

import ProductCard from "../ProductCard/ProductCard";
const ProductGrid = ({ items = [] }) => (
  <div className="item-grid">
    {items.map((item) => (
      <ProductCard key={item.name} item={item} />
    ))}
  </div>
);

export default ProductGrid;
