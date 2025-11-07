import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import CommentForm from "../components/CommentForm";

function SinglePost() {
  const { id } = useParams();
  const { user, isLoggedIn } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const postRes = await api.get(`/posts/${id}`);
      const comRes = await api.get(`/comments/${id}`);
      setPost(postRes.data);
      setComments(comRes.data);
    };
    fetchData();
  }, [id]);

  const handleComment = async (text) => {
    if (!isLoggedIn) return alert("Log in or register to comment.");

    const res = await api.post(
      "/comments",
      { postId: id, texto: text },
      { headers: { "X-User-ID": user.userId } }
    );

    setComments([res.data, ...comments]);
    setShowCommentBox(false);
  };

  if (!post)
    return <div className="text-center mt-5 text-light">Loading...</div>;

  return (
    <div className="container mt-4 py-5 text-light">
      <div className="card bg-dark text-light p-4 mb-4 shadow-sm">
        <p className="text-light" style={{ fontSize: "0.9em" }}>
          By {post.username}
        </p>
        <h2>{post.titulo}</h2>
        <p style={{ fontSize: "1.5em" }}>{post.texto}</p>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Comments</h4>

        {isLoggedIn && (
          <button
            className={`btn btn-${
              showCommentBox ? "secondary" : "danger"
            } btn-sm`}
            onClick={() => setShowCommentBox(!showCommentBox)}
          >
            {showCommentBox ? "Close" : "Comment"}
          </button>
        )}
      </div>

      {isLoggedIn ? (
        showCommentBox && <CommentForm onSubmit={handleComment} />
      ) : (
        <div className="alert alert-info">
          <Link to="/login">Log in</Link> or register to comment.
        </div>
      )}

      {comments.length > 0 ? (
        comments.map((c) => (
          <div
            key={c.id}
            className="card bg-secondary text-light mb-2 p-2 border-0"
          >
            <b>{c.username}</b>
            <p>{c.texto}</p>
          </div>
        ))
      ) : (
        <p className="text-light">No comments yet.</p>
      )}
    </div>
  );
}

export default SinglePost;
