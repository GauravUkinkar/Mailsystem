import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <div className="header-parent parent">
        <Link to="/add-email" className="btn">Add Email</Link>
        <Link to="/add-domain" className="btn">Add Domain</Link>
        <Link to="/add-website" className="btn">Add Website</Link>
      </div>
    </>
  );
};

export default Header;
