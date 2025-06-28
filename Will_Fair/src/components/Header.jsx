import "./Header.css";

function Header() {
  return (
    <header>
      <nav className="container">
        <div className="logo-container">
          <img src="src/assets/images/logo.png" alt="Logo" className="logo-img" />
          <div className="logo">WillFair</div>
        </div>

        <ul className="nav-links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#volunteer">Volunteer</a>
          </li>
          <li>
            <a href="#contact">Contact Us</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
        </ul>
        <button className="sign-in-btn">Sign In</button>
      </nav>
    </header>
  );
}

export default Header;
