import React, { useState } from "react";
import "./AddDomain.scss";
import axios from "axios";

function AddDomain() {
  const [error, setError] = useState({});

  const handleError = (values) => {
    let error = {};

    if (!values.Domain) {
      error.Domain = "please enter domain name";
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
  });

  const handleAddDomain = async (e) => {
    e.preventDefault();

    const validationErrors = handleError(domainAdd);
    setError(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return false;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/domain/addDomian`,
        domainAdd
      );

      setDomainAdd({
        Domain: "",
        purchasePlatform: "",
        purchaseDate: "",
        expiryDate: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const domainWebsitesName = ["Milesweb", "Hostinger", "GoDaddy", "BigRock"];

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
