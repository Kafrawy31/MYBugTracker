import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import Register from "./components/Register.js";
import TicketList from "./components/TicketList.js";
import axios from "axios";


function App() {
  const [tickeTable , setTicketTable] = useState([]);
  console.log(tickeTable);
  useEffect(() =>{
    axios('http://127.0.0.1:8000/api/ticket-list/')
    .then(response => setTicketTable(response.data))
    .catch(error => console.error(error))
  },[])

  return (
    <div>
      <Register />
      <button></button>
    </div>
  );
}

export default App;
