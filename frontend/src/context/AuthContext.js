import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);

  let userLogin = async (event) => {
    event.preventDefault();
    let response = fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: null, password: null }),
    });
  };

  let contextData = {
    userLogin: userLogin,
  };

  return (
    <AuthContext.Provider value={{ name: "Ahmed" }}>
      {children}
    </AuthContext.Provider>
  );
};
