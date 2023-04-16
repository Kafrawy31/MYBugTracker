import { createContext, useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const ProjectContext = createContext();

export default ProjectContext;

export const ProjectContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [project, setProject] = useState({});
  const [projectId, setProjectId] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [ticket, setTicket] = useState({});
  const [editTicket, setEditTicket] = useState({});
  const [editTicketId, setEditTicketId] = useState(null);
  const [allTickets, setAllTickets] = useState([]);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [search, setSearch] = useState("");
  const [ticketId, setTicketId] = useState(null);
  const [ticketProject, setTicketProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [curr_id, setCurr_Id] = useState(null);
  const [userTickets, setUserTickets] = useState([]);

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
        setPrev(response.data.previous);
      } catch (err) {}
    };

    fetchAllTickets();
  }, [search]);

  useEffect(() => {
    const fetchUserTickets = async () => {
      try {
        const response = await axios(
          `http://127.0.0.1:8000/api/assigned-tickets/${curr_id}`
        );
        setUserTickets(response.data);
      } catch (err) {}
    };

    fetchUserTickets();
  }, [curr_id]);

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
      }
    };

    fetchTicket();
  }, [ticketId]);

  useEffect(() => {
    const fetchTicketEdit = async () => {
      const response = await fetch(
        `http://localhost:8000/api/ticket-details-edit/${editTicketId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setEditTicket(data);
      } else {
      }
    };

    fetchTicketEdit();
  }, [editTicketId]);

  const register = async (username, email, password) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: `${username}`,
        email: `${email}`,
        password: `${password}`,
      }),
    };
    const response = await fetch(
      "http://localhost:8000/api/user-create/",
      requestOptions
    );

    const data = await response.text();
    const result = JSON.parse(data);
    if (response.status === 201) {
      const devId = result.id;
      const devRequestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: devId,
        }),
      };

      const response2 = await fetch(
        "http://localhost:8000/api/devuser-create/",
        devRequestOptions
      );
    }
  };

  const closeTicket = async (ticketId, userId, Tpoints, UPoints, MUPoints) => {
    const newTotal = Tpoints + UPoints;
    const monthlyNewTotal = Tpoints + MUPoints;

    const requestOptionsTicket = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ TicketStatus: "CL", TicketDateClosed: moment() }),
    };

    const requestOptionsUser = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        UserPoints: newTotal,
        MonthlyPoints: monthlyNewTotal,
      }),
    };

    fetch(
      `http://127.0.0.1:8000/api/ticket-update/${ticketId}`,
      requestOptionsTicket
    )
      .then((response) => {})
      .catch((error) => alert(error.message));

    fetch(
      `http://127.0.0.1:8000/api/devuser-update/${userId}`,
      requestOptionsUser
    )
      .then((response) => {
        navigate("/homepage");
        window.location.reload();
      })
      .catch((error) => alert(error.message));
  };

  const claimTicket = async (ticketId, userId) => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ TicketAssignedTo: userId, TicketStatus: "PE" }),
    };

    fetch(`http://127.0.0.1:8000/api/ticket-update/${ticketId}`, requestOptions)
      .then((response) => {
        navigate("/homepage");
        window.location.reload();
      })
      .catch((error) => alert(error.message));
  };

  const handleFetchTicket = (ticketId) => {
    setTicketId(ticketId);
  };

  const handleFetchTicketEdit = (editTicketId) => {
    setEditTicketId(editTicketId);
  };

  const handleCurrId = (curr_id) => {
    setCurr_Id(curr_id);
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

  const projectContextData = {
    handleFetchProject,
    project,
    handleFetchTickets,
    tickets,
    handleFetchTicket,
    handleFetchTicketEdit,
    editTicket,
    ticket,
    allTickets,
    pageNext,
    pagePrev,
    next,
    prev,
    search,
    handleSearch,
    claimTicket,
    handleCurrId,
    userTickets,
    closeTicket,
    register,
  };

  return (
    <ProjectContext.Provider value={projectContextData}>
      {children}
    </ProjectContext.Provider>
  );
};
