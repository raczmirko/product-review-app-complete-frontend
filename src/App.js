import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ParticleBackground from "./components/ParticleBackground.js";
import Notification from "./components/Notification";
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  { Navigate } from 'react-router-dom'
import React, { useState } from 'react';
import './style/styles.css';

const App = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [notification, setNotification] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleShowNotification = () => {
        setNotification(true);
    };

    const handleNotificationClose = () => {
        setNotification(null);
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const logOut = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setNotification({ type: "success", title:"success", text: "Logged out successfully."});
    };

    return (
        <Router>
        <Navbar />
        {notification && (
            <Notification
                title={notification.title}
                type={notification.type}
                text={notification.text}
                onClose={handleNotificationClose}
            />
        )}
        <div className="app">
        <Sidebar isLoggedIn={isLoggedIn} logOut={logOut}/>
        <div className="content">
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
                <><ParticleBackground/>
                <Register /></>
                }/>
          </Routes>
        </div>
        </div>
        </Router>
      );
};

export default App;
