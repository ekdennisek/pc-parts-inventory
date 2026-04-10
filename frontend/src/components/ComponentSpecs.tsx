import React from "react";
import type {
    AnyPart,
    PartType,
    CPU,
    Motherboard,
    PowerSupply,
    GraphicsCard,
    RAM,
    Case,
    Storage,
    Peripheral,
} from "../types";
import "./ComponentSpecs.css";

type Props = {
    part: AnyPart;
    partType: PartType;
};

const SpecRow = ({
    label,
    value,
    normal,
}: {
    label: string;
    value?: React.ReactNode;
    normal?: boolean;
}) => (
    <div className="spec-row">
        <span className="spec-label">{label}</span>
        <span className={`spec-value${normal ? " spec-value-normal" : ""}`}>{value ?? "-"}</span>
    </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="spec-section-title">{children}</div>
);

export const ComponentSpecs: React.FC<Props> = ({ part, partType }) => {
    const renderTypeSpecs = () => {
        switch (partType) {
            case "cpu": {
                const cpu = part as CPU;
                return (
                    <>
                        <SpecRow label="Cores / Threads" value={`${cpu.cores} / ${cpu.threads}`} />
                        <SpecRow label="Base Clock" value={`${cpu.baseClock} GHz`} />
                        <SpecRow
                            label="Boost Clock"
                            value={cpu.boostClock ? `${cpu.boostClock} GHz` : "-"}
                        />
                        <SpecRow label="Socket" value={cpu.socket} />
                        <SpecRow label="TDP" value={cpu.tdp ? `${cpu.tdp} W` : "-"} />
                        <SpecRow label="Codename" value={cpu.codename ?? "-"} />
                        <SpecRow label="Part Number" value={cpu.partNumber ?? "-"} />
                        <SpecRow label="sSpec" value={cpu.sSpec ?? "-"} />
                    </>
                );
            }

            case "motherboard": {
                const mb = part as Motherboard;
                const slots = Object.entries(mb.expansionSlots);
                return (
                    <>
                        <SpecRow label="Socket" value={mb.socket} />
                        <SpecRow label="Form Factor" value={mb.formFactor} />
                        <SpecRow label="Chipset" value={mb.chipset} />
                        <SpecRow label="Memory Slots" value={mb.memorySlots} />
                        <SpecRow label="Memory Type" value={mb.memoryTypes.join(" / ")} />
                        <SpecRow label="Max Memory" value={`${mb.maxMemory} GB`} />
                        <SpecRow label="I/O Shield" value={mb.ioShield ? "Yes" : "No"} />
                        {slots.length > 0 ? (
                            slots.map(([slot, count]) => (
                                <SpecRow key={slot} label={slot} value={`${count}×`} />
                            ))
                        ) : (
                            <SpecRow label="Expansion Slots" value="-" />
                        )}
                    </>
                );
            }

            case "powerSupply": {
                const psu = part as PowerSupply;
                return (
                    <>
                        <SpecRow label="Wattage" value={`${psu.wattage} W`} />
                        <SpecRow label="Efficiency" value={psu.efficiency} />
                        <SpecRow label="Modular" value={psu.modular ? "Yes" : "No"} />
                        <SpecRow label="Form Factor" value={psu.formFactor} />
                    </>
                );
            }

            case "graphicsCard": {
                const gpu = part as GraphicsCard;
                return (
                    <>
                        <SpecRow label="Memory" value={`${gpu.memory} GB ${gpu.memoryType}`} />
                        <SpecRow label="Core Clock" value={`${gpu.coreClock} MHz`} />
                        <SpecRow label="Boost Clock" value={`${gpu.boostClock} MHz`} />
                        <SpecRow label="Power" value={`${gpu.powerConsumption} W`} />
                        <SpecRow label="Interface" value={gpu.interface} />
                        <SpecRow label="PCI ID" value={gpu.pciId ?? "-"} />
                    </>
                );
            }

            case "ram": {
                const memory = part as RAM;
                return (
                    <>
                        <SpecRow label="Capacity" value={`${memory.capacity} GB`} />
                        <SpecRow label="Type" value={memory.type} />
                        <SpecRow label="Speed" value={`${memory.speed} MHz`} />
                        <SpecRow label="Timings" value={memory.timings ?? "-"} />
                        <SpecRow
                            label="Voltage"
                            value={memory.voltage ? `${memory.voltage} V` : "-"}
                        />
                        <SpecRow label="Form Factor" value={memory.formFactor} />
                    </>
                );
            }

            case "case": {
                const pcCase = part as Case;
                return (
                    <>
                        <SpecRow
                            label="Form Factors"
                            value={pcCase.supportedFormFactors.join(", ")}
                        />
                        <SpecRow label='5.25" Bays' value={pcCase.external525Drives} />
                        <SpecRow label='3.5" Bays' value={pcCase.external35Drives} />
                        <SpecRow label="Glass Panel" value={pcCase.glassPanel ? "Yes" : "No"} />
                    </>
                );
            }

            case "storage": {
                const s = part as Storage;
                const capacityLabel =
                    s.capacity >= 1000 ? `${s.capacity / 1000} TB` : `${s.capacity} GB`;
                return (
                    <>
                        <SpecRow label="Capacity" value={capacityLabel} />
                        <SpecRow label="Type" value={s.type} />
                        <SpecRow label="Form Factor" value={s.formFactor} />
                        <SpecRow label="Interface" value={s.interface} />
                        <SpecRow
                            label="Read Speed"
                            value={s.readSpeed ? `${s.readSpeed} MB/s` : "-"}
                        />
                        <SpecRow
                            label="Write Speed"
                            value={s.writeSpeed ? `${s.writeSpeed} MB/s` : "-"}
                        />
                        <SpecRow label="RPM" value={s.rpm ?? "-"} />
                    </>
                );
            }

            case "peripheral": {
                const p = part as Peripheral;
                return (
                    <>
                        <SpecRow label="Form Factor" value={p.formFactor} />
                        <SpecRow label="Interface" value={p.interface} />
                    </>
                );
            }
        }
    };

    return (
        <div className="component-specs">
            <SectionTitle>General</SectionTitle>
            <SpecRow label="Brand" value={part.brand} />
            {part.releaseYear !== undefined && (
                <SpecRow label="Release Year" value={part.releaseYear} />
            )}
            {part.condition !== undefined && (
                <SpecRow
                    label="Condition"
                    value={part.condition === "working" ? "Working" : "Defective"}
                />
            )}
            {part.box !== undefined && (
                <SpecRow label="Original Box" value={part.box ? "Yes" : "No"} />
            )}
            {part.description && <SpecRow label="Description" value={part.description} normal />}

            <SectionTitle>Specifications</SectionTitle>
            {renderTypeSpecs()}
        </div>
    );
};
