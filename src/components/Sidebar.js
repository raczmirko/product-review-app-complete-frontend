import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../style/sidebar.css';
import { CgMenu, CgHome, CgLogIn, CgLogOut, CgUserAdd, CgShoppingBag } from "react-icons/cg";
import { useSidebar } from './SidebarContext';

const Sidebar = ({ isLoggedIn, logOut, setNotification, username }) => {

    const { isSidebarOpen, toggleSidebar } = useSidebar();

    useEffect(() => {
        if (isSidebarOpen) {
            document.body.classList.add('content-expanded');
        } else {
          document.body.classList.remove('content-expanded');
        }
    }, [isSidebarOpen]);

    const handleLogout = () => {
        logOut();
    };

    const showAlreadyLoggedInAlert = () => {
        setNotification({ type: "info", title:"information", text: "You are already logged in!" });
    };

    const sidebarOptions = [
        { icon: <CgHome />, text: 'Home', route: '/', visibleWithoutLogin: true},
        { icon: <CgLogIn />, text: 'Login', route: '/login', visibleWithoutLogin: true },
        { icon: <CgUserAdd />, text: 'Register', route: '/register', visibleWithoutLogin: true },
        { icon: <CgShoppingBag />, text: 'Brands', route: '/brand', visibleWithoutLogin: false }
    ];

    return (
        <div className={`sidebar ${isSidebarOpen ? 'expanded' : ''}`}>
            <button onClick={toggleSidebar}><CgMenu /></button>
            <ul className="sidebar-items">
                {sidebarOptions.map((option, index) => (
                    <li key={index}>
                        {
                            (isLoggedIn || (!isLoggedIn && option.visibleWithoutLogin)) &&
                            <NavLink to={option.route} onClick={isLoggedIn && option.text === 'Login' ? showAlreadyLoggedInAlert : null}>
                                {option.icon}
                                {isSidebarOpen && <span> {option.text}</span>}
                            </NavLink>
                        }
                    </li>
                ))}
            </ul>
            <div className="sidebar-footer">
                <div className="button-logout">
                    {isLoggedIn &&
                        <NavLink to="/" onClick={handleLogout}>
                            <CgLogOut className="hyperlink"/>
                            {isSidebarOpen && <span className="hyperlink"> Log out</span>}
                        </NavLink>
                    }
                </div>
                <div className="footer-login-name">
                    {
                        isSidebarOpen &&
                        isLoggedIn &&
                        <div>
                            <div>
                                <hr/>
                                <span>Logged in as {username}</span>
                            </div>
                        </div>
                    }
                </div>
                <hr/>
                <div className="footer-watermark">
                    {isSidebarOpen && <span>2024 © Mirkó Rácz</span>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;