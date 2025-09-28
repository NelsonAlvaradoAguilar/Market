import "./Embed.scss";
export default function MapEmbed({ url }) {
  return (
    <section className="embed">
      <iframe src={url} width={"100%"} height={"100%"} loading="lazy"></iframe>
    </section>
  );
}
