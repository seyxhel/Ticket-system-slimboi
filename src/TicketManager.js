import React, { useEffect, useState } from "react";
import axios from "axios";
import TicketList from "./TicketList";
import TicketForm from "./TicketForm";
import SingleTicketPage from "./SingleTicketPage";
import './TicketManager.css'; // Custom CSS for layout improvements

const TicketManager = ({ token, user, selectedTicket, setSelectedTicket, isCreating, setIsCreating, onCreateTicket, onBackToTickets }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/tickets/", {
          headers: { Authorization: `Token ${token}` },
        });
        setTickets(response.data);
        setError("");
      } catch (err) {
        setError("Failed to load tickets.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [token]);

  const handleStatusUpdate = (ticketId, newStatus) => {
    setTickets(prevTickets =>
      prevTickets.map(ticket => ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket)
    );
  };


  const handleNewAssignedTo = (ticketId, updateAssigned_To) => {
    setTickets(prevTickets =>
      prevTickets.map(ticket => ticket.id === ticketId ? { ...ticket, assigned_to: updateAssigned_To } : ticket)
    );
  };

  const handleDelete = async (ticketId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tickets/${ticketId}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setTickets(prevTickets => prevTickets.filter(ticket => ticket.id !== ticketId));
      setSelectedTicket(null); // Reset selected ticket after delete
      onBackToTickets(); // Return to ticket list after delete
    } catch (err) {
      setError("Failed to delete the ticket.");
    }
  };

  const handleSuccess = (ticket) => {
    setIsCreating(false);
    setSelectedTicket(null);
    setTickets(prevTickets =>
      selectedTicket
        ? prevTickets.map(t => (t.id === ticket.id ? ticket : t))
        : [ticket, ...prevTickets]
    );
  };

  return (
    <div className="ticket-manager-container">
      <h2 className="heading">Ticket Manager</h2>
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p>Loading tickets...</p>
      ) : selectedTicket ? (
        <SingleTicketPage
          ticket={selectedTicket}
          token={token}
          onBack={onBackToTickets}
          onStatusUpdate={handleStatusUpdate}
          onNewAssignedToUpdate={handleNewAssignedTo}
          
        />
      ) : isCreating ? (
        <TicketForm token={token} onSuccess={handleSuccess} />
      ) : (
        <TicketList
          tickets={tickets}
          token={token}
          onSelect={setSelectedTicket}
          onDelete={handleDelete}
        />
        
      )}
      
    </div>
  );
};

export default TicketManager;