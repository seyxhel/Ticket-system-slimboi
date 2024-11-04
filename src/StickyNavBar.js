import React from "react";
import "./StickyNavBar.css"; // CSS for the navbar

const StickyNavBar = ({ user, onLogout, showCreateButton, showBackButton, onCreateTicket, onBackToTickets }) => {
  return (
    <div className="sticky-nav">
      <div className="nav-buttons">
        {/* Conditionally render buttons */}
        {showCreateButton && (
          <button className="nav-btn button-primary" onClick={onCreateTicket}>
            Create Ticket
          </button>
        )}
        {showBackButton && (
          <button className="nav-btn button-primary" onClick={onBackToTickets}>
            Back to Tickets
          </button>
        )}
      </div>

      <div className="user-info">
        {user ? (
          <>
            <p>
              Logged in as <strong>{user.username}</strong> | {user.email}
            </p>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default StickyNavBar;