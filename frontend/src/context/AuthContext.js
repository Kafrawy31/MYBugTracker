import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [devUser, setDevUser] = useState({});

  let userLogin = async (event) => {
    event.preventDefault();
    let response = await fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: event.target.username.value,
        password: event.target.password.value,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthToken(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/homepage");
    } else {
      alert("something went wrong");
    }
  };

  let userLogout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

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
    } else if (response.status === "unauthorized") {
      userLogout();
    }
  };

  let updateToken = async () => {
    if (loading) {
      setLoading(false);
    }

    let response = await fetch("http://localhost:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authToken?.refresh }),
    });
    let data = await response.json();

    if (response.status === 200) {
      setAuthToken(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      userLogout();
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      if (loading) {
        updateToken();
      }

      if (authToken) {
        updateToken();
      }
    }, 180000);
    return () => clearInterval(interval);
  }, [authToken, loading]);

  let contextData = {
    userLogin: userLogin,
    user: user,
    authToken: authToken,
    userLogout: userLogout,
    devUser: devUser,
    getUser: getUser,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

/*This video https://www.youtube.com/watch?v=xjMP0hspNLE
 was used for reference to implement this*/
