import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [members, setMembers] = useState([]);
  const [allTickets, setAllTickets] = useState([]);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [projectNext, setProjectNext] = useState(null);
  const [projectPrev, setProjectPrev] = useState(null);
  const [projectTickets, setProjectTickets] = useState([]);
  const [monthlyPoints, setMonthlyPoints] = useState([]);
  const [search, setSearch] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [projectSearch, setProjectSearch] = useState("");
  const [accountSearch, setAccountSearch] = useState("");
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
        handleFetchTickets(data.ProjectId);
      } else {
      }

      const response2 = await fetch(
        `http://localhost:8000/api/project-members/${projectId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response2.status === 200) {
        const data2 = await response2.json();
        setMembers(data2);
      } else {
      }
    };

    fetchProject();
  }, [projectId, members]);

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await axios(
        `http://127.0.0.1:8000/api/project-tickets/${projectId}/?limit=8&q=${projectSearch}`
      );
      setTickets(response.data.results);
      setNext(response.data.next);
      setPrev(response.data.previous);
    };
    fetchTickets();
  }, [ticketProject, projectSearch]);

  useEffect(() => {
    const fetchUserTickets = async () => {
      try {
        const response = await axios(
          `http://127.0.0.1:8000/api/assigned-tickets/${curr_id}/?limit=4&q=${accountSearch}`
        );
        setTickets(response.data.results);
        setNext(response.data.next);
        setPrev(response.data.previous);
      } catch (err) {}
    };

    fetchUserTickets();
  }, [curr_id, accountSearch]);

  useEffect(() => {
    const fetchAllTickets = async () => {
      try {
        const response = await axios(
          `http://127.0.0.1:8000/api/ticket-list/?limit=16&search=${search}`
        );
        setTickets(response.data.results);
        setNext(response.data.next);
        setPrev(response.data.previous);
      } catch (err) {}
    };

    fetchAllTickets();
  }, [search]);

  const remove = async (id, pid) => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        remove_project: pid,
      }),
    };
    const response = await fetch(
      `http://localhost:8000/api/devuser-update/${id}`,
      requestOptions
    );
  };

  const join = async (id, pid) => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        add_project: pid,
      }),
    };
    const response = await fetch(
      `http://localhost:8000/api/devuser-update/${id}`,
      requestOptions
    );
    navigate("/homepage");
  };
  const pageNext = async () => {
    try {
      const response = await axios(next);
      setTickets(response.data.results);
      setNext(response.data.next);
      setPrev(response.data.previous);
    } catch (err) {}
  };

  const pagePrev = async () => {
    try {
      const response = await axios(prev);
      setTickets(response.data.results);
      setNext(response.data.next);
      setPrev(response.data.previous);
    } catch (err) {}
  };

  const pageNextProject = async () => {
    try {
      const response = await axios(projectNext);
      setTickets(response.data.results);
      setProjectNext(response.data.next);
      setProjectPrev(response.data.previous);
    } catch (err) {}
  };

  const pagePrevProject = async () => {
    try {
      const response = await axios(projectPrev);
      setTickets(response.data.results);
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

  const createProject = async (
    projectName,
    projectDescription,
    projectStatus
  ) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ProjectName: projectName,
        ProjectDescription: projectDescription,
        ProjectStatus: projectStatus,
      }),
    };
    const response = await fetch(
      "http://localhost:8000/api/project-create/",
      requestOptions
    );
  };

  const editProject = async (projectDescription, projectStatus) => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ProjectDescription: projectDescription,
        ProjectStatus: projectStatus,
      }),
    };
    const response = await fetch(
      `http://localhost:8000/api/project-update/${projectId}`,
      requestOptions
    );
  };

  const fetchMonthlyPoints = async () => {
    try {
      const response = await axios(`http://127.0.0.1:8000/api/devuser-list/`);
      setMonthlyPoints(response.data.results);
    } catch (err) {
      console.log(err);
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
    ).then((response) => {});

    fetch(
      `http://127.0.0.1:8000/api/devuser-update/${userId}`,
      requestOptionsUser
    ).then((response) => {
      navigate("/homepage");
      window.location.reload();
    });
  };

  const claimTicket = async (ticketId, userId) => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        TicketAssignedTo: userId,
        TicketStatus: "PE",
        TicketDateAssigned: moment(),
      }),
    };

    fetch(
      `http://127.0.0.1:8000/api/ticket-update/${ticketId}`,
      requestOptions
    ).then((response) => {
      navigate("/homepage");
      window.location.reload();
    });
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

  const handleProjectSearch = (projectSearch) => {
    setProjectSearch(projectSearch);
  };

  const handleAccountSearch = (accountSearch) => {
    setAccountSearch(accountSearch);
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
    createProject,
    editProject,
    handleProjectSearch,
    handleAccountSearch,
    pagePrevProject,
    pageNextProject,
    remove,
    fetchMonthlyPoints,
    monthlyPoints,
    members,
    join,
  };

  return (
    <ProjectContext.Provider value={projectContextData}>
      {children}
    </ProjectContext.Provider>
  );
};
