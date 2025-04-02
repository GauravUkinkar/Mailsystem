import React, { useEffect, useState } from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import { GoBell } from "react-icons/go";
import axios from "axios";

const Header = () => {
  const [activeNotify, setActiveNotify] = useState();

  const handleNotification = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}api/domain/domainExpiryController`
      );

      setActiveNotify(response.data.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleNotification();
  }, []);

  return (
    <>
      <div className="header-parent parent">
        <div class="notification">
          <Link to="/notification" className="bell-icon">
            <GoBell />
          </Link>
          <span className="noti-no">{activeNotify}</span>
        </div>
        <Link to="/add-email" className="btn">
          Add Email
        </Link>
        <Link to="/add-domain" className="btn">
          Add Domain
        </Link>
        <Link to="/add-website" className="btn">
          Add Website
        </Link>
      </div>
    </>
  );
};

export default Header;
