import { useEffect, useState } from "react";

import "./Store.scss";
import Card from "../../components/Card/Card";
import StoreSection from "../../components/StoreSection/StoreSection";

import { Link } from "react-router-dom";
import CtaSection from "../../components/CtaSection/CtaSection";
export default function SectionsNavbar() {
  //const grouped = groupByCategory(products);
  return (
    <>
      <CtaSection />
    </>
  );
}
//<StoreSection data={data} />;
/**   <Link className="cta-section cta-section--produce " to={"/produce"}>
        {"Produce"}
      </Link>
      <Link className="cta-section cta-section--grocery" to={"/grocery"}>
        {"Grocery"}
      </Link>
      <Link className="cta-section cta-section--kitchen" to={"/kitchen"}>
        {"Todays food menu"}
      </Link> */
