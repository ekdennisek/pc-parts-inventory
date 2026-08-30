import React from "react";
import type { PCPart, PartType } from "../types";
import { getSocketColor, PART_TYPE_LABELS } from "../types";
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
    const typeLabel = partType ? PART_TYPE_LABELS[partType as PartType] : undefined;

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

    const conditionKey = part.condition ?? "unknown";
    const conditionLabel =
        part.condition === "working"
            ? "Working"
            : part.condition === "defective"
              ? "Defective"
              : "Untested";

    return (
        <div className={classes} onClick={isDisabled ? undefined : onClick}>
            {inBuild && !isSelected && <div className="part-corner-badge">In build</div>}
            {isSelected && <div className="part-corner-badge">Selected</div>}
            <div className="part-eyebrow-row">
                {typeLabel && (
                    <div className="part-type-label" data-type={partType}>
                        {typeLabel}
                    </div>
                )}
                <div
                    className={`part-condition-status${inBuild || isSelected ? " has-badge" : ""}`}
                    data-condition={conditionKey}
                >
                    <span className="part-condition-dot" />
                    {conditionLabel}
                </div>
            </div>
            <div className="part-header">
                <h3 className="part-name">{part.name}</h3>
                <div className="part-brand">{part.brand}</div>
            </div>
            <div className="part-description">{part.description}</div>
            <div className="part-meta-row">
                <span className="part-meta">{socket ?? ""}</span>
                <span className="part-meta">{part.releaseYear ?? ""}</span>
            </div>
            {isDisabled && !isSelected && (
                <div className="disabled-indicator">No slots available</div>
            )}
        </div>
    );
};
