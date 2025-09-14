import React from "react";
import type { PCPart, CpuSocket } from "../types";
import { getSocketColor } from "../types";
import "./PartCard.css";

interface PartCardProps {
  part: PCPart;
  socket?: CpuSocket;
}

export const PartCard: React.FC<PartCardProps> = ({ part, socket }) => {
  const socketColorClass = socket ? `socket-${getSocketColor(socket)}` : "";

  return (
    <div className={`part-card ${socketColorClass}`}>
      <div className="part-header">
        <h3 className="part-name">{part.name}</h3>
        <div className="part-brand">{part.brand}</div>
      </div>

      <div className="part-description">{part.description}</div>
    </div>
  );
};
