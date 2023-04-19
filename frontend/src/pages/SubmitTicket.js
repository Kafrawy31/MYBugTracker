import React, { useState, useContext, useEffect } from "react";
import Header from "../components/Header.js";
import axios from "axios";
import moment from "moment";
import AuthContext from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

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
      <div className="Edit--Ticket--Container">
        <h2 className="Edit--Ticket--Title">Submit a New Ticket</h2>
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
              className="Edit--Ticket--Description"
              value={ticket.TicketCodeLocation}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              className="Edit--Ticket--Description"
              name="TicketDescription"
              value={ticket.TicketDescription}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Observed Behavior:
            <textarea
              className="Edit--Ticket--Description"
              name="TicketObserved"
              value={ticket.TicketObserved}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Expected Behavior:
            <textarea
              className="Edit--Ticket--Description"
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

export default SubmitTicket;
