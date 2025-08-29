import style from "./ProductsHeader.module.css";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

const ProductsHeader = ({ img, title, setActiveFilter }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeItem, setActiveItem] = useState("Latest Product"); // Track active link

  const handleToggle = () => {
    setIsVisible((prevState) => !prevState);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
    setActiveFilter(item); // Update the filter in the parent component
  };

  return (
    <>
      <div className={style.pDiv}>
        <div
          className={`${style.chikkiDiv} ${
            title === "CHIKKI"
              ? style.pinkBorder
              : title === "FUDGE"
              ? style.blueBorder
              : style.goldenBorder
          }`}
        >
          <div
            className={`${style.innerDiv1} ${
              title === "CHIKKI"
                ? style.pink
                : title === "FUDGE"
                ? style.blue
                : style.golden
            }`}
          >
            <img src={img} alt="Chikki Logo" />
            <div>{title}</div>
          </div>
          <div className={style.innerDiv2}>
            <ul
              className={`${style.ul} ${
                title === "CHIKKI"
                  ? style.pinkHover
                  : title === "FUDGE"
                  ? style.blueHover
                  : style.goldenHover
              }`}
            >
              <li
                className={activeItem === "Latest Product" ? style.active : ""}
                onClick={() => handleItemClick("Latest Product")}
              >
                Latest Product
              </li>
              <li
                className={activeItem === "Best Selling" ? style.active : ""}
                onClick={() => handleItemClick("Best Selling")}
              >
                Best Selling
              </li>
              <li
                className={activeItem === "Top Rating" ? style.active : ""}
                onClick={() => handleItemClick("Top Rating")}
              >
                Top Rating
              </li>
              <li
                className={activeItem === "Featured Products" ? style.active : ""}
                onClick={() => handleItemClick("Featured Products")}
              >
                Featured Products
              </li>
            </ul>
          </div>
          <div className={style.pRelative}>
            <button
              onClick={handleToggle}
              style={{ backgroundColor: isVisible ? "#FF5C00" : "" }}
            >
              <FaBars style={{ fontSize: "20px", color: "white" }} />
            </button>
            <div
              className={style.modalUl}
              style={{ display: isVisible ? "block" : "none" }}
            >
              <ul>
                <li
                  className={activeItem === "Latest Product" ? style.active : ""}
                  onClick={() => handleItemClick("Latest Product")}
                >
                  Latest Product
                </li>
                <li
                  className={activeItem === "Best Selling" ? style.active : ""}
                  onClick={() => handleItemClick("Best Selling")}
                >
                  Best Selling
                </li>
                <li
                  className={activeItem === "Top Rating" ? style.active : ""}
                  onClick={() => handleItemClick("Top Rating")}
                >
                  Top Rating
                </li>
                <li
                  className={activeItem === "Featured Products" ? style.active : ""}
                  onClick={() => handleItemClick("Featured Products")}
                >
                  Featured Products
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsHeader;
