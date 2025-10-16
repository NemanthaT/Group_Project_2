import "./Reg.css";
import { SignUpD, LoginD, SignUpF, LoginF } from "../../components/RegLog";
import { Routes, Route, useLocation } from "react-router-dom";

function CheckRoutes() {
  const location = useLocation();
  
  if(location.pathname.includes("/loginD")) {
    return (
        <Routes>
          <Route path="" element={<LoginD />} />
          <Route path="signupD" element={<SignUpD />} />
        </Routes>
    );
  }
  else{
    return (
        <Routes>
          <Route path="" element={<LoginF />} />
          <Route path="signupF" element={<SignUpF />} />
        </Routes>
    );
  }
}

function Reg() {
  const location = useLocation();
  const isFundraiserSignup = location.pathname.includes("signupF");

  return (
    <section className={`hero ${isFundraiserSignup ? "fundraiser-signup" : ""}`}>
      <div className="bg-container">
        <img
          className="bg"
          src="http://localhost:5173/src/assets/images/homeBg.jpeg"
          alt="Hero Background"
        />
      </div>
      <div className="reg-container">
        <CheckRoutes/>
      </div>
    </section>
  );
}

export default Reg;