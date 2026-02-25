import React, { useState } from "react";
import Authenticated from "./authenticated";
import Unauthenticated from "./unauthenticated";
import "./Navbar.css";
import { Link } from "react-router-dom";
import CoffeeLogo from "../../../image/client/coffeeLogo.svg"

const Navbar = ({ status }) => {
  // State untuk hamburger button
  const [isOpen, setIsOpen] = useState(false);


  const renderNavLinks = () => (
    <>
      <Link to="/client/home" className={status.Home}>Home</Link>
      <Link to="/client/product" className={status.Product}>Product</Link>
      <Link to="/client/cart" className={status.Cart}>Your Cart</Link>
      <Link to="/client/history" className={status.History}>History</Link>
    </>
  );

  return (
    <div className="Navbar fixed-top">
      <div className="container Navbar">

        {/* Logo */}
        <Link to="/client/home" className="navbar-brand">
          <img src={CoffeeLogo} alt="logo" className="pb-2" />
          <span className="d-inline ps-2">DYN COFFEE</span>
        </Link>

        {/* List */}
        <div className={`nav-items ${isOpen && "open"}`}>
          {renderNavLinks()}
          {localStorage.getItem('@userLogin') ? ('') : (
            <div className="auth-nav-items-mobile mx-auto">
              <Link to="/client/login" className="d-block d-sm-none d-md-none d-lg-none btn btn-light login-mobile mb-2 py-2 ">Login</Link>
              <Link to="/client/signup" className="d-block d-sm-none d-md-none d-lg-none btn btn-warning signup-mobile py-2 ">Sign Up</Link>
            </div>
          )}
        </div>

        {/* Auth Render*/}
        {localStorage.getItem('@userLogin') ? (<Authenticated />) : (<Unauthenticated />)}

        {/* Hamburger button */}
        <div
          className={`nav-toggle ${isOpen && "open"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
