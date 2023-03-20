import React from "react";
import ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import axios from "axios";
import TicketTable from "./TicketTable.js";

export default function TicketList({ userRoles }) {
  const [ticketData, setTicketData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  console.log(search);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(
          `http://127.0.0.1:8000/api/ticket-list/?search=${search}`
        );
        setTicketData(response.data);
        console.log(response.data);
      } catch (err) {}
    };

    fetchData();
  }, [search]);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
      />
      <TicketTable
        userRole={userRoles}
        tickets={ticketData}
        loading={isLoading}
        search={search}
      />
    </div>
  );
}
