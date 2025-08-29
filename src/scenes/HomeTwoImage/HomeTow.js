import style from "./HomeTowImage.module.css";
import StrawberryFudge from "../../images/stawberryFudge.jpg";
import CelebrationBox from "../../images/celebrationBox.jpg";

const HomeTowImage = () => {
  return (
    <>
      <div className={style.imgMain}>
        <div className={style.imgDiv}>
          <div className={style.relative}>
            <img src={CelebrationBox} />
          <div className={style.whiteBG}></div>

          </div>
          <div className={style.relative}>
            <img src={StrawberryFudge} />
          <div className={style.whiteBG}></div>

          </div>
        </div>
      </div>
    </>
  );
};

export default HomeTowImage;
