import React, { useContext, useEffect, useState } from "react";
import TicketList from "../components/TicketList.js";
import ProjectList from "../components/ProjectList.js";
import AuthContext from "../context/AuthContext.js";
import Header from "../components/Header.js";

function Homepage() {
  let { user, authToken, userLogout, getUser, devUser } =
    useContext(AuthContext);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Header />
      {user && <p> You are logged in as {devUser.UserRole} </p>}
      <TicketList />
      <ProjectList />
    </div>
  );
}

export default Homepage;
