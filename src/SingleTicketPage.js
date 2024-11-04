import React, { useState, useEffect } from "react";
import axios from "axios";
import TicketDetails from "./TicketDetails";
import CommentsList from "./CommentsList";
import CommentForm from "./CommentForm";
import './SingleTicketPage.css';


const SingleTicketPage = ({ ticket, token, onBack, onStatusUpdate, onNewAssignedToUpdate }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedTicket, setUpdatedTicket] = useState(ticket);  // Manage updatedTicket state

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/tickets/${ticket.id}/`, {
          headers: { Authorization: `Token ${token}` }
        });
        setComments(response.data.comments || []);
        setUpdatedTicket(response.data); // Update the ticket with new data from the API
        setLoading(false);
      } catch (err) {
        setError("Failed to load comments. Please try again.");
        setLoading(false);
      }
    };

    fetchTicketDetails();
  }, [ticket.id, token]);




  // Handle adding a new comment
  const handleCommentSuccess = (newComment) => {
    setComments([...comments, newComment]);
  };

  if (loading) {
    return <p className="loading-message">Loading ticket details...</p>;
  }

  return (
    <div className="single-ticket-container">


      {/* Ticket Details */}
      <TicketDetails
        ticket={updatedTicket}  // Use updatedTicket instead of ticket to reflect changes
        token={token}
        updateTicketStatus={onStatusUpdate}  // Pass the status update handler from the parent
        updateAssigned_To={onNewAssignedToUpdate}  // Pass the new "Assigned To" handler
      />

      {/* Comments Section */}
      <div className="comments-section">
        <h4>Comments</h4>
        {error && <p className="error-message">{error}</p>}
        {comments.length > 0 ? (
          <CommentsList comments={comments} setComments={setComments} token={token} />
        ) : (
          <p className="no-comments">No comments yet.</p>
        )}
      </div>

      {/* Comment Form */}
      <CommentForm ticketId={ticket.id} token={token} onCommentSuccess={handleCommentSuccess} />
    </div>
  );
};

export default SingleTicketPage;