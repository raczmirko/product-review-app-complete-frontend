import Navbar from './components/Navbar';
import Register from './pages/Register';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import './style/styles.css';

const App = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

      const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
      };

    return (
        <Router>
        <Navbar />
          <div className="app">
            <Sidebar />
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user/register" element={<Register />} />
              </Routes>
            </div>
          </div>
        </Router>
      );
};

export default App;
