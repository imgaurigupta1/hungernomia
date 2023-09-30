import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
import {BiMenu} from "react-icons/bi"
export default function Navbar() {
  let data = useCart();
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false)
  const handleLogout = () => {
    
    localStorage.removeItem('authToken');

    navigate("/login")
}

  return (
    <nav
      className="navbar navbar-expand-lg navbarcss"
      style={{
       // boxShadow: "0px 10px 20px black",
        //filter: "blur(20)",
        //position: "sticky",
        zIndex: "10",
        width: "100%",
      }}
    >
      <div className="container-fluid">
        <Link className="navbarclass navbar-brand fs-1 fst-italic" to="/">
          Hungernomia
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon text-white navicon"><BiMenu/></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link fs-5 mx-3 active"
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>

            {(localStorage.getItem("authToken"))?
            <li className="nav-item">
            <Link
              className="nav-link fs-5 mx-3 active"
              aria-current="page"
              to="/myorder"
            >
              My Orders
            </Link>
          </li>
         : "" } 
            
          </ul>


          {(!localStorage.getItem("authToken"))?
          <div className="d-flex">
            
            <Link
              className="nav-link fs-5 mx-3 active btn bg-white text-success"
              aria-current="page"
              to="/login"
            >
              Login
            </Link>

            <Link
              className="nav-link fs-5 mx-3 active btn bg-white text-success"
              aria-current="page"
              to="/createuser"
            >
              Sign Up
            </Link>
          </div>
          :

          <div className="d-flex">
            <div className="nav-link fs-5 mx-3 active btn bg-white text-success" onClick={()=>{setCartView(true)}}>
            My Cart{"   "}
            <Badge pill bg="danger">{data.length}</Badge>
          </div>
          {cartView ? <Modal onClose={() => setCartView(false)}><Cart/></Modal> : ""}

          <div className="nav-link fs-5 mx-3 active btn bg-white text-danger" onClick={handleLogout}>
            Logout
          </div>
          </div>
          }
        </div>
      </div>
    </nav>
  );
}