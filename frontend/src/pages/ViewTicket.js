import React, { useContext, useState, useEffect } from "react";
import ProjectContext from "../context/ProjectContext.js";
import AuthContext from "../context/AuthContext.js";
import Header from "../components/Header.js";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap/";

function ViewTicket() {
  let { user, getUser, devUser } = useContext(AuthContext);

  let { ticket, claimTicket } = useContext(ProjectContext);
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Header />
      <div>
        <h1>Ticket {ticket.TicketId}</h1>
        <h2>{user.user_id}</h2>
        <div>Ticket ID: {ticket.TicketId}</div>
        <div>Ticket Description: {ticket.TicketDescription}</div>
        <div>Observed Behavior: {ticket.TicketObserved}</div>
        <div>Expected Behavior: {ticket.TicketExpected}</div>
        <div>Ticket Status: {ticket.TicketStatus}</div>
        <div>Ticket Priority: {ticket.TicketPriority}</div>
        <div>Ticket Points: {ticket.TicketPoints}</div>
        <div>Time Opened: {ticket.TicketDateOpened}</div>
        <div>Time Closed: {ticket.TicketDateClosed}</div>
        <div>Assigned to: {ticket.TicketTicketAssignedTo}</div>
        <div>Submitted By: {ticket.TicketSubmittedBy}</div>
        <Button
          variant="info"
          onClick={() => claimTicket(ticket.TicketId, user.user_id)}
          disabled={ticket.TicketAssignedTo !== null}
        >
          {ticket.TicketStatus === "OP" && ticket.TicketAssignedTo === null
            ? "Claim Ticket"
            : "Ticket Assigned"}
        </Button>
      </div>
    </div>
  );
}
export default ViewTicket;
