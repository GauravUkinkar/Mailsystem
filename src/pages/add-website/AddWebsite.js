import React, { useState } from "react";
import "./addwebsite.scss";
import axios from "axios";

const AddWebsite = () => {
  const [webSite, setWebSite] = useState({
    websiteUrl: "",
    websitePlatfrom: "",
    username: "",
    password: "",
  });

  const handleWebsite = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}api/website/addWebsite`,
        webSite
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="add-website-parent parent">
        <div className="add-website-cont cont">
          <form class="add-domain-box" onSubmit={handleWebsite}>
            <label>
              <p>Website URL</p>
              <input
                type="text"
                value={webSite.websiteUrl}
                onChange={(e) =>
                  setWebSite({
                    ...webSite,
                    websiteUrl: e.target.value,
                  })
                }
              />
            </label>
            <label>
              <p>Website Platform</p>
              <input
                type="text"
                value={webSite.websitePlatfrom}
                onChange={(e) =>
                  setWebSite({
                    ...webSite,
                    websitePlatfrom: e.target.value,
                  })
                }
              />
            </label>
            <label>
              <p>Username</p>
              <input
                type="text"
                value={webSite.username}
                onChange={(e) =>
                  setWebSite({
                    ...webSite,
                    username: e.target.value,
                  })
                }
              />
            </label>
            <label>
              <p>Password</p>
              <input
                type="text"
                value={webSite.password}
                onChange={(e) =>
                  setWebSite({
                    ...webSite,
                    password: e.target.value,
                  })
                }
              />
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
