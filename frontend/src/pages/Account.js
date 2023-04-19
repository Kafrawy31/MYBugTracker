import React, { useContext } from "react";
import ProjectContext from "../context/ProjectContext.js";
import TicketTable from "../components/TicketTable.js";
import Header from "../components/Header.js";
import AuthContext from "../context/AuthContext.js";
import TicketList from "../components/TicketList.js";

function Account() {
  let { user, getUser, devUser } = useContext(AuthContext);
  let { userTickets } = useContext(ProjectContext);
  return (
    <div>
      <Header />
      <div className="Container--Account">
        <p className="Welcome--Account">Welcome: {user.username}</p>

        <p className="Monthlypoints--Account">
          You have accumlated <strong>{devUser.MonthlyPoints}</strong> points
          this month
        </p>
        <p className="TotalPoints--Account">
          Your total career points: <strong>{devUser.UserPoints}</strong>
        </p>
        <TicketList userRole={devUser.userRole} givenTickets={userTickets} />
      </div>
    </div>
  );
}
export default Account;
