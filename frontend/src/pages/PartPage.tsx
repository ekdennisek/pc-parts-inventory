import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { DetailedPartCard } from "../components/DetailedPartCard";
import { allParts } from "../data/parts";
import type { PartType } from "../types";
import { PART_TYPES } from "../types";
import "./PartPage.css";

export const PartPage: React.FC = () => {
  const { partType } = useParams<{ partType: PartType }>();
  const [searchTerm, setSearchTerm] = useState("");

  // Get parts for the current part type
  const parts = useMemo(() => {
    if (!partType || !allParts[partType]) {
      return [];
    }
    return allParts[partType];
  }, [partType]);

  // Filter parts based on search term
  const filteredParts = useMemo(() => {
    if (!searchTerm.trim()) {
      return parts;
    }

    const searchLower = searchTerm.toLowerCase();
    return parts.filter(
      (part) =>
        part.name.toLowerCase().includes(searchLower) ||
        part.brand.toLowerCase().includes(searchLower) ||
        part.description.toLowerCase().includes(searchLower)
    );
  }, [parts, searchTerm]);

  // Handle invalid part type
  if (!partType || !allParts[partType]) {
    return (
      <div className="part-page">
        <div className="error-message">
          <h1>Page Not Found</h1>
          <p>The requested part type does not exist.</p>
        </div>
      </div>
    );
  }

  const partTypeLabel = PART_TYPES[partType];

  return (
    <div className="part-page">
      <div className="page-header">
        <h1>{partTypeLabel}</h1>
        <div className="page-stats">
          <span className="total-parts">{parts.length} total parts</span>
        </div>
      </div>

      <div className="search-section">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder={`Search ${partTypeLabel.toLowerCase()}...`}
        />

        {searchTerm && (
          <p className="search-results-info">
            Found {filteredParts.length} {partTypeLabel.toLowerCase()} matching
            "{searchTerm}"
          </p>
        )}

        {partType === "motherboard" && (
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
        )}

        {partType === "cpu" && (
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
        )}
      </div>

      <div className="parts-list">
        {filteredParts.map((part) => (
          <DetailedPartCard key={part.id} part={part} partType={partType} />
        ))}
      </div>

      {filteredParts.length === 0 && searchTerm && (
        <div className="no-results">
          <p>No {partTypeLabel.toLowerCase()} found matching your search.</p>
          <p>Try different keywords or clear your search to see all parts.</p>
        </div>
      )}

      {parts.length === 0 && (
        <div className="no-results">
          <p>No {partTypeLabel.toLowerCase()} available at the moment.</p>
        </div>
      )}
    </div>
  );
};
