import "./App.css";
import "@/components/loading.module.css";
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AppRoutes = lazy(() => import("@/components/AppRoutes"));


function App() {
  const user = JSON.parse(localStorage.getItem("userData"));
  console.log(user);
  return (
    <Router>
      {(user == null || user.role !== "auth_manager") && <Header user={user} />}
      <main>
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <AppRoutes user={user} />
        </Suspense>
      </main>
      {(user == null || user.role !== "auth_manager") && <Footer />}
    </Router>
  );
}

export default App;
