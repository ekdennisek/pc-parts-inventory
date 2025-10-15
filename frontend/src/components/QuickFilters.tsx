import React from "react";
import "./QuickFilters.css";

interface QuickFiltersProps {
  filters: readonly string[];
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
  filterType?: "socket" | "interface" | "formFactor";
  getFilterColor?: (filter: string) => "intel" | "amd" | "default";
  title?: string;
}

export const QuickFilters: React.FC<QuickFiltersProps> = ({
  filters,
  selectedFilters,
  onFilterChange,
  filterType = "socket",
  getFilterColor,
  title,
}) => {
  const handleFilterClick = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      // Remove filter
      onFilterChange(selectedFilters.filter((f) => f !== filter));
    } else {
      // Add filter
      onFilterChange([...selectedFilters, filter]);
    }
  };

  const handleClearAll = () => {
    onFilterChange([]);
  };

  const getDefaultTitle = () => {
    if (filterType === "socket") return "Socket";
    if (filterType === "interface") return "Interface";
    if (filterType === "formFactor") return "Form Factor";
    return "Filter";
  };

  return (
    <div className="quick-filters">
      <div className="quick-filters-header">
        <h3 className="quick-filters-title">
          Quick Filter by {title || getDefaultTitle()}
        </h3>
        {selectedFilters.length > 0 && (
          <button className="clear-filters-btn" onClick={handleClearAll}>
            Clear All
          </button>
        )}
      </div>
      <div className="quick-filters-buttons">
        {filters.map((filter) => {
          const isActive = selectedFilters.includes(filter);
          const colorClass = getFilterColor
            ? `filter-${getFilterColor(filter)}`
            : "filter-default";

          return (
            <button
              key={filter}
              className={`filter-btn ${colorClass} ${isActive ? "active" : ""}`}
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </button>
          );
        })}
      </div>
    </div>
  );
};
