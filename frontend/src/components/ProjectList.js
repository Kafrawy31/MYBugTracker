import React from "react";
import ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import axios from "axios";
import ProjectTable from "./ProjectTable.js";

export default function ProjectList({ userRoles }) {
  const [projectData, setProjectData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [projectSearch, setProjectSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(
          `http://127.0.0.1:8000/api/project-list/?search=${projectSearch}`
        );
        setProjectData(response.data.results);
      } catch (err) {}
    };

    fetchData();
  }, [projectSearch]);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setProjectSearch(e.target.value)}
        placeholder="Search"
      />
      <ProjectTable
        userRole={userRoles}
        projects={projectData}
        loading={isLoading}
        search={projectSearch}
      />
    </div>
  );
}
