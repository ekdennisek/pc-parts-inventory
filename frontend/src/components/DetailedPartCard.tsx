import React from "react";
import type {
  CPU,
  Motherboard,
  PowerSupply,
  GraphicsCard,
  RAM,
  Case,
  PartType,
} from "../types";
import { PartCard } from "./PartCard";
import "./DetailedPartCard.css";

interface DetailedPartCardProps {
  part: CPU | Motherboard | PowerSupply | GraphicsCard | RAM | Case;
  partType: PartType;
}

export const DetailedPartCard: React.FC<DetailedPartCardProps> = ({
  part,
  partType,
}) => {
  const renderSpecifications = () => {
    switch (partType) {
      case "cpu": {
        const cpu = part as CPU;
        return (
          <div className="specifications">
            <div className="spec-item">
              <span className="spec-label">Cores/Threads:</span>
              <span className="spec-value">
                {cpu.cores}/{cpu.threads}
              </span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Base Clock:</span>
              <span className="spec-value">{cpu.baseClock} GHz</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Boost Clock:</span>
              <span className="spec-value">
                {cpu.boostClock ? `${cpu.boostClock} GHz` : "-"}
              </span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Socket:</span>
              <span className="spec-value">{cpu.socket}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">TDP:</span>
              <span className="spec-value">{cpu.tdp}W</span>
            </div>
          </div>
        );
      }

      case "motherboard": {
        const mb = part as Motherboard;
        return (
          <div className="specifications">
            <div className="spec-item">
              <span className="spec-label">Socket:</span>
              <span className="spec-value">{mb.socket}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Form Factor:</span>
              <span className="spec-value">{mb.formFactor}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Chipset:</span>
              <span className="spec-value">{mb.chipset}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Memory Slots:</span>
              <span className="spec-value">{mb.memorySlots}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Max Memory:</span>
              <span className="spec-value">{mb.maxMemory} GB</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">PCIe Slots:</span>
              <span className="spec-value">{mb.pcieSlots}</span>
            </div>
          </div>
        );
      }

      case "powerSupply": {
        const psu = part as PowerSupply;
        return (
          <div className="specifications">
            <div className="spec-item">
              <span className="spec-label">Wattage:</span>
              <span className="spec-value">{psu.wattage}W</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Efficiency:</span>
              <span className="spec-value">{psu.efficiency}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Modular:</span>
              <span className="spec-value">{psu.modular ? "Yes" : "No"}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Form Factor:</span>
              <span className="spec-value">{psu.formFactor}</span>
            </div>
          </div>
        );
      }

      case "graphicsCard": {
        const gpu = part as GraphicsCard;
        return (
          <div className="specifications">
            <div className="spec-item">
              <span className="spec-label">Memory:</span>
              <span className="spec-value">
                {gpu.memory} GB {gpu.memoryType}
              </span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Core Clock:</span>
              <span className="spec-value">{gpu.coreClock} MHz</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Boost Clock:</span>
              <span className="spec-value">{gpu.boostClock} MHz</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Power:</span>
              <span className="spec-value">{gpu.powerConsumption}W</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Interface:</span>
              <span className="spec-value">{gpu.interface}</span>
            </div>
          </div>
        );
      }

      case "ram": {
        const memory = part as RAM;
        return (
          <div className="specifications">
            <div className="spec-item">
              <span className="spec-label">Capacity:</span>
              <span className="spec-value">{memory.capacity} GB</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Type:</span>
              <span className="spec-value">{memory.type}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Speed:</span>
              <span className="spec-value">{memory.speed} MHz</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Timings:</span>
              <span className="spec-value">{memory.timings || "-"}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Voltage:</span>
              <span className="spec-value">
                {memory.voltage ? `${memory.voltage}V` : "-"}
              </span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Form Factor:</span>
              <span className="spec-value">{memory.formFactor}</span>
            </div>
          </div>
        );
      }

      case "case": {
        const pcCase = part as Case;
        return (
          <div className="specifications">
            <div className="spec-item">
              <span className="spec-label">Supported Form Factors:</span>
              <span className="spec-value">
                {pcCase.supportedFormFactors.join(", ")}
              </span>
            </div>
            <div className="spec-item">
              <span className="spec-label">5.25" Drive Bays:</span>
              <span className="spec-value">{pcCase.external525Drives}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">3.5" Drive Bays:</span>
              <span className="spec-value">{pcCase.external35Drives}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Glass Panel:</span>
              <span className="spec-value">
                {pcCase.glassPanel ? "Yes" : "No"}
              </span>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div className="detailed-part-card-wrapper">
      {part.releaseYear && (
        <div className="part-year-badge" data-type={partType}>
          {part.releaseYear}
        </div>
      )}
      <div className="detailed-part-card">
        <PartCard
          part={part}
          socket={
            partType === "motherboard"
              ? (part as Motherboard).socket
              : partType === "cpu"
              ? (part as CPU).socket
              : undefined
          }
        />
        {renderSpecifications()}
      </div>
    </div>
  );
};
