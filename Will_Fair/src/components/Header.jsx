import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header() {
  // Initialize the useNavigate hook from react-router-dom
  const navigate = useNavigate();

  const goToLoginD = () => {
    navigate("/loginD");
  };
  return (
    <header>
      <nav className="container">
        <div className="logo-container">
          <img
            src="src/assets/images/logo.png"
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
            <a href="/#volunteer">Volunteer</a>
          </li>
          <li>
            <a href="/#contact">Contact Us</a>
          </li>
          <li>
            <a href="/#about">About</a>
          </li>
        </ul>
        <div className="btn-container">
          <button className="sign-in-btn" onClick={goToLoginD}>
            Donate
          </button>
          <button className="sign-in-btn">Fundraise</button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
