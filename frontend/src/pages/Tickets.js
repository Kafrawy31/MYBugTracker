import React from "react";
import TicketList from "../components/TicketList.js";
import ProjectList from "../components/ProjectList.js";
import AuthContext from "../context/AuthContext.js";
import { useContext, useEffect } from "react";
import ProjectContext from "../context/ProjectContext.js";
import Header from "../components/Header.js";
function Tickets() {
  let { user, getUser, devUser } = useContext(AuthContext);
  let { allTickets, tickets, search } = useContext(ProjectContext);

  useEffect(() => {
    getUser();
  }, []);

  //   if (!devUser) {
  //     return <p>Loading...</p>;
  //   }

  let userRole = devUser.UserRole;
  return (
    <div className="ticket--page">
      <Header />
      <TicketList
        userRoles={userRole}
        thisUser={devUser}
        givenTickets={tickets}
        search={search}
      />
    </div>
  );
}

export default Tickets;
