import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { builds } from "../data/builds";
import { cases } from "../data/cases";
import { motherboards } from "../data/motherboards";
import { cpus } from "../data/cpus";
import { ram } from "../data/ram";
import { powerSupplies } from "../data/powerSupplies";
import { graphicsCards } from "../data/gpus";
import type { Case, Motherboard, CPU, RAM, PowerSupply, GraphicsCard } from "../types";
import { ScrollToTop } from "../components/ScrollToTop";
import "./BuildsPage.css";

interface ResolvedBuild {
  id: string;
  name: string;
  description?: string;
  case?: Case;
  motherboard?: Motherboard;
  cpus: CPU[];
  ram: RAM[];
  powerSupply?: PowerSupply;
  graphicsCards: GraphicsCard[];
}

export const BuildsPage: React.FC = () => {
  const componentMaps = useMemo(
    () => ({
      cases: new Map(cases.map((c) => [c.id, c])),
      motherboards: new Map(motherboards.map((m) => [m.id, m])),
      cpus: new Map(cpus.map((c) => [c.id, c])),
      ram: new Map(ram.map((r) => [r.id, r])),
      powerSupplies: new Map(powerSupplies.map((p) => [p.id, p])),
      graphicsCards: new Map(graphicsCards.map((g) => [g.id, g])),
    }),
    []
  );

  const resolvedBuilds = useMemo(() => {
    return builds.map(
      (build): ResolvedBuild => ({
        id: build.id,
        name: build.name,
        description: build.description,
        case: componentMaps.cases.get(build.caseId),
        motherboard: componentMaps.motherboards.get(build.motherboardId),
        cpus: build.cpuIds
          .map((id) => componentMaps.cpus.get(id))
          .filter((c): c is CPU => c !== undefined),
        ram: build.ramIds
          .map((id) => componentMaps.ram.get(id))
          .filter((r): r is RAM => r !== undefined),
        powerSupply: componentMaps.powerSupplies.get(build.powerSupplyId),
        graphicsCards: (build.graphicsCardIds || [])
          .map((id) => componentMaps.graphicsCards.get(id))
          .filter((g): g is GraphicsCard => g !== undefined),
      })
    );
  }, [componentMaps]);

  return (
    <div className="builds-page">
      <div className="builds-header">
        <h1>PC Builds</h1>
        <p>Complete PC builds from the inventory</p>
      </div>

      {resolvedBuilds.length === 0 ? (
        <div className="no-builds">
          <p>No builds yet.</p>
          <p>
            Use the <Link to="/build-planner">Build Planner</Link> to create a
            build and copy it to clipboard.
          </p>
        </div>
      ) : (
        <div className="builds-grid">
          {resolvedBuilds.map((build) => (
            <BuildCard key={build.id} build={build} />
          ))}
        </div>
      )}

      <ScrollToTop />
    </div>
  );
};

const BuildCard: React.FC<{ build: ResolvedBuild }> = ({ build }) => {
  const totalRamCapacity = build.ram.reduce((sum, r) => sum + r.capacity, 0);

  return (
    <div className="build-card">
      <h2>{build.name}</h2>
      {build.description && (
        <p className="build-description">{build.description}</p>
      )}

      <div className="build-components">
        {build.case && (
          <div className="build-component">
            <span className="component-label">Case</span>
            <span className="component-value">{build.case.name}</span>
            <span className="component-detail">
              {build.case.supportedFormFactors.join(", ")}
            </span>
          </div>
        )}

        {build.motherboard && (
          <div className="build-component">
            <span className="component-label">Motherboard</span>
            <span className="component-value">{build.motherboard.name}</span>
            <span className="component-detail">
              {build.motherboard.socket} | {build.motherboard.formFactor}
            </span>
          </div>
        )}

        {build.cpus.length > 0 && (
          <div className="build-component">
            <span className="component-label">
              CPU{build.cpus.length > 1 ? "s" : ""}
            </span>
            {build.cpus.map((cpu) => (
              <div key={cpu.id}>
                <span className="component-value">{cpu.name}</span>
                <span className="component-detail">
                  {cpu.cores} cores | {cpu.baseClock}GHz
                </span>
              </div>
            ))}
          </div>
        )}

        {build.ram.length > 0 && (
          <div className="build-component">
            <span className="component-label">RAM</span>
            <span className="component-value">
              {totalRamCapacity}GB total ({build.ram.length} module
              {build.ram.length > 1 ? "s" : ""})
            </span>
            {build.ram.map((r) => (
              <span key={r.id} className="component-detail">
                {r.capacity}GB {r.type} @ {r.speed}MHz
              </span>
            ))}
          </div>
        )}

        {build.powerSupply && (
          <div className="build-component">
            <span className="component-label">PSU</span>
            <span className="component-value">{build.powerSupply.name}</span>
            <span className="component-detail">
              {build.powerSupply.wattage}W | {build.powerSupply.efficiency}
            </span>
          </div>
        )}

        {build.graphicsCards.length > 0 && (
          <div className="build-component">
            <span className="component-label">
              GPU{build.graphicsCards.length > 1 ? "s" : ""}
            </span>
            {build.graphicsCards.map((gpu) => (
              <div key={gpu.id}>
                <span className="component-value">{gpu.name}</span>
                <span className="component-detail">
                  {gpu.memory}GB {gpu.memoryType}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
