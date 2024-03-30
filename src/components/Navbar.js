import React from 'react';
import { NavLink } from 'react-router-dom';
import '../style/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
        {/* This empty div only servers the purpose of pushing the title to the middle
        Due the the justify:space-between CSS attribute */}
        <div></div>
        <h1 className="navbar-title">Product Review Application</h1>
        <img className="navbar-logo" src="icon.png" alt="logo"/>
    </nav>
  );
};

export default Navbar;
