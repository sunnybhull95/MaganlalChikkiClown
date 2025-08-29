import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./MenuDepartments.module.css";

const MobileHeadereMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setActiveCategory(queryParams.get("category_id"));
  }, [location.search]);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    navigate(`/searchproducts?category_id=${categoryId}`);
  };

  return (
    <div>
      <p
        className={style.pp}
        style={{
          color: activeCategory === "1" ? "#ed3237" : "black",
          fontWeight: activeCategory === "1" ? "700" : "normal",
        }}
        onClick={() => handleCategoryClick("1")}
      >
        Chikki
      </p>
      <p
        className={style.pp}
        style={{
          color: activeCategory === "4" ? "#ed3237" : "black",
          fontWeight: activeCategory === "1" ? "700" : "normal",
        }}
        onClick={() => handleCategoryClick("4")}
      >
        Dry Fruits Roll
      </p>
      <p
        className={style.pp}
        style={{
          color: activeCategory === "2" ? "#ed3237" : "black",
          fontWeight: activeCategory === "1" ? "700" : "normal",
        }}
        onClick={() => handleCategoryClick("2")}
      >
        Fudge
      </p>
      <p
        className={style.pp}
        style={{
          color: activeCategory === "5" ? "#ed3237" : "black",
          fontWeight: activeCategory === "1" ? "700" : "normal",
        }}
        onClick={() => handleCategoryClick("5")}
      >
        Namkeens
      </p>
    </div>
  );
};

export default MobileHeadereMenu;
