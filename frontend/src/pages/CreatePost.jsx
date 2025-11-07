import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function CreatePost() {
  const { user, isLoggedIn } = useAuth();
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <div className="container text-center mt-5 py-5 vh-100">
        <div className="alert alert-warning">
          You need to{" "}
          <a href="/login" className="alert-link">
            log in
          </a>{" "}
          to create posts.
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        "/posts",
        { titulo, texto },
        { headers: { "X-User-ID": user.userId } }
      );
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Error while creating post");
    }
  };

  return (
    <div className="container mt-4 py-5">
      <h2>Add New Post</h2>
      <form className="card p-4 mt-3 bg-dark" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            rows="6"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            required
          ></textarea>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-danger">Publish</button>
      </form>
    </div>
  );
}

export default CreatePost;
