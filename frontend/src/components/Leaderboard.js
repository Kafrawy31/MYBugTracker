import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

function Leaderboard() {
  const [monthlyPoints, setMonthlyPoints] = useState([]);
  useEffect(() => {
    const fetchMonthlyPoints = async () => {
      try {
        const response = await axios(`http://127.0.0.1:8000/api/devuser-list/`);
        setMonthlyPoints(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMonthlyPoints();
  }, []);

  const sortedMonthlyPoints = monthlyPoints
    .sort((a, b) => b.MonthlyPoints - a.MonthlyPoints)
    .slice(0, 5);

  let rank = 1;
  return (
    <div className="LBcontainer">
      <div className="leaderboardContainer">
        <h6>Top Developers this Month</h6>
        <table className="Leaderboard">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {sortedMonthlyPoints.map((developer) => {
              return (
                <tr key={developer.UserId} className="devUserLeader">
                  <td>{rank++}</td>
                  <td>{developer.devUserName}</td>
                  <td>{developer.MonthlyPoints}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Leaderboard;
