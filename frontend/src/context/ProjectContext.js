import { createContext, useState, useEffect } from "react";

const ProjectContext = createContext();

export default ProjectContext;

export const ProjectContextProvider = ({ children }) => {
  const [project, setProject] = useState({});
  const [projectId, setProjectId] = useState(null);

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
      }
    };

    fetchProject();
  }, [projectId]);

  const handleFetchProject = (projectId) => {
    setProjectId(projectId);
  };

  const projectContextData = {
    handleFetchProject,
    project,
  };

  return (
    <ProjectContext.Provider value={projectContextData}>
      {children}
    </ProjectContext.Provider>
  );
};
