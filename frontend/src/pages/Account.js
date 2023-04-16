import React, { useContext } from "react";
import ProjectContext from "../context/ProjectContext.js";
import TicketTable from "../components/TicketTable.js";
import Header from "../components/Header.js";
import AuthContext from "../context/AuthContext.js";

function Account() {
  let { user, getUser, devUser } = useContext(AuthContext);
  let { userTickets } = useContext(ProjectContext);
  return (
    <div>
      <Header />
      {devUser.UserRole}
      {devUser.UserPoints}
      <br />
      {user.username}
      <br></br>
      {user.user_id}
      <TicketTable userRole={devUser.userRole} tickets={userTickets} />
    </div>
  );
}
export default Account;
