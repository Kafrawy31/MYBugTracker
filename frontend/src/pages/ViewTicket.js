import React, { useContext, useState, useEffect } from "react";
import ProjectContext from "../context/ProjectContext.js";
import AuthContext from "../context/AuthContext.js";
import Header from "../components/Header.js";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap/";

function ViewTicket() {
  let { user, getUser, devUser } = useContext(AuthContext);

  let { ticket, claimTicket, closeTicket } = useContext(ProjectContext);

  return (
    <div>
      <Header />
      <div className="TicketInfo">
        <h1>Ticket {ticket.TicketId}</h1>
        <span className="span1">Ticket Description:</span>
        <span className="span2">{ticket.TicketDescription}</span>
        <br />
        <span className="span1">Observed Behavior:</span>
        <span className="span2">{ticket.TicketObserved}</span>
        <br />
        <span className="span1">Expected Behavior:</span>
        <span className="span2">{ticket.TicketExpected}</span>
        <br />
        <span className="span1">Ticket Status:</span>
        <span className="span2">{ticket.TicketStatus}</span>
        <br />
        <span className="span1">Ticket Priority:</span>
        <span className="span2">{ticket.TicketPriority}</span>
        <br />
        <span className="span1">Ticket Points:</span>
        <span className="span2">{ticket.TicketPoints}</span>
        <br />
        <span className="span1">Time Opened:</span>
        <span className="span2">{ticket.TicketDateOpened}</span>
        <br />
        <span className="span1">Time Closed:</span>
        <span className="span2">{ticket.TicketDateClosed}</span>
        <br />
        <span className="span1">Assigned to:</span>
        <span className="span2">{ticket.TicketAssignedTo}</span>
        <br />
        <span className="span1">Submitted By:</span>
        <span className="span2">{ticket.TicketSubmittedBy}</span>

        {ticket.TicketAssignedTo === user.username &&
        ticket.TicketStatus === "PE" ? (
          <Button
            className="TicketButton"
            variant="info"
            onClick={() =>
              closeTicket(
                ticket.TicketId,
                user.user_id,
                ticket.TicketPoints,
                devUser.UserPoints,
                devUser.MonthlyPoints
              )
            }
          >
            Close Ticket
          </Button>
        ) : ticket.TicketStatus === "PE" ? (
          <Button className="TicketButton" disabled>
            Ticket Assigned
          </Button>
        ) : ticket.TicketStatus === "CL" ? (
          <Button className="TicketButton" variant="danger" disabled>
            Ticket Closed
          </Button>
        ) : ticket.TicketStatus === "OP" ? (
          <Button
            className="TicketButton"
            variant="success"
            onClick={() => claimTicket(ticket.TicketId, user.user_id)}
          >
            Claim Ticket
          </Button>
        ) : null}
      </div>
    </div>
  );
}
export default ViewTicket;
