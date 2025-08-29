import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { IoMdArrowDropdown } from "react-icons/io";
import { NavLink } from "react-router-dom"; // Import NavLink
import style from "./DepartmentsHeader.module.css";

import MenuDepartments from "./MenuDepartments";
import MobileHeadereMenu from "./MobileHeaderMenu";

import { useNavigate } from "react-router-dom"; // Import useNavigate

const DepartmentsHeader = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [activeButton, setActiveButton] = useState(1); // 1 for button 1, 2 for button 2

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber); // Set the active button
  };

  const [isOpen, setIsOpen] = useState(false);

  // Toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/searchproducts?category_id=${categoryId}`);
  };

  return (
    <>
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          className={style.navbardepartments}
          style={{ padding: "0px" }}
        >
          <div className={style.mdiv} style={{ padding: "0px 100px" }}>
            <div className={style.dropdownContainer}>
              <button className={style.btndepartments} onClick={toggleDropdown}>
                All Departments{" "}
                <IoMdArrowDropdown className={style.arrowicon} />{" "}
              </button>
              <ul
                className={`${style.dropdownMenu} ${isOpen ? style.open : ""}`}
              >
                <li
                  className={style.dropdownItem}
                  onClick={() => handleCategoryClick(1)}
                >
                  Chikki
                </li>
                <li
                  className={style.dropdownItem}
                  onClick={() => handleCategoryClick(4)}
                >
                  Dry Fruit Roll
                </li>
                <li
                  className={style.dropdownItem}
                  onClick={() => handleCategoryClick(2)}
                >
                  Fudge
                </li>
                <li
                  className={style.dropdownItem}
                  onClick={() => handleCategoryClick(5)}
                >
                  Namkeens
                </li>
              </ul>
            </div>

            <ul className={style.uldepartments}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? style.activeLink : style.inactiveLink
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? style.activeLink : style.inactiveLink
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? style.activeLink : style.inactiveLink
                  }
                >
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  className={({ isActive }) =>
                    isActive ? style.activeLink : style.inactiveLink
                  }
                >
                  Shop
                </NavLink>
              </li>
            </ul>
            <a className={style.adepartments}>Special Offer!</a>
          </div>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={handleShow}
            className={style.barbtndepartments}
            
          />
          <Offcanvas show={show} onHide={handleClose} placement="start" className={style.offcanvascustom}>
            <Offcanvas.Header
              closeButton
              className={style.modalbtns}
              
            ></Offcanvas.Header>
            <div className={style.modaldiv1}>
              <button
                className={style.modalbtn}
                onClick={() => handleButtonClick(1)}
              >
                {" "}
                menu
              </button>
              <button
                className={style.modalbtn1}
                onClick={() => handleButtonClick(2)}
              >
                mobile header menu
              </button>
            </div>
            <Offcanvas.Body style={{ padding: "10px" }}>
              {/*  write code for display on mobile modal */}

              <div style={{ display: activeButton === 1 ? "block" : "none" }}>
                <MenuDepartments />
              </div>

              <div style={{ display: activeButton === 2 ? "block" : "none" }}>
                <MobileHeadereMenu />
              </div>
            </Offcanvas.Body>
          </Offcanvas>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={handleShow}
            className={style.barbtndepartments1}
          />
          <Offcanvas show={show} onHide={handleClose} placement="start">
            <Offcanvas.Header
              closeButton
              className={style.modalbtns}
            ></Offcanvas.Header>
            <div className={style.modaldiv1}>
              <button
                style={{
                  backgroundColor: activeButton === 1 ? "#ed3237" : "white",
                  color: activeButton === 1 ? "white" : "black",
                }}
                className={style.modalbtn}
                onClick={() => handleButtonClick(1)}
              >
                Menu
              </button>
              <button
                style={{
                  backgroundColor: activeButton === 2 ? "#ed3237" : "white",
                  color: activeButton === 2 ? "white" : "black",
                }}
                onClick={() => handleButtonClick(2)}
                className={style.modalbtn1}
              >
                Mobile Header Menu
              </button>
            </div>

            <Offcanvas.Body style={{ padding: "10px" }}>
              {/*  write code for display on mobile modal */}

              <div style={{ display: activeButton === 1 ? "block" : "none" }}>
                <MenuDepartments />
              </div>

              <div style={{ display: activeButton === 2 ? "block" : "none" }}>
                <MobileHeadereMenu />
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </Navbar>
      </div>
    </>
  );
};

export default DepartmentsHeader;
