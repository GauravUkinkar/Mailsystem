import React from 'react'
import "./sidebar.scss"
import Dashboard from './dashboard/Dashboard'
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
   </div>


   <Dashboard />
   </>
  )
}

export default Sidebar
