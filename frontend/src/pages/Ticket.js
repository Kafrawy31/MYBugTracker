import React, { useContext } from "react";
import ProjectContext from "../context/ProjectContext.js";
import Header from "../components/Header.js";

function Ticket() {
  let { ticket } = useContext(ProjectContext);
  console.log("current ticket is:" + ticket.TicketDescription);
  return (
    <div>
      <Header />
      {ticket.TicketId}
      <br />
      {ticket.TicketDescription}
      <br />
      {ticket.TicketProject}
    </div>
  );
}

export default Ticket;
