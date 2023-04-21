import React from "react";
import ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import axios from "axios";
import ProjectTable from "./ProjectTable.js";
import { Button } from "react-bootstrap";

export default function ProjectList({ userRoles }) {
  const [projectData, setProjectData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [projectSearch, setProjectSearch] = useState("");
  const [nextProject, setNextProject] = useState(null);
  const [prevProject, setPrevProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(
          `http://127.0.0.1:8000/api/project-list/?limit=4&search=${projectSearch}`
        );
        setProjectData(response.data.results);
        setNextProject(response.data.next);
        setPrevProject(response.data.previous);
      } catch (err) {}
    };

    fetchData();
  }, [projectSearch]);

  const projectNext = async (next) => {
    try {
      const response = await axios(next);
      setProjectData(response.data.results);
      setNextProject(response.data.next);
      setPrevProject(response.data.previous);
    } catch (err) {}
  };

  const projectPrev = async (prev) => {
    try {
      const response = await axios(prev);
      setProjectData(response.data.results);
      setNextProject(response.data.next);
      setPrevProject(response.data.previous);
    } catch (err) {}
  };

  return (
    <div className="Container--ProjectList">
      <input
        className="Search--Project"
        type="text"
        onChange={(e) => setProjectSearch(e.target.value)}
        placeholder="Search for Project..."
      />
      <ProjectTable
        userRole={userRoles}
        projects={projectData}
        loading={isLoading}
        search={projectSearch}
      />
      <span className="Pages">
        <Button
          className="backButtonProject"
          onClick={() => projectPrev(prevProject)}
          variant="primary"
          size="md"
        >
          prev
        </Button>
        <Button
          className="nextButton"
          onClick={() => projectNext(nextProject)}
          variant="primary"
          size="md"
        >
          next
        </Button>
      </span>
    </div>
  );
}
