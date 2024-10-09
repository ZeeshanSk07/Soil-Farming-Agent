import React, { useState } from 'react';
import './AdminLogin.css'; // Import the CSS file

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div className="admin-login-container">
        <form className="admin-login-form">
          <h2 className="form-title">Login</h2>

          <label className="form-label">
            Username:
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              name="name"
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
        </form>
      </div>
    </>
  );
}

export default AdminLogin;
