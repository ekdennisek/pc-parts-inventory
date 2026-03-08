import React from "react";
import "./FilterBar.css";

interface FilterBarProps {
  children: React.ReactNode;
}

export const FilterBar: React.FC<FilterBarProps> = ({ children }) => {
  return <div className="filter-bar">{children}</div>;
};
