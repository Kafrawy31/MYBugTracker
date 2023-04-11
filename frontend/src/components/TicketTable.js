import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext.js";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap/";
import moment from "moment";
import ProjectContext from "../context/ProjectContext.js";
export default function TicketTable({
  tickets,
  search = "",
  ticketTerenary = true,
  userRole,
  user = {},
  Loading,
}) {
  let { handleFetchTicket, pagePrev, pageNext, next, prev, claimTicket } =
    useContext(ProjectContext);

  if (tickets.length === 0) {
    return <div>No tickets to display</div>;
  }

  return (
    <div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Ticket Description</th>
            <th>Ticket Status</th>
            <th>Ticket Priority</th>
            <th>Ticket Points</th>
            <th>Ticket Project</th>
            <th>Assigned To</th>
            <th>Submitted by</th>
            <th>Code Location</th>
            <th>Date Opened</th>
          </tr>
        </thead>
        <tbody>
          {tickets
            .filter((ticket) => {
              return search === ""
                ? ticket
                : ticket.TicketDescription?.toLowerCase().includes(search) ||
                    ticket.TicketStatus?.toLowerCase().includes(search) ||
                    ticket.TicketPriority?.toLowerCase().includes(search) ||
                    ticket.TicketSubmittedBy?.toLowerCase().includes(search) ||
                    ticket.TicketAssignedTo?.includes(search) ||
                    ticket.TicketProject?.toLowerCase().includes(search);
            })
            .map((ticket) => {
              return ticketTerenary ? (
                <tr key={ticket.TicketId} className="tickeTable">
                  <td>{ticket.TicketId}</td>
                  <td>{ticket.TicketDescription}</td>
                  <td>{ticket.TicketStatus}</td>
                  <td>{ticket.TicketPriority}</td>
                  <td>{ticket.TicketPoints}</td>
                  <td>
                    <a href="#"></a>
                    {ticket.TicketProject}
                  </td>
                  <td>{ticket.TicketAssignedTo}</td>
                  <td>{ticket.TicketSubmittedBy}</td>
                  <td>{ticket.TicketCodeLocation}</td>
                  <td>
                    {moment(ticket.TicketDateOpened).format(
                      "YYYY-MM-DD h:mm:ss a"
                    )}
                  </td>
                  {userRole === "Senior" || userRole === "Admin" ? (
                    <td>
                      <Link
                        onClick={() => handleFetchTicket(ticket.TicketId)}
                        to={`ticket/${ticket.TicketId}`}
                      >
                        edit
                      </Link>
                    </td>
                  ) : ticket.TicketStatus === "OP" &&
                    ticket.TicketAssignedTo === null ? (
                    <td>
                      <Button
                        variant="info"
                        onClick={() =>
                          claimTicket(ticket.TicketId, user.UserId)
                        }
                      >
                        Claim
                      </Button>
                    </td>
                  ) : null}
                </tr>
              ) : null;
            })}
        </tbody>
      </Table>
      <span className="Pagination">
        <Button onClick={() => pagePrev(prev)} variant="primary" size="md">
          prev
        </Button>
        <Button onClick={() => pageNext(next)} variant="primary" size="md">
          next
        </Button>
      </span>
    </div>
  );
}
