import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/explore', label: 'Explore' },
    { path: '/plan-trip', label: 'Plan Trip' },
    { path: '/environmental', label: 'Environmental Data' },
    { path: '/about', label: 'About' },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span>ExploreJaipur</span>
        </Link>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <div className="auth-buttons">
            <button className="sign-in-btn">Sign In</button>
            <button className="sign-up-btn">Sign Up</button>
          </div>
          <ThemeToggle />
          <button 
            className="hamburger-menu"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;