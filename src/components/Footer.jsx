import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h3>Pasumai Bharatam</h3>
          <p>
            Working towards social justice, sustainable development, and
            people-centric governance.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/register">Register</a></li>
            <li><a href="/downloadid">Download ID</a></li>
            <li><a href="/dashboard">Dashboard</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>📧 info@pasumaibharatam.org</p>
          <p>📞 +91 98765 43210</p>
          <p>📍 Tamil Nadu, India</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#">📘</a>
            <a href="#">🐦</a>
            <a href="#">📸</a>
            <a href="#">▶️</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Pasumai Bharatam. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
