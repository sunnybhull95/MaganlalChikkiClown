
import headerimg from "../../images/web-logo-3.png";
import compareimg from "../../images/icon-compare.png";
import wishlistimg from "../../images/icon-wishlist.png";
import { BsHandbag } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import style from "./LogoHeader.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import navigate at top

const LogoHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [cart, setCart] = useState([]);

  const updateCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  };

  useEffect(() => {
    updateCart();

    const handleStorageChange = (event) => {
      if (event.key === "cart") {
        updateCart();
      }
    };

    const handleCustomEvent = () => {
      updateCart();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cartUpdated", handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleCustomEvent);
    };
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    localStorage.setItem("cartTimestamp", Date.now());
    setCart(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const categories = [
    "All Categories",
    "Chikki",
    "Fudge",
    "Dry Fruits Roll",
    "Namkeens",
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsOpen(false); // close dropdown
  };

  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = () => {
    const categoryMap = {
      "All Categories": "all",
      Chikki: "1",
      Fudge: "2",
      "Dry Fruits Roll": "4",
      Namkeens: "5",
    };
    const categoryId = categoryMap[selectedCategory];
    navigate(
      `/searchproducts?category_id=${categoryId}&search=${searchKeyword}`
    );
  };

  return (
    <>
      <div className={style.maindiv}>
        <div className={style.imgLogo}>
          <Link to="/">
            <img src={headerimg} className={style.logoimg} alt="Logo" />
          </Link>
        </div>
        <div className={style.innerdiv}>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className={style.categorybtn}
          >
            {selectedCategory}{" "}
            <IoMdArrowDropdown
              className={style.icon}
              style={{ fontSize: "20px", marginLeft: "20px" }}
            />
          </button>

          {isOpen && (
            <ul className={style.ull}>
              {categories.map((category, index) => (
                <li
                  key={index}
                  style={{ padding: "5px 10px", cursor: "pointer" }}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          )}

          <input
            type="text"
            placeholder="Enter your keywords..."
            className={style.inp}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />

          <button className={style.searchbtn} onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className={style.innerdiv2}>
          <div className={style.compareContainer}>
            <img
              src={compareimg}
              className={style.compareimage}
              alt="Compare"
            />
            <span className={style.compare}>Compare</span>
          </div>
          <div className={style.compareContainer}>
            <Link to="/wishlist">
              <img
                src={wishlistimg}
                className={style.compareimage}
                alt="Wishlist"
              />
            </Link>
            <span className={style.compare}>Wishlist</span>
          </div>
        </div>
        <div className={style.cartContainer}>
          <div>
            <Link to="/cart">
              <p className={style.cartbag}>
                <BsHandbag />
              </p>
            </Link>
          </div>
          <div className={style.bagInfo}>
            <p className={style.mycart}>My Cart</p>
            <p className={style.cartdetails}>
              {totalItems} item(s) -{" "}
              <span className={style.cartspan}>₹{totalPrice}.00</span>
            </p>
          </div>
          <div className={style.cartInfo}>
            <p>
              There are <span>{totalItems} item(s)</span> in your cart
            </p>
            <hr style={{ width: "100%", margin: "20px 0px" }} />

            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.id} className={style.cartItem}>
                  <img
                    src={item.images}
                    alt={item.title}
                    className={style.cartItemImage}
                  />
                  <div className={style.cartItemDetails}>
                    <p>{item.title}</p>
                    <p>
                      <b>₹{item.price * item.quantity}</b> <IoClose />{" "}
                      {item.quantity}
                    </p>
                  </div>
                  <div className={style.btnsDiv}>
                    <button
                      className={style.removeBtn}
                      onClick={() => removeFromCart(item.id)}
                    >
                      <IoClose />
                    </button>
                    <Link to="/cart">
                      <button>
                        <MdOutlineEdit />
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className={style.emptyCart}>
                <FaShoppingCart
                  style={{
                    marginRight: "10px",
                    fontSize: "17px",
                    color: "#ed3237",
                  }}
                />
                Your cart is currently empty.
              </p>
            )}

            <hr style={{ width: "100%", margin: "20px 0px" }} />
            <h6>
              Subtotal :{" "}
              <span className={style.cartspan} style={{ fontWeight: "600" }}>
                ₹{totalPrice}.00
              </span>
            </h6>
            <div className={style.btndiv}>
              <Link to="/cart">
                <button className={style.cartbtn}>View Cart</button>
              </Link>
              <button className={style.cartbtn}>Check Out</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoHeader;
