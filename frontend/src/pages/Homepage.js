import React, { useContext } from "react";
import TicketList from "../components/TicketList.js";
import ProjectList from "../components/ProjectList.js";
import AuthContext from "../context/AuthContext.js";

function Homepage() {
  let { user } = useContext(AuthContext);
  return (
    <div>
      <TicketList />
      <ProjectList />
    </div>
  );
}

export default Homepage;
