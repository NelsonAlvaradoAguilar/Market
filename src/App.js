import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import storeData from "./data/StoreData.json";
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./pages/Home/Home.js";
import About from "./components/About/About.js";
import Contact from "./pages/Contact/Contact.js";
import Store from "./pages/Store/Store.js";
import Legal from "./components/Legal/Legal.js";
import Footer from "./components/Footer/Footer.js";
import StoreSection from "./components/StoreSection/StoreSection.js";
import Header from "./components/Header/Header.js";
export default function App() {
  const produceData = {
    categories: storeData?.store?.produce?.categories || {},
    items: storeData?.store?.produce?.items || [],
  };
  const groceryData = {
    categories: { Grocery: storeData?.store?.grocery?.category || {} },
    items: storeData?.store?.grocery?.items || [],
  };
  const kitchenData = {
    categories: { "Kitchen Plates": storeData?.store?.kitchen?.category || {} },
    items: storeData?.store?.kitchen?.items || [],
  };
  const workingHours = storeData?.store?.workingHours?.workingHours || {};
  console.log("storeData:", storeData);
  console.log("storeData.store:", storeData?.store);
  console.log("storeData.store.workingHours:", storeData?.store?.workingHours);
  console.log(
    "storeData.store.workingHours.workingHours:",
    storeData?.store?.workingHours?.workingHours
  );

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/store" element={<Store />} />
        <Route path="/produce" element={<StoreSection data={produceData} />} />
        <Route path="/grocery" element={<StoreSection data={groceryData} />} />
        <Route path="/kitchen" element={<StoreSection data={kitchenData} />} />
        <Route path="/legal" element={<Legal />} />

        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
//    <Route path="/grocery" element={<StoreSection data={data} />} />
