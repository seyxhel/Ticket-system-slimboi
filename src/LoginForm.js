import React, { useState } from "react";
import axios from "axios";
import './LoginForm.css'; // Import the CSS file for styling

const LoginForm = ({ setToken, setUser, setError, error }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    axios
      .post("http://127.0.0.1:8000/api/login/", { username, password })
      .then((response) => {
        setToken(response.data.token);
        setUser(response.data.user);
        setError("");
      })
      .catch(() => {
        setError("Invalid credentials");
      })
      .finally(() => {
        setLoading(false); // Reset loading state
      });
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2 className="login-title">Login</h2>
      {error && <p className="login-error">{error}</p>}
      <div className="form-group">
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="login-input"
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
      </div>
      <button type="submit" disabled={loading} className="login-button">
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;