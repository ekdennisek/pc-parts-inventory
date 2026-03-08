import React, { useState, useRef, useEffect } from "react";
import "./FilterDropdown.css";

export interface FilterOption {
  value: string;
  label: string;
  colorClass?:
    | "intel"
    | "amd"
    | "default"
    | "working"
    | "defective"
    | "unknown";
}

interface FilterDropdownBaseProps {
  label: string;
  options: readonly FilterOption[];
}

interface MultiSelectProps extends FilterDropdownBaseProps {
  mode: "multi";
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

interface SingleSelectProps extends FilterDropdownBaseProps {
  mode: "single";
  selectedValue: string | null;
  onChange: (value: string | null) => void;
}

type FilterDropdownProps = MultiSelectProps | SingleSelectProps;

export const FilterDropdown: React.FC<FilterDropdownProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const getTriggerLabel = () => {
    if (props.mode === "multi") {
      if (props.selectedValues.length === 0) return props.label;
      if (props.selectedValues.length === 1) {
        const opt = props.options.find(
          (o) => o.value === props.selectedValues[0],
        );
        return `${props.label}: ${opt?.label ?? props.selectedValues[0]}`;
      }
      return `${props.label} (${props.selectedValues.length})`;
    } else {
      if (!props.selectedValue) return props.label;
      const opt = props.options.find((o) => o.value === props.selectedValue);
      return `${props.label}: ${opt?.label ?? props.selectedValue}`;
    }
  };

  const hasSelection =
    props.mode === "multi"
      ? props.selectedValues.length > 0
      : props.selectedValue !== null;

  const handleMultiToggle = (value: string) => {
    if (props.mode !== "multi") return;
    if (props.selectedValues.includes(value)) {
      props.onChange(props.selectedValues.filter((v) => v !== value));
    } else {
      props.onChange([...props.selectedValues, value]);
    }
  };

  const handleSingleSelect = (value: string | null) => {
    if (props.mode !== "single") return;
    props.onChange(value);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (props.mode === "multi") {
      props.onChange([]);
    } else {
      props.onChange(null);
    }
  };

  return (
    <div className="filter-dropdown" ref={wrapperRef}>
      <button
        className={`filter-dropdown-trigger ${hasSelection ? "has-selection" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="filter-dropdown-trigger-label">{getTriggerLabel()}</span>
        {hasSelection && (
          <span
            className="filter-dropdown-clear"
            onClick={handleClear}
            role="button"
            aria-label="Clear filter"
          >
            &times;
          </span>
        )}
        <span className={`filter-dropdown-chevron ${isOpen ? "open" : ""}`}>
          &#9662;
        </span>
      </button>

      {isOpen && (
        <div className="filter-dropdown-panel">
          <ul className="filter-dropdown-options">
            {props.mode === "single" && (
              <li
                className={`filter-dropdown-option ${props.selectedValue === null ? "selected" : ""}`}
                onClick={() => handleSingleSelect(null)}
              >
                <span className="filter-option-label">Any</span>
              </li>
            )}
            {props.options.map((option) => {
              const isSelected =
                props.mode === "multi"
                  ? props.selectedValues.includes(option.value)
                  : props.selectedValue === option.value;

              return (
                <li
                  key={option.value}
                  className={`filter-dropdown-option ${isSelected ? "selected" : ""}`}
                  onClick={() =>
                    props.mode === "multi"
                      ? handleMultiToggle(option.value)
                      : handleSingleSelect(option.value)
                  }
                >
                  {props.mode === "multi" && (
                    <span
                      className={`filter-option-checkbox ${isSelected ? "checked" : ""}`}
                    >
                      {isSelected ? "✓" : ""}
                    </span>
                  )}
                  {option.colorClass && (
                    <span
                      className={`filter-option-dot dot-${option.colorClass}`}
                    />
                  )}
                  <span className="filter-option-label">{option.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
