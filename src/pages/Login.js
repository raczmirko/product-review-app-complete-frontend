import React, { useState } from 'react';
import '../style/styles.css';
import Notification from "../components/Notification.js";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showNotification, setNotification] = useState(false);

    const handleShowNotification = () => {
        setNotification(true);
    };

    const handleNotificationClose = () => {
        setNotification(null);
    };

    const handleRegistration = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const credentials = {
            username: username,
            password: password
        };

        fetch('http://localhost:8080/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(response => {
            if (!response.ok) {
                const notificationText = "Login failed with an error code " + response.status;
                console.log(response)
                setNotification({ type: "error", title:"ERROR", text: notificationText});
                throw new Error('Login failed');
            }
            else {
                setNotification({ type: "success", title:"SUCCESS", text: "Login successful!"});
            }
        })
        .then(data => {
            // TODO redirect on login
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <div className="login-form">
            <h2>Log in to your account</h2>
            <form onSubmit={handleRegistration}>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <button type="submit" className="button-confirm">Login</button>
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

export default Login;
