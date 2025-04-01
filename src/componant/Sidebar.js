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

  const [active, setActive] = useState(searchParams.get("id"));

  console.log(active);

  useEffect(() => {
    // Update active state when URL changes
    const idFromParams = searchParams.get("id");
    if (idFromParams) {
      setActive(idFromParams);
    }
  }, [location.search]);

  const handleClick = (id) => {
    setActive(id); // Set active state
    navigate(`/?id=${id}`, { replace: true }); // Update URL without full reload
  };

  return (
    <>
      <div className="sidebar-parent">
        <ul className="list">
          {getDomains.map((item) => (
            <li
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`${
                Number(active) === item.id ? "active side_item" : "side_item"
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
