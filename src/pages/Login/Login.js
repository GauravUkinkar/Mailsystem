import React, { useState } from "react";
import "./login.scss";
import axios from "axios";
const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}api/user/login`,
        formData
      );

      console.log(response, ">>");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="login-parent parent">
        <div className="login-cont cont">
          <form className="add-domain-box" onSubmit={handleLogin}>
            <h2>User Login </h2>
            <label>
              <p>Username</p>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    username: e.target.value,
                  })
                }
              />
            </label>
            <label>
              <p>Password</p>
              <input type="password" />
            </label>
            <button class="btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
