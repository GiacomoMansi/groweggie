import React from "react";
import Logo from "../../images/Logo.svg";
import "./../Footer/Index.css";

const Footer = () => {
  return (
    <footer>
      <img className="logo_footer" alt="Logo" src={Logo}></img>
      <p className="footerPara">
        Project made by{" "}
        <a className="footerLink" href="https://giacomomansi.github.io">
          Giacomo Mansi{" "}
        </a>
        All rights reserved to SpoonCular API Demo Plan
      </p>
    </footer>
  );
};

export default Footer;
