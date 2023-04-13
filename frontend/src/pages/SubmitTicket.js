import React, { useState, useContext, useEffect } from "react";
import Header from "../components/Header.js";
import axios from "axios";
import moment from "moment";
import AuthContext from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";

function SubmitTicket() {
  let { user, getUser, devUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    getUser();
  }, []);

  const [projects, setProjects] = useState([]);
  const [ticket, setTicket] = useState({
    TicketProject: "",
    TicketAssignedTo: null,
    TicketSubmittedBy: user.user_id,
    TicketDescription: "",
    TicketObserved: "",
    TicketExpected: "",
    TicketStatus: "OP",
    TicketPriority: "VH",
    TicketPoints: 1,
    TicketDateOpened: moment(),
    TicketCodeLocation: "",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await axios("http://127.0.0.1:8000/api/project-list/");
      if (response.status === 200) {
        setProjects(response.data.results);
      }
    };
    fetchProjects();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket),
    };
    fetch("http://127.0.0.1:8000/api/ticket-create/", requestOptions)
      .then((response) => console.log(response.status))
      .then((data) => console.log(data))
      .catch((error) => alert(error.message));
    navigate("/homepage");
    window.location.reload();
  };

  const handleChange = (event) => {
    setTicket({ ...ticket, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Header />
      {user && <p> You are logged in as {devUser.UserRole} </p>}
      <h2>Submit a New Ticket</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Ticket Project:
          <select
            name="TicketProject"
            value={ticket.TicketProject}
            onChange={handleChange}
          >
            <option>select Project</option>
            {projects.map((project) => {
              if (project.ProjectStatus === "IP") {
                return (
                  <option key={project.ProjectId} value={project.ProjectId}>
                    {project.ProjectName}
                  </option>
                );
              } else {
                return null;
              }
            })}
          </select>
        </label>
        <br />
        <label>
          Code Location:
          <input
            type="text"
            name="TicketCodeLocation"
            value={ticket.TicketCodeLocation}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="TicketDescription"
            value={ticket.TicketDescription}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Observed Behavior:
          <textarea
            name="TicketObserved"
            value={ticket.TicketObserved}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Expected Behavior:
          <textarea
            name="TicketExpected"
            value={ticket.TicketExpected}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Priority:
          <select
            name="TicketPriority"
            value={ticket.TicketPriority}
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

export default SubmitTicket;
