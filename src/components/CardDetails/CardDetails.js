import {Link,  useLocation, useNavigate } from "react-router-dom";
import style from "./CardDetails.module.css";
import LogoBanner from "../../images/ShopImage.jpg";
import { useRef, useState } from "react";
import { FaFacebookF, FaTwitter, FaGooglePlusG, FaHeart } from "react-icons/fa";
import { BsBagCheck } from "react-icons/bs";
import { useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import ViewModal from "../ViewModal/ViewModal";

const CardDetails = () => {
  const location = useLocation();
  const { product } = location.state || {};

  // Scroll to top when component loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [showWishlistMessage, setShowWishlistMessage] = useState(false);

  const imgRef = useRef(null);

  const navigate = useNavigate();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const productsToShow = 3;

  const [viewShow, setViewShow] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleMouseMove = (e) => {
    const img = imgRef.current;
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
    img.style.transform = "scale(1.8)";
  };

  const handleMouseLeave = () => {
    const img = imgRef.current;
    if (!img) return;
    img.style.transformOrigin = "center";
    img.style.transform = "scale(1)";
  };

  const getCategory = () => {
    const lowerTitle = product.title.toLowerCase();
    if (lowerTitle.includes("chikki")) return "Chikki";
    if (lowerTitle.includes("fudge")) return "Fudge";
    if (lowerTitle.includes("dry fruit roll")) return "Dry Fruit Roll";
    if (lowerTitle.includes("mix roll")) return "Mix Roll";
    return "Other";
  };

  // normal formula to convert gm to kg 250gm % 1000 = 0.25kg
  const getWeightFromTitle = () => {
    const title = product.title.toLowerCase();
    const gramMatch = title.match(/(\d+)\s?(g|gm|grams)/);
    const kgMatch = title.match(/(\d+)\s?(kg|kilogram)/);
    if (kgMatch) return `${kgMatch[1]} kg`;
    else if (gramMatch)
      return `${(parseInt(gramMatch[1]) / 1000).toFixed(2)} kg`;
    return "Weight not specified";
  };

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      // Product already in cart, update quantity
      cartItems[existingProductIndex].quantity += quantity;
    } else {
      // New product, add to cart
      cartItems.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    setShowCartMessage(true);
    setTimeout(() => setShowCartMessage(false), 2000);
    window.dispatchEvent(new Event("cartUpdated"));
  };
  const handleAddToWishlist = () => {
    const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isAlreadyInWishlist = wishlistItems.some(
      (item) => item.id === product.id
    );

    if (isAlreadyInWishlist) {
      navigate("/wishlist");
    } else {
      wishlistItems.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
      setShowWishlistMessage(true);
      setTimeout(() => setShowWishlistMessage(false), 2000);
    }
  };

  // related products function is give below there 2 related product function[handleRelatedCart,handleRelatedWishlist]
  const handleRelatedCart = (relatedProduct) => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === relatedProduct.id
    );

    if (existingProductIndex !== -1) {
      cartItems[existingProductIndex].quantity += 1; // Increase quantity if exists
    } else {
      cartItems.push({ ...relatedProduct, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    setShowCartMessage(true);
    setTimeout(() => setShowCartMessage(false), 2000);

    // Optional if you want to trigger cart update elsewhere
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleRelatedWishlist = (relatedProduct) => {
    const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isAlreadyInWishlist = wishlistItems.some(
      (item) => item.id === relatedProduct.id
    );

    if (isAlreadyInWishlist) {
      navigate("/wishlist");
    } else {
      wishlistItems.push(relatedProduct);
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
      setShowWishlistMessage(true);
      setTimeout(() => setShowWishlistMessage(false), 2000);
    }
  };

  const getCategoryId = () => {
    if (!product?.title) return null; // Safe check
    const lowerTitle = product.title.toLowerCase();
    if (lowerTitle.includes("chikki")) return 1;
    if (lowerTitle.includes("fudge")) return 2;
    if (lowerTitle.includes("dry fruit roll")) return 4;
    if (lowerTitle.includes("mix roll")) return 4;
    return null;
  };

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      const categoryId = getCategoryId();
      console.log("Category ID:", categoryId);
      if (!categoryId) return;

      try {
        const res = await fetch(
          `https://appy.trycatchtech.com/v3/maganlalchikki/product_list?category_id=${categoryId}`
        );
        const data = await res.json();
        console.log("API Response:", data);

        if (Array.isArray(data) && data.length) {
          const sortedData = data.sort((a, b) => a.id - b.id); // Sorting by id
          setRelatedProducts(sortedData);
        } else {
          console.log("No related products in response.");
          setRelatedProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch related products", error);
      }
    };
    fetchRelatedProducts();
  }, [product]);

  return (
    <>
      {showCartMessage && (
        <div className={style.toastMessage}>Product added to cart</div>
      )}
      {showWishlistMessage && (
        <div className={style.toastMessage}>Product added to wishlist</div>
      )}

      <div className={style.mDiv}>
        <div className={style.aboutText}>
          <p>Product Details</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className={style.homeHover}>Home</span>
          </Link>
          <span>|</span> <span>{getCategory()}</span>
          <span>|</span>
          <span style={{ color: "#ed3237" }}>{product.title}</span>
        </div>
        <div className={style.flexDiv}>
          <div className={style.cDiv1}>
            <img src={LogoBanner} alt="img"/>
          </div>
          <div className={style.cDiv2}>
            <div
              className={style.zoomDiv}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                ref={imgRef}
                src={product.images}
                alt={product.title}
                style={{ width: "300px" }}
                
              />
            </div>
            <div className={style.textDiv}>
              <p className={style.title}>{product.title}</p>
              <div className={style.detailDiv}>
                <p>Categories : {getCategory()}</p>
                <p>Availability : In Stock</p>
              </div>
              <p className={style.price}>₹{product.price}.00</p>

              <div className={style.buttonsDiv}>
                <div className={style.onClickFunctionDiv}>
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className={style.controlButoon}
                  >
                    -
                  </button>
                  <span style={{ margin: "0 10px" }}>{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className={style.controlButoon}
                  >
                    +
                  </button>
                </div>
                <button
                  className={style.addToCartButton}
                  onClick={handleAddToCart}
                >
                  <BsBagCheck
                    style={{
                      marginRight: "5px",
                      marginBottom: "5px",
                      fontSize: "16px",
                    }}
                  />
                  Add To Cart
                </button>
                <button
                  className={style.wishlistButton}
                  onClick={handleAddToWishlist}
                >
                  <FaHeart />
                </button>
              </div>

              <div className={style.icons}>
                <FaFacebookF className={style.icon1} />
                <FaTwitter className={style.icon2} />
                <FaGooglePlusG className={style.icon3} />
              </div>
            </div>
          </div>
        </div>

        <div className={style.flexInfromationDescription}>
          <div className={style.innerDiv1}></div>
          <div className={style.innerDiv2}>
            <div className={style.flexChild}>
              <p
                onClick={() => setActiveTab("description")}
                className={activeTab === "description" ? style.activeTab : ""}
                style={{ textTransform: "uppercase", fontWeight: "600" }}
              >
                Description
              </p>
              <p
                onClick={() => setActiveTab("additional")}
                className={activeTab === "additional" ? style.activeTab : ""}
                style={{ textTransform: "uppercase", fontWeight: "600" }}
              >
                Additional information
              </p>
            </div>
            <div
              className={style.flexChild2}
              style={{
                display: activeTab === "description" ? "block" : "none",
              }}
            >
              <p>{product.full_description}</p>
              <p style={{ color: "red" }}>{product.small_description}</p>
            </div>

            <div
              className={style.flexChild2}
              style={{
                display: activeTab === "additional" ? "block" : "none",
              }}
            >
              <p>
                <span style={{ marginRight: "30px", fontWeight: "700" }}>
                  Weight :{" "}
                </span>
                {getWeightFromTitle()}
              </p>
              <p>
                <span style={{ marginRight: "13px", fontWeight: "700" }}>
                  HSN Code :{" "}
                </span>
                17000{product.id}
              </p>
            </div>
          </div>
        </div>
        <div className={style.flexInfromationDescription}>
          <div className={style.innerDiv4}></div>
          <div className={style.innerDiv3}>
            <div className={style.flexRelated}>
              <p className={style.textRelated}>Related items</p>
              <div>
                <button
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      prev === 0
                        ? Math.max(relatedProducts.length - productsToShow, 0)
                        : prev - 1
                    )
                  }
                  className={style.arrowButton}
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      prev + productsToShow >= relatedProducts.length
                        ? 0
                        : prev + 1
                    )
                  }
                  className={style.arrowButton}
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
            {relatedProducts.length > 0 ? (
              <div className={style.relatedWrapper}>
                <div className={style.sliderContainer}>
                  <div
                    className={style.sliderTrack}
                    style={{
                      transform: `translateX(-${
                        currentIndex * (100 / productsToShow)
                      }%)`,
                    }}
                  >
                    {relatedProducts.map((product, index) => (
                      <div key={index} className={style.relatedCard}>
                        <div className={style.relatedCradsWidth}>
                          <div className={style.positioDiv}>
                            <img src={product.images} alt={product.title} />
                            <div className={style.positioAbsDiv}>
                              <div className={style.ButtonsKing}>
                                <button
                                  className={style.AbsButton}
                                  onClick={() => {
                                    setSelectedData({
                                      Cdata: product,
                                      product: location.state.product,
                                    });
                                    setViewShow(true);
                                  }}
                                >
                                  <FaEye />
                                  <div className={style.Pop1}>QuickView</div>
                                </button>

                                <br />
                                {/* Wishlist Button */}
                                <button
                                  className={style.AbsButton}
                                  onClick={() => handleRelatedWishlist(product)}
                                >
                                  <FaHeart />
                                  <div className={style.Pop2}>WishList</div>
                                </button>

                                <br />
                                {/* Add to Cart Button */}
                                <button
                                  className={style.AbsButton}
                                  onClick={() => handleRelatedCart(product)}
                                >
                                  <IoBagCheckOutline />
                                  <div className={style.Pop3}>Add To Cart</div>
                                </button>
                              </div>
                            </div>
                          </div>
                          <Link
                            to="/carddetails"
                            style={{ textDecoration: "none", color: "black" }}
                            state={{ product: product }}
                            onClick={() => window.scrollTo(0, 0)}
                          >
                            <p>{product.title}</p>
                          </Link>
                          <hr
                            style={{ width: "100%", margin: "10px 0px 10px" }}
                          />
                          <p className={style.productPrice}>
                            ₹{product.price}.00
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p>No related products found.</p>
            )}
          </div>
        </div>
      </div>

      {/* View Modal for QuickView */}
      {selectedData && (
        <ViewModal
          show={viewShow}
          onHide={() => setViewShow(false)}
          Cdata={selectedData.Cdata}
          product={selectedData.product}
        />
      )}
    </>
  );
};

export default CardDetails;
