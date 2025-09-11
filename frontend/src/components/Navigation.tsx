import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PART_TYPES } from "../types";
import "./Navigation.css";

export const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/">PC Parts Inventory</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/build-planner"
            className={location.pathname === "/build-planner" ? "active" : ""}
          >
            Build Planner
          </Link>
        </li>
        {Object.entries(PART_TYPES).map(([key, label]) => (
          <li key={key}>
            <Link
              to={`/${key}`}
              className={location.pathname === `/${key}` ? "active" : ""}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
