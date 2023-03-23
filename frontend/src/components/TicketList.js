import React from "react";
import ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import TicketTable from "./TicketTable.js";

export default function TicketList({ userRoles }) {
  const [ticketData, setTicketData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  console.log(search);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(
          `http://127.0.0.1:8000/api/ticket-list/?limit=4&search=${search}`
        );
        setTicketData(response.data.results);
        setNext(response.data.next);
        setPrev(response.data.prev);
      } catch (err) {}
    };

    fetchData();
  }, [search]);

  const pageNext = async (next) => {
    try {
      const response = await axios(next);
      setTicketData(response.data.results);
      setNext(response.data.next);
      setPrev(response.data.previous);
    } catch (err) {}
  };

  const pagePrev = async (prev) => {
    try {
      const response = await axios(prev);
      setTicketData(response.data.results);
      setNext(response.data.next);
      setPrev(response.data.previous);
    } catch (err) {}
  };

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
