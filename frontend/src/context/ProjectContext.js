import { createContext, useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const ProjectContext = createContext();

export default ProjectContext;

export const ProjectContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [project, setProject] = useState({});
  const [projectId, setProjectId] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [ticketProject, setTicketProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const response = await fetch(
        `http://localhost:8000/api/project-details/${projectId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setProject(data);
        handleFetchTickets(data.ProjectName);
      } else {
        navigate("/homepage");
      }
    };

    fetchProject();
  }, [projectId]);

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await axios(
        `http://127.0.0.1:8000/api/ticket-list/?search=${ticketProject}`
      );

      if (response.status === 200) {
        setTickets(response.data);
      } else {
        navigate("/homepage");
      }
    };

    fetchTickets();
  }, [ticketProject]);

  const handleFetchTickets = (ticketProject) => {
    setTicketProject(ticketProject);
  };

  const handleFetchProject = (projectId) => {
    setProjectId(projectId);
  };

  const projectContextData = {
    handleFetchProject,
    project,
    handleFetchTickets,
    tickets,
  };

  return (
    <ProjectContext.Provider value={projectContextData}>
      {children}
    </ProjectContext.Provider>
  );
};
