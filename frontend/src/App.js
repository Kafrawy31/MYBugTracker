import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./Reset.css";
import Register from "./pages/Register.js";
import Homepage from "./pages/Homepage.js";
import Login from "./pages/Login.js";
import Private from "./utils/Private.js";
import { AuthProvider } from "./context/AuthContext.js";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Register />} exact></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route
              path="/homepage"
              element={
                <Private>
                  <Homepage />
                </Private>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
