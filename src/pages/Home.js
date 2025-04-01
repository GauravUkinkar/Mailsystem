import React from "react";
import "./home.scss";
import Dashboard from "../componant/dashboard/Dashboard";


const Home = ({ getDomains }) => {


  return (
    <>
     <Dashboard getDomains={ getDomains } />
    </>
  );
};

export default Home;
