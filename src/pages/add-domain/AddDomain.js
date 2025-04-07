import React, { useEffect, useState } from "react";
import "./AddDomain.scss";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

function AddDomain({ getAllDomains }) {
  const [error, setError] = useState({});

  const navigate = useNavigate();

  const handleError = (values) => {
    let error = {};

    if (!values.Domain) {
      error.Domain = "please enter domain name";
    }
    if (!values.platformUrl) {
      error.platformUrl = "please select purchase platform";
    }
    if (!values.username) {
      error.username = "please select purchase platform";
    }
    if (!values.password) {
      error.password = "please select purchase platform";
    }
    if (!values.purchasePlatform) {
      error.purchasePlatform = "please select purchase platform";
    }
    if (!values.purchaseDate) {
      error.purchaseDate = "please enter purchase date";
    }
    if (!values.expiryDate) {
      error.expiryDate = "please enter expire date";
    }

    return error;
  };

  const [domainAdd, setDomainAdd] = useState({
    Domain: "",
    purchasePlatform: "",
    purchaseDate: "",
    expiryDate: "",
    platformUrl: "",
    username: "",
    password: "",
  });

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const getDataById = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}api/domain/getMasterDataId?domainId=${id}`
      );

      setDomainAdd({
        Domain: response.data.data[0].Domain,
        purchasePlatform: response.data.data[0].purchasePlatform,
        purchaseDate: response.data.data[0].purchaseDate.split("T")[0],
        expiryDate: response.data.data[0].expiryDate.split("T")[0],
        platformUrl: response.data.data[0].platformUrl,
        username: response.data.data[0].username,
        password: response.data.data[0].password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataById();
  }, []);

  const handleAddDomain = async (e) => {
    e.preventDefault();

    const validationErrors = handleError(domainAdd);
    setError(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return false;
    }

    try {
      let response;

      if (id) {
        response = await axios.put(
          `${process.env.REACT_APP_API}api/domain/domainEdit?domainId=${id}`,
          domainAdd
        );
      } else {
        response = await axios.post(
          `${process.env.REACT_APP_API}api/domain/addDomian`,
          domainAdd 
        );
      }
      if (response.status === 200) {
        navigate("/");
      }

      alert(id ? "Domain Updated Succefully" : "Domain Added Succefully");
      getAllDomains()

      setDomainAdd({
        Domain: "",
        purchasePlatform: "",
        purchaseDate: "",
        expiryDate: "",
        platformUrl: "",
        username: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const domainWebsitesName = ["Milesweb","Mediastroke", "Hostinger", "GoDaddy", "BigRock"];

  return (
    <>
      <div class="parent add-domain-parent">
        <div class="cont add-domain-cont">
          <form class="add-domain-box" onSubmit={handleAddDomain}>
            <label for="">
              <p>Domain Name</p>
              <input
                type="text"
                name="domain"
                value={domainAdd.Domain}
                onChange={(e) =>
                  setDomainAdd({
                    ...domainAdd,
                    Domain: e.target.value,
                  })
                }
              />
            </label>
            {error.Domain && <span className="error">{error.Domain}</span>}

            <label for="">
              <p>Platform Url</p>
              <input
                type="text"
                name="domain"
                value={domainAdd.platformUrl}
                onChange={(e) =>
                  setDomainAdd({
                    ...domainAdd,
                    platformUrl: e.target.value,
                  })
                }
              />
            </label>
            {error.platformUrl && (
              <span className="error">{error.platformUrl}</span>
            )}

            <label for="">
              <p>User Name</p>
              <input
                type="text"
                name="domain"
                value={domainAdd.username}
                onChange={(e) =>
                  setDomainAdd({
                    ...domainAdd,
                    username: e.target.value,
                  })
                }
              />
            </label>
            {error.username && <span className="error">{error.username}</span>}

            <label for="">
              <p>Password</p>
              <input
                type="text"
                name="domain"
                value={domainAdd.password}
                onChange={(e) =>
                  setDomainAdd({
                    ...domainAdd,
                    password: e.target.value,
                  })
                }
              />
            </label>
            {error.password && <span className="error">{error.password}</span>}

            <label for="">
              <p>Purchase Platform</p>
              <select
                name="purchasePlatform"
                value={domainAdd.purchasePlatform}
                onChange={(e) =>
                  setDomainAdd({
                    ...domainAdd,
                    purchasePlatform: e.target.value,
                  })
                }
              >
                {domainWebsitesName.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            {error.purchasePlatform && (
              <span className="error">{error.purchasePlatform}</span>
            )}

            <label for="">
              <p>Purchase Date</p>
              <input
                type="date"
                value={domainAdd.purchaseDate}
                onChange={(e) =>
                  setDomainAdd({
                    ...domainAdd,
                    purchaseDate: e.target.value,
                  })
                }
              />
            </label>

            {error.purchaseDate && (
              <span className="error">{error.purchaseDate}</span>
            )}

            <label for="">
              <p>Expire Date</p>
              <input
                type="date"
                value={domainAdd.expiryDate}
                onChange={(e) =>
                  setDomainAdd({
                    ...domainAdd,
                    expiryDate: e.target.value,
                  })
                }
              />
            </label>

            {error.expiryDate && (
              <span className="error">{error.expiryDate}</span>
            )}

            <button class="btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddDomain;
