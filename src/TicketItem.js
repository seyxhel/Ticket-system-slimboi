import React from "react";
import './TicketItem.css';

// Map backend status values to human-readable labels
const statusOptions = {
  open: "Open",
  in_progress: "In Progress",
  closed: "Closed",
  pending: "Pending",
};

// Map backend assigned_to values to human-readable labels
const assignedToOptions = {
  commercial: "Commercial",
  technical_support: "Technical Support",
  legal_support: "Legal Support",
  second_line_support: "2nd Line Support",
};

const TicketItem = ({ ticket, onSelect, onDelete }) => {
  // Get human-readable status and assigned_to text
  const humanReadableStatus = statusOptions[ticket.status] || ticket.status;
  const humanReadableAssignedTo = assignedToOptions[ticket.assigned_to] || ticket.assigned_to;

  return (
    <div className="ticket-item-container" onClick={() => onSelect(ticket)}>
      <div className="ticket-details">
        <h3 className="ticket-title">{ticket.title}</h3>
        <p className="ticket-description">{ticket.description}</p>
        <div className="ticket-meta">
          <p>Status: {humanReadableStatus}</p>
          <p>Assigned to: {humanReadableAssignedTo}</p>
          <p>Created by: {ticket.created_by}</p>
          <p>Created at: {new Date(ticket.created_at).toLocaleString()}</p>
        </div>
      </div>
      <div className="ticket-actions">
        <button className="button-primary" onClick={() => onSelect(ticket.id)}>View</button>
        <button className="button-delete" onClick={() => onDelete(ticket.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TicketItem;

