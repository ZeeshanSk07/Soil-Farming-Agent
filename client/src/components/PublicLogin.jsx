import React, { useState } from "react";

function PublicLogin() {

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
 return (
    <>
      <div>
        <form>
          <label>
            Email:
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" />
          </label>
          <label>
            Password:
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" />
          </label>
          <button>Login</button>
          <p>
            Don't have an account? <a href="/register">Register </a>
          </p>
        </form>
      </div>
    </>
  );
}

export default PublicLogin;
