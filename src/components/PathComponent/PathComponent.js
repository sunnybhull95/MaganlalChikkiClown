import style from "./PathComponent.module.css"
import { Link } from "react-router-dom";


const PathComponent = ({text,categoryName}) => {
  return (
    <>
      <div className={style.aboutText}>
        <p>{text}</p>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className={style.homeHover}>Home</span>
        </Link>{" "}
        <span>|</span> <span style={{ color: "#ed3237" }}>{text} {categoryName}</span>
      </div>
    </>
  );
};

export default PathComponent;


// we will use this component only at
// ABOUT US ,CONTACT US ,SHOP ,MY CART ,WISHLIST

// we will not use this component only at
// search Product and detail product