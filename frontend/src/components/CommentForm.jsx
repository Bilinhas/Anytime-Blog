import React, { useState } from "react";

function CommentForm({ onSubmit }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-3 bg-dark text-light">
      <div className="mb-2">
        <textarea
          className="form-control bg-secondary text-light border-0"
          placeholder="Write your comment..."
          rows="3"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button className="btn btn-danger">Send</button>
    </form>
  );
}

export default CommentForm;
