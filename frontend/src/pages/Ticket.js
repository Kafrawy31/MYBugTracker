import React, { useContext, useState, useEffect } from "react";
import ProjectContext from "../context/ProjectContext.js";
import Header from "../components/Header.js";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Ticket() {
  let { editTicket } = useContext(ProjectContext);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [ticketSpread, setTicketSpread] = useState({
    TicketProject: editTicket.TicketProject,
    TicketAssignedTo: editTicket.TicketAssignedTo,
    TicketDescription: editTicket.TicketDescription,
    TicketStatus: editTicket.TicketStatus,
    TicketPriority: editTicket.TicketPriority,
    TicketPoints: editTicket.TicketPoints,
    TicketObserved: editTicket.TicketObserved,
    TicketExpected: editTicket.TicketExpected,
  });

  useEffect(() => {
    setTicketSpread({
      TicketProject: editTicket.TicketProject,
      TicketAssignedTo: editTicket.TicketAssignedTo,
      TicketDescription: editTicket.TicketDescription,
      TicketStatus: editTicket.TicketStatus,
      TicketPriority: editTicket.TicketPriority,
      TicketPoints: editTicket.TicketPoints,
      TicketObserved: editTicket.TicketObserved,
      TicketExpected: editTicket.TicketExpected,
    });
  }, [editTicket]);

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
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (ticketSpread.TicketAssignedTo !== null) {
      ticketSpread.TicketStatus = "PE";
    }
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticketSpread),
    };

    const response = await fetch(
      `http://127.0.0.1:8000/api/ticket-update/${editTicket.TicketId}`,
      requestOptions
    );
    if (response.status === 200) {
      navigate("/homepage");
      window.location.reload();
    }
  };

  return (
    <div>
      <Header />
      <div className="Edit--Ticket--Container">
        <h2 className="Edit--Ticket--Title">Edit Ticket</h2>
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
          <label className="Edit--Ticket--AssignedUser">
            Assigned User:
            <select
              name="TicketAssignedTo"
              className="Ticket-AssignedUser"
              value={ticketSpread.TicketAssignedTo}
              onChange={handleChange}
            >
              <option value={null}>NA</option>
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
          <br />
          <label>
            Description:
            <textarea
              name="TicketDescription"
              className="Edit--Ticket--Description"
              value={ticketSpread.TicketDescription}
              onChange={handleChange}
            />
          </label>
          <br />
          <br />
          <label>
            Observed:
            <textarea
              name="TicketObserved"
              className="Edit--Ticket--Description"
              value={ticketSpread.TicketObserved}
              onChange={handleChange}
            />
          </label>
          <br />
          <br />
          <label>
            Expected:
            <textarea
              name="TicketExpected"
              className="Edit--Ticket--Description"
              value={ticketSpread.TicketExpected}
              onChange={handleChange}
            />
          </label>
          <br />
          <br />
          <label>
            Points (1-10):
            <input
              type="number"
              name="TicketPoints"
              value={ticketSpread.TicketPoints}
              onChange={handleChange}
              min="1"
              max="10"
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
          <Button
            type="submit"
            className="Edit--Ticket--Button"
            variant="outline-success"
          >
            Edit Ticket
          </Button>
        </form>
      </div>
    </div>
  );
}
export default Ticket;
