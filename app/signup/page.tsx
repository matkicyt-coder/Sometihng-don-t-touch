import React from 'react';

const Signup = () => {
  return (
    <div className="container">
      <div className="form-container">
        <h1>Create an Account</h1>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;