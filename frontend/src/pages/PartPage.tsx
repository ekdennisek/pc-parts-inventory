import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { DetailedPartCard } from "../components/DetailedPartCard";
import { allParts } from "../data/parts";
import type { PartType, CPU, Motherboard, CpuSocket } from "../types";
import { PART_TYPES, intelSockets, amdSockets } from "../types";
import "./PartPage.css";

type SortOption = "standard";

export const PartPage: React.FC = () => {
  const { partType } = useParams<{ partType: PartType }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("standard");

  // Get parts for the current part type
  const parts = useMemo(() => {
    if (!partType || !allParts[partType]) {
      return [];
    }
    return allParts[partType];
  }, [partType]);

  // Helper function to get socket sort order
  const getSocketSortOrder = (socket: CpuSocket): number => {
    // Intel sockets come first
    const intelIndex = (intelSockets as readonly string[]).indexOf(socket);
    if (intelIndex !== -1) {
      return intelIndex;
    }

    // AMD sockets come after Intel sockets
    const amdIndex = (amdSockets as readonly string[]).indexOf(socket);
    if (amdIndex !== -1) {
      return intelSockets.length + amdIndex;
    }

    // Unknown sockets at the end
    return intelSockets.length + amdSockets.length;
  };

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

  // Sort parts based on sort option
  const sortedParts = useMemo(() => {
    if (
      sortOption === "standard" &&
      (partType === "motherboard" || partType === "cpu")
    ) {
      // Sort by socket order for CPU and motherboard parts
      return [...filteredParts].sort((a, b) => {
        const partA = a as CPU | Motherboard;
        const partB = b as CPU | Motherboard;

        const socketOrderA = getSocketSortOrder(partA.socket);
        const socketOrderB = getSocketSortOrder(partB.socket);

        if (socketOrderA !== socketOrderB) {
          return socketOrderA - socketOrderB;
        }

        // If same socket, sort by name
        return partA.name.localeCompare(partB.name);
      });
    }

    // For other part types or sort options, return as is
    return filteredParts;
  }, [filteredParts, sortOption, partType]);

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
        <div className="search-header">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder={`Search ${partTypeLabel.toLowerCase()}...`}
          />

          {(partType === "motherboard" || partType === "cpu") && (
            <div className="sort-dropdown">
              <label htmlFor="sort-select">Sort by:</label>
              <select
                id="sort-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
              >
                <option value="standard">Standard</option>
              </select>
            </div>
          )}
        </div>

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
        {sortedParts.map((part) => (
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
