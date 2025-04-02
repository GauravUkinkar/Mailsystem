import React, { useEffect, useState } from "react";
import "./Notification.scss";
import axios from "axios";

function Notification({ setActiveNotify }) {


const [notify, setNotify] = useState([]);


const handleNotification = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}api/domain/domainExpiryController`)

       
        setNotify(response.data.data);
        setActiveNotify(response.data.data.length)
       
        console.log(response.data.data.length,"length");
        
    } catch (error) {
        console.log(error);
    }
}


useEffect(() => {
    handleNotification()
},[])

console.log(notify,">>.");


  return (
    <>
      <div className="parent notify-parent  ">
        <div className="cont notify-cont">
          <div className="main-wrapper">
            <div className="notify-deatil-heading">
              <h3>Domain Details:</h3>
            </div>
            <div className="notify-details">
              <p>
                Domain Name : <span>{notify[0]?.Domain}</span>
              </p>
              <p>
                Purchase Platform : <span>{notify[0]?.purchasePlatform}</span>
              </p>
              <p>
                Purchase Date : <span>{notify[0]?.purchaseDate.split("T")[0]}</span>
              </p>
              <p className={notify[0]?.expiryStatus === 1 ? "active expiredate" : ""}>
                Expiry Date : <span>{notify[0]?.expiryDate.split("T")[0]}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notification;
