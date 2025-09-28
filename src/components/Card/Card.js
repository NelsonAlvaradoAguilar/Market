import "./Card.scss";

function Card({ items }) {
  return (
    <ul className="card">
      {items.map((product) => (
        <li className="card__item" key={product.name}>
          <img width={100} src={product.imageUrl} alt={product.name} />
          <h3>{product.name}</h3>
          {product.description && <p>{product.description}</p>}
          <p>{product.origin}</p>
          <button>Buy Now</button>
        </li>
      ))}
    </ul>
  );
}

export default Card;
