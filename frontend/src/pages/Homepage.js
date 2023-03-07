import React, { useContext } from "react";
import TicketList from "../components/TicketList.js";
import ProjectList from "../components/ProjectList.js";
import AuthContext from "../context/AuthContext.js";

function Homepage() {
  let { name } = useContext(AuthContext);
  return (
    <div>
      <h3>hello {name}</h3>
      <TicketList />
      <ProjectList />
    </div>
  );
}

export default Homepage;
