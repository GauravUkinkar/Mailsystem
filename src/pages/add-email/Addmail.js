import React from 'react';
import './addemail.scss'
const Addmail = () => {
  return (
    <>
      <div className="add-email-parent parent">
        <div className="add-email-cont cont">
          <form>
            <label>
              <p>Enter Email</p>
              <input type="text" name="email" />
            </label>
            <label>
              <p>Select Domain</p>
              <select name="domain">
                <option value="">-- Select Domain --</option>
                <option value="gmail.com">@gmail.com</option>
                <option value="yahoo.com">@yahoo.com</option>
                <option value="outlook.com">@outlook.com</option>
              </select>
            </label>
            <button className="btn">submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addmail;
