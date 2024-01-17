import React from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddUser from "./components/create-user.component.tsx";
import User from "./components/user.component.tsx";
import UsersList from "./components/users-list.component.tsx";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/users"} className="navbar-brand">
          Vitosha Connections
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink to={"/users"} className="nav-link" activeClassName="active">
              Users
            </NavLink>
          </li>
          <li className="nav-item">
            {/* trqbva da napravish taka che da suzdava nov user */}
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<UsersList />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;