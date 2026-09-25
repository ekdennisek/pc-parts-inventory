import React, { useMemo } from "react";
import type { RAM } from "../types";
import { memoryTypes } from "../types";
import { getRamSpecKey } from "../utils/ramSpec";
import "./RamSummary.css";

interface SpecRow {
    key: string;
    formFactor: string;
    capacity: number;
    speed: number;
    owned: number;
    inBuild: number;
    defective: number;
}

interface RamSummaryProps {
    parts: RAM[];
    usedPartIds: Set<string>;
    selectedSpec: string | null;
    onSelectSpec: (specKey: string | null) => void;
}

export const RamSummary: React.FC<RamSummaryProps> = ({
    parts,
    usedPartIds,
    selectedSpec,
    onSelectSpec,
}) => {
    const sections = useMemo(() => {
        const rows = new Map<string, SpecRow & { type: string }>();
        for (const part of parts) {
            const key = getRamSpecKey(part);
            let row = rows.get(key);
            if (!row) {
                row = {
                    key,
                    type: part.type,
                    formFactor: part.formFactor,
                    capacity: part.capacity,
                    speed: part.speed,
                    owned: 0,
                    inBuild: 0,
                    defective: 0,
                };
                rows.set(key, row);
            }
            if (part.condition === "defective") {
                row.defective++;
            } else {
                row.owned++;
                if (usedPartIds.has(part.id)) row.inBuild++;
            }
        }

        // Newest memory type first, then largest and fastest sticks first
        return [...memoryTypes]
            .reverse()
            .map((type) => ({
                type,
                rows: [...rows.values()]
                    .filter((row) => row.type === type)
                    .sort((a, b) => b.capacity - a.capacity || b.speed - a.speed),
            }))
            .filter((section) => section.rows.length > 0);
    }, [parts, usedPartIds]);

    if (sections.length === 0) {
        return <div className="ram-summary ram-summary-empty">No RAM matches the filters.</div>;
    }

    return (
        <div className="ram-summary">
            {sections.map((section) => (
                <div key={section.type} className="ram-summary-section">
                    <h3 className="ram-summary-type">{section.type}</h3>
                    <ul className="ram-summary-rows">
                        {section.rows.map((row) => {
                            const isSelected = row.key === selectedSpec;
                            const notes = [
                                row.inBuild > 0 &&
                                    `${row.inBuild} in build${row.inBuild > 1 ? "s" : ""}`,
                                row.defective > 0 && `${row.defective} defective`,
                            ].filter(Boolean);
                            return (
                                <li key={row.key}>
                                    <button
                                        type="button"
                                        className={`ram-summary-row ${isSelected ? "selected" : ""}`}
                                        aria-pressed={isSelected}
                                        onClick={() => onSelectSpec(isSelected ? null : row.key)}
                                    >
                                        <span className="ram-summary-spec">
                                            {row.capacity} GB · {row.speed} MHz
                                            {row.formFactor !== "DIMM" && ` · ${row.formFactor}`}
                                        </span>
                                        {notes.length > 0 && (
                                            <span className="ram-summary-notes">
                                                {notes.join(" · ")}
                                            </span>
                                        )}
                                        <span className="ram-summary-count">{row.owned}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </div>
    );
};
