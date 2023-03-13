import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import axios from "axios";
import ProjectContext from "../context/ProjectContext.js";
import TicketTable from "../components/TicketTable.js";

function Project() {
  let { project, tickets } = useContext(ProjectContext);

  return (
    <div>
      {project.ProjectName}
      <TicketTable tickets={tickets} ticketTerenary={project.ProjectName} />
    </div>
  );
}

export default Project;
