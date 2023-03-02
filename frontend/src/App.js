import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import "./Reset.css";
import Register from "./components/Register.js";
import TicketList from "./components/TicketList.js";
import ProjectList from "./components/ProjectList.js";
import axios from "axios";

function App() {
  return (
    <div>
      <TicketList />
      <ProjectList />
    </div>
  );
}

export default App;
