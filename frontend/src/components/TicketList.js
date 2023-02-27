import React from "react";
import ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

export default function TicketList(props) {
  const [ticketTable, setTicketTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  console.log(search);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios("http://127.0.0.1:8000/api/ticket-list/");
        setTicketTable(response.data);
      } catch (err) {}

      setIsLoading(false);
    };

    if (!isLoading) {
      fetchData();
    }
  }, []);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
      />
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
          {ticketTable
            .filter((ticket) => {
              return search.toLowerCase() === ""
                ? ticket
                : ticket.TicketDescription.toLowerCase().includes(search) ||
                    ticket.TicketStatus.toLowerCase().includes(search) ||
                    ticket.TicketPriority.toLowerCase().includes(search) ||
                    ticket.TicketSubmittedBy.toLowerCase().includes(search) ||
                    ticket.TicketProject.toLowerCase().includes(search) ||
                    ticket.ticketassignedto.toLowerCase().includes(search);
            })
            .map((ticket) => {
              return (
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
                  <td>{ticket.ticketassignedto}</td>
                  <td>{ticket.TicketSubmittedBy}</td>
                </tr>
              );
            })}
        </thead>
      </Table>
    </div>
  );
}
