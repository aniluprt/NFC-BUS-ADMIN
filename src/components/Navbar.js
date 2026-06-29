import React from 'react';
import { FiMenu } from 'react-icons/fi';

export default function Navbar({ onMenuClick }) {
  const user = JSON.parse(localStorage.getItem('adminUser') || '{}');

  return (
    <div className="top-nav">
      <button className="hamburger" onClick={onMenuClick}>
        <FiMenu />
      </button>
      <h1 className="page-title">Dashboard</h1>
      <div className="user-info">
        <div className="avatar">{user?.name?.charAt(0)?.toUpperCase() || 'A'}</div>
        <span className="name">Welcome back</span>
      </div>
    </div>
  );
}