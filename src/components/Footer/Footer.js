import style from "./Footer.module.css";
import { FaRegPaperPlane } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { Link } from "react-router-dom";

import imgLogo from "../../images/web-logo-3.png";
import PayPal from "../../images/paypal.png";

const OnTop = () =>{
  window.scroll(0,0)
}

const Footer = () => {
  return (
    <>
      <div>
        <div className={style.bgWhite}>
          <div className={style.pFlex}>
            <div className={style.dFlex}>
              <FaRegPaperPlane className={style.pIcon} />
              <p className={style.pSize}>
                sign up to newsletter{" "}
                <span>
                  and receive{" "}
                  <span style={{ color: "#ed3237" }}>surprise coupons</span> for
                  first shopping
                </span>
              </p>
            </div>
            <div className={style.dInp}>
              <input
                type="text"
                placeholder="Email Address here"
                className={style.inp}
              />
              <button className={style.bInp}>
                <IoMdMail />
              </button>
            </div>
            <div className={style.icons}>
              <FaFacebookF className={style.icon} />
              <FaTwitter className={style.icon} />
              <FaPinterest className={style.icon} />
              <FaInstagram className={style.icon} />
            </div>
          </div>
        </div>
        <div className={style.Fdiv}>
          <div className={style.fCDiv}>
            <Link to="/">
              <img src={imgLogo} alt="img"/>
            </Link>
            <p style={{ color: "rgba(0, 0, 0, 0.786)", cursor: "unset" }}>
              A Legacy of 100+ years, sweetening people's life…
            </p>
          </div>
          <div className={style.fCDiv}>
            <h4>Quick Navigation</h4>
            <Link to="/" style={{textDecoration:"none",color:"black"}} ><p onClick={OnTop}>Home</p></Link>
            <Link to="/about" style={{textDecoration:"none",color:"black"}}><p onClick={OnTop}>About Us</p></Link>
            <Link to="/contact" style={{textDecoration:"none",color:"black"}}><p onClick={OnTop}>Contact Us</p></Link>
            <Link to="/shop" style={{textDecoration:"none",color:"black"}}><p onClick={OnTop}>Shop</p></Link>
          </div>
          <div className={style.fCDiv}>
            <h4>Important Links</h4>
            <p>Disclaimer Policy</p>
            <p>Privacy Policy</p>
            <p>Cancellation Policy</p>
            <p>Shipping and Delivery Policy</p>
          </div>
          <div className={style.fCDiv}>
            <h4>Contact Info.</h4>
            <p style={{ fontWeight: "700" }}>
              Maganlal Chikki Products Pvt Ltd
            </p>
            <p>
              Shed No. 49A & B, Opp. Monsento LICEL, Nangargaon, Lonavala 410401
              Dist. Pune
            </p>
            <a href="https://maganlalchikki.in/" target="blank" style={{textDecoration:"none"}}>
            <p>Online store:- <span style={{fontWeight:"500"}}>www.maganlalchikki.in</span></p>
            </a>
            
            <p>
              <IoMdCall style={{ color: "#ed3237" }} /> Ph. No. :- +912114274060
              I Mobile No. :- +917666530969
            </p>
            <p>Contact Time :- 9 AM To 6 PM</p>
            <p>Factory Closed - Thursday</p>
            <p>
              {" "}
              <IoMdMail style={{ color: "#ed3237" }} /> sales@maganlalchikki.in
            </p>
          </div>
        </div>
        <div className={style.blackDivFooter}>
          <p>
            © 2020 <span> www.maganlalchikki.in</span>. Powered By{" "}
            <span>Reallaunchers.com</span>. All Rights Reserved.
          </p>
          <img src={PayPal} alt="img"/>
        </div>
      </div>
    </>
  );
};

export default Footer;
