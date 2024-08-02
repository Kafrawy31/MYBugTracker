import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "react-bootstrap";
import TicketTable from "./TicketTable.js";
import ProjectContext from "../context/ProjectContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faBug,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import search from "../images/search.webp";

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
  return (
    <div className="Container--TicketList">
      <div className="search--container">
        <span>
          <img src={search} alt="" className="search--img" />
        </span>
        {!givenSearch && (
          <input
            className="ticket--searchbar"
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search for tickets..."
          />
        )}
        <Button
          className="backButton"
          onClick={() => pagePrev(prevPage)}
          variant="secondary"
          size="md"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> prev
        </Button>
        <Button
          className="nextButton"
          onClick={() => pageNext(nextPage)}
          variant="secondary"
          size="md"
        >
          next <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </div>
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
      <Link to="/SubmitTicket">
        <button type="button" class="btn btn-outline-dark">
          <div className="submit--ticket--button">
            Submit ticket
            <FontAwesomeIcon
              icon={faTicket}
              style={{ color: "ffffff" }}
              flip
              className="faTicket"
            />
          </div>
        </button>
      </Link>
    </div>
  );
}
