import React, { useEffect, useState } from "react";
import "./sidebar.scss";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
const Sidebar = ({ onLogout }) => {
  const [getDomains, setGetDomains] = useState([]);

  // get all domains
  const getAllDomains = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}api/domain/getAllDomain`
      );

      setGetDomains(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllDomains();
  }, []);

  return (
    <>
      <div className="sidebar-parent">
        <ul className="list">
          {getDomains.map((item, index) => (
            <li>{item.Domain}</li>
          ))}
        </ul>

        <div className="logout-btn">
          <Link to="/" className="btn" onClick={onLogout}>
            Log Out
            <div className="icon">
              <MdOutlineLogout />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
