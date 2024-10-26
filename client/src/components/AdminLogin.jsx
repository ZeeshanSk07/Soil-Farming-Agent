import React, { useState } from 'react';
import './AdminLogin.css'; 
import { adminlogin } from '../apis/user';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {TailSpin} from 'react-loader-spinner'

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  
  const adminlogins = async(e) => {
    e.preventDefault();
    const newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0){
      try{
        setLoading(true);
        const response = await adminlogin(username, password);
        setLoading(false);
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
        setLoading(false);
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
              placeholder='Username'
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
              placeholder='Password'
            />
          </label>
          <span className="error">{errors.password}</span>

          <button onClick={adminlogins} className="form-button">{loading ? (
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
          {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}
        </form>
      </div>
    </>
  );
}

export default AdminLogin;
