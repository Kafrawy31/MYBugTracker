import React, { useContext, useEffect } from "react";
import ProjectContext from "../context/ProjectContext.js";
import TicketTable from "../components/TicketTable.js";
import Header from "../components/Header.js";
import AuthContext from "../context/AuthContext.js";

function Project() {
  let { project, tickets } = useContext(ProjectContext);
  let { user, getUser, devUser } = useContext(AuthContext);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Header />
      {devUser.UserRole}
      <br />
      {project.ProjectName}
      <TicketTable
        userRole={devUser.UserRole}
        tickets={tickets}
        ticketTerenary={project.ProjectName}
      />
    </div>
  );
}

export default Project;
