import React from "react";
import TicketItem from "./TicketItem";

const TicketList = ({ tickets, token, onSelect, onDelete }) => (
  <div className="ticket-list">
    {tickets.length > 0 ? (
      tickets.map((ticket) => (
        <TicketItem
          key={ticket.id}
          ticket={ticket}
          token={token}
          onSelect={onSelect}
          onDelete={onDelete} // Pass the delete handler
        />
      ))
    ) : (
      <p>No tickets available.</p>
    )}
  </div>
);

export default TicketList;