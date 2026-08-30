import React, { useState, useMemo } from "react";
import { cpus } from "../data/cpus";
import { cpuList } from "../data/cpuList";
import type { MasterdataCpu } from "../data/cpuList";
import { getSocketSortOrder } from "../utils/socketSortOrder";
import "./CpuCollectionsPage.css";

type Brand = "Intel" | "AMD";

const CheckIcon = () => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const XIcon = () => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const ChevronIcon = ({ expanded }: { expanded: boolean }) => (
    <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
            transform: expanded ? "rotate(90deg)" : "none",
            transition: "transform 0.15s ease",
        }}
    >
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

export const CpuCollectionsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Brand>("Intel");
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

    const filteredGroups = useMemo(() => {
        return cpuList
            .filter((group) => group.brand === activeTab)
            .sort((a, b) => {
                const socketDiff = getSocketSortOrder(a.socket) - getSocketSortOrder(b.socket);
                if (socketDiff !== 0) return socketDiff;
                return a.codename.localeCompare(b.codename);
            });
    }, [activeTab]);

    const isCollected = (entry: MasterdataCpu): boolean => {
        return cpus.some((cpu) => {
            if (cpu.partNumber) {
                return (
                    cpu.partNumber === entry.partNumber ||
                    entry.partNumbers?.includes(cpu.partNumber)
                );
            }
            if (cpu.sSpec) {
                return cpu.sSpec === entry.sSpec;
            }
            return cpu.name.includes(entry.name);
        });
    };

    const toggleRow = (key: string) => {
        setExpandedRows((prev) => {
            const next = new Set(prev);
            if (next.has(key)) {
                next.delete(key);
            } else {
                next.add(key);
            }
            return next;
        });
    };

    const getGroupStats = (group: (typeof cpuList)[number]) => {
        const total = group.cpus.length;
        const collected = group.cpus.filter(isCollected).length;
        return { total, collected };
    };

    const groupStates = filteredGroups.map((g) => {
        const { total, collected } = getGroupStats(g);
        return total > 0 && collected === total ? "complete" : collected > 0 ? "partial" : "none";
    });

    const startedCount = groupStates.filter((s) => s !== "none").length;

    return (
        <div className="cpu-collections-page">
            <div className="collections-header">
                <div className="collections-header-title">
                    <div className="wb-eyebrow">Completion Tracker</div>
                    <h1>CPU Collections</h1>
                </div>
                {filteredGroups.length > 0 && (
                    <div className="collections-meter">
                        <div className="collection-stats wb-mono">
                            {startedCount} of {filteredGroups.length} {activeTab} groups started
                        </div>
                        <div className="meter-blocks">
                            {groupStates.map((state, i) => (
                                <span key={i} className={`meter-block ${state}`} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="brand-tabs">
                <button
                    className={`brand-tab ${activeTab === "Intel" ? "active" : ""}`}
                    onClick={() => setActiveTab("Intel")}
                >
                    Intel
                </button>
                <button
                    className={`brand-tab ${activeTab === "AMD" ? "active" : ""}`}
                    onClick={() => setActiveTab("AMD")}
                >
                    AMD
                </button>
            </div>

            {filteredGroups.length === 0 ? (
                <div className="empty-state">No {activeTab} CPU groups defined yet.</div>
            ) : (
                <>
                    <div className="collections-table">
                        <div className="collections-table-head">
                            <div></div>
                            <div>Socket</div>
                            <div>Codename</div>
                            <div>Progress</div>
                            <div className="col-collected">Collected</div>
                        </div>
                        {filteredGroups.map((group, index) => {
                            const key = `${group.socket}|${group.codename}|${index}`;
                            const { total, collected } = getGroupStats(group);
                            const isExpanded = expandedRows.has(key);
                            const state = groupStates[index];

                            return (
                                <React.Fragment key={key}>
                                    <div
                                        className={`group-row ${state}${isExpanded ? " expanded" : ""}`}
                                        onClick={() => toggleRow(key)}
                                    >
                                        <div className="expand-cell">
                                            <ChevronIcon expanded={isExpanded} />
                                        </div>
                                        <div className="socket-cell wb-mono">{group.socket}</div>
                                        <div className="codename-cell">{group.codename}</div>
                                        <div className="progress-cell">
                                            <div className="progress-track">
                                                {total > 0 && collected > 0 && (
                                                    <div
                                                        className={`progress-fill ${state}`}
                                                        style={{
                                                            width: `${(collected / total) * 100}%`,
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className={`collected-cell wb-mono ${state}`}>
                                            {collected}/{total}
                                        </div>
                                    </div>
                                    {isExpanded && (
                                        <div className="cpu-detail-list">
                                            {group.cpus.map((entry) => {
                                                const matched = isCollected(entry);
                                                return (
                                                    <div
                                                        key={
                                                            entry.sSpec ??
                                                            entry.partNumber ??
                                                            entry.name
                                                        }
                                                        className={`cpu-detail-item${matched ? " collected" : ""}`}
                                                    >
                                                        <span
                                                            className={`collected-indicator ${matched ? "yes" : "no"}`}
                                                        >
                                                            {matched ? <CheckIcon /> : <XIcon />}
                                                        </span>
                                                        <span className="cpu-detail-name">
                                                            {entry.name}
                                                        </span>
                                                        <span className="cpu-detail-specs wb-mono">
                                                            {entry.sSpec ?? entry.partNumber ?? ""}
                                                            {entry.stepping &&
                                                                ` · ${entry.stepping}`}
                                                            {entry.note && ` · ${entry.note}`}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>

                    <div className="collections-legend wb-mono">
                        <div className="legend-entry">
                            <span className="legend-swatch complete" />
                            Complete
                        </div>
                        <div className="legend-entry">
                            <span className="legend-swatch partial" />
                            In progress
                        </div>
                        <div className="legend-entry">
                            <span className="legend-swatch none" />
                            Not started
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
