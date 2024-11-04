import React, { useState } from "react";
import LoginForm from "./LoginForm";
import TicketManager from "./TicketManager"; // Import TicketManager that includes TicketList, TicketForm, etc.
import StickyNavBar from "./StickyNavBar";
import "./App.css"; // Custom CSS for styling

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null); // Track selected ticket
  const [isCreating, setIsCreating] = useState(false); // Track ticket creation mode

  const handleLogout = () => {
    setToken("");
    setUser(null);
  };

  const handleCreateTicketClick = () => {
    setIsCreating(true);
    setSelectedTicket(null); // Deselect any ticket when creating
  };

  const handleBackToTicketsClick = () => {
    setSelectedTicket(null);
    setIsCreating(false); // Exit creation mode
  };

  return (
    <div className="App">
      {token && (
        <StickyNavBar
          user={user}
          onLogout={handleLogout}
          showCreateButton={!selectedTicket && !isCreating}
          showBackButton={selectedTicket || isCreating}
          onCreateTicket={handleCreateTicketClick}
          onBackToTickets={handleBackToTicketsClick}
        />
      )}

      <div className="main-content">
        {!token ? (
          <LoginForm setToken={setToken} setUser={setUser} setError={setError} error={error} />
        ) : (
          <TicketManager
            token={token}
            user={user}
            selectedTicket={selectedTicket}
            setSelectedTicket={setSelectedTicket}
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            onCreateTicket={handleCreateTicketClick}
            onBackToTickets={handleBackToTicketsClick}
          />
        )}
      </div>
    </div>
  );
}

export default App;