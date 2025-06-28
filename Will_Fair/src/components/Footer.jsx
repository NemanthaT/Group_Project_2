import "./Footer.css";

function Footer() {
  return (
    <>
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>WillFair</h3>
              <p>Connecting Hearts. Changing Lives.</p>
              <p>
                Join our community and be part of something bigger than
                yourself.
              </p>
              <div className="social-links">
                <a href="#">📘</a>
                <a href="#">📷</a>
                <a href="#">🐦</a>
              </div>
            </div>

            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">How it Works</a>
                </li>
                <li>
                  <a href="#">Our Programs</a>
                </li>
                <li>
                  <a href="#">Get Involved</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li>
                  <a href="#">Help Center</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Service</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Contact Us</h4>
              <ul>
                <li>Reid Avenue, Colombo</li>
                <li>+94 77 1234567890</li>
                <li>info@willfair.org</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 WillFair. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
