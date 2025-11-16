import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import CategoryInfo from "../CategoryInfo/CategoryInfo";
import SubcategoryNav from "../SubCategory/SubCategory";
import ProductGrid from "../ProductGrid/ProductGrid";
import { images } from "../../data/images";
import "./ShopPage.scss";
import SearchBar from "../SearchBar/SearchBar";
import FeaturedCarousel from "../Carousel/Carousel";
import { getProducts, getCategories, getSections } from "../../utils/api";

const ShopPage = ({
  addToCart,
  removeFromCart,
  cart,
  user,
  subtotal,
  isSubscribed,
}) => {
  // State
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [apiError, setApiError] = useState(null);

  // 1. Load sections
  useEffect(() => {
    const loadSections = async () => {
      try {
        const data = await getSections();
        setSections(data);
        setSelectedSection(data[0]?.id || null);
      } catch (error) {
        setApiError("Error fetching sections.");
      }
    };
    loadSections();
  }, []);

  // 2. Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        setApiError("Error fetching categories.");
      }
    };
    loadCategories();
  }, []);

  // 3. Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setApiError("Error fetching products.");
      }
    };
    loadProducts();
  }, []);

  // 4. Filter categories by selected section
  const filteredCategories = categories.filter(
    (cat) => cat.section_id === selectedSection
  );

  // 5. When section changes, select first available category
  useEffect(() => {
    if (filteredCategories.length) {
      setSelectedCategory(filteredCategories[0].id);
    } else {
      setSelectedCategory(null);
    }
  }, [selectedSection, categories]);

  // 6. Filter products by selected category
  const filteredItems = products.filter(
    (item) => item.category_id === selectedCategory
  );

  // 7. Apply search
  const itemsToDisplay = searchTerm
    ? filteredItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.description &&
            item.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : filteredItems;

  if (apiError) return <div>{apiError}</div>;

  return (
    <section className="shop-page">
      <div className="shop-page__carousel">
        <FeaturedCarousel items={images} settings={{ dots: false }} />
      </div>
      <div className="shop-page__search">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="shop-page__menu">
        <div>
          {/* SECTION NAVIGATION */}
          <Sidebar
            categoryList={sections}
            selectedCategory={selectedSection}
            onSelectCategory={setSelectedSection}
          />
          {/* CATEGORY NAVIGATION */}
          <SubcategoryNav
            subCategories={filteredCategories}
            selectedSub={selectedCategory}
            onSelectSub={setSelectedCategory}
          />
          {/* Optional: Category Info */}
          <CategoryInfo
            categoryData={categories.find((cat) => cat.id === selectedCategory)}
            selectedCategory={selectedCategory}
          />
        </div>
        <div>
          <ProductGrid
            items={itemsToDisplay}
            addToCart={addToCart}
            onRemove={removeFromCart}
            cart={cart}
            subtotal={subtotal}
            isSubscribed={isSubscribed}
          />
        </div>
      </div>
    </section>
  );
};

export default ShopPage;

//   <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
