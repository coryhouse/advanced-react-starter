import React from "react";
import Users from "./Users";
import Home from "./Home";
import ManageUser from "./ManageUser";
import { Route, NavLink } from "react-router-dom";

function App() {
  const activeLink = {
    color: "orange"
  };

  return (
    <>
      <NavLink exact activeStyle={activeLink} to="/">
        Home
      </NavLink>{" "}
      |{" "}
      <NavLink activeStyle={activeLink} to="/users">
        Users
      </NavLink>
      <Route path="/" component={Home} exact />
      <Route path="/users" component={Users} />
      <Route path="/manage-user/:id?" component={ManageUser} />
    </>
  );
}

export default App;
