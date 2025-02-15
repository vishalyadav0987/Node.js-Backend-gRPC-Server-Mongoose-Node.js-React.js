import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css"; // Ensure styles are applied

const Navbar = () => {
  const location = useLocation(); // Get current path for active link styling

  return (
    <nav className="navbar">
      <Link to="/" className={location.pathname === "/" ? "active" : ""}>
        Home
      </Link>
      <Link to="/create-task" className={location.pathname === "/create-task" ? "active" : ""}>
        Create Task
      </Link>
    </nav>
  );
};

export default Navbar;
