import React from "react";
import type { PCPart } from "../types";
import { getSocketColor } from "../types";
import "./PartCard.css";
import type { CpuSocket } from "../data/sockets";

interface PartCardProps {
  part: PCPart;
  socket?: CpuSocket;
  partType?: string;
}

export const PartCard: React.FC<PartCardProps> = ({ part, socket, partType }) => {
  const socketColorClass = socket ? `socket-${getSocketColor(socket)}` : "";

  return (
    <div className={`part-card ${socketColorClass}`}>
      {part.releaseYear && (
        <div className="part-year-badge" data-type={partType}>
          {part.releaseYear}
        </div>
      )}
      <div className="part-header">
        <h3 className="part-name">{part.name}</h3>
        <div className="part-brand">{part.brand}</div>
      </div>

      <div className="part-description">{part.description}</div>
    </div>
  );
};
