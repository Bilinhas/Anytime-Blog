import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import logo from "../images/som.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { username, password });
      login({ userId: res.data.userId, username: res.data.username });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid credentials.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 "
      style={{ backgroundImage: { logo } }}
    >
      <div
        className="card p-5 bg-dark text-light shadow"
        style={{ width: "450px", height: "300px" }}
      >
        <h3 className="text-center mb-3">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <div className="alert alert-danger py-1 d-flex align-items-center justify-content-center">
              {error}
            </div>
          )}
          <button className="btn btn-danger w-100">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
