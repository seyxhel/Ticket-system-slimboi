import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

// Mapping backend status values to human-readable labels
const statusOptions = [
  { label: "Open", value: "open" },
  { label: "In Progress", value: "in_progress" },
  { label: "Closed", value: "closed" },
];

const StatusUpdate = ({ ticket, token, status, setStatus, updateTicketStatus }) => {
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusUpdateError, setStatusUpdateError] = useState(null);

  // Handle Status Change
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
        updateTicketStatus(ticket.id, newStatus);

        // Get the human-readable label for the selected status
        const newStatusLabel = statusOptions.find(option => option.value === newStatus).label;

        Swal.fire({
          title: "Status Updated!",
          text: `The ticket status has been updated to "${newStatusLabel}".`,
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
    <div className="status-update">
      <label htmlFor="status-select">Change Status:</label>
      <select
        id="status-select"
        value={status}
        onChange={(e) => handleStatusChange(e.target.value)}
        disabled={statusLoading}
        className="form-input"
      >
        {statusOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {statusLoading && <p>Updating status...</p>}
      {statusUpdateError && <p style={{ color: "red" }}>{statusUpdateError}</p>}
    </div>
  );
};

export default StatusUpdate;