import React, { useState } from "react";
import './Register.css'; // Import the CSS file

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="register-container">
        <h2 className="form-title">Register</h2>
        <form className="register-form">
          <label className="form-label">
            Name:
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              name="name"
              className="form-input"
            />
          </label>

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

          <button type="submit" className="form-button">Register</button>

          <p className="form-footer">
            Already have an account? <a href="/" className="form-link">Login</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
