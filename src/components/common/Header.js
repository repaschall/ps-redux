import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };

  return (
    <header>
      <nav className="nav">
        <NavLink className="nav-link" to="/" activeStyle={activeStyle} exact>
          Home
        </NavLink>
        <NavLink className="nav-link" to="/courses" activeStyle={activeStyle}>
          Courses
        </NavLink>
        <NavLink className="nav-link" to="/about" activeStyle={activeStyle}>
          About
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
