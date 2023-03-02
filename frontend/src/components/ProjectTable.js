import React from "react";
import { Table } from "react-bootstrap";
export default function ProjectTable({ projects, search }) {
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
                  project.ProjectStatus.toLowerCase().includes(search) ||
                  project.TicketProject.toLowerCase().includes(search);
          })
          .map((project) => {
            return (
              <tr key={project.ProjectId} className="tickeTable">
                <td>{project.ProjectId}</td>
                <td>{project.ProjectName}</td>
                <td>{project.ProjectDescription}</td>
                <td>{project.ProjectStatus}</td>
                <td>{project.ProjectPoints}</td>
                <td>
                  <a href="#"></a>
                  Edit
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
}
