import "./RegLog.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//Form for Donor Login
export function LoginD() {
  const navigate = useNavigate();

  const goToDonor = () => {
    navigate("/users/donor");
  };

  const goToSignupD = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Smooth scrolling
    });
    navigate("/loginD/signupD");
  };

  return (
    <>
      <div className="login-container">
        <div className="flogo">
          <img
            src="src/assets/images/logo.png"
            alt="Logo"
            className="flogo-icon"
          />
        </div>

        <div className="welcome-text">
          <h1>Welcome Back!</h1>
          <p>Connecting Hearts, Changing Lives</p>
        </div>

        <form>
          <div className="form-group">
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input type="email" placeholder="Email" required />
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
              />
              <button type="button" className="password-toggle">
                👁️
              </button>
            </div>
          </div>

          <button type="submit" onClick={goToDonor} className="login-btn">
            Login
          </button>
        </form>

        <div className="signup-link">
          Don't have an account?{" "}
          <button onClick={goToSignupD} className="link-button">
            Sign in
          </button>
        </div>
      </div>
    </>
  );
}

//Form for Donor Sign Up
export function SignUpD() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Sign up successful!");
        navigate("/loginD");
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const goToLoginD = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/loginD");
  };

  return (
    <div className="signup-container">
      <div className="welcome-text">
        <h1>Join with us</h1>
        <p>Connecting Hearts, Changing Lives</p>
      </div>

      <form id="signupForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-wrapper">
            <span className="input-icon">👤</span>
            <input
              type="text"
              id="fullName"
              placeholder="Full Name"
              required
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="input-wrapper">
            <span className="input-icon">📧</span>
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="input-wrapper">
            <span className="input-icon">🔒</span>
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="input-wrapper">
            <span className="input-icon">🔒</span>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="checkbox-group">
          <div className="checkbox-wrapper">
            <input type="checkbox" id="terms" required />
          </div>
          <label htmlFor="terms" className="checkbox-label">
            I agree to{" "}
            <span className="terms-link">Terms and Conditions</span> of
            WillFair Community
          </label>
        </div>

        <button type="submit" className="signup-btn">
          Sign In
        </button>
      </form>

      <div className="login-link">
        Already have an account?{" "}
        <button onClick={goToLoginD} className="link-button">
          Login
        </button>
      </div>
    </div>
  );
}

//Form for Fundraiser Login
export function LoginF() {
  const navigate = useNavigate();

  const goToDonee = () => {
    navigate("/users/donee");
  };

  const goToSignupF = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Smooth scrolling
    });
    navigate("/loginF/signupF");
  };

  

  return (
    <>
      <div className="login-container">
        <div className="flogo">
          <img
            src="src/assets/images/logo.png"
            alt="Logo"
            className="flogo-icon"
          />
        </div>
        <div className="welcome-text">
          <h1>Welcome Back!</h1>
          <p>Connecting Hearts, Changing Lives</p>
        </div>

        <form>
          <div className="form-group">
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                type="tel"
                placeholder="Phone no"
                pattern="[0-9]{10}"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
              />
              <button type="button" className="password-toggle">
                👁️
              </button>
            </div>
          </div>

          <button onClick={goToDonee} type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="signup-link">
          Don't have an account?{" "}
          <button onClick={goToSignupF} className="link-button">
            Sign in
          </button>
        </div>
      </div>
    </>
  );
}

//Form for Fundraiser Sign Up
export function SignUpF() {
  function toggleType(type) {
    const buttons = document.querySelectorAll(".toggle-btn");
    buttons.forEach((btn) => btn.classList.remove("active"));

    if (type === "individual") {
      buttons[0].classList.add("active");
    } else {
      buttons[1].classList.add("active");
    }
  }
  const navigate = useNavigate();

  const goToLoginF = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Smooth scrolling
    });
    navigate("/loginF");
  };

  return (
    <>
      <div className="signup-container">
        {/*<div className="flogo">
          <img
            src="../src/assets/images/logo.png"
            alt="Logo"
            className="flogo-icon"
          />
        </div>*/}
        <div className="welcome-text">
          <h1>Join with us</h1>
          <p>Connecting Hearts, Changing Lives</p>
        </div>

        <form>
          <div className="toggle-buttons">
            <button
              type="button"
              className="toggle-btn active"
              onClick={() => {
                toggleType("individual");
              }}
            >
              Individual
            </button>
            <button
              type="button"
              className="toggle-btn"
              onClick={() => {
                toggleType("representative");
              }}
            >
              Representative
            </button>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                name="name"
                placeholder="Full Name/ Organization Name"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                type="tel"
                placeholder="Phone no"
                pattern="[0-9]{10}"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
              />
              <button type="button" className="password-toggle">
                👁️
              </button>
            </div>
          </div>

          <div
            className="upload-group"
            onClick={() => document.getElementById("proofDocument").click()}
          >
            <input
              type="file"
              id="proofDocument"
              name="proofDocument"
              accept=".pdf,.doc,.docx,.jpg,.png"
            />
            <div className="upload-content">
              <span className="upload-text">📄 Proof Document</span>
              <span className="upload-btn">Upload</span>
            </div>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="signup-link">
          Already have an account?{" "}
          <button onClick={goToLoginF} className="link-button">
            Login
          </button>
        </div>
      </div>
    </>
  );
}
