import React, { useContext, useEffect } from "react";
import ProjectContext from "../context/ProjectContext.js";
import TicketTable from "../components/TicketTable.js";
import Header from "../components/Header.js";
import AuthContext from "../context/AuthContext.js";

function Account() {
  //   let { project, tickets } = useContext(ProjectContext);
  //   let { user, getUser, devUser } = useContext(AuthContext);
  //   useEffect(() => {
  //     getUser();
  //   }, []);
  //   console.log(user.username);
  //   return (
  //     <div>
  //       <Header />
  //       {devUser.UserRole}
  //       <br />
  //       {project.ProjectName}
  //       <TicketTable
  //         userRole={devUser.UserRole}
  //         tickets={tickets}
  //         ticketTerenary={user.username}
  //       />
  //     </div>
  //   );
  //
}
export default Account;
