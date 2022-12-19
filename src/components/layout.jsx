import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { users } from "..";

// un utilisateur va se connecter 
export const Layout = () => {
  const { me } = React.useContext(users);

  return <div> {me ? <Outlet /> : <Navigate to="/login" />}</div>;
};
