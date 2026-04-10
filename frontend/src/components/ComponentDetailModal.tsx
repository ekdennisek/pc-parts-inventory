import React from "react";
import type { AnyPart, PartType } from "../types";
import { Modal } from "./Modal";
import { ComponentSpecs } from "./ComponentSpecs";

type Props = {
    part: AnyPart;
    partType: PartType;
    inBuild?: boolean;
    onClose: () => void;
};

export const ComponentDetailModal: React.FC<Props> = ({ part, partType, onClose }) => {
    return (
        <Modal title={part.name} onClose={onClose} size="lg">
            <ComponentSpecs part={part} partType={partType} />
            {part.datasheet && (
                <div
                    style={{
                        marginTop: "1rem",
                        paddingTop: "1rem",
                        borderTop: "1px solid #e9ecef",
                    }}
                >
                    <a href={part.datasheet} target="_blank" rel="noreferrer">
                        View Datasheet
                    </a>
                </div>
            )}
        </Modal>
    );
};
