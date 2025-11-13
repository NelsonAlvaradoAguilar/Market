import "./Embed.scss";
export default function MapEmbed({ url }) {
  return (
    <section className="embed">
      <iframe
        src={url}
        width={"100%"}
        height={"100%"}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="map"
      ></iframe>
    </section>
  );
}
/**  <section className="home__info">
          <h3 className="home__subtitle">Location</h3>

          <p className="home__paragrph">123 Main St, Cobourg, ON</p>
        </section> */
