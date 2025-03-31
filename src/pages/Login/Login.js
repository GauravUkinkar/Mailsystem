import React, { useState } from "react";
import "./login.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}api/user/login`,
        formData
      );

      if (response.status === 201) {
        localStorage.setItem("isVerified", true);
        navigate("/");
        onLogin();
      }
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
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
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
