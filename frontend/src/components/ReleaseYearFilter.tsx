import React, { useState, useEffect } from "react";
import "./ReleaseYearFilter.css";

interface ReleaseYearFilterProps {
  minYear: number;
  maxYear: number;
  selectedMin: number | null;
  selectedMax: number | null;
  onRangeChange: (min: number, max: number) => void;
  onClear: () => void;
  isActive: boolean;
}

export const ReleaseYearFilter: React.FC<ReleaseYearFilterProps> = ({
  minYear,
  maxYear,
  selectedMin,
  selectedMax,
  onRangeChange,
  onClear,
  isActive,
}) => {
  // Local state for the input fields
  const [minInput, setMinInput] = useState(
    selectedMin !== null ? String(selectedMin) : String(minYear)
  );
  const [maxInput, setMaxInput] = useState(
    selectedMax !== null ? String(selectedMax) : String(maxYear)
  );

  // Update local state when props change
  useEffect(() => {
    setMinInput(selectedMin !== null ? String(selectedMin) : String(minYear));
    setMaxInput(selectedMax !== null ? String(selectedMax) : String(maxYear));
  }, [selectedMin, selectedMax, minYear, maxYear]);

  const handleMinSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const clampedValue = Math.min(
      value,
      selectedMax !== null ? selectedMax : maxYear
    );
    onRangeChange(clampedValue, selectedMax !== null ? selectedMax : maxYear);
  };

  const handleMaxSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const clampedValue = Math.max(
      value,
      selectedMin !== null ? selectedMin : minYear
    );
    onRangeChange(selectedMin !== null ? selectedMin : minYear, clampedValue);
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinInput(e.target.value);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxInput(e.target.value);
  };

  const handleMinInputBlur = () => {
    const value = parseInt(minInput);
    if (isNaN(value)) {
      setMinInput(String(selectedMin !== null ? selectedMin : minYear));
      return;
    }

    // Clamp to valid range
    const clampedValue = Math.max(
      minYear,
      Math.min(value, selectedMax !== null ? selectedMax : maxYear)
    );
    setMinInput(String(clampedValue));
    onRangeChange(clampedValue, selectedMax !== null ? selectedMax : maxYear);
  };

  const handleMaxInputBlur = () => {
    const value = parseInt(maxInput);
    if (isNaN(value)) {
      setMaxInput(String(selectedMax !== null ? selectedMax : maxYear));
      return;
    }

    // Clamp to valid range
    const clampedValue = Math.min(
      maxYear,
      Math.max(value, selectedMin !== null ? selectedMin : minYear)
    );
    setMaxInput(String(clampedValue));
    onRangeChange(selectedMin !== null ? selectedMin : minYear, clampedValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  const handleActivateFilter = () => {
    if (!isActive) {
      // Activate the filter with the full range
      onRangeChange(minYear, maxYear);
    }
  };

  const currentMin = selectedMin !== null ? selectedMin : minYear;
  const currentMax = selectedMax !== null ? selectedMax : maxYear;

  // Calculate the percentage position for the slider track
  const minPercent = ((currentMin - minYear) / (maxYear - minYear)) * 100;
  const maxPercent = ((currentMax - minYear) / (maxYear - minYear)) * 100;

  return (
    <div
      className={`release-year-filter ${isActive ? "active" : "inactive"}`}
      onClick={handleActivateFilter}
    >
      <div className="release-year-filter-header">
        <h3 className="release-year-filter-title">
          Filter by Release Year
          {!isActive && <span className="filter-hint"> (Click to enable)</span>}
        </h3>
        {isActive && (
          <button
            className="clear-year-filter-btn"
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
          >
            Clear
          </button>
        )}
      </div>

      <div
        className="release-year-filter-controls"
        onClick={(e) => isActive && e.stopPropagation()}
      >
        <div className="year-inputs">
          <div className="year-input-group">
            <label htmlFor="min-year">Min</label>
            <input
              id="min-year"
              type="number"
              value={minInput}
              onChange={handleMinInputChange}
              onBlur={handleMinInputBlur}
              onKeyDown={handleKeyDown}
              min={minYear}
              max={maxYear}
              disabled={!isActive}
            />
          </div>

          <span className="year-separator">—</span>

          <div className="year-input-group">
            <label htmlFor="max-year">Max</label>
            <input
              id="max-year"
              type="number"
              value={maxInput}
              onChange={handleMaxInputChange}
              onBlur={handleMaxInputBlur}
              onKeyDown={handleKeyDown}
              min={minYear}
              max={maxYear}
              disabled={!isActive}
            />
          </div>
        </div>

        <div className="year-slider-container">
          <div className="year-slider-wrapper">
            <div className="slider-track-background" />
            <div
              className="slider-track-highlight"
              style={{
                left: `${minPercent}%`,
                width: `${maxPercent - minPercent}%`,
              }}
            />
            <input
              type="range"
              className="year-slider year-slider-min"
              min={minYear}
              max={maxYear}
              value={currentMin}
              onChange={handleMinSliderChange}
              disabled={!isActive}
            />
            <input
              type="range"
              className="year-slider year-slider-max"
              min={minYear}
              max={maxYear}
              value={currentMax}
              onChange={handleMaxSliderChange}
              disabled={!isActive}
            />
          </div>
          <div className="year-slider-labels">
            <span>{minYear}</span>
            <span>{maxYear}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
