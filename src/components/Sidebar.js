import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../style/sidebar.css';
import { CgMenu, CgHome, CgLogIn, CgLogOut, CgUserAdd } from "react-icons/cg";

const Sidebar = ({ isLoggedIn, logOut, setNotification }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const handleLogout = () => {
      logOut();
  };

  const showAlreadyLoggedInAlert = () => {
    setNotification({ type: "info", title:"information", text: "You are already logged in!" });
  };

  const sidebarOptions = [
      { icon: <CgHome />, text: 'Home', route: '/'},
      { icon: <CgLogIn />, text: 'Login', route: '/login' },
      { icon: <CgUserAdd />, text: 'Register', route: '/register' }
    ];

    return (
        <div className={`sidebar ${expanded ? 'expanded' : ''}`}>
            <button onClick={toggleSidebar}><CgMenu /></button>
            <ul className="sidebar-items">
                {sidebarOptions.map((option, index) => (
                    <li key={index}>
                        <NavLink to={option.route} onClick={isLoggedIn && option.text === 'Login' ? showAlreadyLoggedInAlert : null}>
                            {option.icon}
                            {expanded && <span> {option.text}</span>}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div className="sidebar-footer">
                <div className="button-logout">
                    {isLoggedIn &&
                        <NavLink to="/" onClick={handleLogout}>
                            <CgLogOut />
                            {expanded && <span> Log out</span>}
                        </NavLink>
                    }
                </div>
                <div className="footer-watermark">
                    {expanded && <span>2024 © Mirkó Rácz</span>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;