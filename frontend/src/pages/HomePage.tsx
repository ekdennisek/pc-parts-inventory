import React, { useState, useMemo } from "react";
import { SearchBar } from "../components/SearchBar";
import { PartCard } from "../components/PartCard";
import { allParts } from "../data/parts";
import type { PCPart, PartType } from "../types";
import { PART_TYPES } from "../types";
import "./HomePage.css";

export const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Flatten all parts into a single array with part type information
  const allPartsFlat = useMemo(() => {
    const flat: Array<PCPart & { partType: PartType }> = [];
    Object.entries(allParts).forEach(([partType, parts]) => {
      parts.forEach((part) => {
        flat.push({ ...part, partType: partType as PartType });
      });
    });
    return flat;
  }, []);

  // Filter parts based on search term
  const filteredParts = useMemo(() => {
    if (!searchTerm.trim()) {
      return allPartsFlat;
    }

    const searchLower = searchTerm.toLowerCase();
    return allPartsFlat.filter(
      (part) =>
        part.name.toLowerCase().includes(searchLower) ||
        part.brand.toLowerCase().includes(searchLower) ||
        part.description.toLowerCase().includes(searchLower)
    );
  }, [allPartsFlat, searchTerm]);

  // Group parts by type for summary
  const partsSummary = useMemo(() => {
    const summary: Record<PartType, { total: number }> = {
      cpu: { total: 0 },
      motherboard: { total: 0 },
      powerSupply: { total: 0 },
      graphicsCard: { total: 0 },
      ram: { total: 0 },
    };

    Object.entries(allParts).forEach(([partType, parts]) => {
      const type = partType as PartType;
      summary[type].total = parts.length;
    });

    return summary;
  }, []);

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>PC Parts Inventory</h1>
        <p>My PC parts inventory and the builds they're in</p>
      </div>

      <div className="summary-section">
        <h2>Inventory Summary</h2>
        <div className="summary-grid">
          {Object.entries(PART_TYPES).map(([key, label]) => {
            const partType = key as PartType;
            const { total } = partsSummary[partType];
            return (
              <div key={key} className="summary-card">
                <h3>{label}</h3>
                <div className="summary-stats">
                  <div className="stat">
                    <span className="stat-number">{total}</span>
                    <span className="stat-label">Total Parts</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="search-section">
        <h2>Search All Parts</h2>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Search by name, brand, or description..."
        />

        {searchTerm && (
          <p className="search-results-info">
            Found {filteredParts.length} part
            {filteredParts.length !== 1 ? "s" : ""} matching "{searchTerm}"
          </p>
        )}
      </div>

      <div className="parts-grid">
        {filteredParts.map((part) => (
          <div key={part.id} className="part-item">
            <div className="part-type-badge">{PART_TYPES[part.partType]}</div>
            <PartCard part={part} />
          </div>
        ))}
      </div>

      {filteredParts.length === 0 && searchTerm && (
        <div className="no-results">
          <p>No parts found matching your search.</p>
          <p>Try different keywords or browse specific categories.</p>
        </div>
      )}
    </div>
  );
};
