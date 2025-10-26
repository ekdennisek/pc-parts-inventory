import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { PartCard } from "../components/PartCard";
import { ReleaseYearFilter } from "../components/ReleaseYearFilter";
import { allParts } from "../data/parts";
import type { PCPart, PartType } from "../types";
import { PART_TYPES } from "../types";
import "./HomePage.css";
import { ScrollToTop } from "../components/ScrollToTop";

type SortOption = "releaseYear";

export const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("releaseYear");
  const [yearRangeFilter, setYearRangeFilter] = useState<{
    min: number | null;
    max: number | null;
  }>({ min: null, max: null });

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

  // Calculate min and max year from all parts (with release years only)
  const { minYear, maxYear } = useMemo(() => {
    const partsWithYears = allPartsFlat.filter((part) => part.releaseYear !== undefined);
    if (partsWithYears.length === 0) {
      return { minYear: new Date().getFullYear(), maxYear: new Date().getFullYear() };
    }
    const years = partsWithYears.map((part) => part.releaseYear!);
    return {
      minYear: Math.min(...years),
      maxYear: Math.max(...years),
    };
  }, [allPartsFlat]);

  // Filter parts based on search term and year range
  const filteredParts = useMemo(() => {
    let filtered = allPartsFlat;

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

    // Apply year range filter
    const isYearFilterActive = yearRangeFilter.min !== null || yearRangeFilter.max !== null;
    if (isYearFilterActive) {
      filtered = filtered.filter((part) => {
        // Hide parts without release year when filter is active
        if (part.releaseYear === undefined) {
          return false;
        }
        const min = yearRangeFilter.min ?? minYear;
        const max = yearRangeFilter.max ?? maxYear;
        return part.releaseYear >= min && part.releaseYear <= max;
      });
    }

    return filtered;
  }, [allPartsFlat, searchTerm, yearRangeFilter, minYear, maxYear]);

  // Sort and group parts based on sort option
  const sortedAndGroupedParts = useMemo(() => {
    if (sortOption === "releaseYear") {
      // Group parts by release year
      const grouped = new Map<
        number | "unknown",
        Array<PCPart & { partType: PartType }>
      >();

      filteredParts.forEach((part) => {
        const year = part.releaseYear ?? "unknown";
        if (!grouped.has(year)) {
          grouped.set(year, []);
        }
        grouped.get(year)!.push(part);
      });

      // Sort groups by year (descending), with "unknown" at the end
      const sortedGroups = Array.from(grouped.entries()).sort(([a], [b]) => {
        if (a === "unknown" && b === "unknown") return 0;
        if (a === "unknown") return 1;
        if (b === "unknown") return -1;
        return (b as number) - (a as number);
      });

      return sortedGroups.map(([year, parts]) => ({
        year,
        parts: parts.sort((a, b) => a.name.localeCompare(b.name)),
      }));
    }

    return [
      {
        year: "all" as const,
        parts: filteredParts,
      },
    ];
  }, [filteredParts, sortOption]);

  // Group parts by type for summary
  const partsSummary = useMemo(() => {
    const summary: Record<PartType, { total: number }> = {
      cpu: { total: 0 },
      motherboard: { total: 0 },
      powerSupply: { total: 0 },
      graphicsCard: { total: 0 },
      ram: { total: 0 },
      case: { total: 0 },
    };

    Object.entries(allParts).forEach(([partType, parts]) => {
      const type = partType as PartType;
      summary[type].total = parts.length;
    });

    return summary;
  }, []);

  const handleYearRangeChange = (min: number, max: number) => {
    setYearRangeFilter({ min, max });
  };

  const handleClearYearFilter = () => {
    setYearRangeFilter({ min: null, max: null });
  };

  const isYearFilterActive = yearRangeFilter.min !== null || yearRangeFilter.max !== null;

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>PC Parts Inventory</h1>
        <p>My PC parts inventory and the builds they're in</p>
        <div className="hero-actions">
          <Link to="/build-planner" className="cta-button">
            🔧 Plan a PC Build
          </Link>
        </div>
      </div>

      <div className="summary-section">
        <h2>Inventory Summary</h2>
        <div className="summary-grid">
          {Object.entries(PART_TYPES).map(([key, label]) => {
            const partType = key as PartType;
            const { total } = partsSummary[partType];
            return (
              <div key={key} className="summary-card" data-type={partType}>
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
        <div className="search-header">
          <h2>Search All Parts</h2>
          <div className="sort-dropdown">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
            >
              <option value="releaseYear">Release Year</option>
            </select>
          </div>
        </div>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Search by name, brand, or description..."
        />

        <ReleaseYearFilter
          minYear={minYear}
          maxYear={maxYear}
          selectedMin={yearRangeFilter.min}
          selectedMax={yearRangeFilter.max}
          onRangeChange={handleYearRangeChange}
          onClear={handleClearYearFilter}
          isActive={isYearFilterActive}
        />

        {(searchTerm || isYearFilterActive) && (
          <p className="search-results-info">
            Found {filteredParts.length} part
            {filteredParts.length !== 1 ? "s" : ""}
            {searchTerm && ` matching "${searchTerm}"`}
            {searchTerm && isYearFilterActive && " and"}
            {isYearFilterActive &&
              ` ${searchTerm ? "" : "with "}release year ${yearRangeFilter.min ?? minYear}–${yearRangeFilter.max ?? maxYear}`}
          </p>
        )}
      </div>

      <div className="parts-section">
        {sortedAndGroupedParts.map(({ year, parts }) => (
          <div key={year} className="parts-group">
            {year !== "all" && (
              <div className="year-header">
                <h3>{year === "unknown" ? "Unknown Release Year" : year}</h3>
                <span className="part-count">
                  {parts.length} part{parts.length !== 1 ? "s" : ""}
                </span>
              </div>
            )}
            <div className="parts-grid">
              {parts.map((part) => (
                <div key={part.id} className="part-item">
                  <div className="part-type-badge" data-type={part.partType}>
                    {PART_TYPES[part.partType]}
                  </div>
                  <PartCard part={part} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredParts.length === 0 && searchTerm && (
        <div className="no-results">
          <p>No parts found matching your search.</p>
          <p>Try different keywords or browse specific categories.</p>
        </div>
      )}

      <ScrollToTop />
    </div>
  );
};
