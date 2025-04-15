import React, { useEffect, useState } from "react";
import "./addemail.scss";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
const Addmail = () => {
  // ADD Validation
  const [error, setError] = useState({});

  const navigate = useNavigate();
  
  const handleError = (values) => {
    let error = {};
    if (!values.email) {
      error.email = "Please Enter Email";
    }
    if (!values.domainId || values.domainId === "selectdomain") {
      error.domainId = "Please Selcect Domain Name";
    }
    if (!values.username) {
      error.username = "Please Enter Email Username";
    }
    if (!values.password) {
      error.password = "Please Enter Email Password";
    }
    if (!values.primaryTag) {
      error.primaryTag = "Please Enter Primary Tag";
    }
    return error;
  };
  //-------------------------------//

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [emailadd, setEmailAdd] = useState({
    email: "",
    domainId: "",
    username: "",
    password: "",
    primaryTag: false,
  });

  const handleEmailByid = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}api/email/getEmailByid?emailId=${id}`
      );

      setEmailAdd({
        email: response.data.data[0].email,
        domainId: response.data.data[0].domainId,
        platform: response.data.data[0].platform,
        username: response.data.data[0].username,
        password: response.data.data[0].password,
        primaryTag: response.data.data[0].primaryTag,
      });

      console.log(response.data.data[0], "response data");
    } catch (error) {
      console.log(error);
    }
  };

  const [domains, setDomains] = useState([]);

  // call domain list api
  const domainlist = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}api/domain/getAllDomain`
      );

      setDomains(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    domainlist();
    handleEmailByid();
  }, []);

  //--------------------------------------------------------
  const handleEmail = async (e) => {
    e.preventDefault();
    const validationErrors = handleError(emailadd);
    setError(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return false;
    }

    try {
      let response;

      if (id) {
        response = await axios.put(
          `${process.env.REACT_APP_API}api/email/emailEdit?emailId=${id}`,
          emailadd
        );
      } else {
        response = await axios.post(
          `${process.env.REACT_APP_API}api/email/addEmail`,
          emailadd
        );
      }

      if (response.status === 200) {
        navigate("/");
      }
      alert(id ? "Mail Updated Succefully" : "Mail Added Succefully");

      setEmailAdd({
        email: "",
        platform: "",
        domainId: "",
        username: "",
        password: "",
        primaryTag: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="add-email-parent parent">
        <div className="add-email-cont cont">
          <form onSubmit={handleEmail}>
            <label>
              <p>Enter Email</p>
              <input
                type="text"
                name="email"
                value={emailadd.email}
                onChange={(e) =>
                  setEmailAdd({ ...emailadd, email: e.target.value })
                }
              />
            </label>
            <label>
              <p>Primary Mail</p>
              <select
                value={Number(emailadd.primaryTag)} // convert boolean to string
                onChange={(e) =>
                  setEmailAdd({
                    ...emailadd,
                    primaryTag: e.target.value , // convert string to boolean
                  })
                }
                className={error.primaryTag ? "error-border" : ""}
              >
                <option value="">Select</option>
                <option value="1">True</option>
                <option value="0">False</option>
              </select>
            </label>

            {error.primaryTag && (
              <span className="error">{error.primaryTag}</span>
            )}
            {error.primaryTag && (
              <span className="error">{error.primaryTag}</span>
            )}

            <label>
              <p>Mail Platform</p>
              <input
                type="text"
                name="platform"
                value={emailadd.platform}
                onChange={(e) =>
                  setEmailAdd({ ...emailadd, platform: e.target.value })
                }
              />
            </label>
            {error.email && <span className="error">{error.email}</span>}
            <label>
              <p>Select Domain</p>
              <select
                id="domainSelect"
                value={emailadd.domainId}
                onChange={(e) =>
                  setEmailAdd({
                    ...emailadd,
                    domainId: parseInt(e.target.value),
                  })
                }
                className={error.domainId ? "error-border" : ""}
              >
                <option value="selectdomain">Select a domain</option>
                {domains.map((domain) => (
                  <option key={domain.id} value={domain.id}>
                    {domain.Domain}
                  </option>
                ))}
              </select>
            </label>
            {error.domainID && <span className="error">{error.domainId}</span>}
            <label>
              <p>Username</p>
              <input
                type="text"
                name="username"
                value={emailadd.username}
                onChange={(e) =>
                  setEmailAdd({ ...emailadd, username: e.target.value })
                }
              />
            </label>
            {error.username && <span className="error">{error.username}</span>}
            <label>
              <p>Password</p>
              <input
                type="password"
                name="password"
                value={emailadd.password}
                onChange={(e) =>
                  setEmailAdd({ ...emailadd, password: e.target.value })
                }
              />
            </label>
            {error.password && <span className="error">{error.password}</span>}
            <button className="btn">submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addmail;
