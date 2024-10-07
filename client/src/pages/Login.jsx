import React from 'react';
import PublicLogin from '../components/PublicLogin';
import AdminLogin from '../components/AdminLogin';

function Login() {
  const [active, setActive] = useState("public");
  return (
    <>
      <div>
        <div>
          <h2 onClick={() => setActive("public")}>Public Login</h2>
          <h2 onClick={() => setActive("admin")}>Admin</h2>
        </div>
        {active === "public" ? <PublicLogin /> : <AdminLogin />}
      </div>
    </>
  );
}

export default Login