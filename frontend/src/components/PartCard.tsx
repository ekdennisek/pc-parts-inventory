import React from "react";
import type { PCPart } from "../types";
import { getSocketColor } from "../types";
import "./PartCard.css";
import type { CpuSocket } from "../data/sockets";

interface PartCardProps {
    part: PCPart;
    socket?: CpuSocket;
    partType?: string;
    inBuild?: boolean;
    onClick?: () => void;
    isSelected?: boolean;
    isDisabled?: boolean;
}

const CheckIcon = () => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="10" />
        <polyline points="9 12 11 14 15 10" />
    </svg>
);

const XIcon = () => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
);

export const PartCard: React.FC<PartCardProps> = ({
    part,
    socket,
    partType,
    inBuild,
    onClick,
    isSelected,
    isDisabled,
}) => {
    const socketColorClass = socket ? `socket-${getSocketColor(socket)}` : "";
    const typeClass = partType ? `type-${partType}` : "";

    const classes = [
        "part-card",
        socketColorClass,
        typeClass,
        inBuild ? "in-build" : "",
        onClick ? "clickable" : "",
        isSelected ? "selected" : "",
        isDisabled ? "disabled" : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={classes} onClick={isDisabled ? undefined : onClick}>
            {inBuild && <div className="in-build-watermark" />}
            {part.releaseYear && (
                <div className="part-year-badge" data-type={partType}>
                    {part.releaseYear}
                </div>
            )}
            <div className="part-header">
                <h3 className="part-name">{part.name}</h3>
                <div className="part-brand">{part.brand}</div>
            </div>
            {part.condition && (
                <div className="part-condition-status" data-condition={part.condition}>
                    {part.condition === "working" ? (
                        <>
                            <CheckIcon /> Working
                        </>
                    ) : (
                        <>
                            <XIcon /> Defective
                        </>
                    )}
                </div>
            )}
            <div className="part-description">{part.description}</div>
            {isSelected && <div className="selected-indicator">Selected</div>}
            {isDisabled && !isSelected && (
                <div className="disabled-indicator">No slots available</div>
            )}
        </div>
    );
};
