import React, { useEffect, useState } from "react";
import "./sidebar.scss";
import { MdDeleteForever, MdOutlineLogout } from "react-icons/md";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
const Sidebar = ({ onLogout, getDomains }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [active, setActive] = useState();

  const defaultId = getDomains[0]?.id;

  console.log(getDomains[0]?.Domain, "klfskjldsjkdfskljdfskldfs");

  const idFromParams = searchParams.get("id");

  useEffect(() => {
    setActive(idFromParams || defaultId);
  }, [getDomains, searchParams]);

  const handleClick = (id) => {
    setActive(id); // Set active state
    navigate(`/?id=${id}`, { replace: true });
    window.location.reload();
  };

  const setIdInUrl = (newId) => {
    const params = new URLSearchParams(window.location.search);
    params.set("id", newId);

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl); 
  };

  //Call Domain Delete API
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this domain?"
      );
      if (!confirmDelete) return;

      await axios.delete(
        `${process.env.REACT_APP_API}api/domain/deleteDomain?domainId=${id}`
      );

      alert("Domain Deleted Successfully");

      if (defaultId !== idFromParams) {
        navigate("/");
      }

      window.location.reload();
    } catch (error) {
      console.error("Error deleting domain:", error);
    }
  };

  return (
    <>
      <div className="sidebar-parent">
        <ul className="list">
          {getDomains
            .slice()
            .sort((a, b) => a.Domain.localeCompare(b.Domain))
            .map((item) => (
              <li
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`${
                  Number(active) === item.id ? "active side_item" : "side_item"
                }`}
              >
                {item.Domain}
                <div
                  className="btn-delete"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    <MdDeleteForever />
                  </button>
                </div>
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
