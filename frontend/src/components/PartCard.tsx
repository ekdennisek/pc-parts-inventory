import React from "react";
import type { PCPart } from "../types";
import "./PartCard.css";

interface PartCardProps {
  part: PCPart;
}

export const PartCard: React.FC<PartCardProps> = ({ part }) => {
  return (
    <div className="part-card">
      <div className="part-header">
        <h3 className="part-name">{part.name}</h3>
        <div className="part-brand">{part.brand}</div>
      </div>

      <div className="part-description">{part.description}</div>
    </div>
  );
};
