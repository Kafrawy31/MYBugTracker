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
  const [ticket, setTicket] = useState({});
  const [allTickets, setAllTickets] = useState([]);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [search, setSearch] = useState("");
  const [ticketId, setTicketId] = useState(null);
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
        `http://127.0.0.1:8000/api/ticket-list/?limit=4&search=${ticketProject}`
      );

      if (response.status === 200) {
        setTickets(response.data.results);
      } else {
        navigate("/homepage");
      }
    };

    fetchTickets();
  }, [ticketProject]);

  useEffect(() => {
    const fetchAllTickets = async () => {
      try {
        const response = await axios(
          `http://127.0.0.1:8000/api/ticket-list/?limit=4&search=${search}`
        );
        setAllTickets(response.data.results);
        setNext(response.data.next);
        setPrev(response.data.prev);
      } catch (err) {}
    };

    fetchAllTickets();
  }, [search]);

  const pageNext = async (next) => {
    try {
      const response = await axios(next);
      setAllTickets(response.data.results);
      setNext(response.data.next);
      setPrev(response.data.previous);
    } catch (err) {}
  };

  const pagePrev = async (prev) => {
    try {
      const response = await axios(prev);
      setAllTickets(response.data.results);
      setNext(response.data.next);
      setPrev(response.data.previous);
    } catch (err) {}
  };

  useEffect(() => {
    const fetchTicket = async () => {
      const response = await fetch(
        `http://localhost:8000/api/ticket-details/${ticketId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setTicket(data);
      } else {
        navigate("/homepage");
      }
    };

    fetchTicket();
  }, [ticketId]);

  const handleFetchTicket = (ticketId) => {
    setTicketId(ticketId);
  };

  const handleFetchTickets = (ticketProject) => {
    setTicketProject(ticketProject);
  };

  const handleFetchProject = (projectId) => {
    setProjectId(projectId);
  };

  const handleSearch = (search) => {
    setSearch(search);
  };

  useEffect(() => {
    const claimTicket = async () => {};
  });

  const projectContextData = {
    handleFetchProject,
    project,
    handleFetchTickets,
    tickets,
    handleFetchTicket,
    ticket,
    allTickets,
    pageNext,
    pagePrev,
    next,
    prev,
    search,
    handleSearch,
  };

  return (
    <ProjectContext.Provider value={projectContextData}>
      {children}
    </ProjectContext.Provider>
  );
};
