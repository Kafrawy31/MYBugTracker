import React from "react";
import { Table } from "react-bootstrap";
export default function TicketTable({
  tickets,
  search = "",
  ticketTerenary = true,
}) {
  return (
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
        </tr>
      </thead>
      <tbody>
        {tickets
          .filter((ticket) => {
            return search === ""
              ? ticket
              : ticket.TicketDescription.toLowerCase().includes(search) ||
                  ticket.TicketStatus.toLowerCase().includes(search) ||
                  ticket.TicketPriority.toLowerCase().includes(search) ||
                  ticket.TicketSubmittedBy?.toLowerCase().includes(search) ||
                  ticket.TicketAssignedTo?.includes(search) ||
                  ticket.TicketProject.toLowerCase().includes(search);
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
              </tr>
            ) : null;
          })}
      </tbody>
    </Table>
  );
}
