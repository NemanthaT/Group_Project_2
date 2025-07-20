import "./Header.css";
import { useNavigate, Link } from "react-router-dom";
import { UserCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";

function Header({ user, onLogout }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const goToLoginD = () => {
    navigate("/loginD");
  };
  const goToLoginF = () => {
    navigate("/loginF");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);
  function logout() {
  localStorage.removeItem('userToken');
  localStorage.removeItem('userData');

  localStorage.clear();
  window.location.href = '/';

}

  return (
    <header>
      <nav className="container">
        <div className="logo-container">
          <img
            src="http://localhost:5173/src/assets/images/logo.png"
            alt="Logo"
            className="logo-img"
          />
          <div className="logo">WillFair</div>
        </div>

        <ul className="nav-links">
          <li>
            <a href="/#home">Home</a>
          </li>
          <li>
            <a href="/marketplace">Market Place</a>
          </li>
          <li>
            <a href="/authManager">Dashboard</a>
          </li>
          <li>
            <a href="/sellerDashboard">S Dashboard</a>
          </li>
          <li>
            <a href="/buyerDashboard">B Dashboard</a>
          </li>
          <li>
            <a href="/featured">Volunteer</a>
          </li>
          <li>
            <a href="/#contact">Contact Us</a>
          </li>
          <li>
            <a href="/#about">About</a>
          </li>
          <li>
            <a href="/users">users</a>
          </li>
        </ul>
        <div className="btn-container" ref={dropdownRef}>
          <p></p>
          {user ? (
            <div style={{ position: "relative" }}>
              <button
                className="profile-icon-link"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
                onClick={() => setDropdownOpen((open) => !open)}
              >
                <UserCircle
                  className="profile-icon"
                  size={32}
                  style={{ borderRadius: "50%" }}
                />
              </button>
              {dropdownOpen && (
                <div className="profile-dropdown">
                  <Link
                    to="/profile"
                    className="dropdown-item"
                    style={{
                      display: "block",
                      padding: "10px",
                      textDecoration: "none",
                      color: "#333",
                    }}
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    className="dropdown-item"
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "10px",
                      background: "none",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      color: "#333",
                    }}
                    onClick={() => {
                      setDropdownOpen(false);
                      if (onLogout) onLogout();
                      logout();
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button className="sign-in-btn" onClick={goToLoginD}>
                Donate
              </button>
              <button className="sign-in-btn" onClick={goToLoginF}>
                Fundraise
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
