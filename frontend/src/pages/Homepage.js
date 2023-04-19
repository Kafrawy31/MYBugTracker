import React, { useContext, useEffect } from "react";
import TicketList from "../components/TicketList.js";
import ProjectList from "../components/ProjectList.js";
import AuthContext from "../context/AuthContext.js";
import Header from "../components/Header.js";
import Leaderboard from "../components/Leaderboard.js";
import ProjectContext from "../context/ProjectContext.js";

function Homepage() {
  let { user, getUser, devUser } = useContext(AuthContext);
  let { allTickets } = useContext(ProjectContext);

  useEffect(() => {
    getUser();
  }, []);
  let userRole = devUser.UserRole;
  console.log(devUser);
  return (
    <div>
      <Header Role={userRole} />
      <p className="Homepage--Welcome">Welcome {devUser.devUserName}</p>
      {user && (
        <p className="Homepage--Role"> You are logged in as {userRole} </p>
      )}
      <div className="Container--Homepage">
        <TicketList
          userRoles={userRole}
          thisUser={devUser}
          givenTickets={allTickets}
        />
        <Leaderboard />
      </div>

      <ProjectList userRoles={userRole} />
    </div>
  );
}

export default Homepage;
