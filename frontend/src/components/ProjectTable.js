import React, { useState, useContext } from "react";
import { Table } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
import ProjectContext from "../context/ProjectContext.js";
import { Button } from "react-bootstrap/";
export default function ProjectTable({ projects, search, userRole }) {
  let { handleFetchProject } = useContext(ProjectContext);
  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>Project ID</th>
          <th>Project Name</th>
          <th>Project Description</th>
          <th>Project Status</th>
          <th>Update</th>
        </tr>
      </thead>
      <tbody>
        {projects
          .filter((project) => {
            return search.toLowerCase() === ""
              ? project
              : project.ProjectName.toLowerCase().includes(search) ||
                  project.ProjectDescription.toLowerCase().includes(search) ||
                  project.ProjectStatus.toLowerCase().includes(search);
          })
          .map((project) => {
            return (
              <tr key={project.ProjectId} className="tickeTable">
                <td>{project.ProjectId}</td>
                <td>{project.ProjectName}</td>
                <td>{project.ProjectDescription}</td>
                <td>{project.ProjectStatus}</td>
                {userRole === "Senior" || userRole === "Admin" ? (
                  <td>
                    <Link
                      onClick={() => handleFetchProject(project.ProjectId)}
                      to={`project/${project.ProjectId}`}
                    >
                      edit
                    </Link>
                  </td>
                ) : (
                  <td>
                    <Button variant="info">View</Button>
                  </td>
                )}
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
}
