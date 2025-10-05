const CategoryInfo = ({ data }) => (
  <section>
    <h1>{data?.title}</h1>
    <p>{data?.info}</p>
    {data?.health && (
      <p>
        <strong>Health:</strong> {data.health}
      </p>
    )}
    {data?.recipe && (
      <p>
        <strong>Recipe:</strong> {data.recipe}
      </p>
    )}
  </section>
);

export default CategoryInfo;
