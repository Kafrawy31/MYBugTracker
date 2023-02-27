import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import Register from "./components/Register.js";
import TicketList from "./components/TicketList.js";
import axios from "axios";

function App() {
  return (
    <div>
      <TicketList />
    </div>
  );
}

export default App;
