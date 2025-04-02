import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import { GoBell } from "react-icons/go";

const Header = ({activeNotify}) => {

  console.log(activeNotify);
  
  return (
    <>
      <div className="header-parent parent">
        <div class="notification">
        <Link to="/notification" className="bell-icon" ><GoBell /></Link>
        <span className="noti-no">{activeNotify}</span>
        </div>
        <Link to="/add-email" className="btn">Add Email</Link>
        <Link to="/add-domain" className="btn">Add Domain</Link>
        <Link to="/add-website" className="btn">Add Website</Link>
      </div>
    </>
  );
};

export default Header;
