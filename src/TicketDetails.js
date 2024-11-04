import React, { useState } from "react";
import StatusUpdate from "./StatusUpdate";
import AssignedToUpdate from "./AssignedToUpdate";

const TicketDetails = ({ ticket, token, updateTicketStatus, updateAssigned_To }) => {
  const [status, setStatus] = useState(ticket.status);
  const [assigned_to, setAssigned_To] = useState(ticket.assigned_to);

  return (
    <div className="ticket-details">
      <h3 className="ticket-title">{ticket.title}</h3>
      <p className="ticket-description">{ticket.description}</p>
      <div className="ticket-meta">
        <p><strong>Created by:</strong> {ticket.created_by}</p>

        {/* Status Update Section */}
        <StatusUpdate
          ticket={ticket}
          token={token}
          status={status}
          setStatus={setStatus}
          updateTicketStatus={updateTicketStatus}
        />

        {/* Assigned To Section */}
        <AssignedToUpdate
          ticket={ticket}
          token={token}
          assigned_to={assigned_to}
          setAssigned_To={setAssigned_To}
          updateAssigned_To={updateAssigned_To}
        />
      </div>
    </div>
  );
};

export default TicketDetails;