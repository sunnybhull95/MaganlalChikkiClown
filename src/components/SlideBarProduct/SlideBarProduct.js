import style from "./SlideBarProduct.module.css";
import SingleSlidbarComponent from "./SingleSlidbarComponent";
import slidbarProductsicon1 from "../../images/slidbarProducts-icon1.png"
import slidbarProductsicon2 from "../../images/slidbarProducts-icon2.png"
import slidbarProductsicon3 from "../../images/slidbarProducts-icon3.png"

const SlideBarProduct = () => {
  return (
    <>
      <div className={style.mDiv}>
        <div className={style.flexDiv}>
          <SingleSlidbarComponent apiId="4" icons={slidbarProductsicon1} title="dry fruit roll" bgColor="green"/>
          <SingleSlidbarComponent apiId="2" icons={slidbarProductsicon2} title="fudge" bgColor="red"/>
          <SingleSlidbarComponent apiId="5" icons={slidbarProductsicon3} title="namkeens" bgColor="blue"/>
        </div>
      </div>
    </>
  );
};

export default SlideBarProduct;
