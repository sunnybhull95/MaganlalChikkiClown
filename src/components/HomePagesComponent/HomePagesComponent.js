import HomeSlideBar from "../../scenes/HomeSlideBar/HomeSlideBar";
import HomeThreeImage from "../../scenes/HomeThreeImage/HomeThreeImage";
import ProductsHeader from "../ProductsHeader/ProductsHeader";
import HomeTowImage from "../../scenes/HomeTwoImage/HomeTow";
import HomeTwoBigImage from "../../scenes/HomeTwoBigImage/HomeTwoBigImage";
import RedBoxs from "../../scenes/RedBoxesFooter/RedBoxes";
import ProductSection from "../ProductSection/ProductSection";
import roseChikkiImg from "../../images/rose_chikki.jpg";
import chocklateFudgeImg from "../../images/ChocolateFudgeImg.jpg";
import DryFruitRollImg from "../../images/DryFruitRoll.jpg";
import chikkiHeaderIcon from "../../images/ic-spa.png"
import fudgeHeaderIcon from "../../images/ic-travel.png"
import dryFruitRollHeaderIcon from "../../images/ic-fashion.png"
import SlideBarProduct from "../SlideBarProduct/SlideBarProduct";
import { useState } from "react";

const HomePagesComponent = () => {

  const [activeFilter, setActiveFilter] = useState("Latest Product");
  return (
    <>
      <HomeSlideBar />
      <HomeThreeImage />

      {/* given below is Chiiki Header & Product section  */}
      <ProductsHeader img={chikkiHeaderIcon} title="CHIKKI" backGroundColor="pink" divBorder="pinkBorder" hover="pinkHover" setActiveFilter={setActiveFilter}/>
      <ProductSection apiId="1" img={roseChikkiImg} buttonValue="Chikki" activeFilter={activeFilter}/>

      <HomeTowImage />

      {/* given below is Fudge Header & Product section  */}
      <ProductsHeader img={fudgeHeaderIcon} title="FUDGE" backGroundColor="blue" divBorder="blueBorder" hover="BlueHover" setActiveFilter={setActiveFilter}/>
      <ProductSection apiId="2" img={chocklateFudgeImg} buttonValue="Fudge" activeFilter={activeFilter}/>
    
      {/* given below is DryFruitRoll Header & Product section  */}
      <ProductsHeader img={dryFruitRollHeaderIcon} title="DRY FRUIT ROLL" backGroundColor="golden" divBorder="goldenBorder" hover="GoldenHover" setActiveFilter={setActiveFilter}/>
      <ProductSection apiId="4" img={DryFruitRollImg} buttonValue="Dry Fruit Roll" activeFilter={activeFilter}/>

      <HomeTwoBigImage />
      <RedBoxs />
      <SlideBarProduct/>
    </>
  );
};

export default HomePagesComponent;
