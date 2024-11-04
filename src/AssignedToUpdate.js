import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "./AssignedToUpdate.css";

const AssignedToUpdate = ({ ticket, token, assigned_to, setAssigned_To, updateAssigned_To }) => {
  const [assignLoading, setAssignLoading] = useState(false);
  const [assignUpdateError, setAssignUpdateError] = useState(null);

  // Options array with labels (for display) and values (for backend)
  const assignedToOptions = [
    { label: "Select a Team", value: "no_selection" },
    { label: "Commercial", value: "commercial" },
    { label: "Technical Support", value: "technical_support" },
    { label: "Legal Support", value: "legal_support" },
    { label: "2nd Line Support", value: "second_line_support" },
  ];

  // Handle "Assigned To" Change
  const handleAssignToChange = async (newAssignedTo) => {
    if (newAssignedTo === "no_selection") {
      Swal.fire({
        title: "Invalid Selection",
        text: "Please select a valid team.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    setAssignLoading(true);
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/tickets/${ticket.id}/assigned_to/`,
        { assigned_to: newAssignedTo },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setAssigned_To(newAssignedTo);  // Update the local assigned_to state
        updateAssigned_To(ticket.id, newAssignedTo);  // Update the parent state

        Swal.fire({
          title: "Assigned To Updated!",
          text: `The ticket has been assigned to "${assignedToOptions.find(opt => opt.value === newAssignedTo).label}".`,
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      console.error("Assignment update error:", err);
      setAssignUpdateError("Failed to update assignment. Please try again.");
      Swal.fire({
        title: "Error",
        text: "Failed to update assignment. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setAssignLoading(false);
    }
  };

  return (
    <div className="assigned-to-update">
      <label htmlFor="assigned_to">Assigned To:</label>
      <select
        id="assigned_to"
        value={assigned_to}
        onChange={(e) => handleAssignToChange(e.target.value)}
        disabled={assignLoading}
        className="form-input"
      >
        {assignedToOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {assignLoading && <p>Updating assignment...</p>}
      {assignUpdateError && <p style={{ color: "red" }}>{assignUpdateError}</p>}
    </div>
  );
};

export default AssignedToUpdate;