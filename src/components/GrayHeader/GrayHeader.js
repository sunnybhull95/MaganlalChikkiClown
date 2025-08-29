import style from "./GrayHeader.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import en from "../../images/en.png"
import ar from "../../images/ar.png"
import { Link } from "react-router-dom";

const GrayHeader = () => {
  return (
    <>
      <div className={style.bgGray}>
        
        <div className={style.d1}>
          <p className={style.p2}>Welcome to Maganlal Chikki, Lonavla! </p>
          <a className={style.a1} href="">Join Free</a>
          <p className={style.p2}>or</p>
          <a className={style.a1} href="">Sign in</a>
        </div>

        <div className={style.bgBtnP}>
            <button className={style.btns}> <FaLock style={{fontSize:"10px", marginRight:"5px"}} /> Login</button>
           <div className={style.bgBtn}>
           <button className={style.btns}> <IoPersonSharp className={style.ac} style={{fontSize:"11px", marginRight:"3px"}} /> My Account</button>
            <ul className={style.dropdownlist}>
                    <Link to="/cart" style={{textDecoration:"none", color:"black"}}><li>Cart</li></Link>
                    <Link to="/wishlist" style={{textDecoration:"none", color:"black"}}><li>Wishlist</li></Link>
                    <li>Checkout</li>
                    <li>My Account</li>
                </ul>
           </div>
            <div className={style.bgBtn}>
            <button className={style.english}> <img src={en} style={{width:"18px", marginRight:"3px"}} /> English <IoIosArrowDown style={{paddingTop:"2px"}} /> </button>
                <ul className={style.dropdownlist}>
                    <li><img src={en} style={{width:"18px", marginRight:"5px"}} />English</li>
                    <li><img src={ar} style={{width:"18px", marginRight:"5px"}} />Arabic</li>
                </ul>
            </div>
            <div className={style.bgBtn}>
            <button className={style.inr} >INR <IoIosArrowDown style={{paddingTop:"2px"}} /> </button>
                <ul className={style.dropdownlist}>
                    <li>INR</li>
                    <li>USD</li>
                    <li>EUR</li>
                </ul>
            </div>
    
        </div>
      </div>
    </>
  );
};

export default GrayHeader;
