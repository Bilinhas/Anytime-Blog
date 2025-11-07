import React, { useState, useEffect } from "react";
import api from "../services/api";
import PostCard from "../components/PostCard";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPosts = async (currentPage) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/posts?page=${currentPage}&limit=3`);
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError("Error while loading the post list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  if (loading)
    return <div className="text-center mt-5 text-light">Loading...</div>;

  if (error)
    return <div className="alert alert-danger text-center mt-5">{error}</div>;

  return (
    <div className="container mt-4 text-light vh-100 py-5">
      <h2 className="mb-4 text-light text-center">All Posts</h2>

      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            titulo={post.titulo}
            resumo={post.resumo}
            username={post.username}
          />
        ))
      ) : (
        <p className="text-center text-light mt-5">No posts found.</p>
      )}

      <div className="d-flex justify-content-center align-items-center mt-5">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1 || posts.length === 0}
          className="btn btn-danger mx-2"
        >
          Previous
        </button>

        <span className="text-light mx-2">
          Page {posts.length === 0 ? 1 : page} of{" "}
          {posts.length === 0 ? 1 : totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages || posts.length === 0}
          className="btn btn-danger mx-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AllPosts;
