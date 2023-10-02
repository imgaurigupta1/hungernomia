import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
import { FaShoppingCart } from "react-icons/fa"; 
import { AiOutlineMenu } from "react-icons/ai";


export default function Navbar() {
  const data = useCart();
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const toggleCartView = () => {
    setCartView(!cartView);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="customnavbar">
      <div className="navcontainer">
        <div className="brand">
          <Link className="navbar-brand" to="/">
            Hungernomia
          </Link>
        </div>
        
        
        <div className="cart-button" onClick={toggleCartView}>
          <FaShoppingCart className="cart-icon" />
          <Badge pill bg="danger">{data.length}</Badge>
        </div>
        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            {localStorage.getItem("authToken") ? (
              <li>
                <Link to="/myorder" className="nav-link">
                  My Orders
                </Link>
              </li>
            ) : null}
            {!localStorage.getItem("authToken") ? (
              <li>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            ) : null}
            {!localStorage.getItem("authToken") ? (
              <li>
                <Link to="/createuser" className="nav-link">
                  Sign Up
                </Link>
              </li>
            ) : null}
            {localStorage.getItem("authToken") ? (
              <li>
                <button className="nav-link text-danger" style={{backgroundColor:"white", borderRadius: "1rem"}} onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : null}
          </ul>
        </div>
        <div className="menu-button" onClick={toggleMenu}>
          <AiOutlineMenu className={`menu-icon ${menuOpen ? "open" : ""}`} />
        </div>
      </div>
      {cartView ? <Modal onClose={() => setCartView(false)}><Cart/></Modal> : ""}
    </nav>
  );
}
