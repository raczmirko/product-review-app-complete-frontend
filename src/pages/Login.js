import React, { useState, useEffect } from 'react';
import '../style/styles.css';
import Notification from "../components/Notification.js";
import  { Navigate } from 'react-router-dom'

const Login = ({ onLogin, isLoggedIn, notification, setNotification }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const getNotificationTextByStatusCode = (code) => {
        let text = code + ": An error occurred, please try again later!";
        if(code === 400) {
            text = code + ": Bad request.";
        }
        if(code === 401) {
            text = code + ": You provided an incorrect password.";
        }
        if(code === 404) {
            text = code + ": This user does not exist.";
        }
        return text;
    }

    const handleLogin = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const credentials = {
            username: username,
            password: password
        };

        fetch('http://localhost:8080/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(response => {
            const authorizationHeader = response.headers.get("Authorization");
            if (authorizationHeader) {
                const token = authorizationHeader.split(' ')[1];
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
            }

            if (!response.ok) {
                const statusText = getNotificationTextByStatusCode(response.status);
                const notificationText = "Login failed with an error code " + statusText;
                setNotification({ type: "error", title: "ERROR", text: notificationText });
                throw new Error('Login failed');
            }
            setNotification({ type: "success", title: "Success", text: "Logged in successfully." });
            onLogin();
            return;
        })
        .catch(error => {
            if (error instanceof TypeError) {
                console.error('Network error. The server might be down.');
                setNotification({ type: "error", title: "ERROR", text: 'Network error. The server might be down.'});
            } else {
                console.error('Error during login:', error);
                setNotification({ type: "error", title: "ERROR", text: error});
            }
        });
    }

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <div className="login-form">
            <h2>Log in to your account</h2>
            <form onSubmit={handleLogin}>
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
        </div>
    );
};

export default Login;
