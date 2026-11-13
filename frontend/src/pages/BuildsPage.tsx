import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { builds } from "../data/builds";
import { cases } from "../data/cases";
import { motherboards } from "../data/motherboards";
import { cpus } from "../data/cpus";
import { ram } from "../data/ram";
import { powerSupplies } from "../data/powerSupplies";
import { graphicsCards } from "../data/gpus";
import { storage } from "../data/storage";
import { peripherals } from "../data/peripherals";
import type {
    Case,
    Motherboard,
    CPU,
    RAM,
    PowerSupply,
    GraphicsCard,
    Storage,
    Peripheral,
    PCPart,
} from "../types";
import { ScrollToTop } from "../components/ScrollToTop";
import "./BuildsPage.css";

interface ResolvedBuild {
    id: string;
    name: string;
    year: number;
    description?: string;
    case?: Case;
    motherboard?: Motherboard;
    cpus: CPU[];
    ram: RAM[];
    powerSupply?: PowerSupply;
    graphicsCards: GraphicsCard[];
    storage: Storage[];
    peripherals: Peripheral[];
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
            storage: new Map(storage.map((s) => [s.id, s])),
            peripherals: new Map(peripherals.map((p) => [p.id, p])),
        }),
        [],
    );

    const resolvedBuilds = useMemo(() => {
        return builds.map(
            (build): ResolvedBuild => ({
                id: build.id,
                name: build.name,
                year: build.year,
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
                storage: (build.storageIds || [])
                    .map((id) => componentMaps.storage.get(id))
                    .filter((s): s is Storage => s !== undefined),
                peripherals: (build.peripheralIds || [])
                    .map((id) => componentMaps.peripherals.get(id))
                    .filter((p): p is Peripheral => p !== undefined),
            }),
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
                        Use the <Link to="/build-planner">Build Planner</Link> to create a build and
                        copy it to clipboard.
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
            <div className="build-card-header">
                <h2>{build.name}</h2>
                <span className="build-year">{build.year}</span>
            </div>
            {build.description && <p className="build-description">{build.description}</p>}

            <div className="build-components">
                {build.case && (
                    <BuildComponent label="Case" parts={[build.case]} buildYear={build.year}>
                        <span className="component-value">{build.case.name}</span>
                        <span className="component-detail">
                            {build.case.supportedFormFactors.join(", ")}
                        </span>
                    </BuildComponent>
                )}

                {build.motherboard && (
                    <BuildComponent
                        label="Motherboard"
                        parts={[build.motherboard]}
                        buildYear={build.year}
                    >
                        <span className="component-value">{build.motherboard.name}</span>
                        <span className="component-detail">
                            {build.motherboard.socket} | {build.motherboard.formFactor}
                        </span>
                    </BuildComponent>
                )}

                {build.cpus.length > 0 && (
                    <BuildComponent
                        label={`CPU${build.cpus.length > 1 ? "s" : ""}`}
                        parts={build.cpus}
                        buildYear={build.year}
                    >
                        {build.cpus.map((cpu) => (
                            <div key={cpu.id}>
                                <span className="component-value">{cpu.name}</span>
                                <span className="component-detail">
                                    {cpu.cores} cores | {cpu.baseClock}GHz
                                </span>
                            </div>
                        ))}
                    </BuildComponent>
                )}

                {build.ram.length > 0 && (
                    <BuildComponent label="RAM" parts={build.ram} buildYear={build.year}>
                        <span className="component-value">
                            {totalRamCapacity}GB total ({build.ram.length} module
                            {build.ram.length > 1 ? "s" : ""})
                        </span>
                        {build.ram.map((r) => (
                            <span key={r.id} className="component-detail">
                                {r.capacity}GB {r.type} @ {r.speed} MT/s
                            </span>
                        ))}
                    </BuildComponent>
                )}

                {build.powerSupply && (
                    <BuildComponent label="PSU" parts={[build.powerSupply]} buildYear={build.year}>
                        <span className="component-value">{build.powerSupply.name}</span>
                        <span className="component-detail">
                            {build.powerSupply.wattage}W | {build.powerSupply.efficiency}
                        </span>
                    </BuildComponent>
                )}

                {build.graphicsCards.length > 0 && (
                    <BuildComponent
                        label={`GPU${build.graphicsCards.length > 1 ? "s" : ""}`}
                        parts={build.graphicsCards}
                        buildYear={build.year}
                    >
                        {build.graphicsCards.map((gpu) => (
                            <div key={gpu.id}>
                                <span className="component-value">{gpu.name}</span>
                                <span className="component-detail">
                                    {gpu.memory}GB {gpu.memoryType}
                                </span>
                            </div>
                        ))}
                    </BuildComponent>
                )}

                {build.storage.length > 0 && (
                    <BuildComponent label="Storage" parts={build.storage} buildYear={build.year}>
                        {build.storage.map((s) => (
                            <div key={s.id}>
                                <span className="component-value">{s.name}</span>
                                <span className="component-detail">
                                    {s.capacity}GB {s.type} | {s.interface}
                                </span>
                            </div>
                        ))}
                    </BuildComponent>
                )}

                {build.peripherals.length > 0 && (
                    <BuildComponent
                        label={`Peripheral${build.peripherals.length > 1 ? "s" : ""}`}
                        parts={build.peripherals}
                        buildYear={build.year}
                    >
                        {build.peripherals.map((p) => (
                            <div key={p.id}>
                                <span className="component-value">{p.name}</span>
                                <span className="component-detail">
                                    {p.formFactor} | {p.interface}
                                </span>
                            </div>
                        ))}
                    </BuildComponent>
                )}
            </div>
        </div>
    );
};

/* One component "square": label and release year(s) on top, details below */
const BuildComponent: React.FC<{
    label: string;
    parts: PCPart[];
    buildYear: number;
    children: React.ReactNode;
}> = ({ label, parts, buildYear, children }) => {
    const years = [
        ...new Set(
            parts.map((p) => p.releaseYear).filter((year): year is number => year !== undefined),
        ),
    ].sort((a, b) => a - b);

    return (
        <div className="build-component">
            <div className="component-header">
                <span className="component-label">{label}</span>
                {years.length > 0 && (
                    <span className="component-years">
                        {years.map((year) => (
                            <span
                                key={year}
                                className={year !== buildYear ? "year-mismatch" : undefined}
                                title={
                                    year !== buildYear
                                        ? `Released ${year}, build year is ${buildYear}`
                                        : `Released ${year}`
                                }
                            >
                                {year}
                            </span>
                        ))}
                    </span>
                )}
            </div>
            {children}
        </div>
    );
};
