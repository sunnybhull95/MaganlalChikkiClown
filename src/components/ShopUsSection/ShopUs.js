import style from "./ShopUs.module.css";
import PriceRangeFilter from "../PriceRange/PriceRange";
import Shopimg from "../../images/ShopImage.jpg";
import ShopProductsComponent from "../ShopProductsComponent/ShopProductsComponent";
import { useState } from "react";
import PathComponent from "../PathComponent/PathComponent";

// left side filter section

const ShopUs = () => {
  const [categoryId, setCategoryId] = useState(1); // default category ID is 1 (Chikki)

  const handleCategoryClick = (id) => {
    setCategoryId(id); // Update the category ID on click
  };

  // Category name mapping based on categoryId
  const categoryNames = {
    1: "Chikki",
    4: "Dry Fruit Roll",
    2: "Fudge",
    5: "Namkeens",
  };

  // Get the category name based on the categoryId
  const categoryName = categoryNames[categoryId] || "Products";

  const [priceRange, setPriceRange] = useState({ min: 50, max: 1600 });

  return (
    <>
      <div className={style.pDiv}>
       <PathComponent text={categoryName}/>
        <div className={style.flexDiv}>
          <div className={style.cflex}>
            <div className={style.categoriesDiv}>
              <h6>Categories</h6>

              <p
                className={categoryId === 1 ? style.activeLink : ""}
                onClick={() => handleCategoryClick(1)}
              >
                Chikki
              </p>
              <p
                className={categoryId === 4 ? style.activeLink : ""}
                onClick={() => handleCategoryClick(4)}
              >
                Dry Fruit Roll
              </p>
              <p
                className={categoryId === 2 ? style.activeLink : ""}
                onClick={() => handleCategoryClick(2)}
              >
                Fudge
              </p>
              <p
                className={categoryId === 5 ? style.activeLink : ""}
                onClick={() => handleCategoryClick(5)}
              >
                Namkeens
              </p>
            </div>
            <div className={style.priceDiv}>
              <h6>by price</h6>
              <PriceRangeFilter setPriceRange={setPriceRange}/>
            </div>
            <div className={style.ShopimgDiv}>
              <img src={Shopimg} alt="img" />
            </div>
          </div>
          <div className={style.cflex2}>
            <ShopProductsComponent categoryId={categoryId} priceRange={priceRange}/>{" "}
            {/* Pass categoryId as prop */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopUs;
