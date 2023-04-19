import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import TicketTable from "./TicketTable.js";
import ProjectContext from "../context/ProjectContext.js";

export default function TicketList({ userRoles, thisUser, givenTickets }) {
  let { allTickets, handleSearch, search } = useContext(ProjectContext);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="Container--TicketList">
      <input
        className="Search--Ticket"
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search for tickets..."
      />
      {givenTickets.length === 0 ? (
        <p>no tickets to display</p>
      ) : (
        <TicketTable
          userRole={userRoles}
          tickets={givenTickets}
          Loading={false}
          search={search}
          user={thisUser}
        />
      )}
    </div>
  );
}
