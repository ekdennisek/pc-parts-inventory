import React from "react";
import type { PCPart } from "../types";
import { Modal } from "./Modal";
import "./ComponentActionDialog.css";

type Props = {
    part: PCPart;
    isSelected: boolean;
    canSelect: boolean;
    onSelect: () => void;
    onViewDetails: () => void;
    onClose: () => void;
};

export const ComponentActionDialog: React.FC<Props> = ({
    part,
    isSelected,
    canSelect,
    onSelect,
    onViewDetails,
    onClose,
}) => {
    return (
        <Modal title={part.name} onClose={onClose} size="sm">
            <div className="action-dialog-buttons">
                <button
                    className="btn-select"
                    disabled={!canSelect && !isSelected}
                    onClick={onSelect}
                >
                    {isSelected ? "Deselect" : "Select"}
                </button>
                <button className="btn-details" onClick={onViewDetails}>
                    View Details
                </button>
            </div>
        </Modal>
    );
};
