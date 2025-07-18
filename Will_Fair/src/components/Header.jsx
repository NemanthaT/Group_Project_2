import "./Header.css";
import { UserCircle } from 'lucide-react';
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

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

  useEffect(() => {
    hideLoginButtons(user);
  }, [user]);

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
            <a href="/featured">Volunteer</a>
          </li>
          <li>
            <a href="/#contact">Contact Us</a>
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
          <div className="profile-container" style={{ display: user ? "block" : "none" }}>
            {user ? (
              <div className="user-info">
                {/*
                <span className="user-name">{user.name}</span>
                */}
                <UserCircle size={30} color="#555" />
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="guest-info">
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
