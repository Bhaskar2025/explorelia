import React from 'react'

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <div className="brand">
          <span className="brand-mark" />
          Jaipur Smart Guide
        </div>
        <div className="nav-links">
          <a>Home</a>
          <a>Explore</a>
          <a>Plan Trip</a>
          <a>Environmental Data</a>
          <a>About</a>
        </div>
        <div>
          <button className="btn">Sign In</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
