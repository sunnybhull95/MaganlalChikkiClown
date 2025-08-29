import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./CartComponent.module.css";
import { FaPlus, FaMinus, FaShoppingCart, FaCheckCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaTruckMoving } from "react-icons/fa";
import PathComponent from "../PathComponent/PathComponent";

const CartComponent = () => {
  const [cart, setCart] = useState([]);
  const [removedProduct, setRemovedProduct] = useState(null);
  const [cartMessage, setCartMessage] = useState(null);

  useEffect(() => {
    const updateCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart);
    };

    updateCart();
    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  const triggerLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500); // Simulate processing delay
  };

  const updateQuantity = (productId, amount) => {
    triggerLoading();
    
    let updatedCart = cart.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeFromCart = (product) => {
    let updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  
    console.log("Product removed:", product); // Debugging
    console.log("Updated Cart:", updatedCart);
  
    setRemovedProduct(product);
    setCartMessage(
      <span>
        <FaCheckCircle style={{ marginRight: "8px", color: "green" }} />
        {product.title} removed from cart.
      </span>
    );
  
    // Dispatch event
    window.dispatchEvent(new Event("cartUpdated"));
  };
  

  const undoRemove = () => {
    if (removedProduct) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(removedProduct);
      localStorage.setItem("cart", JSON.stringify(cart));
      setCart(cart);
      setRemovedProduct(null);
      setCartMessage(null);
      window.dispatchEvent(new Event("cartUpdated"));
    }
    triggerLoading();
  };

  const cartSubtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const taxAmount = (cartSubtotal * 0.05).toFixed(2); // 5% tax
  const shippingCost = cartSubtotal > 499 ? 0 : 49; // Free shipping if >499, else ₹49
  const totalAmount = (
    cartSubtotal +
    parseFloat(taxAmount) +
    shippingCost
  ).toFixed(2); // Final total including tax & shipping

  const [loading, setLoading] = useState(false);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedState, setSelectedState] = useState("Maharashtra"); // Default state
  const [tempState, setTempState] = useState(""); // Temporary state selection

  const handleUpdate = () => {
    if (tempState) {
      setSelectedState(tempState); // Update state when clicking "Update"
    }
  };

  // State for input fields
  const [formData, setFormData] = useState({
    city: "",
    pincode: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [animateAddressForm, setAnimateAddressForm] = useState(false);
  const toggleAddressForm = () => {
    if (!showAddressForm) {
      setShowAddressForm(true);
      setTimeout(() => setAnimateAddressForm(true), 10); // Start animation after a slight delay
    } else {
      setAnimateAddressForm(false);
      setTimeout(() => setShowAddressForm(false), 500); // Hide after animation ends
    }
  };

  return (
    <>
      {loading && (
        <div className={style.loaderOverlay}>
          <div className={style.loader}></div>
        </div>
      )}

      <div className={style.mDiv}>
        <PathComponent text="Cart"/>

        <div className={style.whiteDiv}>
          {/* Cart Message with Product Name & Undo Button */}
          {cartMessage && (
            <div className={style.cartMessage}>
              {cartMessage}
              <button className={style.undoButton} onClick={undoRemove}>
                Undo?
              </button>
            </div>
          )}

          {cart.length === 0 ? (
            <>
              <p className={style.emptyCart}>
                <FaShoppingCart
                  style={{
                    marginRight: "10px",
                    fontSize: "17px",
                    color: "#ff395c",
                  }}
                />
                Your cart is currently empty.
              </p>
              <Link to="/shop">
                <button className={style.returnShopButton}>
                  Return to shop
                </button>
              </Link>
            </>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "100px",
                        padding: "7px 0px 7px 15px",
                        fontSize: "15px",
                      }}
                    ></th>
                    <th
                      style={{
                        width: "200px",
                        padding: "7px 0px 7px 15px",
                        fontSize: "15px",
                      }}
                    ></th>
                    <th
                      style={{
                        width: "400px",
                        padding: "7px 0px 7px 15px",
                        fontSize: "15px",
                      }}
                    >
                      Product
                    </th>
                    <th
                      style={{
                        width: "100px",
                        padding: "7px 0px 7px 15px",
                        fontSize: "15px",
                      }}
                    >
                      Price
                    </th>
                    <th
                      style={{
                        width: "200px",
                        padding: "7px 0px 7px 15px",
                        fontSize: "15px",
                      }}
                    >
                      Quantity
                    </th>
                    <th
                      style={{
                        width: "100px",
                        padding: "7px 0px 7px 15px",
                        fontSize: "15px",
                      }}
                    >
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    // <>
                      <tr key={item.id}>
                        <td>
                          <button
                            className={style.removeButton}
                            onClick={() => removeFromCart(item)}
                          >
                            <IoCloseSharp />
                          </button>
                        </td>
                        <td>
                          <img
                            src={item.images}
                            alt={item.title}
                            className={style.cartImage}
                          />
                        </td>
                        <td>
                          <Link to="/carddetails" style={{textDecoration:"none",color:"black"}} state={{product:item}}>
                          <p className={style.cartTitle}>{item.title}</p>
                          </Link>
                        </td>
                        <td>
                          <p className={style.cartPrice}>₹{item.price}.00</p>
                        </td>
                        <td>
                          <div className={style.quantityControl}>
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className={style.cButton}
                            >
                              <FaMinus />
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className={style.cButton}
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </td>
                        <td>
                          <p className={style.cartPrice}>
                            ₹{item.price * item.quantity}.00
                          </p>
                        </td>
                      </tr>
                    // </>
                  ))}
                </tbody>
              </table>
              <div className={style.mobileVersion}>
                {cart.map((item) => (
                  // <>
                    <div key={item.id} className={style.mobileDiv}>
                      <button
                        className={style.removeButton}
                        onClick={() => removeFromCart(item)}
                      >
                        <IoCloseSharp />
                      </button>
                      <img
                        src={item.images}
                        alt={item.title}
                        className={style.cartImage}
                      />
                      <p className={style.cartTitle}>
                        <span className={style.mobileText}>Product: </span>
                        {item.title}
                      </p>
                      <p className={style.cartPrice}>
                        <span className={style.mobileText}>Price: </span>₹
                        {item.price}.00
                      </p>
                      <div style={{ display: "flex", alignItems: "center",marginBottom:"20px" }}>
                        <span className={style.mobileText}>Quantity: </span>
                        <div className={style.quantityControl}>
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className={style.cButton}
                          >
                            <FaMinus />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className={style.cButton}
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </div>
                      <p className={style.cartPrice}>
                        <span className={style.mobileText}>Subtotal: </span>₹
                        {item.price * item.quantity}.00
                      </p>
                    </div>
                  // </>
                ))}
              </div>
              <div className={style.couponDiv}>
                <input placeholder="Coupon Code" className={style.couponInp} />
                <button className={style.couponButton}>Apply Coupon</button>
                {/* <button className={style.couponButton}>Update Cart</button> */}
              </div>
              <div className={style.cartTotals}>
                <h3>Cart Totals</h3>
                <hr />
                <div className={style.cartTotalFlex}>
                  <div className={style.lP}>
                    <p className={style.p1}>Subtotal</p>
                    <p>Shipping</p>
                  </div>
                  <div>
                    <p className={style.p1}>₹{cartSubtotal}.00</p>
                    <b>
                      {shippingCost === 0
                        ? "Free Shipping (Free Shipping)"
                        : `Standard Shipping: ₹${shippingCost}.00`}
                    </b>
                    <p>
                      {shippingCost === 0
                        ? "Free Shipping "
                        : `Standard Shipping`}
                    </p>
                    <p>
                      Shipping to <b>{selectedState}</b>.
                    </p>
                    <p className={style.pAddress} onClick={toggleAddressForm}>
                      Change address <FaTruckMoving />
                    </p>

                    {showAddressForm && (
                      <div
                        className={`${style.displayBlock} ${
                          animateAddressForm ? style.show : ""
                        }`}
                      >
                        {/* Country Select */}
                        <select className={style.selectBox}>
                          <option>India</option>
                        </select>

                        {/* State Select */}
                        <select
                          name="states"
                          id="indiaStates"
                          className={style.selectBox}
                          value={tempState}
                          onChange={(e) => setTempState(e.target.value)} // Store selection temporarily
                        >
                          <option value="">{selectedState}</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Arunachal Pradesh">
                            Arunachal Pradesh
                          </option>
                          <option value="Assam">Assam</option>
                          <option value="Bihar">Bihar</option>
                          <option value="Chhattisgarh">Chhattisgarh</option>
                          <option value="Goa">Goa</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Haryana">Haryana</option>
                          <option value="Himachal Pradesh">
                            Himachal Pradesh
                          </option>
                          <option value="Jharkhand">Jharkhand</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Manipur">Manipur</option>
                          <option value="Meghalaya">Meghalaya</option>
                          <option value="Mizoram">Mizoram</option>
                          <option value="Nagaland">Nagaland</option>
                          <option value="Odisha">Odisha</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Sikkim">Sikkim</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Telangana">Telangana</option>
                          <option value="Tripura">Tripura</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Uttarakhand">Uttarakhand</option>
                          <option value="West Bengal">West Bengal</option>
                          <option value="Andaman and Nicobar Islands">
                            Andaman and Nicobar Islands
                          </option>
                          <option value="Chandigarh">Chandigarh</option>
                          <option value="Dadra and Nagar Haveli and Daman and Diu">
                            Dadra and Nagar Haveli and Daman and Diu
                          </option>
                          <option value="Lakshadweep">Lakshadweep</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Puducherry">Puducherry</option>
                          <option value="Ladakh">Ladakh</option>
                          <option value="Jammu and Kashmir">
                            Jammu and Kashmir
                          </option>
                        </select>

                        {/* Input Fields */}
                        <input
                          type="text"
                          name="city"
                          className={style.inp1}
                          placeholder="Enter City"
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                        <input
                          type="text"
                          name="pincode"
                          className={style.inp1}
                          placeholder="Enter Pincode / Zip"
                          value={formData.pincode}
                          onChange={handleInputChange}
                        />
                        <br />

                        <button
                          className={style.updateButton}
                          onClick={handleUpdate}
                        >
                          Update
                        </button>
                      </div>
                    )}
                    {/* </div> */}
                  </div>
                </div>
                <div className={style.cartTotalFlex1}>
                  <p className={style.lP}>Total</p>
                  <div>
                    <span className={style.pinkText}>₹{totalAmount}</span>{" "}
                    (includes{" "}
                    <span className={style.pinkText}>₹{taxAmount}</span> 5% Tax
                    )
                  </div>
                </div>
              </div>
              <button
                className={style.couponButton}
                style={{ margin: "20px 0px" }}
              >
                Procced to checkout
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartComponent;
