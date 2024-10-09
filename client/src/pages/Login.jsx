import React, { useState } from 'react';
import PublicLogin from '../components/PublicLogin';
import AdminLogin from '../components/AdminLogin';
import './Login.css'; // Import the CSS file

function Login() {
  const [active, setActive] = useState("public");

  return (
    <>
      <div className="login-toggle-container">
        <div className="login-toggle">
          <h2
            className={`toggle-btn ${active === "public" ? "active" : ""}`}
            onClick={() => setActive("public")}
          >
            Public Login
          </h2>
          <h2
            className={`toggle-btn ${active === "admin" ? "active" : ""}`}
            onClick={() => setActive("admin")}
          >
            Admin Login
          </h2>
        </div>
        <div className="login-form-container">
          {active === "public" ? <PublicLogin /> : <AdminLogin />}
        </div>
      </div>
    </>
  );
}

export default Login;
