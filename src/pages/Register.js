import React, { useState } from 'react';
import '../style/styles.css';
import Notification from "../components/Notification.js";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [showNotification, setNotification] = useState(false);

    const handleShowNotification = () => {
        setNotification(true);
    };

    const handleNotificationClose = () => {
        setNotification(null);
    };

    const checkPasswordValidity = (e) => {
        e.preventDefault();
        if(password !== passwordAgain) {
            const errorText = "The two passwords do not match!";
            console.error(errorText);
            setNotification({ type: "error", title:"error", text: errorText});
            return;
        }
        if(!/[A-Z]/.test(password)) {
            const errorText = "The password must contain at least one capital letter!";
            console.error(errorText);
            setNotification({ type: "error", title:"error", text: errorText});
            return;
        }
        if(!/[0-9]/.test(password)) {
            const errorText = "The password must contain at least one number!";
            console.error(errorText);
            setNotification({ type: "error", title:"error", text: errorText});
            return;
        }
         if (!/[^A-Za-z0-9]/.test(password)) {
            const errorText = "The password must contain at least one special character!";
            console.error(errorText);
            setNotification({ type: "error", title: "error", text: errorText });
            return;
        }
        else {
            handleRegistration(e);
        }
    }

    const getNotificationTextByStatusCode = (code) => {
        let text = code + ": An error occurred, please try again later!";
        if(code === 400) {
            text = "400: This username is probably already in use.";
        }
        return text;
    }

    const handleRegistration = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const credentials = {
            username: username,
            password: password
        };

        fetch('http://localhost:8080/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(response => {
            if (!response.ok) {
                const statusText = getNotificationTextByStatusCode(response.status);
                const notificationText = "Registration failed with an error code " + statusText;
                setNotification({ type: "error", title:"error", text: notificationText});
                throw new Error('Registration failed');
            }
            else {
                setNotification({ type: "success", title:"success", text: "Registration successful!"});
            }
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <div className="registration-form">
            <h2>Create account</h2>
            <form onSubmit={checkPasswordValidity}>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label>Password again:</label>
                    <input type="password" value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)} required/>
                </div>
                <button type="submit" className="button-confirm">Register</button>
            </form>
            {showNotification && (
                <Notification
                    title={showNotification.title}
                    type={showNotification.type}
                    text={showNotification.text}
                    onClose={handleNotificationClose}
                />
            )}
        </div>
    );
};

export default Register;
