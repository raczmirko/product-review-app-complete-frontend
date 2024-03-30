import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../style/sidebar.css';
import { CgArrowRightR, CgHome, CgLogIn, CgLogOut } from "react-icons/cg";

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
                        <NavLink to={option.route} activeClassName="active">
                            {option.icon}
                            {expanded && <span> {option.text}</span>}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;