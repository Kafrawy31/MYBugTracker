import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import ProjectContext from "../context/ProjectContext.js";
export default function TicketTable({
  tickets,
  search = "",
  ticketTerenary = true,
  userRole,
}) {
  let { handleFetchTicketEdit, handleFetchTicket } = useContext(ProjectContext);

  return (
    <>
      <Table striped bordered className="TicketTable">
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
            <th>View/Edit</th>
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
                  <td>{ticket.TicketProject}</td>
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
                        onClick={() => handleFetchTicketEdit(ticket.TicketId)}
                        to={`/ticket/${ticket.TicketId}`}
                      >
                        edit
                      </Link>
                    </td>
                  ) : (
                    <td>
                      <Link
                        onClick={() => handleFetchTicket(ticket.TicketId)}
                        to={`/viewticket/${ticket.TicketId}`}
                      >
                        view ticket
                      </Link>
                    </td>
                  )}
                </tr>
              ) : null;
            })}
        </tbody>
      </Table>
    </>
  );
}
