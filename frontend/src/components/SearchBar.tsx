import React, { useEffect, useRef } from "react";
import "./SearchBar.css";

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    placeholder?: string;
    // Focus the field when "/" is pressed outside other inputs
    focusShortcut?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    searchTerm,
    onSearchChange,
    placeholder = "Search parts...",
    focusShortcut = false,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!focusShortcut) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) return;
            const target = e.target as HTMLElement;
            if (target.closest("input, textarea, select, [contenteditable='true']")) return;
            e.preventDefault();
            inputRef.current?.focus();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [focusShortcut]);

    return (
        <div className="search-bar">
            <input
                ref={inputRef}
                type="search"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Escape") {
                        if (searchTerm) {
                            onSearchChange("");
                        } else {
                            e.currentTarget.blur();
                        }
                    }
                }}
                placeholder={placeholder}
                className="search-input"
                enterKeyHint="search"
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="off"
                spellCheck={false}
            />
            {searchTerm && (
                <button
                    type="button"
                    className="search-clear"
                    aria-label="Clear search"
                    onClick={() => {
                        onSearchChange("");
                        inputRef.current?.focus();
                    }}
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            )}
        </div>
    );
};
