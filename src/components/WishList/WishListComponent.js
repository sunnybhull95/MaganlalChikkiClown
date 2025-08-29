import { useState, useEffect } from "react";
import style from "./WishListComponent.module.css"; // Add your custom styles if needed
import { IoClose } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import PathComponent from "../PathComponent/PathComponent";
import { Link } from "react-router-dom";

const WishListComponent = () => {
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState(""); // State for success message

  // Scroll to top when component loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch wishlist from localStorage
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  // Function to remove item from wishlist
  const removeFromWishlist = (productId) => {
    let updatedWishlist = wishlist.filter((item) => item.id !== productId);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);

    // Set success message
    setMessage("Product successfully removed.");

    // Remove message after 3 seconds
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  return (
    <>
      <div className={style.mDiv}>
        <PathComponent text="Wishlist" />

        <div className={style.whiteDiv}>
          {/* Success Message */}
          {message && (
            <div className={style.successMessage}>
              <span>
                <FaCheckCircle style={{ margin: "0px 10px" }} /> {message}
              </span>
            </div>
          )}

          <h4>My Wishlist on Maganlal Chikki</h4>

          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th style={{ width: "50px" }}></th>
                <th style={{ width: "60px" }}></th>
                <th style={{ width: "700px", padding: "5px 25px" }}>
                  Product Name
                </th>
              </tr>
            </thead>

            <tbody>
              {wishlist.length > 0 ? (
                wishlist.map((item) => (
                  <tr key={item.id} className={style.tableRow}>
                    <td>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className={style.removeButton}
                      >
                        <IoClose className={style.close} />
                      </button>
                    </td>
                    <td>
                      <img
                        src={item.images}
                        alt={item.title}
                        className={style.img}
                      />
                    </td>
                    <td>
                      <Link
                        to="/carddetails"
                        style={{ textDecoration: "none", color: "black" }}
                        state={{ product: item }}
                      >
                        <p className={style.pTitle}>{item.title}</p>
                      </Link>
                    </td>
                    <td className={style.deleteButton}>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className={style.removeButton}
                      >
                        <FaTrashAlt color="black" fontSize="12px" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">
                    <p className={style.noWishlistText}>
                      No product added to the wishlist.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default WishListComponent;
