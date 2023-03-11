import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import axios from "axios";
import ProjectContext from "../context/ProjectContext.js";

function Project() {
  let { project } = useContext(ProjectContext);
  return <div>{project.ProjectId}</div>;
}

export default Project;
