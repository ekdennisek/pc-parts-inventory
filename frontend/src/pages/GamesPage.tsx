import React, { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { games } from "../data/games";
import type { GameStatus } from "../types";
import { getArrayParam, setParam } from "../hooks/useFilterParams";
import "./GamesPage.css";

type StatusFilter = "all" | GameStatus;

const StarIcon = () => (
    <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

export const GamesPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const searchTerm = searchParams.get("search") ?? "";
    const statusFilter = (searchParams.get("status") ?? "all") as StatusFilter;
    const selectedTags = getArrayParam(searchParams, "tags");

    const setSearchTerm = useCallback(
        (value: string) =>
            setSearchParams((prev) => setParam(prev, "search", value), {
                replace: true,
            }),
        [setSearchParams],
    );

    const setStatusFilter = useCallback(
        (value: StatusFilter) =>
            setSearchParams((prev) => setParam(prev, "status", value === "all" ? null : value), {
                replace: true,
            }),
        [setSearchParams],
    );

    const toggleTag = useCallback(
        (tag: string) =>
            setSearchParams(
                (prev) => {
                    const current = getArrayParam(prev, "tags");
                    const next = current.includes(tag)
                        ? current.filter((t) => t !== tag)
                        : [...current, tag];
                    return setParam(prev, "tags", next.length > 0 ? next : null);
                },
                { replace: true },
            ),
        [setSearchParams],
    );

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        games.forEach((game) => game.tags.forEach((tag) => tags.add(tag)));
        return [...tags].sort();
    }, []);

    const ownedCount = useMemo(() => games.filter((g) => g.status === "owned").length, []);
    const wishlistCount = games.length - ownedCount;

    const filteredGames = useMemo(() => {
        let filtered = games;

        if (statusFilter !== "all") {
            filtered = filtered.filter((game) => game.status === statusFilter);
        }

        if (searchTerm.trim()) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter((game) => game.name.toLowerCase().includes(searchLower));
        }

        if (selectedTags.length > 0) {
            filtered = filtered.filter((game) =>
                selectedTags.every((tag) => game.tags.some((t) => t === tag)),
            );
        }

        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }, [statusFilter, searchTerm, selectedTags]);

    const isFilterActive = searchTerm.trim() !== "" || selectedTags.length > 0;

    return (
        <div className="games-page">
            <div className="games-header">
                <div className="games-header-title">
                    <div className="wb-eyebrow">Game Library</div>
                    <h1>Games</h1>
                </div>
                <div className="games-header-stats wb-mono">
                    {ownedCount} owned &middot; {wishlistCount} on wishlist
                </div>
            </div>

            <div className="games-controls">
                <div className="games-search-row">
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        placeholder="Search games..."
                    />
                    <div className="status-tabs">
                        {(["all", "owned", "wishlist"] as const).map((status) => (
                            <button
                                key={status}
                                className={`status-tab wb-mono${statusFilter === status ? " active" : ""}`}
                                onClick={() => setStatusFilter(status)}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="tag-filter-row">
                    <span className="tag-filter-label wb-mono">Tags</span>
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            className={`tag-chip wb-mono${selectedTags.includes(tag) ? " active" : ""}`}
                            onClick={() => toggleTag(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {isFilterActive && (
                    <p className="search-results-info wb-mono">
                        {filteredGames.length} game{filteredGames.length !== 1 ? "s" : ""} match
                        {filteredGames.length === 1 ? "es" : ""}
                        {searchTerm.trim() && ` "${searchTerm}"`}
                        {selectedTags.length > 0 &&
                            ` tag${selectedTags.length > 1 ? "s" : ""} ${selectedTags
                                .map((t) => `"${t}"`)
                                .join(", ")}`}
                    </p>
                )}
            </div>

            <div className="games-grid">
                {filteredGames.map((game) => (
                    <div
                        key={game.id}
                        className={`game-card${game.status === "wishlist" ? " wishlist" : ""}`}
                    >
                        {game.status === "wishlist" && (
                            <div className="wishlist-badge wb-mono">Wishlist</div>
                        )}
                        <div className="game-eyebrow-row">
                            {game.status === "owned" ? (
                                <div className="game-status owned wb-mono">
                                    <span className="game-status-dot" />
                                    Owned
                                </div>
                            ) : (
                                <div className="game-status wanted wb-mono">
                                    <StarIcon />
                                    Wanted
                                </div>
                            )}
                            <div
                                className={`game-year wb-mono${game.status === "wishlist" ? " has-badge" : ""}`}
                            >
                                {game.releaseYear ?? ""}
                            </div>
                        </div>
                        <div className="game-name">{game.name}</div>
                        {game.notes && <div className="game-notes">{game.notes}</div>}
                        <div className="game-tags">
                            {game.tags.map((tag) => (
                                <button
                                    key={tag}
                                    className={`game-tag wb-mono${selectedTags.includes(tag) ? " active" : ""}`}
                                    onClick={() => toggleTag(tag)}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {filteredGames.length === 0 && (
                <div className="no-results">
                    <p>No games match the current filters.</p>
                    <p>Try clearing a tag or changing the search.</p>
                </div>
            )}
        </div>
    );
};
