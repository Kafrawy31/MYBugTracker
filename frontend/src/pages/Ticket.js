import React, { useContext, useState, useEffect } from "react";
import ProjectContext from "../context/ProjectContext.js";
import Header from "../components/Header.js";
import axios from "axios";

function Ticket() {
  let { ticket } = useContext(ProjectContext);
  const [projects, setProjects] = useState([]);
  const [ticketSpread, setTicketSpread] = useState({
    TicketProject: ticket.TicketProject,
    TicketAssignedTo: ticket.TicketAssignedTo,
    TicketDescription: ticket.TicketDescription,
    TicketStatus: ticket.TicketStatus,
    TicketPriority: ticket.TicketPriority,
    TicketPoints: ticket.TicketPoints,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await axios("http://127.0.0.1:8000/api/project-list/");
      if (response.status === 200) {
        console.log(response);
      }
    };
    fetchProjects();
  }, []);

  const handleChange = (event) => {
    setTicketSpread({ ...ticket, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticketSpread),
    };
    fetch(
      `http://127.0.0.1:8000/api/ticket-update/${ticket.TicketId}`,
      requestOptions
    )
      .then((response) => console.log(response.status))
      .then((data) => console.log(data))
      .catch((error) => alert(error.message));
  };

  return (
    <div>
      <Header />
      <h2>Edit Ticket</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Ticket Project:
          <select
            name="TicketProject"
            value={ticket.TicketProject}
            onChange={handleChange}
          >
            <option>select Projcet</option>
            {projects.map((project) => {
              return (
                <option key={project.ProjectId} value={project.ProjectId}>
                  {project.ProjectName}
                </option>
              );
            })}
          </select>
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="TicketDescription"
            value={ticket.TicketDescription}
            // onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Priority:
          <select
            name="TicketPriority"
            value={ticket.TicketPriority}
            // onChange={handleChange}
          >
            <option value="VH">Very High</option>
            <option value="H">High</option>
            <option value="M">Medium</option>
            <option value="L">Low</option>
          </select>
        </label>
        <br />
        <button type="submit">Submit Ticket</button>
      </form>
    </div>
  );
}
export default Ticket;
