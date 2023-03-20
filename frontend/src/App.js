import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./Reset.css";
import Register from "./pages/Register.js";
import Homepage from "./pages/Homepage.js";
import Login from "./pages/Login.js";
import SubmitTicket from "./pages/SubmitTicket.js";
import Ticket from "./pages/Ticket.js";
import Private from "./utils/Private.js";
import { AuthProvider } from "./context/AuthContext.js";
import { ProjectContextProvider } from "./context/ProjectContext.js";
import Project from "./pages/Project.js";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <ProjectContextProvider>
            <Routes>
              <Route path="/" element={<Register />} exact></Route>
              <Route path="/Login" element={<Login />}></Route>
              <Route
                path="/homepage"
                element={
                  <Private>
                    <Homepage />
                  </Private>
                }
              />
              <Route
                path="homepage/project/:ProjectId"
                element={<Project />}
              ></Route>
              <Route
                path="homepage/ticket/:TicketId"
                element={<Ticket />}
              ></Route>
              <Route
                path="/SubmitTicket"
                element={
                  <Private>
                    <SubmitTicket />
                  </Private>
                }
              ></Route>
            </Routes>
          </ProjectContextProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
