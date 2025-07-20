import "./RegLog.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bcrypt, { hash } from "bcryptjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Form for Donor Login
export function LoginD() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        formData
      );

      // Store token and user data (consider using context or state management)
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userData", JSON.stringify(response.data.user));

      // Redirect based on user role
      switch (response.data.user.role) {
        case "donor":
          navigate("/users/donor");
          location.reload(); // Reload to update user state
          break;
        case "auth_manager":
          navigate("/manager/dashboard");
          break;
        case "regional_manager":
          navigate("/regional/dashboard");
          break;
        case "system_admin":
          navigate("/admin/dashboard");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      toast.error(err.response.data.message || "Invalid credentials! Please try again.");
      //setError(err.response?.data?.error || "Login failed. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const goToSignupD = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate("/loginD/signupD");
  };

  return (
    <>
      <ToastContainer />
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

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="button" className="password-toggle">
                👁️
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="signup-link">
          Don't have an account?{" "}
          <button onClick={goToSignupD} className="link-button">
            Sign up
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
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Hash the password before sending to server
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(formData.password, salt);

      const response = await axios.post(
        "http://localhost:5000/donors/signupDonor",
        {
          fullName: formData.fullName,
          email: formData.email,
          password: hashedPassword, // Send hashed password
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Sign up successful!");
        setTimeout(() => {
          navigate("/loginD");
        }, 3000);
      } else {
        //setError(response.data.message || "Signup failed email already exists");
        toast.error(
          response.data.message || "Signup failed email already exists!!"
        );
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError(
        toast.error(
          error.response?.data?.message || "Signup failed email already exists"
        )
        //error.response?.data?.error || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const goToLoginD = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/loginD");
  };

  return (
    <>
      <ToastContainer />
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
    </>
  );
}

//Form for Fundraiser Login
export function LoginF() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Form Data:", formData);
      const response = await axios.post(
        "http://localhost:5000/auth/loginDonee",
        formData
      );

      // Store token and user data
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userData", JSON.stringify(response.data.user));

      console.log("loginDonee fetched");

      // Redirect based on user role
      switch (response.data.user.role) {
        case "donee":
          navigate("/users/donee");
          location.reload(); // Reload to update user state
          break;
        case "auth_manager":
          navigate("/manager/dashboard");
          break;
        case "regional_manager":
          navigate("/regional/dashboard");
          break;
        case "system_admin":
          navigate("/admin/dashboard");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials!");
      console.error("Login error:", err);
      console.error("Error details:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const goToSignupF = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate("/loginF/signupF");
  };

  return (
    <>
      <ToastContainer />
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

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                type="tel"
                name="phone"
                placeholder="Phone no"
                pattern="[0-9]{10}"
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <button type="button" className="password-toggle">
                👁️
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="signup-link">
          Don't have an account?{" "}
          <button onClick={goToSignupF} className="link-button">
            Sign up
          </button>
        </div>
      </div>
    </>
  );
}

//Form for Fundraiser Sign Up
export function SignUpF() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: "individual",
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    proofDocument: null,
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleToggleType = (type) => {
    setFormData((prev) => ({
      ...prev,
      type,
    }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Hash the password before sending to server
      /*const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(formData.password, salt);*/
      const hashedPassword = formData.password; // Use plain password for now

      const data = new FormData();
      data.append("type", formData.type);
      data.append("name", formData.name);
      data.append("phone", formData.phone);
      data.append("password", hashedPassword);
      if (formData.proofDocument) {
        data.append("proofDocument", formData.proofDocument);
      }

      const response = await axios.post(
        "http://localhost:5000/donees/signupDonee",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            setUploadProgress(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Sign up successful!");
        setTimeout(() => {
          navigate("/loginF");
        }, 3000);
      } else {
        toast.error(response.data.message || "Signup failed!");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const goToLoginF = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/loginF");
  };

  return (
    <>
      <ToastContainer />
      <div className="signup-container">
        <div className="welcome-text">
          <h1>Join with us</h1>
          <p>Connecting Hearts, Changing Lives</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="toggle-buttons">
            <button
              type="button"
              className={`toggle-btn${
                formData.type === "individual" ? " active" : ""
              }`}
              onClick={() => handleToggleType("individual")}
            >
              Individual
            </button>
            <button
              type="button"
              className={`toggle-btn${
                formData.type === "representative" ? " active" : ""
              }`}
              onClick={() => handleToggleType("representative")}
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
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                type="tel"
                name="phone"
                placeholder="Phone no"
                pattern="[0-9]{10}"
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                name="password"
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
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="upload-section">
            {/* File input and upload button */}
            <div
              className="upload-group"
              onClick={() => document.getElementById("proofDocument").click()}
              style={{ cursor: "pointer" }}
            >
              <input
                type="file"
                id="proofDocument"
                name="proofDocument"
                accept=".pdf,.doc,.docx,.jpg,.png"
                style={{ display: "none" }}
                onChange={handleChange}
              />
              <div className="upload-content">
                <span className="upload-text">
                  {formData.proofDocument
                    ? "📄 " + formData.proofDocument.name
                    : "📄 Proof Document"}
                </span>
                <span className="upload-btn">Upload</span>
              </div>
            </div>
            
            {formData.proofDocument &&
              formData.proofDocument.type.startsWith("image/") && (
                <div className="image-preview">
                  <img
                    src={URL.createObjectURL(formData.proofDocument)}
                    alt="Document preview"
                    className="preview-image"
                  />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, proofDocument: null }))
                    }
                  >
                    ×
                  </button>
                </div>
              )}

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="progress-indicator">
                <div
                  className="progress-bar"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
                <span className="progress-text">{uploadProgress}%</span>
              </div>
            )}
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

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
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
