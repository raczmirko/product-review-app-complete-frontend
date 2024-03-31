import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../style/sidebar.css';
import { CgArrowRightR, CgArrowLeftR, CgHome, CgLogIn, CgLogOut, CgUserAdd } from "react-icons/cg";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const sidebarOptions = [
      { icon: <CgHome />, text: 'Home', route: '/'},
      { icon: <CgLogIn />, text: 'Login', route: '/' },
      { icon: <CgUserAdd />, text: 'Register', route: 'user/register' }
    ];

    return (
        <div className={`sidebar ${expanded ? 'expanded' : ''}`}>
            {expanded && <button onClick={toggleSidebar}><CgArrowLeftR /></button>}
            {!expanded && <button onClick={toggleSidebar}><CgArrowRightR /></button>}
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
                <div>
                    <NavLink to="/logout">
                        <CgLogOut />
                        {expanded && <span> Log out</span>}
                    </NavLink>
                </div>
                <div className="footer-watermark">
                    {expanded && <span>Created by Mirkó Rácz © 2024.</span>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;