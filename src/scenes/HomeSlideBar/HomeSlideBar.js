import React, { useEffect, useState } from "react";
import { Carousel, Spinner } from "react-bootstrap"; // Import Spinner
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./HomeSlideBar.module.css";

const HomeSlideBar = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://appy.trycatchtech.com/v3/maganlalchikki/home_image_gallery"
        );
        // setProductData(response.data); // Update productData with the response
        setProductData(Array.isArray(response.data) ? response.data : []);
        setLoading(false); // Set loading to false
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
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

  if (error) return <div>Error: {error}</div>;

  return (
    <div className={style.mainDivC}>
      <Carousel>
        {productData.map((product, index) => (
          <Carousel.Item key={index}>
            <img
              src={product.image} 
              alt={`Slide ${index + 1}`}
              className={style.img}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default HomeSlideBar;
