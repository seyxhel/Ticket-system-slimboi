import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";




const TicketDetails = ({ ticket, token, updateTicketStatus }) => {
  const [status, setStatus] = useState(ticket.status);
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusUpdateError, setStatusUpdateError] = useState(null);

 


  const handleStatusChange = async (newStatus) => {
    setStatusLoading(true);
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/tickets/${ticket.id}/status/`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setStatus(newStatus);
        updateTicketStatus(ticket.id, newStatus); // Notify the parent about the status change

        Swal.fire({
          title: "Status Updated!",
          text: `The ticket status has been updated to "${newStatus}".`,
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      setStatusUpdateError("Failed to update status. Please try again.");
      Swal.fire({
        title: "Error",
        text: "Failed to update status. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setStatusLoading(false);
    }
  };

  return (
    <div className="ticket-details">
      <h3 className="ticket-title">{ticket.title}</h3>
      <p className="ticket-description">{ticket.description}</p>
      <div className="ticket-meta">
        <p><strong>Status:</strong> {status}</p>
        <div className="status-update">
          <label htmlFor="status-select">Change Status:</label>
          <select
            id="status-select"
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={statusLoading}
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        {statusLoading && <p>Updating status...</p>}
        {statusUpdateError && <p style={{ color: "red" }}>{statusUpdateError}</p>}

        <p><strong>Created by:</strong> {ticket.created_by}</p>
        <p>Assigned sdssdsdto: {ticket.assigned_to}</p>
        <div className="">
          <label>Change Status:</label>
          <select
            id="status-select"
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={statusLoading}
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;

