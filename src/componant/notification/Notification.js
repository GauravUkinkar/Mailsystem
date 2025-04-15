import React, { useEffect, useState } from "react";
import "./Notification.scss";
import axios from "axios";

function Notification() {
  const [notify, setNotify] = useState([]);

  const handleNotification = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}api/domain/domainExpiryController`
      );
      setNotify(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleNotification();
  }, []);
  const options = { day: "2-digit", month: "short", year: "numeric" };

  return (
    <>
      <div className="parent notify-parent  ">
        <div className="cont notify-cont">
          {notify.map((item, index) => (
            <div className="main-wrapper">
              <div className="notify-deatil-heading">
                <h3>Domain Details:</h3>
              </div>
              <div className="notify-details">
                <div class="one">
                <p>
                  Domain Name : <span>{item.Domain}</span>
                </p>
                <p>
                  Purchase Platform : <span>{item.purchasePlatform}</span>
                </p>
                </div>
                <div class="two">
                <p>
                  Purchase Date : <span>{new Date(
                      item.purchaseDate.split("T")[0] || null
                    ).toLocaleDateString("en-GB", options)}</span>
                </p>
                <p
                  className={item.expiryStatus === 1 ? "active expiredate" : ""}
                >
                  Expiry Date : <span>{new Date(
                      item.expiryDate.split("T")[0] || null
                    ).toLocaleDateString("en-GB", options)}</span>
                </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Notification;
