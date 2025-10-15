import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { QuickFilters } from "../components/QuickFilters";
import { ScrollToTop } from "../components/ScrollToTop";
import { DetailedPartCard } from "../components/DetailedPartCard";
import { allParts } from "../data/parts";
import type { PartType, CPU, Motherboard, GraphicsCard, Case, CpuSocket, MotherboardFormFactor } from "../types";
import { PART_TYPES, intelSockets, amdSockets, gpuInterfaces, getSocketColor, motherboardFormFactors } from "../types";
import "./PartPage.css";

type SortOption = "standard";

export const PartPage: React.FC = () => {
  const { partType } = useParams<{ partType: PartType }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("standard");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedFormFactors, setSelectedFormFactors] = useState<string[]>([]);

  // Clear filters when switching between component pages
  useEffect(() => {
    setSelectedFilters([]);
    setSelectedFormFactors([]);
  }, [partType]);

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

  // Get available filters based on part type
  const availableFilters = useMemo(() => {
    if (partType === "cpu" || partType === "motherboard") {
      return [...intelSockets, ...amdSockets];
    } else if (partType === "graphicsCard") {
      return [...gpuInterfaces];
    }
    return [];
  }, [partType]);

  // Filter parts based on search term and quick filters
  const filteredParts = useMemo(() => {
    let filtered = [...parts];

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (part) =>
          part.name.toLowerCase().includes(searchLower) ||
          part.brand.toLowerCase().includes(searchLower) ||
          part.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply form factor filters for motherboards
    if (partType === "motherboard" && selectedFormFactors.length > 0) {
      filtered = filtered.filter((part) => {
        const p = part as Motherboard;
        return selectedFormFactors.includes(p.formFactor);
      });
    }

    // Apply form factor filters for cases
    if (partType === "case" && selectedFormFactors.length > 0) {
      filtered = filtered.filter((part) => {
        const p = part as Case;
        return selectedFormFactors.some((formFactor) =>
          p.supportedFormFactors.includes(formFactor as MotherboardFormFactor)
        );
      });
    }

    // Apply quick filters
    if (selectedFilters.length > 0) {
      if (partType === "cpu" || partType === "motherboard") {
        filtered = filtered.filter((part) => {
          const p = part as CPU | Motherboard;
          return selectedFilters.includes(p.socket);
        });
      } else if (partType === "graphicsCard") {
        filtered = filtered.filter((part) => {
          const p = part as GraphicsCard;
          return selectedFilters.includes(p.interface);
        });
      }
    }

    return filtered;
  }, [parts, searchTerm, selectedFilters, selectedFormFactors, partType]);

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

        {(partType === "motherboard" || partType === "case") && (
          <QuickFilters
            filters={motherboardFormFactors}
            selectedFilters={selectedFormFactors}
            onFilterChange={setSelectedFormFactors}
            filterType="formFactor"
          />
        )}

        {availableFilters.length > 0 && (
          <QuickFilters
            filters={availableFilters}
            selectedFilters={selectedFilters}
            onFilterChange={setSelectedFilters}
            filterType={partType === "graphicsCard" ? "interface" : "socket"}
            getFilterColor={
              partType === "cpu" || partType === "motherboard"
                ? (filter: string) => {
                    const color = getSocketColor(filter as CpuSocket);
                    return color === "unknown" ? "default" : color;
                  }
                : undefined
            }
          />
        )}

        {(searchTerm || selectedFilters.length > 0 || selectedFormFactors.length > 0) && (
          <p className="search-results-info">
            Found {filteredParts.length} {partTypeLabel.toLowerCase()}
            {searchTerm && ` matching "${searchTerm}"`}
            {searchTerm && (selectedFormFactors.length > 0 || selectedFilters.length > 0) && " and"}
            {selectedFormFactors.length > 0 &&
              ` filtered by ${selectedFormFactors.length} form factor${selectedFormFactors.length > 1 ? "s" : ""}`}
            {selectedFormFactors.length > 0 && selectedFilters.length > 0 && " and"}
            {selectedFilters.length > 0 &&
              ` ${selectedFormFactors.length > 0 ? "" : "filtered by "}${selectedFilters.length} ${
                partType === "graphicsCard" ? "interface" : "socket"
              }${selectedFilters.length > 1 ? "s" : ""}`}
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

      <ScrollToTop />
    </div>
  );
};
