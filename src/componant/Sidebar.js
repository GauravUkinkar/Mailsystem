import React, { useEffect, useState } from "react";
import "./sidebar.scss";
import { MdOutlineLogout } from "react-icons/md";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
const Sidebar = ({ onLogout, getDomains }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [active, setActive] = useState(
    searchParams.get("id") || getDomains[0]?.domainId
  );

  useEffect(() => {
    const idFromParams = searchParams.get("id");
    if (idFromParams) {
      setActive(idFromParams);
    }
  }, [location.search]);

  const handleClick = (id) => {
    setActive(id);
    navigate(`/?id=${id}`, { replace: true });
  };

  return (
    <>
      <div className="sidebar-parent">
        <ul className="list">
          {getDomains.map((item, index) => (
            <li
              key={index.domainId}
              onClick={() => handleClick(item.id)}
              className={`sidebar-item ${
                active === item.domainId ? "active" : ""
              }`}
            >
              {item.Domain}
            </li>
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
