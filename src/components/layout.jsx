import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { users } from "..";

export const Layout = () => {
  const { me } = React.useContext(users);

  return <div> {me ? <Outlet /> : <Navigate to="/login" />}</div>;
};
