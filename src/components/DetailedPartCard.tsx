import React from "react";
import type {
  CPU,
  Motherboard,
  PowerSupply,
  GraphicsCard,
  PartType,
} from "../types";
import { PartCard } from "./PartCard";
import "./DetailedPartCard.css";

interface DetailedPartCardProps {
  part: CPU | Motherboard | PowerSupply | GraphicsCard;
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
              <span className="spec-value">{mb.pciSlots}</span>
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
    }
  };

  return (
    <div className="detailed-part-card">
      <PartCard part={part} />
      {renderSpecifications()}
    </div>
  );
};
