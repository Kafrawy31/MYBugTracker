import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import "./Reset.css";
import Register from "./components/Register.js";
import TicketList from "./components/TicketList.js";
import axios from "axios";

function App() {
  return (
    <div>
      <Register />
    </div>
  );
}

export default App;
