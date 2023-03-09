import React, { useContext, useEffect, useState } from "react";
import TicketList from "../components/TicketList.js";
import ProjectList from "../components/ProjectList.js";
import AuthContext from "../context/AuthContext.js";

function Homepage() {
  let { user, authToken, userLogout } = useContext(AuthContext);
  const [devUser, setDevUser] = useState({});

  useEffect(() => {
    getUser();
  }, []);

  let getUser = async () => {
    let response = await fetch(
      `http://127.0.0.1:8000/api/devuser/${user.user_id}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + String(authToken.access),
        },
      }
    );
    let data = await response.json();
    if (response.status === 200) {
      setDevUser(data);
      console.log(user);
    } else if (response.status === "unauthorized") {
      userLogout();
    }
  };

  return (
    <div>
      {user && <p> You are logged in as {devUser.UserRole} </p>}
      <TicketList />
      <ProjectList />
    </div>
  );
}

export default Homepage;
