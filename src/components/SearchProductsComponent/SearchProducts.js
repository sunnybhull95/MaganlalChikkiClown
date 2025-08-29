import style from "./SearchProducts.module.css";
import getAPI from "../../api/getapi";
import { Row, Col, Spinner } from "react-bootstrap";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import ViewModal from "../ViewModal/ViewModal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";

const SearchProducts = () => {
  const [getData, setData] = useState([]);
  const [viewShow, setViewShow] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [wishlistMessage, setWishlistMessage] = useState("");
  const [cartMessage, setCartMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("category_id");
  const searchKeyword = queryParams.get("search")?.toLowerCase() || "";

  const categoryMapping = {
    chikki: "1",
    fudge: "2",
    "dry fruit roll": "4",
    "mix roll": "4",
    namkeens: "5",
  };

  useEffect(() => {
    setLoading(true);
    setCurrentPage(1);
    window.scrollTo(0, 0);

    let mappedCategoryId = categoryMapping[searchKeyword];
    let url = "product_list?";

    if (mappedCategoryId) {
      url += `category_id=${mappedCategoryId}`;
    } else if (categoryId === "all" || !categoryId) {
      url += "category_id=1,2,4,5";
    } else {
      url += `category_id=${categoryId}`;
    }

    getAPI(url)
      .then((response) => {
        let products = response.data;

        if (!mappedCategoryId && searchKeyword) {
          products = products.filter((product) =>
            product.title.toLowerCase().includes(searchKeyword)
          );
        }

        setData(Array.isArray(products) ? products : []);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to fetch products.");
        setLoading(false);
      });
  }, [categoryId, searchKeyword]);

  const addToWishlist = (product) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isAlreadyInWishlist = wishlist.some((item) => item.id === product.id);

    if (isAlreadyInWishlist) {
      navigate("/wishlist");
    } else {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setWishlistMessage("Product added to wishlist!");
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

  useEffect(() => {
    window.scrollTo(0, 0);
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

  if (error) return <div>Error: {error}</div>;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = Array.isArray(getData)
    ? getData.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];
  const totalPages = Math.ceil(getData.length / productsPerPage);

  return (
    <>
      {wishlistMessage && (
        <div className={style.wishlistMessage}>{wishlistMessage}</div>
      )}
      {cartMessage && <div className={style.cartMessage}>{cartMessage}</div>}

      <div className={style.mDiv}>
        <div className={style.aboutText}>
          <p>Search Results for</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className={style.homeHover}>Home</span>
          </Link>{" "}
          <span>|</span>{" "}
          <span style={{ color: "#ed3237" }}>
            You Search For "{searchKeyword || "All"}"
          </span>
        </div>

        <div>
          <Row xl={4} md={3} xs={1}>
            {currentProducts.length > 0 ? (
              currentProducts.map((Cdata) => (
                <Col className={style.col} key={Cdata.id}>
                  <div className={style.Sdiv}>
                    <div className={style.RelativeDiv}>
                      <img
                        src={Cdata.images}
                        className={style.Pimg}
                        alt={Cdata.title}
                      />
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
              ))
            ) : (
              <p style={{color:"red", fontSize:"30px",textAlign:"center",width:"100%",fontWeight:"700"}}>No products found.</p>
            )}
          </Row>
        </div>

        <div className={style.pages}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            <IoMdArrowDropleft />
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              style={{
                backgroundColor: currentPage === index + 1 ? "#ff395c" : "",
                color: currentPage === index + 1 ? "white" : "",
              }}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
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

export default SearchProducts;
