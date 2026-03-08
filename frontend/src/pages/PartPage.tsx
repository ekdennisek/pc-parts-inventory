import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { FilterDropdown } from "../components/FilterDropdown";
import { FilterBar } from "../components/FilterBar";
import { ScrollToTop } from "../components/ScrollToTop";
import { DetailedPartCard } from "../components/DetailedPartCard";
import { allParts } from "../data/parts";
import type { PartType, CPU, Motherboard, GraphicsCard, Case, Storage, CpuSocket, MotherboardFormFactor, StorageFormFactor } from "../types";
import { PART_TYPES, intelSockets, amdSockets, gpuInterfaces, getSocketColor, motherboardFormFactors, storageFormFactors, storageInterfaces } from "../types";
import type { FilterOption } from "../components/FilterDropdown";
import "./PartPage.css";

type SortOption = "standard";

const conditionFilterOptions: FilterOption[] = [
  { value: "Working", label: "Working", colorClass: "working" },
  { value: "Defective", label: "Defective", colorClass: "defective" },
  { value: "Unknown", label: "Unknown", colorClass: "unknown" },
];

export const PartPage: React.FC = () => {
  const { partType } = useParams<{ partType: PartType }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("standard");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedFormFactors, setSelectedFormFactors] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [yearFrom, setYearFrom] = useState<string | null>(null);
  const [yearTo, setYearTo] = useState<string | null>(null);

  // Clear filters when switching between component pages
  useEffect(() => {
    setSelectedFilters([]);
    setSelectedFormFactors([]);
    setSelectedConditions([]);
    setYearFrom(null);
    setYearTo(null);
  }, [partType]);

  // Get parts for the current part type
  const parts = useMemo(() => {
    if (!partType || !allParts[partType]) {
      return [];
    }
    return allParts[partType];
  }, [partType]);

  // Compute year options from parts data
  const yearOptions = useMemo(() => {
    const years = parts
      .filter((p) => p.releaseYear !== undefined)
      .map((p) => p.releaseYear!);
    const unique = [...new Set(years)].sort((a, b) => a - b);
    return unique.map((y) => ({ value: String(y), label: String(y) }));
  }, [parts]);

  // Helper function to get socket sort order
  const getSocketSortOrder = (socket: CpuSocket): number => {
    const intelIndex = (intelSockets as readonly string[]).indexOf(socket);
    if (intelIndex !== -1) return intelIndex;
    const amdIndex = (amdSockets as readonly string[]).indexOf(socket);
    if (amdIndex !== -1) return intelSockets.length + amdIndex;
    return intelSockets.length + amdSockets.length;
  };

  // Build filter options based on part type
  const socketInterfaceOptions: FilterOption[] = useMemo(() => {
    if (partType === "cpu" || partType === "motherboard") {
      return [...intelSockets, ...amdSockets].map((s) => {
        const color = getSocketColor(s as CpuSocket);
        return {
          value: s,
          label: s,
          colorClass: color === "unknown" ? "default" : color,
        } as FilterOption;
      });
    } else if (partType === "graphicsCard") {
      return [...gpuInterfaces].map((i) => ({ value: i, label: i }));
    } else if (partType === "storage") {
      return [...storageInterfaces].map((i) => ({ value: i, label: i }));
    }
    return [];
  }, [partType]);

  const formFactorOptions: FilterOption[] = useMemo(() => {
    if (partType === "motherboard" || partType === "case") {
      return [...motherboardFormFactors].map((f) => ({ value: f, label: f }));
    } else if (partType === "storage") {
      return [...storageFormFactors].map((f) => ({ value: f, label: f }));
    }
    return [];
  }, [partType]);

  // Filter parts
  const filteredParts = useMemo(() => {
    let filtered = [...parts];

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (part) =>
          part.name.toLowerCase().includes(searchLower) ||
          part.brand.toLowerCase().includes(searchLower) ||
          part.description.toLowerCase().includes(searchLower)
      );
    }

    if (partType === "motherboard" && selectedFormFactors.length > 0) {
      filtered = filtered.filter((part) => {
        const p = part as Motherboard;
        return selectedFormFactors.includes(p.formFactor);
      });
    }

    if (partType === "case" && selectedFormFactors.length > 0) {
      filtered = filtered.filter((part) => {
        const p = part as Case;
        return selectedFormFactors.some((formFactor) =>
          p.supportedFormFactors.includes(formFactor as MotherboardFormFactor)
        );
      });
    }

    if (partType === "storage" && selectedFormFactors.length > 0) {
      filtered = filtered.filter((part) => {
        const p = part as Storage;
        return selectedFormFactors.includes(p.formFactor as StorageFormFactor);
      });
    }

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
      } else if (partType === "storage") {
        filtered = filtered.filter((part) => {
          const p = part as Storage;
          return selectedFilters.includes(p.interface);
        });
      }
    }

    if (selectedConditions.length > 0) {
      filtered = filtered.filter((part) => {
        return selectedConditions.some((condition) => {
          if (condition === "Working") return part.condition === "working";
          if (condition === "Defective") return part.condition === "defective";
          if (condition === "Unknown") return part.condition === undefined;
          return false;
        });
      });
    }

    const isYearFilterActive = yearFrom !== null || yearTo !== null;
    if (isYearFilterActive) {
      filtered = filtered.filter((part) => {
        if (part.releaseYear === undefined) return false;
        if (yearFrom !== null && part.releaseYear < parseInt(yearFrom)) return false;
        if (yearTo !== null && part.releaseYear > parseInt(yearTo)) return false;
        return true;
      });
    }

    return filtered;
  }, [parts, searchTerm, selectedFilters, selectedFormFactors, selectedConditions, partType, yearFrom, yearTo]);

  // Sort parts
  const sortedParts = useMemo(() => {
    if (
      sortOption === "standard" &&
      (partType === "motherboard" || partType === "cpu")
    ) {
      return [...filteredParts].sort((a, b) => {
        const partA = a as CPU | Motherboard;
        const partB = b as CPU | Motherboard;
        const socketOrderA = getSocketSortOrder(partA.socket);
        const socketOrderB = getSocketSortOrder(partB.socket);
        if (socketOrderA !== socketOrderB) return socketOrderA - socketOrderB;
        return partA.name.localeCompare(partB.name);
      });
    }
    return filteredParts;
  }, [filteredParts, sortOption, partType]);

  const isYearFilterActive = yearFrom !== null || yearTo !== null;
  const hasActiveFilters = searchTerm || selectedFilters.length > 0 || selectedFormFactors.length > 0 || selectedConditions.length > 0 || isYearFilterActive;

  const socketInterfaceLabel = partType === "graphicsCard" || partType === "storage" ? "Interface" : "Socket";

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

        <FilterBar>
          {formFactorOptions.length > 0 && (
            <FilterDropdown
              label="Form Factor"
              options={formFactorOptions}
              mode="multi"
              selectedValues={selectedFormFactors}
              onChange={setSelectedFormFactors}
            />
          )}

          {socketInterfaceOptions.length > 0 && (
            <FilterDropdown
              label={socketInterfaceLabel}
              options={socketInterfaceOptions}
              mode="multi"
              selectedValues={selectedFilters}
              onChange={setSelectedFilters}
            />
          )}

          <FilterDropdown
            label="Condition"
            options={conditionFilterOptions}
            mode="multi"
            selectedValues={selectedConditions}
            onChange={setSelectedConditions}
          />

          {yearOptions.length > 0 && (
            <FilterDropdown
              label="Year From"
              options={yearOptions}
              mode="single"
              selectedValue={yearFrom}
              onChange={setYearFrom}
            />
          )}

          {yearOptions.length > 0 && (
            <FilterDropdown
              label="Year To"
              options={yearOptions}
              mode="single"
              selectedValue={yearTo}
              onChange={setYearTo}
            />
          )}
        </FilterBar>

        {hasActiveFilters && (
          <p className="search-results-info">
            Found {filteredParts.length} {partTypeLabel.toLowerCase()}
            {searchTerm && ` matching "${searchTerm}"`}
            {searchTerm && (selectedFormFactors.length > 0 || selectedFilters.length > 0 || selectedConditions.length > 0 || isYearFilterActive) && " and"}
            {selectedFormFactors.length > 0 &&
              ` filtered by ${selectedFormFactors.length} form factor${selectedFormFactors.length > 1 ? "s" : ""}`}
            {selectedFormFactors.length > 0 && (selectedFilters.length > 0 || selectedConditions.length > 0 || isYearFilterActive) && " and"}
            {selectedFilters.length > 0 &&
              ` ${selectedFormFactors.length > 0 ? "" : "filtered by "}${selectedFilters.length} ${
                partType === "graphicsCard" ? "interface" : "socket"
              }${selectedFilters.length > 1 ? "s" : ""}`}
            {selectedFilters.length > 0 && (selectedConditions.length > 0 || isYearFilterActive) && " and"}
            {selectedConditions.length > 0 &&
              ` ${selectedFormFactors.length > 0 || selectedFilters.length > 0 ? "" : "filtered by "}${selectedConditions.length} condition${selectedConditions.length > 1 ? "s" : ""}`}
            {selectedConditions.length > 0 && isYearFilterActive && " and"}
            {isYearFilterActive &&
              ` ${selectedFormFactors.length > 0 || selectedFilters.length > 0 || selectedConditions.length > 0 ? "" : "with "}release year ${yearFrom ?? "start"}–${yearTo ?? "end"}`}
          </p>
        )}

        {(partType === "motherboard" || partType === "cpu") && (
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
