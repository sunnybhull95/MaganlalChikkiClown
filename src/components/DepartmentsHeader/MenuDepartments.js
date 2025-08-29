import style from "./MenuDepartments.module.css";
import { NavLink } from "react-router-dom";

const MenuDepartments = () => {
  return (
    <>
      <div>
        <p className={style.pp}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? style.activeLink : style.inactiveLink
            }
            style={{textDecoration:"none"}}
          >
            Home
          </NavLink>
        </p>
        <p className={style.pp}>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? style.activeLink : style.inactiveLink
            }
            style={{textDecoration:"none"}}
          >
            About Us
          </NavLink>
        </p>
        <p className={style.pp}>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? style.activeLink : style.inactiveLink
            }
            style={{textDecoration:"none"}}
          >
            Contact Us
          </NavLink>
        </p>
        <p className={style.pp}>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? style.activeLink : style.inactiveLink
            }
            style={{textDecoration:"none"}}
          >
            Shop
          </NavLink>
        </p>
      </div>
    </>
  );
};

export default MenuDepartments;
