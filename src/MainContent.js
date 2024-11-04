import React from "react";
import UserProfile from "./UserProfile";
import TicketManager from "./TicketManager";

const MainContent = ({ user, token, onLogout }) => (
  <>
    <UserProfile user={user} onLogout={onLogout} />
    <TicketManager token={token} />
  </>
);

export default MainContent;