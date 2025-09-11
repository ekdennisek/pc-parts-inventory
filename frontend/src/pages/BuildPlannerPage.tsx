import React, { useState, useMemo } from "react";
import type { PCBuild, BuildStep, Motherboard, CPU, RAM } from "../types";
import { motherboards, cpus, ram } from "../data/parts";
import { PartCard } from "../components/PartCard";
import "./BuildPlannerPage.css";

export const BuildPlannerPage: React.FC = () => {
  const [build, setBuild] = useState<PCBuild>({
    id: "build-1",
    name: "My PC Build",
    ram: [],
  });

  const [currentStep, setCurrentStep] = useState<BuildStep>("motherboard");

  const selectMotherboard = (motherboard: Motherboard) => {
    setBuild((prev) => ({
      ...prev,
      motherboard,
      cpu: undefined, // Reset CPU when motherboard changes
      ram: [], // Reset RAM when motherboard changes
    }));
    setCurrentStep("cpu");
  };

  const selectCPU = (cpu: CPU) => {
    setBuild((prev) => ({ ...prev, cpu }));
    setCurrentStep("ram");
  };

  const toggleRAM = (ramModule: RAM) => {
    setBuild((prev) => {
      const isSelected = prev.ram.some((r) => r.id === ramModule.id);
      if (isSelected) {
        return {
          ...prev,
          ram: prev.ram.filter((r) => r.id !== ramModule.id),
        };
      } else {
        // Check if we have slots available
        const slotsUsed = prev.ram.length;
        const maxSlots = prev.motherboard?.memorySlots || 0;

        if (slotsUsed < maxSlots) {
          return {
            ...prev,
            ram: [...prev.ram, ramModule],
          };
        }
        return prev;
      }
    });
  };

  const finishBuild = () => {
    setCurrentStep("complete");
  };

  const startOver = () => {
    setBuild({
      id: "build-1",
      name: "My PC Build",
      ram: [],
    });
    setCurrentStep("motherboard");
  };

  // Filter compatible CPUs based on selected motherboard
  const compatibleCPUs = useMemo(() => {
    if (!build.motherboard) return [];
    return cpus.filter((cpu) => cpu.socket === build.motherboard!.socket);
  }, [build.motherboard]);

  // Filter compatible RAM based on selected motherboard
  const compatibleRAM = useMemo(() => {
    if (!build.motherboard) return [];
    return ram.filter((ramModule) =>
      build.motherboard!.memoryTypes.includes(ramModule.type)
    );
  }, [build.motherboard]);

  const totalRAMCapacity = build.ram.reduce(
    (total, ramModule) => total + ramModule.capacity,
    0
  );
  const slotsUsed = build.ram.length;
  const maxSlots = build.motherboard?.memorySlots || 0;

  return (
    <div className="build-planner">
      <div className="build-planner-header">
        <h1>PC Build Planner</h1>
        <p>Plan your perfect PC build with compatible components</p>
      </div>

      <div className="build-progress">
        <div className="progress-steps">
          <div
            className={`step ${
              currentStep === "motherboard"
                ? "active"
                : build.motherboard
                ? "completed"
                : ""
            }`}
          >
            <span className="step-number">1</span>
            <span className="step-label">Motherboard</span>
          </div>
          <div
            className={`step ${
              currentStep === "cpu" ? "active" : build.cpu ? "completed" : ""
            }`}
          >
            <span className="step-number">2</span>
            <span className="step-label">CPU</span>
          </div>
          <div
            className={`step ${
              currentStep === "ram"
                ? "active"
                : build.ram.length > 0
                ? "completed"
                : ""
            }`}
          >
            <span className="step-number">3</span>
            <span className="step-label">RAM</span>
          </div>
        </div>
      </div>

      <div className="build-content">
        <div className="build-sidebar">
          <div className="current-build">
            <h3>Current Build</h3>

            {build.motherboard && (
              <div className="selected-component">
                <h4>Motherboard</h4>
                <div className="component-info">
                  <span className="component-name">
                    {build.motherboard.name}
                  </span>
                  <span className="component-detail">
                    Socket: {build.motherboard.socket}
                  </span>
                  <span className="component-detail">
                    Memory: {build.motherboard.memoryTypes.join(", ")}
                  </span>
                  <span className="component-detail">
                    Slots: {build.motherboard.memorySlots}
                  </span>
                </div>
              </div>
            )}

            {build.cpu && (
              <div className="selected-component">
                <h4>CPU</h4>
                <div className="component-info">
                  <span className="component-name">{build.cpu.name}</span>
                  <span className="component-detail">
                    Socket: {build.cpu.socket}
                  </span>
                  <span className="component-detail">
                    {build.cpu.cores} cores, {build.cpu.threads} threads
                  </span>
                </div>
              </div>
            )}

            {build.ram.length > 0 && (
              <div className="selected-component">
                <h4>
                  RAM ({slotsUsed}/{maxSlots} slots)
                </h4>
                <div className="component-info">
                  <span className="component-detail">
                    Total: {totalRAMCapacity}GB
                  </span>
                  {build.ram.map((ramModule) => (
                    <span key={ramModule.id} className="ram-module">
                      {ramModule.capacity}GB {ramModule.type} @{" "}
                      {ramModule.speed}MHz
                    </span>
                  ))}
                </div>
              </div>
            )}

            {currentStep === "complete" && (
              <div className="build-actions">
                <button onClick={startOver} className="btn btn-secondary">
                  Start New Build
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="build-main">
          {currentStep === "motherboard" && (
            <div className="step-content">
              <h2>Step 1: Select a Motherboard</h2>
              <p>
                Choose a motherboard to start your build. This will determine
                CPU and RAM compatibility.
              </p>
              <div className="parts-grid">
                {motherboards.map((motherboard) => (
                  <div
                    key={motherboard.id}
                    onClick={() => selectMotherboard(motherboard)}
                    className="clickable"
                  >
                    <PartCard part={motherboard} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === "cpu" && (
            <div className="step-content">
              <h2>Step 2: Select a CPU</h2>
              <p>
                Choose a CPU compatible with your {build.motherboard?.socket}{" "}
                motherboard.
              </p>
              {compatibleCPUs.length === 0 ? (
                <p className="no-compatible">
                  No compatible CPUs found for this motherboard.
                </p>
              ) : (
                <div className="parts-grid">
                  {compatibleCPUs.map((cpu) => (
                    <div
                      key={cpu.id}
                      onClick={() => selectCPU(cpu)}
                      className="clickable"
                    >
                      <PartCard part={cpu} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentStep === "ram" && (
            <div className="step-content">
              <h2>Step 3: Select RAM</h2>
              <p>
                Choose RAM modules compatible with your motherboard. You can
                select multiple modules (up to {maxSlots} slots).
              </p>
              {compatibleRAM.length === 0 ? (
                <p className="no-compatible">
                  No compatible RAM found for this motherboard.
                </p>
              ) : (
                <>
                  <div className="ram-info">
                    <span>
                      Compatible types:{" "}
                      {build.motherboard?.memoryTypes.join(", ")}
                    </span>
                    <span>
                      Slots used: {slotsUsed}/{maxSlots}
                    </span>
                    <span>Total capacity: {totalRAMCapacity}GB</span>
                  </div>
                  <div className="parts-grid">
                    {compatibleRAM.map((ramModule) => {
                      const isSelected = build.ram.some(
                        (r) => r.id === ramModule.id
                      );
                      const canSelect = slotsUsed < maxSlots || isSelected;

                      return (
                        <div
                          key={ramModule.id}
                          onClick={() => canSelect && toggleRAM(ramModule)}
                          className={`clickable ${
                            isSelected ? "selected" : ""
                          } ${!canSelect ? "disabled" : ""}`}
                        >
                          <PartCard part={ramModule} />
                          {isSelected && (
                            <div className="selected-indicator">✓ Selected</div>
                          )}
                          {!canSelect && (
                            <div className="disabled-indicator">
                              No slots available
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {build.ram.length > 0 && (
                    <div className="step-actions">
                      <button onClick={finishBuild} className="btn btn-primary">
                        Finish Build
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {currentStep === "complete" && (
            <div className="step-content">
              <h2>🎉 Build Complete!</h2>
              <p>
                Your PC build is ready. Review your selected components in the
                sidebar.
              </p>
              <div className="build-summary">
                <h3>Build Summary</h3>
                <ul>
                  <li>
                    <strong>Motherboard:</strong> {build.motherboard?.name}
                  </li>
                  <li>
                    <strong>CPU:</strong> {build.cpu?.name}
                  </li>
                  <li>
                    <strong>RAM:</strong> {build.ram.length} modules,{" "}
                    {totalRAMCapacity}GB total
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
