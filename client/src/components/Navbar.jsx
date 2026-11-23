import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark site-nav">
      <div className="container">
        <a className="navbar-brand" href="#top">
          <span className="accent-text">&gt;_</span> RGANADO
        </a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#nav-links" 
          aria-controls="nav-links" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav-links">
          <div className="navbar-nav ms-auto">
            <a className="nav-link" href="#about">About</a>
            <a className="nav-link" href="#projects">Projects</a>
            <a className="nav-link" href="#homelab">Homelab</a>
            <a className="nav-link" href="#contact">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
