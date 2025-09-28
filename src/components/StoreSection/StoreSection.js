import { useEffect, useState } from "react";
//import data from "../../data/ProductsData.json";
import "./StoreSection.scss";
import Card from "../../components/Card/Card";
export default function Products({ data }) {
  const { categories, items: productList } = data;

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

          {/* Info */}
          {categories[category]?.info && (
            <p className="category__description">{categories[category].info}</p>
          )}

          {/* Health */}
          {categories[category]?.health && (
            <>
              <h3 className="category__subtitle">Health Benefits:</h3>
              <p className="category__description">
                {categories[category].health}
              </p>
            </>
          )}

          {/* Recipe */}
          {categories[category]?.recipe && (
            <>
              <h3 className="category__subtitle">Recipe:</h3>
              <p className="category__description">
                {categories[category].recipe}
              </p>
            </>
          )}

          <Card items={items} />
        </section>
      ))}
    </div>
  );
}
