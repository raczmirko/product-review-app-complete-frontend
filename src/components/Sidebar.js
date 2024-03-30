import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../style/sidebar.css';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`sidebar ${expanded ? 'expanded' : ''}`}>
      <button onClick={toggleSidebar}>Toggle Sidebar</button>
      <ul className="sidebar-items">
        <li>
          <NavLink to="/" activeClassName="active">Home</NavLink>
        </li>
        <li>
          <NavLink to="/user/register" activeClassName="active">Register</NavLink>
        </li>
        {/* Add more NavLink items for other pages */}
      </ul>
    </div>
  );
};

export default Sidebar;