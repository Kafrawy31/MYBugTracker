import React, { useContext, useState } from "react";
import ProjectContext from "../context/ProjectContext.js";
import TicketTable from "../components/TicketTable.js";
import Header from "../components/Header.js";
import AuthContext from "../context/AuthContext.js";
import { Button } from "react-bootstrap/";

function CreateProject() {
  let { createProject } = useContext(ProjectContext);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStatus, setProjectStatus] = useState("");

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleProjectDescriptionChange = (event) => {
    setProjectDescription(event.target.value);
  };

  const handleProjectStatusChange = (event) => {
    setProjectStatus(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createProject(projectName, projectDescription, projectStatus);
  };

  return (
    <div className="Wrap--Register">
      <Header />
      <form onSubmit={handleSubmit}>
        <div className="Register--Input">
          <label htmlFor="formGroupExampleInput">Project name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Project Name"
            value={projectName}
            onChange={handleProjectNameChange}
          />
        </div>
        <div className="Register--Input">
          <label htmlFor="formGroupExampleInput2">Project Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="Project Description"
            value={projectDescription}
            onChange={handleProjectDescriptionChange}
          />
        </div>
        <div className="Register--Input">
          <label htmlFor="formGroupExampleInput2">Project Staus</label>
          <select
            name="projectStatus"
            placeholder="status"
            value={projectStatus}
            onChange={handleProjectStatusChange}
          >
            <option value="IP">In Progress</option>
            <option value="CU">Coming up</option>
          </select>
        </div>
        <div className="CreateProject">
          <Button
            type="submit"
            className="Register--Button"
            variant="outline-success"
          >
            Create Project
          </Button>
        </div>
      </form>
    </div>
  );
}
export default CreateProject;
