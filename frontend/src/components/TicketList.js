import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import TicketTable from "./TicketTable.js";
import ProjectContext from "../context/ProjectContext.js";

export default function TicketList({ userRoles, thisUser }) {
  let { allTickets, handleSearch, search } = useContext(ProjectContext);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search"
      />
      <TicketTable
        userRole={userRoles}
        tickets={allTickets}
        Loading={false}
        search={search}
        user={thisUser}
      />
    </div>
  );
}
