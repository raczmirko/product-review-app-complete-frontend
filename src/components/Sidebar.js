import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../style/sidebar.css';
import { CgArrowRightR, CgHome, CgLogIn, CgLogOut } from "react-icons/cg";
import logo from '../res/icon.png';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const sidebarOptions = [
      { icon: <CgHome />, text: 'Home', route: '/'},
      { icon: <CgLogIn />, text: 'Login', route: '/' },
      { icon: <CgLogOut />, text: 'Register', route: 'user/register' }
    ];

    return (
        <div className={`sidebar ${expanded ? 'expanded' : ''}`}>
            <button onClick={toggleSidebar}><CgArrowRightR /></button>
            <ul className="sidebar-items">
                {sidebarOptions.map((option, index) => (
                    <li key={index}>
                        <NavLink to={option.route}>
                            {option.icon}
                            {expanded && <span> {option.text}</span>}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div className="sidebar-footer">
                {expanded && <img src="../res/icon.png" alt="logo"/>}
                {expanded && <span>App by Mirkó Rácz</span>}
            </div>
        </div>
    );
};

export default Sidebar;