import React, { useContext, useEffect } from "react";
import TicketList from "../components/TicketList.js";
import ProjectList from "../components/ProjectList.js";
import AuthContext from "../context/AuthContext.js";
import Header from "../components/Header.js";
import Leaderboard from "../components/Leaderboard.js";

function Homepage() {
  let { user, getUser, devUser } = useContext(AuthContext);

  useEffect(() => {
    getUser();
  }, []);
  let userRole = devUser.UserRole;
  return (
    <div>
      <Header Role={userRole} />
      {user && <p> You are logged in as {userRole} </p>}
      <span className="homePage">
        <TicketList userRoles={userRole} thisUser={devUser} />
        <Leaderboard />
      </span>
      <ProjectList userRoles={userRole} />
    </div>
  );
}

export default Homepage;
