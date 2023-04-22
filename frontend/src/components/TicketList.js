import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import { Button } from "react-bootstrap";
import TicketTable from "./TicketTable.js";
import ProjectContext from "../context/ProjectContext.js";

export default function TicketList({
  userRoles,
  thisUser,
  givenTickets,
  nextPage,
  prevPage,
  givenSearch = false,
}) {
  let { handleSearch, pageNext, pagePrev, next, prev } =
    useContext(ProjectContext);

  if (!nextPage) {
    nextPage = next;
  }

  if (!prevPage) {
    prevPage = prev;
  }

  console.log("Link for prev page", prev);
  console.log("Link for next page", next);
  return (
    <div>
      {!givenSearch && (
        <input
          className="Search--Ticket"
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for tickets..."
        />
      )}
      <div className="Container--TicketList">
        {givenTickets.length === 0 ? (
          <p>no tickets to display</p>
        ) : (
          <TicketTable
            userRole={userRoles}
            tickets={givenTickets}
            Loading={false}
            user={thisUser}
          />
        )}
        <span className="Pages">
          <Button
            className="backButton"
            onClick={() => pagePrev(prevPage)}
            variant="primary"
            size="md"
          >
            prev
          </Button>
          <Button
            className="nextButton"
            onClick={() => pageNext(nextPage)}
            variant="primary"
            size="md"
          >
            next
          </Button>
        </span>
      </div>
    </div>
  );
}
