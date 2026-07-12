import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiUsers, 
  FiList, 
  FiMap, 
  FiTruck,
  FiSettings, 
  FiLogOut 
} from 'react-icons/fi';

export default function Sidebar({ isOpen, onLogout }) {
  const navItems = [
    { to: '/', icon: <FiHome />, label: 'Dashboard' },
    { to: '/users', icon: <FiUsers />, label: 'Users' },
    { to: '/transactions', icon: <FiList />, label: 'Transactions' },
    { to: '/routes', icon: <FiMap />, label: 'Routes' },
    { to: '/buses', icon: <FiTruck />, label: 'Buses' },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-brand">
        <h2> <span>NFC</span> Bus</h2>
        <p style={{ fontSize: '12px', color: '#8e8e8e', marginTop: '4px' }}>Admin Panel</p>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            end
          >
            <span className="icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}

        <div className="nav-item logout" onClick={onLogout}>
          <span className="icon"><FiLogOut /></span>
          Logout
        </div>
      </nav>
    </aside>
  );
}