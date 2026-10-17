import React, { useMemo } from "react";
import type { Motherboard } from "../types";
import { getSocketColor } from "../types";
import { getSocketSortOrder } from "../utils/socketSortOrder";
import "./MotherboardSummary.css";

interface SocketRow {
    key: string;
    socket: Motherboard["socket"];
    box: boolean;
    boards: number;
    chipsets: Map<string, number>;
}

export interface MotherboardSummarySelection {
    socket: Motherboard["socket"];
    box: boolean;
}

interface MotherboardSummaryProps {
    parts: Motherboard[];
    selected: MotherboardSummarySelection | null;
    onSelect: (selection: MotherboardSummarySelection | null) => void;
}

/** "A", "B (2)", "C": chipsets in name order, with a count when more than one board shares it */
function getChipsetLabels(chipsets: Map<string, number>): string[] {
    return [...chipsets]
        .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
        .map(([chipset, count]) => (count > 1 ? `${chipset} (${count})` : chipset));
}

export const MotherboardSummary: React.FC<MotherboardSummaryProps> = ({
    parts,
    selected,
    onSelect,
}) => {
    const rows = useMemo(() => {
        const bySocketAndBox = new Map<string, SocketRow>();
        for (const part of parts) {
            const key = `${part.socket}|${part.box}`;
            let row = bySocketAndBox.get(key);
            if (!row) {
                row = { key, socket: part.socket, box: part.box, boards: 0, chipsets: new Map() };
                bySocketAndBox.set(key, row);
            }
            row.boards++;
            row.chipsets.set(part.chipset, (row.chipsets.get(part.chipset) ?? 0) + 1);
        }

        // Same socket order as the motherboard list, boxed boards first within a socket
        return [...bySocketAndBox.values()].sort(
            (a, b) =>
                getSocketSortOrder(a.socket) - getSocketSortOrder(b.socket) ||
                a.socket.localeCompare(b.socket) ||
                Number(b.box) - Number(a.box),
        );
    }, [parts]);

    if (rows.length === 0) {
        return (
            <div className="motherboard-summary motherboard-summary-empty">
                No motherboards match the filters.
            </div>
        );
    }

    return (
        <div className="motherboard-summary">
            <table className="motherboard-summary-table">
                <thead>
                    <tr>
                        <th>Socket</th>
                        <th>Box</th>
                        <th>Chipsets</th>
                        <th className="motherboard-summary-count">Boards</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => {
                        const isSelected =
                            row.socket === selected?.socket && row.box === selected.box;
                        return (
                            // The whole row is clickable; the button is there for keyboard and screen
                            // reader users, and its click bubbles up to the row
                            <tr
                                key={row.key}
                                className={`motherboard-summary-row ${isSelected ? "selected" : ""}`}
                                onClick={() =>
                                    onSelect(
                                        isSelected ? null : { socket: row.socket, box: row.box },
                                    )
                                }
                            >
                                <td className="motherboard-summary-socket">
                                    <button
                                        type="button"
                                        className="motherboard-summary-select"
                                        aria-pressed={isSelected}
                                    >
                                        <span
                                            className={`motherboard-summary-marker ${getSocketColor(row.socket)}`}
                                        />
                                        {row.socket}
                                    </button>
                                </td>
                                <td className={`motherboard-summary-box ${row.box ? "yes" : "no"}`}>
                                    {row.box ? "Yes" : "No"}
                                </td>
                                <td>
                                    {getChipsetLabels(row.chipsets).map((label, i, labels) => (
                                        <React.Fragment key={label}>
                                            {i > 0 && " "}
                                            <span className="motherboard-summary-chipset">
                                                {label}
                                                {i < labels.length - 1 && ","}
                                            </span>
                                        </React.Fragment>
                                    ))}
                                </td>
                                <td className="motherboard-summary-count">{row.boards}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
