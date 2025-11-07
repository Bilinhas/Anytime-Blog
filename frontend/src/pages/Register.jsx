import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { username, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Error on register.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div
        className="card p-5 bg-dark text-light shadow"
        style={{ width: "450px", height: "300px" }}
      >
        <h3 className="text-center mb-3">Register</h3>
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
          <button className="btn btn-danger w-100">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
