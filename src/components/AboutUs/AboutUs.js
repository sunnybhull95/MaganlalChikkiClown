import { useEffect, useState } from "react";
import style from "./AboutUs.module.css";
import getAPI from "../../api/getapi";


import { Spinner } from "react-bootstrap";

import PathComponent from "../PathComponent/PathComponent";

const AboutUs = () => {
  const [getData, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAPI("about")
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {/* Spinner from react-bootstrap */}
        <Spinner animation="border" variant="danger" />
      </div>
    );

  return (
    <>
      <div className={style.pDiv}>
        <PathComponent text="About Us"/>
        {getData.map((aData, index) => (
          <div className={style.mDiv} key={aData.id || index}>
            <div className={style.flexDiv}>
              <div className={style.imgDiv}>
                <img src={aData.image} alt="img"/>
                <div className={style.abDiv}></div>
              </div>
              <div className={style.textDiv}>
                <p className={style.heading}>{aData.title}</p>
                <p className={style.dText}>{aData.description}</p>
                <p className={style.heading}>our team</p>
                <p className={style.dText}>{aData.our_team}</p>
              </div>
            </div>
            <div>
              <p
                className={style.heading}
                style={{ textTransform: "capitalize" }}
              >
                History
              </p>
              <p className={style.dText}>{aData.history}</p>
              <p className={style.heading}>client satisfaction</p>
              <p className={style.dText}>{aData.client_satisfaction}</p>
              <p className={style.heading}>OUR USP</p>
              <p className={style.dText}>
                We are one of the fastest-growing organizations dealing in
                manufacturing, exporting and supplying Chikki, Dry Fruit Rolls,
                Fudges, Jellies, and Savouries(Namkeens) Some factors, which set
                us apart are as follows:
              </p>
              <ul className={style.dText} style={{ paddingLeft: "15px" }}>
                <li>Excellent state-of-the-art infrastructure</li>
                <li>
                  Cost-effective and quality products within ‘On-Time’ delivery
                </li>
                <li>Customer-centric approach</li>
                <li>Flavorsome products</li>
                <li>Hygienically processed</li>
                <li>On-time product delivery</li>
                <li>Competitive prices</li>
                <li>Ethical business practices</li>
                <li>Strong distribution network</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AboutUs;
