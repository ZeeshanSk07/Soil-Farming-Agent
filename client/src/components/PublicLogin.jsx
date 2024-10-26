import React, { useState } from "react";
import './PublicLogin.css';
import { login } from '../apis/user';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import {TailSpin } from 'react-loader-spinner'

function PublicLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

  const publiclog = async(e) => {
    e.preventDefault();
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0){
    try{
      setLoading(true);
      const response = await login(email, password);
      setLoading(false);
      if(response.status === 200){
        toast.success('Login successful');
        localStorage.setItem('userid', response.data.id);
        navigate('/dashboard');
      } else {
        toast.error('Invalid credentials');
      }
    }catch(er){
      console.log(er);
      setLoading(false);
      toast.error(er.message || 'error');
    }
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
              placeholder="Email address"
            />
          </label>
          <span className="error">{errors.email}</span>

          <label className="form-label">
            Password:
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              className="form-input"
              placeholder="Password"
            />
          </label>
          <span className="error">{errors.password}</span>

          <button type="submit" className="form-button">{loading ? (
            <TailSpin
              visible={true}
              height="18"
              width="18"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <>Login</>
          )}</button>

          <p className="form-footer">
            Don't have an account? <a href="/register" className="form-link">Register</a>
          </p>
          {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}

        </form>
      </div>
    </>
  );
}

export default PublicLogin;
