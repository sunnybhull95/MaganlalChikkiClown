import RedHeader from "./components/RedHeader/RedHeader";
import GrayHeader from "./components/GrayHeader/GrayHeader";
import LogoHeader from "./components/LogoHeader/LogoHeader";
import DepartmentsHeader from "./components/DepartmentsHeader/DepartmentsHeader";
import Footer from "./components/Footer/Footer";
import AboutUs from "./components/AboutUs/AboutUs";
import ContactUs from "./components/ContactUs/ContactUs";
import HomePagesComponent from "./components/HomePagesComponent/HomePagesComponent";
import ShopUs from "./components/ShopUsSection/ShopUs";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import WishListComponent from "./components/WishList/WishListComponent";

import CartComponent from "./components/CartComponent/CartComponent";

import CardDetails from "./components/CardDetails/CardDetails";

import SearchProducts from "./components/SearchProductsComponent/SearchProducts";

function App() {
  return (
    <div style={{ width: "100%" }}>
      <BrowserRouter>
        
        <RedHeader />
        <GrayHeader />
        <LogoHeader />
        <DepartmentsHeader />

        <Routes>
          <Route path="/" element={<HomePagesComponent />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/shop" element={<ShopUs />} />
          <Route path="/wishlist" element={<WishListComponent />} />
          <Route path="/cart" element={<CartComponent />} />
          <Route path="/carddetails" element={<CardDetails />} />
          <Route path="/searchproducts" element={<SearchProducts/>} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
