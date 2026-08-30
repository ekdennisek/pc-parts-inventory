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
        </Modal>
    );
};
