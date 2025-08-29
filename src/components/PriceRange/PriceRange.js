import React, { useState, useEffect } from "react";
import styles from "./PriceRangeFilter.module.css";

const PriceRangeFilter = ({ setPriceRange }) => {
  const [minPrice, setMinPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(1600);
  const minLimit = 50;
  const maxLimit = 1600;

  // 🔹 Ensure priceRange is set when component mounts
  useEffect(() => {
    setPriceRange({ min: minPrice, max: maxPrice });
  }, []);

  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    if (value < maxPrice) {
      setMinPrice(value);
    }
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    if (value > minPrice) {
      setMaxPrice(value);
    }
  };

  const applyFilter = () => {
    setPriceRange({ min: minPrice, max: maxPrice });
  };

  return (
    <div className={styles.container}>
      <div className={styles.sliderContainer}>
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={minPrice}
          onChange={handleMinChange}
          className={styles.range}
        />
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={maxPrice}
          onChange={handleMaxChange}
          className={styles.range}
        />
        <div className={styles.sliderTrack}></div>
        <div
          className={styles.sliderRange}
          style={{
            left: `${((minPrice - minLimit) / (maxLimit - minLimit)) * 100}%`,
            width: `${((maxPrice - minPrice) / (maxLimit - minLimit)) * 100}%`,
          }}
        ></div>
      </div>
      <div className={styles.inputs}>
        <input
          type="number"
          value={minPrice}
          onChange={(e) =>
            setMinPrice(Math.min(Number(e.target.value), maxPrice - 1))
          }
          min={minLimit}
          max={maxLimit}
          className={styles.inputBox}
        />
        <input
          type="number"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(Math.max(Number(e.target.value), minPrice + 1))
          }
          min={minLimit}
          max={maxLimit}
          className={styles.inputBox}
        />
      </div>
      <div className={styles.flexDiv}>
        <button onClick={applyFilter} className={styles.filterButton}>
          Filter
        </button>
        <p className={styles.priceRange}>
          Price: {minPrice}.00 INR — {maxPrice}.00 INR
        </p>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
