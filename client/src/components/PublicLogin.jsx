import React, { useState } from "react";
import './PublicLogin.css'; // Import the CSS file

function PublicLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div className="login-container">
        <form className="login-form">
          <h2 className="form-title">Login</h2>

          <label className="form-label">
            Email:
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              className="form-input"
            />
          </label>

          <label className="form-label">
            Password:
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              className="form-input"
            />
          </label>

          <button type="submit" className="form-button">Login</button>

          <p className="form-footer">
            Don't have an account? <a href="/register" className="form-link">Register</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default PublicLogin;
