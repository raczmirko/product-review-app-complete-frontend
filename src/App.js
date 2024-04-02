import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { SidebarProvider } from './components/SidebarContext';
import ParticleBackground from "./components/ParticleBackground.js";
import Notification from "./components/Notification";
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Brands from './pages/Brands';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import './style/styles.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [notification, setNotification] = useState(false);
    const [contentState, setContentState] = useState("content");
    const [username, setUsername] = useState("");
    const [expiryTime, setExpiryTime] = useState(null);

    const handleShowNotification = () => {
        setNotification(true);
    };

    const handleNotificationClose = () => {
        setNotification(null);
    };

    const handleLogin = async () => {
        await fetchSessionLengthAndUsername();
        setIsLoggedIn(true);
    };

    const fetchSessionLengthAndUsername = async () => {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        setUsername(localStorage.getItem('username'));
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        try {
            const response = await fetch('http://localhost:8080/security/session-second', { headers });
            if (!response.ok) {
                throw new Error('Failed to fetch session expiry time.');
            }
            const data = await response.json();
            setExpiryTime(new Date().getTime() + data * 1000);
            return;
        } catch (error) {
            console.error('Error fetching session length:', error);
            return []; // Return an empty array if an error occurs
        }
    };

    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        setNotification({ type: "info", title:"information", text: "You have been logged out."});
    };

    return (
        <Router>
        <Navbar isLoggedIn={isLoggedIn}
                expiryTime={expiryTime}
                logOut={logOut}
        />
        {notification && (
            <Notification
                title={notification.title}
                type={notification.type}
                text={notification.text}
                onClose={handleNotificationClose}
            />
        )}
        <div className="app">
        <SidebarProvider>
            <Sidebar    isLoggedIn={isLoggedIn}
                        logOut={logOut}
                        setNotification={setNotification}
                        username={username}
            />
        </SidebarProvider>
        <div className={contentState}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={
                <>
                    <ParticleBackground/>
                    <Login onLogin={handleLogin}
                        isLoggedIn={isLoggedIn}
                        notification={handleShowNotification}
                        setNotification={setNotification}
                    />
                </>
                }/>
            <Route path="/register" element={
                <>
                    <ParticleBackground/>
                    <Register />
                </>
                }/>
            <Route path="/brand" element={<Brands setNotification={setNotification}/>} />
          </Routes>
        </div>
        </div>
        </Router>
      );
};

export default App;
