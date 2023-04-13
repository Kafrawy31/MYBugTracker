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

  let monthly = monthlyPoints.map((x) => x.MonthlyPoints);

  return (
    <div>
      <h1>leaderboard</h1>
    </div>
  );
}
export default Leaderboard;
