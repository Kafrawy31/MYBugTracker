import React, { useContext, useEffect } from "react";
import TicketList from "../components/TicketList.js";
import ProjectList from "../components/ProjectList.js";
import AuthContext from "../context/AuthContext.js";
import Header from "../components/Header.js";

function Homepage() {
  let { user, getUser, devUser } = useContext(AuthContext);

  useEffect(() => {
    getUser();
  }, []);

  let userRole = devUser.UserRole;
  return (
    <div>
      <Header />
      {user && <p> You are logged in as {userRole} </p>}
      <TicketList userRoles={userRole} />
      <ProjectList userRoles={userRole} />
    </div>
  );
}

export default Homepage;
