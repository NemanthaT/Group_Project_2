import "./Header.css";
import LogoImg from '@//assets/images/logo.png';
import { UserCircle } from 'lucide-react';
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

function Header({ user }) {
  // Initialize the useNavigate hook from react-router-dom
  const navigate = useNavigate();

  const goToLoginD = () => {
    navigate("/loginD");
  };
  const goToLoginF = () => {
    navigate("/loginF");
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // Hide login buttons when user is logged in

  const hideLoginButtons = (user) => {
    const loginButtons = document.querySelectorAll(".sign-in-btn");
    loginButtons.forEach(
      (button) => (button.style.display = user ? "none" : "flex")
    );
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  useEffect(() => {
    hideLoginButtons(user);
  }, [user]);

  return (
    <header>
      <nav className="container">
        <div className="logo-container">
          <img
            src={LogoImg}
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
            <a href="/sysadmin">Market Place</a>
          </li>
          <li>
            <a href="/featured">Volunteer</a>
          </li>
          <li>
            <a href="/regManager">Contact Us</a>
          </li>
          <li>
            <a href="/#about">About</a>
          </li>
          {user ? (
            <li>
              <a href={`/users/${user.role}`}>Dashboard</a>
            </li>
          ) : (
            <li></li>
          )}
        </ul>
        <div className="btn-container">
          <button className="sign-in-btn" onClick={goToLoginD}>
            Donate
          </button>
          <button className="sign-in-btn" onClick={goToLoginF}>
            Fundraise
          </button>
          <div className="profile-container" style={{ display: user ? "flex" : "none", alignItems: "center", gap: "0.5rem", position: "relative" }} ref={profileRef}>
            {user ? (
              <div className="user-info" style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }} onClick={() => setDropdownOpen((open) => !open)}>
                <UserCircle size={30} color="#555" />
                <button className="logout-btn" style={{ marginLeft: 0 }} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="guest-info"></div>
            )}
            {dropdownOpen && (
              <div className="profile-dropdown" style={{ position: "absolute", top: 40, right: 0, background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.12)", borderRadius: 8, zIndex: 10, minWidth: 160 }}>
                <Link to="/profile" className="profile-dropdown-item" style={{ display: "block", padding: "10px 16px", color: "#222", textDecoration: "none" }} onClick={() => setDropdownOpen(false)}>
                  Profile
                </Link>
                <Link to="/buyerDashboard" className="profile-dropdown-item" style={{ display: "block", padding: "10px 16px", color: "#222", textDecoration: "none" }} onClick={() => setDropdownOpen(false)}>
                  Buyer Dashboard
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
