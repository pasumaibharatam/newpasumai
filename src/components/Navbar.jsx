import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar({ setLanguage }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const handleClose = () => setOpen(false);

  return (
    <nav className="navbar">
      <div className="logo">Party</div>

      {/* Hamburger menu for mobile */}
      <div
        className={`hamburger ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
        role="button"
        aria-label="Toggle Menu"
        tabIndex={0}
        onKeyPress={(e) => e.key === "Enter" && setOpen(!open)}
      >
        ☰
      </div>

      <ul className={`nav-links ${open ? "open" : ""}`}>
  <li>
    {location.pathname === "/" ? (
      <span onClick={() => handleScroll("home")}>Home</span>
    ) : (
      <Link to="/" onClick={handleClose}>Home</Link>
    )}
  </li>

  {/* <li>
    {location.pathname === "/" ? (
      <span onClick={() => handleScroll("about")}>About</span>
    ) : (
      <Link to="/" onClick={handleClose}>About</Link>
    )}
  </li> */}
 <li><Link to="/organizationals" onClick={handleClose}>கழக அமைப்பு</Link></li>
  <li><Link to="/register" onClick={handleClose}>Register</Link></li>
  <li><Link to="/downloadid" onClick={handleClose}>DownloadID</Link></li>
<li><Link to="/dashboard" onClick={handleClose}>Dashboard</Link></li>
{/* <Link to="/district-secretaries">District Secretaries</Link> */}
  {/* <li onClick={() => { setLanguage("ta"); handleClose(); }}>தமிழ்</li>
  <li onClick={() => { setLanguage("en"); handleClose(); }}>English</li> */}
</ul>

    </nav>
  );
}

export default Navbar;
