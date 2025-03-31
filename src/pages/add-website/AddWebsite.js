import React, { useState } from "react";
import './addwebsite.scss'
const AddWebsite = () => {



const [webSite, setWebSite] = useState({
  frontendUrl:"",
  backendUrl:"",
  credentials:[]
})


  return (
    <>
      <div className="add-website-parent parent">
        <div className="add-website-cont cont">
          <form class="add-domain-box">
            <label>
              <p>Website URL</p>
              <input type="text" />
            </label>
            <label>
              <p>Website Platform</p>
              <input type="text" />
            </label>
            <label>
              <p>Username</p>
              <input type="text" />
            </label>
            <label>
              <p>Password</p>
              <input type="text" />
            </label>
            <button class="btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddWebsite;
