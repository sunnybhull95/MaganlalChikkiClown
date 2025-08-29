import style from "./ShopProductsComponent.module.css";
import { MdViewList } from "react-icons/md";
import { HiViewGrid } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import getAPI from "../../api/getapi";
import { Row, Col, Spinner } from "react-bootstrap";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import ViewModal from "../ViewModal/ViewModal";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ShopProductsComponent = ({
  categoryId,
  priceRange = { min: 50, max: 1600 },
}) => {
  const [getData, setData] = useState([]);
  const [viewShow, setViewShow] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [wishlistMessage, setWishlistMessage] = useState("");
  const [cartMessage, setCartMessage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sortOption, setSortOption] = useState("default");
  const [filteredData, setFilteredData] = useState([]);

  const navigate = useNavigate();

  const categoryNames = {
    1: "Chikki",
    4: "Dry Fruit Roll",
    2: "Fudge",
    5: "Namkeens",
  };

  const categoryName = categoryNames[categoryId] || "Category";

  useEffect(() => {
    window.scroll(0, 0);
    console.log("Price Range:", priceRange); // Debugging line
    setLoading(true);
    getAPI(`product_list?category_id=${categoryId}`)
      .then((response) => {
        const filteredData = response.data.filter(
          (item) => item.price >= priceRange.min && item.price <= priceRange.max
        );
        setData(filteredData);
        setError(null);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load products.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId, priceRange]);

  const handleSort = (option) => {
    setSortOption(option);
  };

  useEffect(() => {
    let sortedData = [...getData]; // Copy the original data to prevent mutation

    if (sortOption === "popularity") {
      sortedData = sortedData.filter((item) => item.id % 2 === 0); // Even ID products
    } else if (sortOption === "rating") {
      sortedData = sortedData.filter((item) => item.id % 2 !== 0); // Odd ID products
      sortedData.sort((a, b) => (b.rating || 0) - (a.rating || 0)); // Sort by rating
    } else if (sortOption === "price") {
      sortedData.sort((a, b) => a.price - b.price); // Low to High
    } else if (sortOption === "priceDesc") {
      sortedData.sort((a, b) => b.price - a.price); // High to Low
    } else if (sortOption === "date") {
      sortedData.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0)); // Sort by date
    } else {
      sortedData = [...getData]; // Default: No sorting
    }

    setFilteredData(sortedData);
  }, [sortOption, getData]); // Re-run sorting whenever `sortOption` or `getData` changes

  const addToWishlist = (product) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isAlreadyInWishlist = wishlist.some((item) => item.id === product.id);

    if (isAlreadyInWishlist) {
      navigate("/wishlist");
    } else {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setWishlistMessage("Product added to wishlist");
      setTimeout(() => setWishlistMessage(""), 2000);
    }
  };

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    setCartMessage("Product added to cart!");
    setTimeout(() => setCartMessage(null), 2000);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(getData.length / itemsPerPage);

  const [activeView, setActiveView] = useState("grid"); // Default view is Grid

  useEffect(() => {
    window.scroll(0, 0);
  }, [currentPage]);

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
        <Spinner animation="border" variant="danger" />
      </div>
    );

  if (error)
    return <div style={{ textAlign: "center", padding: "20px" }}>{error}</div>;

  return (
    <>
      {wishlistMessage && (
        <div className={style.wishlistMessage}>{wishlistMessage}</div>
      )}

      {cartMessage && <div className={style.cartMessage}>{cartMessage}</div>}

      <div>
        <h6 className={style.h6}>{categoryName}</h6>
        <div className={style.Div1}>
          <div className={style.flex1}>
            <HiViewGrid
              onClick={() => setActiveView("grid")}
              className={activeView === "grid" ? style.activeIcon : ""}
            />
            <MdViewList
              onClick={() => setActiveView("list")}
              className={activeView === "list" ? style.activeIcon : ""}
              style={{margin:"0px 15px 0px 5px"}}
            />
            <div className={style.flex2}>
              <p>Sort by Default</p>
              <IoIosArrowDown className={style.icon1} />
              <div className={style.abs}>
                <ul>
                  <li
                    onClick={() => handleSort("default")}
                    className={sortOption === "default" ? style.activeLink : ""}
                  >
                    Sort by Default
                  </li>
                  <li
                    onClick={() => handleSort("popularity")}
                    className={
                      sortOption === "popularity" ? style.activeLink : ""
                    }
                  >
                    Sort by Popularity
                  </li>
                  <li
                    onClick={() => handleSort("rating")}
                    className={sortOption === "rating" ? style.activeLink : ""}
                  >
                    Sort by Rating
                  </li>
                  <li
                    onClick={() => handleSort("date")}
                    className={sortOption === "date" ? style.activeLink : ""}
                  >
                    Sort by Date
                  </li>
                  <li
                    onClick={() => handleSort("price")}
                    className={sortOption === "price" ? style.activeLink : ""}
                  >
                    Sort by Price (Low to High)
                  </li>
                  <li
                    onClick={() => handleSort("priceDesc")}
                    className={
                      sortOption === "priceDesc" ? style.activeLink : ""
                    }
                  >
                    Sort by Price (High to Low)
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={style.flex1}>
            <p>Show</p>
            <div className={style.flex3}>
              <p>
                12 <IoIosArrowDown className={style.icon1} />
              </p>
              <div className={style.abs1}>
                <ul>
                  <li>12</li>
                  <li>24</li>
                  <li>36</li>
                  <li>48</li>
                  <li>60</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className={style.hr} style={{ width: "100%" }} />
        <div>
          <Row xl={3} md={2} xs={1}>
            {currentItems.map((Cdata) => (
              <Col className={style.col} key={Cdata.id}>
                <div className={style.Sdiv}>
                  <div className={style.RelativeDiv}>
                    <img src={Cdata.images} className={style.Pimg} alt="img"/>
                    <div className={style.AbsoluteDiv}>
                      <div className={style.ButtonsKing}>
                        <button
                          className={style.AbsButton}
                          onClick={() => {
                            setSelectedData(Cdata);
                            setViewShow(true);
                          }}
                        >
                          <FaEye />
                          <div className={style.Pop1}>QuickView</div>
                        </button>
                        <br />
                        <button
                          className={style.AbsButton}
                          onClick={() => addToWishlist(Cdata)}
                        >
                          <FaHeart />
                          <div className={style.Pop2}>WishList</div>
                        </button>
                        <br />
                        <button
                          className={style.AbsButton}
                          onClick={() => addToCart(Cdata)}
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
                    state={{ product: Cdata }}
                  >
                    <p className={style.Title}>{Cdata.title}</p>
                  </Link>
                  <hr style={{ width: "100%" }} />
                  <p className={style.Rupee}>₹{Cdata.price}.00</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
        <hr
          className={style.hr1}
          style={{ width: "100%", marginBottom: "20px" }}
        />
        <div className={style.pages}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <IoMdArrowDropleft />
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? style.activePage : ""}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <IoMdArrowDropright />
          </button>
        </div>
      </div>

      {selectedData && (
        <ViewModal
          show={viewShow}
          onHide={() => setViewShow(false)}
          Cdata={selectedData}
        />
      )}
    </>
  );
};

export default ShopProductsComponent;
