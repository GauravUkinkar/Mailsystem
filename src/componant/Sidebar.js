import React from 'react'
import "./sidebar.scss"
import { MdOutlineLogout } from 'react-icons/md'
import { Link } from 'react-router-dom'
const Sidebar = () => {
  return (
   <>
   <div className="sidebar-parent">
    <ul className='list'>
        <li>diwise.uk</li>
        <li>diwise.in</li>
        <li>pandozasolutions.com</li>
        <li>akkafoundation.in</li>
        <li>theindianjourney.com</li>
        <li>arvindpatilnilangekar.com</li>
        <li>sambhajipatilnilangekar.com</li>
        <li>diwiseglobal.com</li>
        <li>saidigitek.com</li>
        <li>theteamdental.in</li>
    </ul>

    <div className="logout-btn">
      <Link to="/" className='btn'>Log Out
      <div className="icon"><MdOutlineLogout /></div>
       </Link>
    </div>
   </div>
   </>
  )
}

export default Sidebar
