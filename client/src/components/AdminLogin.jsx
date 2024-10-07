import React, { useState } from 'react'

function AdminLogin() {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
  return (
    <>
      <div>
        <form>
          <label>
            Username:
            <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" name="name" />
          </label>
          <label>
            Password:
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" />
          </label>
          <button>Login</button>
        </form>
      </div>
    </>
  )
}

export default AdminLogin