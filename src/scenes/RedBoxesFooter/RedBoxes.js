import style from "./RedBoxes.module.css";
import img4 from "../../images/icon-dailyvery.png";
import img1 from "../../images/icon-freeship.png";
import img2 from "../../images/icon-payment.png";
import img3 from "../../images/icon-suport.png";

const RedBoxs = () => {
  return (
    <>
      <div className={style.mDiv}>
        <div className={style.pFlex}>
          <div className={style.dFlex}>
            {/* <div> */}
              <img src={img1} />
            {/* </div> */}
            <div>
              <p className={style.capital} >free shipping</p>
              <p>free shipping on order over rs.750</p>
            </div>
          </div>{" "}
          <div className={style.dFlex}>
            {/* <div> */}
              <img src={img2} />
            {/* </div> */}
            <div>
              <p className={style.capital}>security payment</p>
              <p>we value your secturity</p>
            </div>
          </div>{" "}
          <div className={style.dFlex}>
            {/* <div> */}
              <img src={img3} />
            {/* </div> */}
            <div>
              <p className={style.capital}>online support</p>
              <p>we have support 24/7</p>
            </div>
          </div>{" "}
          <div className={style.dFlex}>
            {/* <div> */}
              <img src={img4} />
            {/* </div> */}
            <div>
              <p className={style.capital}>quick and easy payment</p>
              <p>pan india delivery</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RedBoxs;
