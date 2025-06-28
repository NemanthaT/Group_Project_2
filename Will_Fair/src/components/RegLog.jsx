import "./RegLog.css";
import { useNavigate } from "react-router-dom";

//Form for Donor Login
export function LoginD() {
  const navigate = useNavigate();

  const goToSignupD = () => {
    navigate("/loginD/signupD");
  };

  return (
    <>
      <div className="login-container">
        <div className="flogo"></div>

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

          <button type="submit" className="login-btn">
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

  const goToLoginD = () => {
    navigate("/loginD");
  };

  return (
    <>
      <div className="signup-container">
        <div className="flogo">
          <div className="flogo-icon"></div>
        </div>

        <div className="welcome-text">
          <h1>Join with us</h1>
          <p>Connecting Hearts, Changing Lives</p>
        </div>

        <form id="signupForm">
          <div className="form-group">
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                id="fullName"
                placeholder="Full Name"
                required
              />
            </div>
            <div className="error-message">Please enter your full name</div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input type="email" id="email" placeholder="Email" required />
            </div>
            <div className="error-message">
              Please enter a valid email address
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
            <div className="error-message">
              Password must be at least 8 characters long
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
              />
              <button type="button" className="password-toggle">
                👁️
              </button>
            </div>
            <div className="error-message">Passwords do not match</div>
          </div>

          <div className="checkbox-group">
            <div className="checkbox-wrapper">
              <input type="checkbox" id="terms" required />
              <div className="checkbox-custom"></div>
            </div>
            <label htmlFor="terms" className="checkbox-label">
              I agree to{" "}
              <span className="terms-link">Terms and Conditions</span> of
              WillFair Community
            </label>
          </div>

          <button type="submit" className="signup-btn" id="submitBtn">
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
    </>
  );
}

//Form for Fundraiser Login
export function LoginF() {
  const navigate = useNavigate();

  const goToSignupF = () => {
    navigate("/loginF/signupF");
  };

  return (
    <>
      <div className="login-container">
        <div className="flogo"></div>

        <div className="welcome-text">
          <h1>Welcome Back!</h1>
          <p>Connecting Hearts, Changing Lives</p>
        </div>

        <form>
          <div className="form-group">
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input type="tel" placeholder="Phone no" pattern="[0-9]{10}" required />
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

          <button type="submit" className="login-btn">
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
    navigate("/loginF");
  };

  return (
    <>
      <div className="login-container">
        <div className="flogo"></div>

        <div className="welcome-text">
          <h1>Welcome Back!</h1>
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
              <input type="tel" placeholder="Phone no" pattern="[0-9]{10}" required />
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
          Don't have an account?{" "}
          <button onClick={goToLoginF} className="link-button">
            Sign in
          </button>
        </div>
      </div>
    </>
  );
}
