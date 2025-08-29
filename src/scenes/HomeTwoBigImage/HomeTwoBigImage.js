import style from "./HomeTwoBigImage.module.css";
import img1 from "../../images/380.jpg";
import img2 from "../../images/3802.jpg";

const HomeTwoBigImage = () => {
  return (
    <>
      <div className={style.mainDiv}>
        <div className={style.flexDiv}>
          <div className={style.div}>
            <img src={img1} />
            <div className={style.whiteBG}></div>
          </div>
          <div className={style.div}>
            <img src={img2} />
            <div className={style.whiteBG}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeTwoBigImage;
