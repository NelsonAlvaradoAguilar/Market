import React from "react";
import "./CtaSection.scss";
import { Link } from "react-router-dom";

export default function CtaSection({ link, section, img }) {
  //const grouped = groupByCategory(products);
  return (
    <>
      <Link className="section section__produce " to={"/produce"}>
        {"Produce"}
      </Link>
      <Link className="section section__grocery" to={"/grocery"}>
        {"Grocery"}
      </Link>
      <Link className="section section__kitchen" to={"/kitchen"}>
        {"Todays food menu"}
      </Link>
    </>
  );
}
