import React from "react";
import Logo from "../../images/Logo.svg";
import "./../Navbar/Index.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="Navbar">
      <Link
        to="/"
        style={{
          textDecoration: "none",
        }}
      >
        <img className="logo" alt="Logo" src={Logo}></img>
      </Link>
    </div>
  );
};

export default Navbar;
