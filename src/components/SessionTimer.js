import React, { useState, useEffect } from 'react';
import { MdOutlineTimer } from "react-icons/md";

const SessionTimer = ({ isLoggedIn, totalSeconds, functionToRunOnFinish }) => {
    const [formattedTime, setFormattedTime] = useState("");
    const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);

    // Function to format time in mm:ss format
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0'); // Add leading zero if necessary
        const formattedSeconds = String(remainingSeconds).padStart(2, '0'); // Add leading zero if necessary
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    useEffect(() => {
        let timer;

        if (isLoggedIn) {
            timer = setInterval(() => {
                if(remainingSeconds == 0) {
                    functionToRunOnFinish();
                    return;
                }
                else {
                    setRemainingSeconds(remainingSeconds - 1);
                }
                setFormattedTime(formatTime(remainingSeconds));
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isLoggedIn, remainingSeconds]); // Include remainingSeconds in the dependency array

    return (
        <div className="session-timer">
            <MdOutlineTimer /> {formattedTime}
        </div>
    );
};

export default SessionTimer;
