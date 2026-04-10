import React, { useEffect } from "react";
import "./Modal.css";

type Props = {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
    size?: "sm" | "lg";
};

export const Modal: React.FC<Props> = ({ title, onClose, children, size = "lg" }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className={`modal-panel ${size}`} onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <span className="modal-title">{title}</span>
                    <button className="modal-close" onClick={onClose} aria-label="Close">
                        ×
                    </button>
                </div>
                <div className="modal-content">{children}</div>
            </div>
        </div>
    );
};
