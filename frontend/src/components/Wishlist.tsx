import React, { useMemo } from "react";
import type { AnyPart, AnyWishlistPart, PartType } from "../types";
import {
    formatWishlistValue,
    getWishlistFieldLabel,
    getWishlistFields,
    matchesWish,
} from "../utils/wishlist";
import "./Wishlist.css";

interface WishlistProps {
    partType: PartType;
    wishes: AnyWishlistPart[];
    parts: AnyPart[];
    usedPartIds: Set<string>;
    onSelectPart: (part: AnyPart) => void;
}

export const Wishlist: React.FC<WishlistProps> = ({
    partType,
    wishes,
    parts,
    usedPartIds,
    onSelectPart,
}) => {
    const fields = useMemo(() => getWishlistFields(wishes), [wishes]);

    const rows = useMemo(
        () =>
            wishes.map((wish) => ({
                wish,
                matches: parts.filter((part) => matchesWish(part, wish)),
            })),
        [wishes, parts],
    );

    return (
        <div className="wishlist">
            <table className="wishlist-table">
                <thead>
                    <tr>
                        {fields.map((field) => (
                            <th key={field}>{getWishlistFieldLabel(field)}</th>
                        ))}
                        <th>In Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(({ wish, matches }, index) => (
                        <tr key={index}>
                            {fields.map((field) => {
                                const value = (wish as Record<string, unknown>)[field];
                                return (
                                    <td key={field}>
                                        {value === undefined ? (
                                            <span className="wishlist-any">Any</span>
                                        ) : (
                                            formatWishlistValue(partType, field, value)
                                        )}
                                    </td>
                                );
                            })}
                            <td className="wishlist-stock">
                                {matches.length === 0 ? (
                                    <span className="wishlist-none">No</span>
                                ) : (
                                    <ul className="wishlist-matches">
                                        {matches.map((part) => {
                                            const notes = [
                                                usedPartIds.has(part.id) && "in build",
                                                part.condition === "defective" && "defective",
                                            ].filter(Boolean);
                                            return (
                                                <li key={part.id}>
                                                    <button
                                                        type="button"
                                                        className="wishlist-match"
                                                        onClick={() => onSelectPart(part)}
                                                    >
                                                        {part.name}
                                                    </button>
                                                    {notes.length > 0 && (
                                                        <span className="wishlist-match-notes">
                                                            {notes.join(" · ")}
                                                        </span>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
