import React, { useState } from "react";
import './PublicLogin.css';
import { login } from '../apis/user';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

function PublicLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const publiclog = async(e) => {
    e.preventDefault();
    try{
      const response = await login(email, password);
      if(response.status === 200){
        toast.success('Login successful');
        navigate('/dashboard');
      } else {
        toast.error('Invalid credentials');
      }
    }catch(e){
      console.log(e);
      toast.error('An error occurred while logging in');
    }
  }

  return (
    <>
      <div className="login-container">
        <form onSubmit={(e)=>publiclog(e)} className="login-form">
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
