import React, { useContext, useState, useEffect } from "react";
import ProjectContext from "../context/ProjectContext.js";
import TicketTable from "../components/TicketTable.js";
import Header from "../components/Header.js";
import AuthContext from "../context/AuthContext.js";
import { Button } from "react-bootstrap/";
import axios from "axios";
import TicketList from "../components/TicketList.js";
import { useNavigate } from "react-router-dom";

function Project() {
  let {
    project,
    tickets,
    editProject,
    projectNext,
    projectPrev,
    projectSearch,
    projectTickets,
    allTickets,
    handleProjectSearch,
  } = useContext(ProjectContext);
  let { devUser } = useContext(AuthContext);
  let [members, setMembers] = useState([]);
  const navigate = useNavigate();
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
    navigate("/homepage");
    window.location.reload();
  };
  return (
    <div>
      <Header />

      <div className="Project--Parent">
        <p className="Project--Title">{project.ProjectName}</p>
        <div className="table-and-member-container">
          <input
            className="Search--Ticket"
            type="text"
            onChange={(e) => handleProjectSearch(e.target.value)}
            placeholder="Search for tickets..."
          />
          <TicketList
            userRoles={devUser.UserRole}
            givenTickets={tickets}
            givenSearch={true}
          />
        </div>

        <div className="Member--And--Edit--Container">
          {devUser.UserRole === "Senior" && (
            <div className="Member--Table--Container">
              <h6 className="members-header">Members on Project</h6>
              <table className="Members--Table">
                <thead>
                  <tr>
                    <th className="id-column">id</th>
                    <th className="name-column">name</th>
                    <th className="role-column">role</th>
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
          {devUser.UserRole === "Senior" && (
            <div className="Edit--Project--Container">
              <form className="Edit--Project--Form" onSubmit={handleSubmit}>
                <div className="Pr">
                  <label>Project Description: </label>
                  <input
                    type="text"
                    className="Project--Description--Form"
                    placeholder="Project Description"
                    value={projectDescription}
                    onChange={handleProjectDescriptionChange}
                  />
                </div>
                <div>
                  <span>
                    <label>Project Staus:</label>
                    <select
                      className="Project--Status--Form"
                      placeholder="status"
                      value={projectStatus}
                      onChange={handleProjectStatusChange}
                    >
                      <option value="IP">In Progress</option>
                      <option value="CU">Coming up</option>
                    </select>
                  </span>
                </div>
                <div className="CreateProject">
                  <Button
                    type="submit"
                    className="Edit--Button"
                    variant="outline-success"
                  >
                    Edit Project
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Project;
