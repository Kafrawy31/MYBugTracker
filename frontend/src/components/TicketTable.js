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

  const getStatusClass = (status) => {
    switch (status) {
      case "Closed":
        return "status-closed";
      case "Pending":
        return "status-pending";
      default:
        return "";
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "Very High":
        return "priority-very-high";
      case "High":
        return "priority-high";
      case "Medium":
        return "priority-medium";
      case "Low":
        return "priority-low";
      default:
        return "";
    }
  };

  const mapStatus = (status) => {
    switch (status) {
      case "CL":
        return "Closed";
      case "PE":
        return "Pending";
      default:
        return status;
    }
  };

  const mapPriority = (priority) => {
    switch (priority) {
      case "VH":
        return "Very High";
      case "H":
        return "High";
      case "M":
        return "Medium";
      case "L":
        return "Low";
      default:
        return "";
    }
  };

  return (
    <table className="ticket--table">
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
                  ticket.TicketAssignedTo?.toLowerCase().includes(search) ||
                  ticket.TicketProject?.toLowerCase().includes(search);
          })
          .map((ticket) => {
            return ticketTerenary ? (
              <tr key={ticket.TicketId} className="ticket--data">
                <td className="first">{ticket.TicketId}</td>
                <td className="ticket--description">
                  {ticket.TicketDescription}
                </td>

                <td className={getStatusClass(mapStatus(ticket.TicketStatus))}>
                  {mapStatus(ticket.TicketStatus)}
                </td>
                <td>
                  <div className="status--container">
                    <td
                      className={getPriorityClass(
                        mapPriority(ticket.TicketPriority)
                      )}
                    >
                      {mapPriority(ticket.TicketPriority)}
                    </td>
                  </div>
                </td>
                <td className="ticket--points">{ticket.TicketPoints}</td>
                <td>{ticket.TicketProject}</td>
                <td>{ticket.TicketAssignedTo}</td>
                <td>{ticket.TicketSubmittedBy}</td>
                <td className="ticket--location">
                  {ticket.TicketCodeLocation}
                </td>
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
    </table>
  );
}
