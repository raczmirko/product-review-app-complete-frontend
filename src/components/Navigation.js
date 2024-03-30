import React from 'react';
import { NavLink } from 'react-router-dom';
import '../style/menu.css';

const Navigation = () => {
  return (
    <nav className="menu">
        <img src="/icon.ico" alt="App Icon" className="menu-icon" />
        <h1 className="menu-title">Product Review Application</h1>
        <ul className="menu-items">
            <li className="menu-item">
                <NavLink to="/" activeClassName="active">Home</NavLink>
            </li>
            <li className="menu-item">
                <NavLink to="/user/register" activeClassName="active">Register</NavLink>
            </li>
        </ul>
    </nav>
  );
};

export default Navigation;
