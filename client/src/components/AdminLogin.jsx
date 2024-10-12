import React, { useState } from 'react';
import './AdminLogin.css'; 
import { adminlogin } from '../apis/user';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  
  const adminlogins = async(e) => {
    e.preventDefault();
    const newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0){
      try{
        const response = await adminlogin(username, password);
        console.log(response);
        if (response.status === 200) {
          console.log("Admin login successful.");
          toast.success('Admin login successful');
          localStorage.setItem('userid', response.data.id);
          navigate('/admin');
        } else {
          setErrors({...errors, message: 'Invalid credentials' });
        }
      }catch(err){
        console.log(err);
        setErrors({...errors, message: 'An error occurred while logging in.' });
      }
    }
  }

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
          <span className="error">{errors.username}</span>

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
          <span className="error">{errors.password}</span>

          <button onClick={adminlogins} className="form-button">Login</button>
          {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}
        </form>
      </div>
    </>
  );
}

export default AdminLogin;
