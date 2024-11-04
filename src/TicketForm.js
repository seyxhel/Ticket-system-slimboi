import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert
import "./TicketForm.css"; // Import custom CSS for styling

const TicketForm = ({ token, ticket, onSuccess }) => {
  const [title, setTitle] = useState(ticket ? ticket.title : "");
  const [description, setDescription] = useState(ticket ? ticket.description : "");
  const [status, setStatus] = useState(ticket ? ticket.status : "no_selection");
  const [assigned_to, setAssigned_To] = useState(ticket ? ticket.assigned_to : "no_selection");
  const [loading, setLoading] = useState(false); // Add loading state

  const isEditing = Boolean(ticket);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading indicator

    const ticketData = { title, description, status, assigned_to };
    const url = isEditing
      ? `http://127.0.0.1:8000/api/tickets/${ticket.id}/`
      : "http://127.0.0.1:8000/api/tickets/";

    const method = isEditing ? "put" : "post";

    try {
      const response = await axios({
        method,
        url,
        headers: {
          Authorization: `Token ${token}`,
        },
        data: ticketData,
      });

      // Show success message with SweetAlert
      Swal.fire({
        icon: 'success',
        title: isEditing ? 'Ticket Updated!' : 'Ticket Created!',
        text: 'Your ticket has been saved successfully.',
      });

      onSuccess(response.data);

      // Clear form if creating a new ticket
      if (!isEditing) {
        resetForm();
      }
    } catch (error) {
      // Show error message with SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to save the ticket. Please try again.',
      });
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("no_selection");
    setAssigned_To("no_selection");
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      <h2>{isEditing ? "Edit Ticket" : "Create New Ticket"}</h2>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="form-input"
          rows="5"
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="form-input"
          required
        >
          <option value="no_selection">Select a Status</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="assigned_to">Assigned To:</label>
        <select
          id="assigned_to"
          value={assigned_to}
          onChange={(e) => setAssigned_To(e.target.value)}
          className="form-input"
          required
        >
          <option value="no_selection">Select a Team</option>
          <option value="commercial">Commercial</option>
          <option value="technical_support">Technical Support</option>
          <option value="legal_support">Legal Support</option>
          <option value="second_line_support">2nd Line Support</option>
        </select>
      </div>
      <button type="submit" className="submit-button-primary" disabled={loading}>
        {loading ? "Saving..." : isEditing ? "Update Ticket" : "Create Ticket"}
      </button>
    </form>
  );
};

export default TicketForm;