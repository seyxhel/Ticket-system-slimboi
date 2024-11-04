import React from "react";
import Swal from "sweetalert2";
import axios from "axios";

const CommentsList = ({ comments, setComments, token }) => {
  // Handle updating a comment using SweetAlert2
  const handleUpdateComment = (commentId, currentText) => {
    Swal.fire({
      title: 'Edit Comment',
      input: 'textarea',
      inputLabel: 'Update your comment',
      inputValue: currentText,
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!';
        }
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(
            `http://127.0.0.1:8000/api/comments/${commentId}/`,
            { comment: result.value },
            { headers: { Authorization: `Token ${token}` } }
          );
          setComments(comments.map(comment => comment.id === commentId ? response.data : comment));
          Swal.fire("Success", "Comment updated successfully!", "success");
        } catch (error) {
          Swal.fire("Error", "Failed to update comment.", "error");
        }
      }
    });
  };

  // Handle deleting a comment using SweetAlert2
  const handleDeleteComment = (commentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/comments/${commentId}/`, {
            headers: { Authorization: `Token ${token}` }
          });
          setComments(comments.filter(comment => comment.id !== commentId));
          Swal.fire("Deleted!", "Comment has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error", "Failed to delete comment.", "error");
        }
      }
    });
  };

  return (
    <div className="comments-list">
      {comments.map((comment) => (
        <div key={comment.id} className="comment-item">
          <p className="comment-text">{comment.comment}</p>
          <small className="comment-meta">By: <strong>{comment.created_by}</strong> on {new Date(comment.created_at).toLocaleString()}</small>
          <div className="comment-actions">
            <button className="button edit-button" onClick={() => handleUpdateComment(comment.id, comment.comment)}>
              Edit
            </button>
            <button className="button delete-button" onClick={() => handleDeleteComment(comment.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;