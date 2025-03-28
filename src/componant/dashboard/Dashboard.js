import React from "react";
import "./dashboard.scss";
const Dashboard = () => {
  return (
    <>
      <div className="dashboard-parent parent">
        <div className="dashboard-cont cont">
          {/* //-----------Add Domain Details-------------// */}
          <div className="top-section">
            <h2>Domain Details:</h2>
            <div className="domain-details">
              <div className="detail-left">
                <p>Domain Name : Lorem ipsum dolor sit. </p>
                <p>Purchase Date: pqr </p>
                <p>Expiry Date: pqr </p>
                <p>Purchase Platform: pqr </p>
              </div>
              {/* <div className="detail-right">
            <p>Expiry Date: pqr </p>
            <p>Purchase Platform: pqr </p>
            </div> */}
            </div>
          </div>
          {/* //-----------------Subdomain List-----------------// */}
          <div className="middle-section">
            <h2>Subdomain List:</h2>
            <div className="subdomain-list">
             
                <p>com.dlfkjdlkf.com</p>
                <p>com.dlfkjdlkf.com</p>
                <p>com.dlfkjdlkf.com</p>
                <p>com.dlfkjdlkf.com</p>
                <p>com.dlfkjdlkf.com</p>
                <p>com.dlfkjdlkf.com</p>
                <p>com.dlfkjdlkf.com</p>
                <p>com.dlfkjdlkf.com</p>
                <p>com.dlfkjdlkf.com</p>
                <p>com.dlfkjdlkf.com</p>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
