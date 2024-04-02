import '../style/navbar.css';
import React, { useState, useEffect } from 'react';
import { MdOutlineTimer } from "react-icons/md";

const Navbar = ({isLoggedIn, remainingSeconds, logOut}) => {
    const [formattedTime, setFormattedTime] = useState("");
    const expiryTime = new Date().getTime() + remainingSeconds * 1000;

    useEffect(() => {
        if (!isLoggedIn) {
            // If not logged in, return early without setting up the timer
            return;
        }

        const timer = setInterval(() => {
            // Get the current time
            const currentTime = new Date().getTime();

            // Calculate remaining seconds by subtracting the current time from the target time
            const remainingSeconds = Math.max(Math.floor((expiryTime - currentTime) / 1000), 0);

            // Format remaining seconds into minutes and seconds
            const formattedMinutes = String(Math.floor(remainingSeconds / 60)).padStart(2, '0');
            const formattedSeconds = String(remainingSeconds % 60).padStart(2, '0');

            // Update state with the formatted time
            setFormattedTime(`${formattedMinutes}:${formattedSeconds}`);

            // If remainingSeconds is 0, call functionToRunOnFinish and clear the interval
            if (remainingSeconds === 0) {
              logOut();
              clearInterval(timer);
            }
        }, 1000);

        // Clear interval on component unmount
        return () => clearInterval(timer);
    }, [remainingSeconds, logOut]);

    return (
        <nav className="navbar">
            <div className="session-timer">
            {
                isLoggedIn
                &&
                <div>
                <MdOutlineTimer /> {formattedTime}
                </div>
            }
            </div>
            <h1 className="navbar-title">Product Review Application</h1>
            <img className="navbar-logo" src="/icon.png" alt="logo"/>
        </nav>
  );
};

export default Navbar;
