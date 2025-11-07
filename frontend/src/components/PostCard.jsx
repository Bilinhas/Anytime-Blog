import React from "react";
import { Link } from "react-router-dom";

function PostCard({ id, titulo, resumo, username }) {
  return (
    <div className="card mb-3 bg-dark text-light shadow-sm border-secondary">
      <div className="card-body">
        <h3 className="card-title text-light">
          <h2 className="text-decoration-none text-light">{titulo}</h2>
        </h3>
        <p className="card-text">{resumo}...</p>
        <p className="text-light" style={{ fontSize: "0.9em" }}>
          By: {username}
        </p>
        <Link
          to={`/posts/${id}`}
          className="btn btn-outline-danger btn-sm mt-2"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
