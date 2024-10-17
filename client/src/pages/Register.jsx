import React, { useState } from "react";
import "./Register.css";
import { register, login } from "../apis/user";
import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const registeruser = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await register(name, email, password);
        console.log(response);
        if (response.status === 201) {
          toast.success("User created successfully!");

          setTimeout(async () => {
            const log = await login(email, password);
            console.log(log);
            if (log.status === 200) {
              console.log("user login successful.", log);
              navigate('/dashboard');
              localStorage.setItem('userid', response.data.id);
            } else {
              console.log("login error", log);
              navigate("/");
            }
          }, 1300);
        } else {
          console.log(
            "Error creating user: " + (response.data.message || "Unknown error")
          );
          toast.error("Error creating user: " + response.data.message);
        }
      } catch (error) {
        console.error("Signup error:", error);
        toast.error("Error creating user: " + error.message);
      }
    }
  };

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
              placeholder="Enter Full Name"
            />
          </label>
          <span className="error">{errors.name}</span>

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

          <button onClick={registeruser} className="form-button">
            Register
          </button>

          <p className="form-footer">
            Already have an account?{" "}
            <a href="/" className="form-link">
              Login
            </a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
