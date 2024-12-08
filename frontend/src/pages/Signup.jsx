import React, { useContext } from 'react';
import '../styles/form.css';
import { Context } from '../Context/Context';

const Signup = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    address,
    setAddress,
    phone,
    setPhone,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    signup,
  } = useContext(Context);
  return (
    <form onSubmit={signup}>
      <h2>Sign up</h2>
      <div>
        <label>Name</label> <br />
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email</label> <br />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Address</label> <br />
        <input
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Phone</label> <br />
        <input
          type="phone"
          placeholder="Enter your mobile number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          min={10}
          max={12}
          required
        />
      </div>
      <div>
        <label>Password</label> <br />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          min={6}
          required
        />
      </div>
      <div>
        <label>Confirm Password</label> <br />
        <input
          type="password"
          placeholder="Re-enter password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <p>
        Already have an account? <a href="/">Login</a>
      </p>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
