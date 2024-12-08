import React, { useContext } from 'react';
import '../styles/form.css';
import { Context } from '../Context/Context';

const Login = () => {
  const { email, setEmail, password, setPassword, login } = useContext(Context);
  return (
    <form onSubmit={login}>
      <h2>Log in</h2>
      <div>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <p>
        Don't have an account? <a href="/signup">Signup</a>
      </p>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
