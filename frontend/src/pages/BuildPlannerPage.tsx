import React, { useState, useMemo } from "react";
import type {
  PCBuild,
  BuildStep,
  Motherboard,
  CPU,
  RAM,
  Case,
  PowerSupply,
  GraphicsCard,
  Storage,
  Peripheral,
  MotherboardFormFactor,
  SavedBuild,
} from "../types";
import { motherboards } from "../data/motherboards";
import { cpus } from "../data/cpus";
import { ram } from "../data/ram";
import { cases } from "../data/cases";
import { powerSupplies } from "../data/powerSupplies";
import { graphicsCards } from "../data/gpus";
import { storage } from "../data/storage";
import { peripherals } from "../data/peripherals";
import { motherboardFormFactors } from "../types";
import { PartCard } from "../components/PartCard";
import { usedPartIds } from "../data/builds";
import { FilterDropdown } from "../components/FilterDropdown";
import "./BuildPlannerPage.css";
import { FilterBar } from "../components/FilterBar";

export const BuildPlannerPage: React.FC = () => {
  const [build, setBuild] = useState<PCBuild>({
    id: "build-1",
    name: "My PC Build",
    ram: [],
    storage: [],
    peripherals: [],
  });

  const [currentStep, setCurrentStep] = useState<BuildStep>("case");
  const [selectedFormFactors, setSelectedFormFactors] = useState<
    MotherboardFormFactor[]
  >([]);
  const [copySuccess, setCopySuccess] = useState(false);

  const selectCase = (pcCase: Case) => {
    setBuild((prev) => ({
      ...prev,
      case: pcCase,
      // Reset downstream selections if case compatibility changes
      motherboard:
        prev.case &&
        prev.motherboard &&
        !pcCase.supportedFormFactors.includes(prev.motherboard.formFactor)
          ? undefined
          : prev.motherboard,
      cpu:
        prev.case &&
        prev.motherboard &&
        !pcCase.supportedFormFactors.includes(prev.motherboard.formFactor)
          ? undefined
          : prev.cpu,
      ram:
        prev.case &&
        prev.motherboard &&
        !pcCase.supportedFormFactors.includes(prev.motherboard.formFactor)
          ? []
          : prev.ram,
    }));
    setCurrentStep("motherboard");
  };

  const changeCase = () => {
    setCurrentStep("case");
  };

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

  const proceedToPSU = () => {
    setCurrentStep("powerSupply");
  };

  const selectPowerSupply = (psu: PowerSupply) => {
    setBuild((prev) => ({ ...prev, powerSupply: psu }));
    setCurrentStep("graphicsCard");
  };

  const toggleGraphicsCard = (gpu: GraphicsCard) => {
    setBuild((prev) => {
      const currentCards = prev.graphicsCard ? [prev.graphicsCard] : [];
      const isSelected = currentCards.some((g) => g.id === gpu.id);
      if (isSelected) {
        return { ...prev, graphicsCard: undefined };
      }
      return { ...prev, graphicsCard: gpu };
    });
  };

  const proceedToStorage = () => {
    setCurrentStep("storage");
  };

  const toggleStorage = (item: Storage) => {
    setBuild((prev) => {
      const isSelected = prev.storage.some((s) => s.id === item.id);
      if (isSelected) {
        return {
          ...prev,
          storage: prev.storage.filter((s) => s.id !== item.id),
        };
      }
      return { ...prev, storage: [...prev.storage, item] };
    });
  };

  const proceedToPeripherals = () => {
    setCurrentStep("peripheral");
  };

  const togglePeripheral = (item: Peripheral) => {
    setBuild((prev) => {
      const isSelected = prev.peripherals.some((p) => p.id === item.id);
      if (isSelected) {
        return {
          ...prev,
          peripherals: prev.peripherals.filter((p) => p.id !== item.id),
        };
      }
      return { ...prev, peripherals: [...prev.peripherals, item] };
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
      storage: [],
      peripherals: [],
    });
    setSelectedFormFactors([]);
    setCurrentStep("case");
    setCopySuccess(false);
  };

  const changeMotherboard = () => {
    setBuild((prev) => ({
      ...prev,
      motherboard: undefined,
      cpu: undefined,
      ram: [],
      powerSupply: undefined,
      graphicsCard: undefined,
    }));
    setCurrentStep("motherboard");
  };

  const changeCPU = () => {
    setBuild((prev) => ({ ...prev, cpu: undefined }));
    setCurrentStep("cpu");
  };

  const changeRAM = () => {
    setCurrentStep("ram");
  };

  const changePSU = () => {
    setBuild((prev) => ({ ...prev, powerSupply: undefined }));
    setCurrentStep("powerSupply");
  };

  const changeGPU = () => {
    setCurrentStep("graphicsCard");
  };

  const changeStorage = () => {
    setCurrentStep("storage");
  };

  const changePeripherals = () => {
    setCurrentStep("peripheral");
  };

  const goToStep = (step: BuildStep) => {
    if (step === "case") {
      setCurrentStep("case");
    } else if (step === "motherboard" && build.case) {
      setCurrentStep("motherboard");
    } else if (step === "cpu" && build.motherboard) {
      setCurrentStep("cpu");
    } else if (step === "ram" && build.motherboard && build.cpu) {
      setCurrentStep("ram");
    } else if (
      step === "powerSupply" &&
      build.motherboard &&
      build.cpu &&
      build.ram.length > 0
    ) {
      setCurrentStep("powerSupply");
    } else if (
      step === "graphicsCard" &&
      build.motherboard &&
      build.cpu &&
      build.ram.length > 0 &&
      build.powerSupply
    ) {
      setCurrentStep("graphicsCard");
    } else if (step === "storage" && build.powerSupply) {
      setCurrentStep("storage");
    } else if (step === "peripheral" && build.powerSupply) {
      setCurrentStep("peripheral");
    }
  };

  const copyBuildToClipboard = async () => {
    if (!build.case || !build.motherboard || !build.cpu || !build.powerSupply) {
      return;
    }

    const savedBuild: SavedBuild = {
      id: `build-${Date.now()}`,
      name: build.name,
      caseId: build.case.id,
      motherboardId: build.motherboard.id,
      cpuIds: [build.cpu.id],
      ramIds: build.ram.map((r) => r.id),
      powerSupplyId: build.powerSupply.id,
      ...(build.graphicsCard && { graphicsCardIds: [build.graphicsCard.id] }),
      ...(build.storage.length > 0 && {
        storageIds: build.storage.map((s) => s.id),
      }),
      ...(build.peripherals.length > 0 && {
        peripheralIds: build.peripherals.map((p) => p.id),
      }),
    };

    const jsonString = JSON.stringify(savedBuild, null, 2);

    try {
      await navigator.clipboard.writeText(jsonString);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Filter cases based on selected form factors
  const filteredCases = useMemo(() => {
    if (selectedFormFactors.length === 0) {
      return cases;
    }
    return cases.filter((pcCase) =>
      selectedFormFactors.some((formFactor) =>
        pcCase.supportedFormFactors.includes(formFactor),
      ),
    );
  }, [selectedFormFactors]);

  // Filter motherboards based on selected case
  const availableMotherboards = useMemo(() => {
    if (!build.case) {
      return motherboards;
    }
    return motherboards.filter((mb) =>
      build.case!.supportedFormFactors.includes(mb.formFactor),
    );
  }, [build.case]);

  // Filter compatible CPUs based on selected motherboard
  const compatibleCPUs = useMemo(() => {
    if (!build.motherboard) return [];
    return cpus.filter((cpu) => cpu.socket === build.motherboard!.socket);
  }, [build.motherboard]);

  // Filter compatible RAM based on selected motherboard
  const compatibleRAM = useMemo(() => {
    if (!build.motherboard) return [];
    return ram.filter((ramModule) =>
      build.motherboard!.memoryTypes.includes(ramModule.type),
    );
  }, [build.motherboard]);

  const totalRAMCapacity = build.ram.reduce(
    (total, ramModule) => total + ramModule.capacity,
    0,
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
              currentStep === "case"
                ? "active"
                : build.case
                  ? "completed clickable"
                  : ""
            }`}
            onClick={() => goToStep("case")}
          >
            <span className="step-number">1</span>
            <span className="step-label">Case</span>
          </div>
          <div
            className={`step ${
              currentStep === "motherboard"
                ? "active"
                : build.motherboard
                  ? "completed clickable"
                  : build.case
                    ? "available"
                    : ""
            }`}
            onClick={() => build.case && goToStep("motherboard")}
          >
            <span className="step-number">2</span>
            <span className="step-label">Motherboard</span>
          </div>
          <div
            className={`step ${
              currentStep === "cpu"
                ? "active"
                : build.cpu
                  ? "completed clickable"
                  : build.motherboard
                    ? "available"
                    : ""
            }`}
            onClick={() => build.motherboard && goToStep("cpu")}
          >
            <span className="step-number">3</span>
            <span className="step-label">CPU</span>
          </div>
          <div
            className={`step ${
              currentStep === "ram"
                ? "active"
                : build.ram.length > 0
                  ? "completed clickable"
                  : build.motherboard && build.cpu
                    ? "available"
                    : ""
            }`}
            onClick={() => build.motherboard && build.cpu && goToStep("ram")}
          >
            <span className="step-number">4</span>
            <span className="step-label">RAM</span>
          </div>
          <div
            className={`step ${
              currentStep === "powerSupply"
                ? "active"
                : build.powerSupply
                  ? "completed clickable"
                  : build.ram.length > 0
                    ? "available"
                    : ""
            }`}
            onClick={() => build.ram.length > 0 && goToStep("powerSupply")}
          >
            <span className="step-number">5</span>
            <span className="step-label">PSU</span>
          </div>
          <div
            className={`step ${
              currentStep === "graphicsCard"
                ? "active"
                : build.graphicsCard
                  ? "completed clickable"
                  : build.powerSupply
                    ? "available"
                    : ""
            }`}
            onClick={() => build.powerSupply && goToStep("graphicsCard")}
          >
            <span className="step-number">6</span>
            <span className="step-label">GPU</span>
          </div>
          <div
            className={`step ${
              currentStep === "storage"
                ? "active"
                : build.storage.length > 0
                  ? "completed clickable"
                  : build.powerSupply
                    ? "available"
                    : ""
            }`}
            onClick={() => build.powerSupply && goToStep("storage")}
          >
            <span className="step-number">7</span>
            <span className="step-label">Storage</span>
          </div>
          <div
            className={`step ${
              currentStep === "peripheral"
                ? "active"
                : build.peripherals.length > 0
                  ? "completed clickable"
                  : build.powerSupply
                    ? "available"
                    : ""
            }`}
            onClick={() => build.powerSupply && goToStep("peripheral")}
          >
            <span className="step-number">8</span>
            <span className="step-label">Peripherals</span>
          </div>
        </div>
      </div>

      <div className="build-content">
        <div className="build-sidebar">
          <div className="current-build">
            <h3>Current Build</h3>

            {build.case && (
              <div className="selected-component">
                <div className="component-header">
                  <h4>Case</h4>
                  <button
                    onClick={changeCase}
                    className="btn btn-change"
                    title="Change case"
                  >
                    Change
                  </button>
                </div>
                <div className="component-info">
                  <span className="component-name">{build.case.name}</span>
                  <span className="component-detail">
                    Form Factors: {build.case.supportedFormFactors.join(", ")}
                  </span>
                  <span className="component-detail">
                    Glass Panel: {build.case.glassPanel ? "Yes" : "No"}
                  </span>
                  {(build.case.external525Drives > 0 ||
                    build.case.external35Drives > 0) && (
                    <span className="component-detail">
                      Drive Bays: {build.case.external525Drives}x 5.25",{" "}
                      {build.case.external35Drives}x 3.5"
                    </span>
                  )}
                </div>
              </div>
            )}

            {build.motherboard && (
              <div className="selected-component">
                <div className="component-header">
                  <h4>Motherboard</h4>
                  <button
                    onClick={changeMotherboard}
                    className="btn btn-change"
                    title="Change motherboard"
                  >
                    Change
                  </button>
                </div>
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
                <div className="component-header">
                  <h4>CPU</h4>
                  <button
                    onClick={changeCPU}
                    className="btn btn-change"
                    title="Change CPU"
                  >
                    Change
                  </button>
                </div>
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
                <div className="component-header">
                  <h4>
                    RAM ({slotsUsed}/{maxSlots} slots)
                  </h4>
                  <button
                    onClick={changeRAM}
                    className="btn btn-change"
                    title="Change RAM selection"
                  >
                    Change
                  </button>
                </div>
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

            {build.powerSupply && (
              <div className="selected-component">
                <div className="component-header">
                  <h4>Power Supply</h4>
                  <button
                    onClick={changePSU}
                    className="btn btn-change"
                    title="Change PSU"
                  >
                    Change
                  </button>
                </div>
                <div className="component-info">
                  <span className="component-name">
                    {build.powerSupply.name}
                  </span>
                  <span className="component-detail">
                    {build.powerSupply.wattage}W |{" "}
                    {build.powerSupply.efficiency || "No rating"}
                  </span>
                </div>
              </div>
            )}

            {build.graphicsCard && (
              <div className="selected-component">
                <div className="component-header">
                  <h4>Graphics Card</h4>
                  <button
                    onClick={changeGPU}
                    className="btn btn-change"
                    title="Change GPU"
                  >
                    Change
                  </button>
                </div>
                <div className="component-info">
                  <span className="component-name">
                    {build.graphicsCard.name}
                  </span>
                  <span className="component-detail">
                    {build.graphicsCard.memory}GB{" "}
                    {build.graphicsCard.memoryType}
                  </span>
                </div>
              </div>
            )}

            {build.storage.length > 0 && (
              <div className="selected-component">
                <div className="component-header">
                  <h4>Storage ({build.storage.length})</h4>
                  <button
                    onClick={changeStorage}
                    className="btn btn-change"
                    title="Change storage"
                  >
                    Change
                  </button>
                </div>
                <div className="component-info">
                  {build.storage.map((s) => (
                    <span key={s.id} className="component-detail">
                      {s.name} — {s.capacity}GB {s.type}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {build.peripherals.length > 0 && (
              <div className="selected-component">
                <div className="component-header">
                  <h4>Peripherals ({build.peripherals.length})</h4>
                  <button
                    onClick={changePeripherals}
                    className="btn btn-change"
                    title="Change peripherals"
                  >
                    Change
                  </button>
                </div>
                <div className="component-info">
                  {build.peripherals.map((p) => (
                    <span key={p.id} className="component-detail">
                      {p.name} — {p.formFactor}
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
          {currentStep === "case" && (
            <div className="step-content">
              <h2>Step 1: Select a Case</h2>
              <p>
                Choose a case for your build. This will filter motherboards by
                compatible form factors.
              </p>

              <FilterBar>
                <FilterDropdown
                  label="Form Factor"
                  options={[...motherboardFormFactors].map((f) => ({
                    value: f,
                    label: f,
                  }))}
                  mode="multi"
                  selectedValues={selectedFormFactors}
                  onChange={(values) =>
                    setSelectedFormFactors(values as MotherboardFormFactor[])
                  }
                />
              </FilterBar>

              <div className="parts-grid">
                {filteredCases.map((pcCase) => (
                  <div
                    key={pcCase.id}
                    onClick={() => selectCase(pcCase)}
                    className="clickable"
                  >
                    <PartCard
                      part={pcCase}
                      partType="case"
                      inBuild={usedPartIds.has(pcCase.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === "motherboard" && (
            <div className="step-content">
              <h2>Step 2: Select a Motherboard</h2>
              <p>
                {build.case
                  ? `Choose a motherboard compatible with your ${build.case.name} case (${build.case.supportedFormFactors.join(", ")}).`
                  : "Choose a motherboard to start your build. This will determine CPU and RAM compatibility."}
              </p>
              <div className="socket-legend">
                <div className="legend-item">
                  <div className="legend-color intel-color"></div>
                  <span>Intel Sockets</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color amd-color"></div>
                  <span>AMD Sockets</span>
                </div>
              </div>
              <div className="parts-grid">
                {availableMotherboards.map((motherboard) => (
                  <div
                    key={motherboard.id}
                    onClick={() => selectMotherboard(motherboard)}
                    className="clickable"
                  >
                    <PartCard
                      part={motherboard}
                      socket={motherboard.socket}
                      partType="motherboard"
                      inBuild={usedPartIds.has(motherboard.id)}
                    />
                  </div>
                ))}
              </div>
              {build.case && availableMotherboards.length === 0 && (
                <p className="no-compatible">
                  No motherboards compatible with this case's form factors.
                </p>
              )}
            </div>
          )}

          {currentStep === "cpu" && (
            <div className="step-content">
              <h2>Step 3: Select a CPU</h2>
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
                      <PartCard
                        part={cpu}
                        partType="cpu"
                        inBuild={usedPartIds.has(cpu.id)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentStep === "ram" && (
            <div className="step-content">
              <h2>Step 4: Select RAM</h2>
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
                        (r) => r.id === ramModule.id,
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
                          <PartCard
                            part={ramModule}
                            partType="ram"
                            inBuild={usedPartIds.has(ramModule.id)}
                          />
                          {isSelected && (
                            <div className="selected-indicator">Selected</div>
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
                      <button
                        onClick={proceedToPSU}
                        className="btn btn-primary"
                      >
                        Continue to PSU
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {currentStep === "powerSupply" && (
            <div className="step-content">
              <h2>Step 5: Select a Power Supply</h2>
              <p>Choose a power supply for your build.</p>
              <div className="parts-grid">
                {powerSupplies.map((psu) => (
                  <div
                    key={psu.id}
                    onClick={() => selectPowerSupply(psu)}
                    className="clickable"
                  >
                    <PartCard
                      part={psu}
                      partType="powerSupply"
                      inBuild={usedPartIds.has(psu.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === "graphicsCard" && (
            <div className="step-content">
              <h2>Step 6: Select a Graphics Card (Optional)</h2>
              <p>
                Choose a graphics card for your build, or skip this step if not
                needed.
              </p>
              <div className="parts-grid">
                {graphicsCards.map((gpu) => {
                  const isSelected = build.graphicsCard?.id === gpu.id;
                  return (
                    <div
                      key={gpu.id}
                      onClick={() => toggleGraphicsCard(gpu)}
                      className={`clickable ${isSelected ? "selected" : ""}`}
                    >
                      <PartCard
                        part={gpu}
                        partType="graphicsCard"
                        inBuild={usedPartIds.has(gpu.id)}
                      />
                      {isSelected && (
                        <div className="selected-indicator">Selected</div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="step-actions">
                <button onClick={proceedToStorage} className="btn btn-primary">
                  Continue to Storage
                </button>
              </div>
            </div>
          )}

          {currentStep === "storage" && (
            <div className="step-content">
              <h2>Step 7: Select Storage (Optional)</h2>
              <p>
                Choose storage drives for your build. You can select multiple
                drives, or skip this step.
              </p>
              <div className="parts-grid">
                {storage.map((item) => {
                  const isSelected = build.storage.some(
                    (s) => s.id === item.id,
                  );
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleStorage(item)}
                      className={`clickable ${isSelected ? "selected" : ""}`}
                    >
                      <PartCard
                        part={item}
                        partType="storage"
                        inBuild={usedPartIds.has(item.id)}
                      />
                      {isSelected && (
                        <div className="selected-indicator">Selected</div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="step-actions">
                <button
                  onClick={proceedToPeripherals}
                  className="btn btn-primary"
                >
                  Continue to Peripherals
                </button>
              </div>
            </div>
          )}

          {currentStep === "peripheral" && (
            <div className="step-content">
              <h2>Step 8: Select Peripherals (Optional)</h2>
              <p>
                Choose peripherals for your build (e.g. optical drives). You can
                select multiple, or skip this step.
              </p>
              <div className="parts-grid">
                {peripherals.map((item) => {
                  const isSelected = build.peripherals.some(
                    (p) => p.id === item.id,
                  );
                  return (
                    <div
                      key={item.id}
                      onClick={() => togglePeripheral(item)}
                      className={`clickable ${isSelected ? "selected" : ""}`}
                    >
                      <PartCard
                        part={item}
                        partType="peripheral"
                        inBuild={usedPartIds.has(item.id)}
                      />
                      {isSelected && (
                        <div className="selected-indicator">Selected</div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="step-actions">
                <button onClick={finishBuild} className="btn btn-primary">
                  Finish Build
                </button>
              </div>
            </div>
          )}

          {currentStep === "complete" && (
            <div className="step-content">
              <h2>Build Complete!</h2>
              <p>
                Your PC build is ready. Review your selected components in the
                sidebar.
              </p>
              <div className="build-summary">
                <h3>Build Summary</h3>
                <ul>
                  <li>
                    <strong>Case:</strong> {build.case?.name}
                  </li>
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
                  <li>
                    <strong>PSU:</strong> {build.powerSupply?.name}
                  </li>
                  {build.graphicsCard && (
                    <li>
                      <strong>GPU:</strong> {build.graphicsCard.name}
                    </li>
                  )}
                  {build.storage.length > 0 && (
                    <li>
                      <strong>Storage:</strong> {build.storage.length} drive
                      {build.storage.length > 1 ? "s" : ""}
                    </li>
                  )}
                  {build.peripherals.length > 0 && (
                    <li>
                      <strong>Peripherals:</strong> {build.peripherals.length}{" "}
                      device
                      {build.peripherals.length > 1 ? "s" : ""}
                    </li>
                  )}
                </ul>
              </div>
              <div className="step-actions">
                <button
                  onClick={copyBuildToClipboard}
                  className={`btn ${copySuccess ? "btn-success" : "btn-primary"}`}
                >
                  {copySuccess ? "Copied!" : "Copy Build to Clipboard"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
