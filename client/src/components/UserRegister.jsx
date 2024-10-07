import React, { useState } from 'react'

function UserRegister() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      <div>
        
        <h2>Register</h2>
          
        <form>
          <label>
            Name:
            <input onChange={(e)=>setName(e.target.value)} value={name} type="text" name="name" />
          </label>
          <label>
            Email:
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" />
          </label>
          <label>
            Password:
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" />
          </label>
          <button>Login</button>
          <p>Already have an account? <a href="/login">Login</a></p>
        </form>
      </div>
    </>
  )
}

export default UserRegister