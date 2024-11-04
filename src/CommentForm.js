import React, { useState } from "react";
import axios from "axios";
import "./CommentForm.css"; // Import the CSS file for custom styles

const CommentForm = ({ ticketId, token, onCommentSuccess }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/tickets/${ticketId}/comment/`,
        { comment },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setComment("");
      setSuccessMessage("Comment submitted successfully!");
      onCommentSuccess(response.data);
    } catch (err) {
      setError("Failed to submit comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comment-form-container"> {/* Add this wrapper */}
      <form onSubmit={handleSubmit} className="comment-form">
        <h4>Add a Comment</h4>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment..."
          required
          className="comment-input"
        />
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit Comment"}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;