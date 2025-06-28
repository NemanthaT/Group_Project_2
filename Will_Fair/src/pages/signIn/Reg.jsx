import "./Reg.css";
import { SignUpD, LoginD } from "../../components/RegLog";
import { Routes, Route } from "react-router-dom";

function Reg() {
  return (
    <section className="hero">
      <div className="bg-container">
        <img
          className="bg"
          src="src/assets/images/homeBg.jpeg"
          alt="Hero Background"
        />
      </div>
      <div className="reg-container">
        <Routes>
          <Route path="" element={<LoginD />} />
          <Route path="signupD" element={<SignUpD />} />
        </Routes>
      </div>
    </section>
  );
}

export default Reg;
