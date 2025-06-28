import "./RegLog.css";
import { useNavigate } from "react-router-dom";

export function LoginD() {
  const navigate = useNavigate();

  const goToSignup = () => {
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
          <button onClick={goToSignup} className="link-button">
            Sign in
          </button>
        </div>
      </div>
    </>
  );
}

export function SignUpD() {
  const navigate = useNavigate();

  const goToLogin = () => {
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
          <button onClick={goToLogin} className="link-button">
            Login
          </button>
        </div>
      </div>
    </>
  );
}

export function SignUpI() {
  return <></>;
}

export function SignUpR() {
  return <></>;
}
