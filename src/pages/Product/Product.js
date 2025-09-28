import { useEffect, useState } from "react";
import data from "../../data/ProductsData.json";
import "./Product.scss";
import Card from "../../components/Card/Card";
export default function Products() {
  const { categories, products: productList } = data;

  function groupByCategory(products) {
    return products.reduce((groups, product) => {
      const category = product.category || "Other";
      if (!groups[category]) groups[category] = [];
      groups[category].push(product);
      return groups;
    }, {});
  }

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productList);
  }, []);

  const grouped = groupByCategory(products);
  return (
    <div className="category-list">
      {Object.entries(grouped).map(([category, items]) => (
        <section className="category" key={category}>
          <h2 className="category__title">
            {categories[category]?.title || category}
          </h2>
          <p className="category__description">{categories[category]?.info}</p>
          <h3 className="category__subtitle">Health Benefits:</h3>
          <p className="category__description">
            {categories[category]?.health}
          </p>
          <h3 className="category__subtitle">Recipe:</h3>
          <p className="category__description">
            {categories[category]?.recipe}
          </p>
          <Card items={items} />
        </section>
      ))}
    </div>
  );
}
