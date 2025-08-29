import { useEffect, useState } from "react";
import style from "./HomeThreeImage.module.css";
import axios from "axios";

const HomeThreeImage = () => {
  const [getData, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://appy.trycatchtech.com/v3/maganlalchikki/banner_image")
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className={style.imgDiv}>
        {getData.map((product) => (
          <div className={style.relative} key={product.id}>
            {" "}
            <img
              key={product.id}
              src={product.banner_image}
              className={style.img}
            />{" "}
            
            <div className={style.whiteBG}></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomeThreeImage;
