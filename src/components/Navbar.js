import React from 'react';
import '../style/navbar.css';
import SessionTimer from './SessionTimer';

const Navbar = ({isLoggedIn, remainingSeconds, logOut}) => {
  return (
    <nav className="navbar">
        <div>
        {
            isLoggedIn
            &&
            <SessionTimer   isLoggedIn={isLoggedIn}
                            totalSeconds={remainingSeconds}
                            functionToRunOnFinish={logOut}
            />
        }
        </div>
        <h1 className="navbar-title">Product Review Application</h1>
        <img className="navbar-logo" src="/icon.png" alt="logo"/>
    </nav>
  );
};

export default Navbar;
