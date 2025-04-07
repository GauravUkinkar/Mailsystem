import React, { useEffect, useState } from "react";
import "./addwebsite.scss";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

const AddWebsite = ({ getDomains }) => {
  const [error, setError] = useState({});
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();


  const handleError = (valuesS) => {
    let error = {};
    if (!valuesS.websiteUrl) {
      error.websiteUrl = "Please Enter Your Website URL";
    }
    if (!valuesS.websitePlatfrom) {
      error.websitePlatfrom = "Please Enter Your Website Platform";
    }

    return error;
  };

  const [webSite, setWebSite] = useState({
    domainId: "",
    websiteUrl: "",
    websitePlatfrom: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    if (getDomains[0]?.id) {
      setWebSite((prev) => ({
        ...prev,
        domainId: getDomains[0]?.id,
      }));
    }
  }, [getDomains]);

  const handleWebsiteById = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}api/website/getWebsiteById?websiteId=${id}`
      );

      setWebSite({
        domainId: response.data.data[0].domainId,
        websiteUrl: response.data.data[0].websiteUrl,
        websitePlatfrom: response.data.data[0].websitePlatfrom,
        username: response.data.data[0].username,
        password: response.data.data[0].password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleWebsiteById();
  }, []);

  const handleWebsite = async (e) => {
    e.preventDefault();

    const validationErrors = handleError(webSite);

    setError(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return false;
    }

    try {
      let response;

      if (id) {
        response = await axios.put(
          `${process.env.REACT_APP_API}api/website/editWebsite?websiteId=${id}`,
          webSite
        );
      } else {
        response = await axios.post(
          `${process.env.REACT_APP_API}api/website/addWebsite`,
          webSite
        );
      }

      if(response.status === 200){
        navigate('/');
      }
      window.location.reload();

      alert(id ? "Website Updated Succefully" : "Website Added Succefully");

      setWebSite({

        websiteUrl: "",
        websitePlatfrom: "",
        username: "",
        password: "",
      });
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
            {error.websiteUrl && (
              <span className="error">{error.websiteUrl}</span>
            )}
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
            {error.websitePlatfrom && (
              <span className="error">{error.websitePlatfrom}</span>
            )}
            <label>
              <label for="">
                <p>Select Domain</p>
                <select
                  value={webSite.domainId}
                  onChange={(e) =>
                    setWebSite({
                      ...webSite,
                      domainId: parseInt(e.target.value),
                    })
                  }
                >
                  {getDomains.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.Domain}
                    </option>
                  ))}
                </select>
              </label>
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
