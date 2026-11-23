import { useState } from 'react';

export default function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const closeMenu = () => setExpanded(false);
  return (
    <nav className="navbar navbar-expand-md navbar-dark site-nav">
      <div className="container">
        <a className="navbar-brand" href="#top">
          <span className="accent-text">&gt;_</span> RGANADO
        </a>
        <button 
          className="navbar-toggler" 
          type="button" 
          aria-controls="nav-links" 
          aria-expanded={expanded}
          aria-label="Toggle navigation"
          onClick={() => setExpanded((isExpanded) => !isExpanded)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse${expanded ? ' show' : ''}`} id="nav-links">
          <div className="navbar-nav ms-auto">
            <a className="nav-link" href="#about" onClick={closeMenu}>About</a>
            <a className="nav-link" href="#projects" onClick={closeMenu}>Projects</a>
            <a className="nav-link" href="#homelab" onClick={closeMenu}>Homelab</a>
            <a className="nav-link" href="#contact" onClick={closeMenu}>Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
