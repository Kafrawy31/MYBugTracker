import React, { useContext, useState, useEffect } from "react";
import ProjectContext from "../context/ProjectContext.js";
import Header from "../components/Header.js";
import axios from "axios";

function Ticket() {
  let { ticket } = useContext(ProjectContext);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [ticketSpread, setTicketSpread] = useState({
    TicketProject: ticket.TicketProject,
    TicketAssignedTo: ticket.TicketAssignedTo,
    TicketDescription: ticket.TicketDescription,
    TicketStatus: ticket.TicketStatus,
    TicketPriority: ticket.TicketPriority,
    TicketPoints: ticket.TicketPoints,
  });

  useEffect(() => {
    setTicketSpread({
      TicketProject: ticket.TicketProject,
      TicketAssignedTo: ticket.TicketAssignedTo,
      TicketDescription: ticket.TicketDescription,
      TicketStatus: ticket.TicketStatus,
      TicketPriority: ticket.TicketPriority,
      TicketPoints: ticket.TicketPoints,
    });
  }, [ticket]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await axios("http://127.0.0.1:8000/api/project-list/");
      if (response.status === 200) {
        setProjects(response.data.results);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios("http://127.0.0.1:8000/api/user-list/");
      if (response.status === 200) {
        setUsers(response.data.results);
        console.log(response.data.results);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (event) => {
    setTicketSpread({
      ...ticketSpread,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .patch(
        `http://127.0.0.1:8000/api/ticket-update/${ticket.TicketId}`,
        ticketSpread
      )
      .then(console.log(ticketSpread));
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
            value={ticketSpread.TicketProject}
            onChange={handleChange}
          >
            {projects.map((project) => {
              return (
                <option key={project.ProjectId} value={project.ProjectId}>
                  {project.ProjectName}
                </option>
              );
            })}
          </select>
        </label>

        <label>
          Assigned User:
          <select
            name="TicketAssignedTo"
            value={ticketSpread.TicketAssignedTo}
            onChange={handleChange}
          >
            {users.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.username}
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
            value={ticketSpread.TicketDescription}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Priority:
          <select
            name="TicketPriority"
            value={ticketSpread.TicketPriority}
            onChange={handleChange}
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
