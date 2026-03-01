import React, { useState, useMemo } from "react";
import { cpus } from "../data/cpus";
import { cpuList } from "../data/cpuList";
import type { MasterdataCpu } from "../data/cpuList";
import "./CpuCollectionsPage.css";

type Brand = "Intel" | "AMD";

export const CpuCollectionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Brand>("Intel");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const filteredGroups = useMemo(() => {
    return cpuList.filter((group) => group.brand === activeTab);
  }, [activeTab]);

  const isCollected = (entry: MasterdataCpu): boolean => {
    return cpus.some((cpu) =>
      cpu.partNumber
        ? cpu.partNumber === entry.partNumber
        : cpu.name.includes(entry.name)
    );
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

  const overallCollected = filteredGroups.filter((g) => {
    const { collected } = getGroupStats(g);
    return collected > 0;
  }).length;

  return (
    <div className="cpu-collections-page">
      <h1>CPU Collections</h1>

      <div className="brand-tabs">
        <button
          className={`brand-tab intel ${activeTab === "Intel" ? "active" : ""}`}
          onClick={() => setActiveTab("Intel")}
        >
          Intel
        </button>
        <button
          className={`brand-tab amd ${activeTab === "AMD" ? "active" : ""}`}
          onClick={() => setActiveTab("AMD")}
        >
          AMD
        </button>
      </div>

      {filteredGroups.length === 0 ? (
        <div className="empty-state">
          No {activeTab} CPU groups defined yet.
        </div>
      ) : (
        <>
          <div className="collection-stats">
            {overallCollected} / {filteredGroups.length} groups collected
          </div>
          <table className="collections-table">
            <thead>
              <tr>
                <th>Socket</th>
                <th>Codename</th>
                <th>Collected</th>
              </tr>
            </thead>
            <tbody>
              {filteredGroups.map((group, index) => {
                const key = `${group.socket}|${group.codename}|${index}`;
                const { total, collected } = getGroupStats(group);
                const isExpanded = expandedRows.has(key);

                const collectedClass =
                  total === 0
                    ? "collected-no"
                    : collected === total
                      ? "collected-yes"
                      : collected > 0
                        ? "collected-partial"
                        : "collected-no";

                return (
                  <React.Fragment key={key}>
                    <tr
                      className="group-row"
                      onClick={() => toggleRow(key)}
                    >
                      <td>
                        <span className={`expand-arrow ${isExpanded ? "expanded" : ""}`}>
                          &#9654;
                        </span>
                        {group.socket}
                      </td>
                      <td>{group.codename}</td>
                      <td>
                        <span className={collectedClass}>
                          {collected}/{total}
                        </span>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="cpu-detail-row">
                        <td colSpan={3}>
                          <div className="cpu-detail-list">
                            {group.cpus.map((entry) => {
                              const matched = isCollected(entry);
                              return (
                                <div key={entry.partNumber} className="cpu-detail-item">
                                  <span className="cpu-detail-name">
                                    <span className={`collected-indicator ${matched ? "yes" : "no"}`}>
                                      {matched ? "\u2713" : "\u2717"}
                                    </span>
                                    {entry.name}
                                  </span>
                                  <span className="cpu-detail-specs">
                                    {entry.partNumber}
                                    {entry.stepping && ` \u00b7 ${entry.stepping}`}
                                    {entry.note && ` \u00b7 ${entry.note}`}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
