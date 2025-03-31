import React from 'react'
import "./login.scss"
const Login = () => {
  return (
   <>
   <div className="login-parent parent">
    <div className="login-cont cont">
        <form className='add-domain-box'>

            <h2>User Login </h2>
            <label>
              <p>Username</p>
              <input type="text" />
            </label>
            <label>
              <p>Password</p>
              <input type="text" />
            </label>
            <button class="btn" type="submit">
              Login
            </button>
        </form>
    </div>
   </div>
   </>
  )
}

export default Login
