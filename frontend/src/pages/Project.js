import React, { useContext, useState, useEffect } from "react";
import ProjectContext from "../context/ProjectContext.js";
import TicketTable from "../components/TicketTable.js";
import Header from "../components/Header.js";
import AuthContext from "../context/AuthContext.js";
import { Button } from "react-bootstrap/";
import axios from "axios";

function Project() {
  let { project, tickets, editProject } = useContext(ProjectContext);
  let { devUser } = useContext(AuthContext);
  let [members, setMembers] = useState([]);

  useEffect(() => {
    setProjectDescription(project.ProjectDescription);
    setProjectStatus(project.ProjectStatus);
  }, [project]);

  useEffect(() => {
    const getMembers = async () => {
      const response = await axios(
        `http://localhost:8000/api/project-members/${project.ProjectId}/`
      );
      setMembers(response.data);
    };
    getMembers();
  }, [project.ProjectId]);

  const [projectDescription, setProjectDescription] = useState(
    project.ProjectDescription
  );
  const [projectStatus, setProjectStatus] = useState(project.ProjectStatus);

  const handleProjectDescriptionChange = (event) => {
    setProjectDescription(event.target.value);
  };

  const handleProjectStatusChange = (event) => {
    setProjectStatus(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editProject(projectDescription, projectStatus);
  };

  return (
    <div>
      <Header />
      {devUser.UserRole}
      <br />
      {project.ProjectName}
      <div>
        <TicketTable userRole={devUser.UserRole} tickets={tickets} />
        {devUser.UserRole === "Senior" && (
          <div>
            <h3>Members on Project</h3>
            <table>
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>role</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.UserId}>
                    <td>{member.UserId}</td>
                    <td>{member.devUserName}</td>
                    <td>{member.UserRole}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {devUser.UserRole === "Senior" && (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="Register--Input">
              <label htmlFor="formGroupExampleInput2">
                Project Description
              </label>
              <input
                type="text"
                className="projectDescription"
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
                Edit Project
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
export default Project;
