import { Route, Redirect, Navigate } from "react-router-dom";

import React from "react";

const Private = ({ children }) => {
  const auth = true;

  return auth ? children : <Navigate to="/Login" />;
};

export default Private;
