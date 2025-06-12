import { useEffect, useRef, useState, type FC, type JSX } from "react";
import type { AminoAcidType } from "../../types";
import { SequenceItem } from "./SequenceItem";
import "./styles.css";
import { useNotificationContext } from "../../../Notification/NotificationContext";

const CHAR_WIDTH = 18;

type SequenceListProps = {
    first: AminoAcidType[];
    second: AminoAcidType[];
};

export const SequenceList: FC<SequenceListProps> = ({ first, second }) => {
    const notification = useNotificationContext();
    const [chunkSize, setChunkSize] = useState(10);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const updateChunkSize = () => {
        if (containerRef.current) {
            const width = containerRef.current.offsetWidth;
            const estimatedChunk = Math.floor(width / CHAR_WIDTH);
            setChunkSize(Math.max(1, estimatedChunk));
        }
    };

    useEffect(() => {
        updateChunkSize();
        window.addEventListener("resize", updateChunkSize);
        return () => window.removeEventListener("resize", updateChunkSize);
    }, []);

    const handleMouseUp = () => {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) return;

        const containers = document.querySelectorAll(".sequence__container");
        for (const container of containers) {
            if (!container.contains(selection.anchorNode) || !container.contains(selection.focusNode)) {
                return;
            }
        }

        const selectedText = selection.toString().replace(/\s+/g, "");

        navigator.clipboard.writeText(selectedText)
            .then(() => {
                notification.openSnackbar(`Copied ${selectedText.length} amino acids`);
            })
            .catch((err) => {
                console.error("Clipboard write failed:", err);
            });
    };

    useEffect(() => {
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    const chunks: JSX.Element[] = [];
    const maxLength = Math.max(first.length, second.length);

    for (let i = 0; i < maxLength; i += chunkSize) {
        const firstChunk = first.slice(i, i + chunkSize);
        const secondChunk = second.slice(i, i + chunkSize);

        chunks.push(
            <div key={`f-${i}`} className="sequence__row sequence__first">
                {firstChunk.map((symbol, idx) => (
                    <span key={`f-${i + idx}`} className="sequence__item-wrapper">
                        <SequenceItem symbol={symbol} />
                    </span>
                ))}
            </div>
        );

        chunks.push(
            <div key={`s-${i}`} className="sequence__row">
                {secondChunk.map((symbol, idx) => (
                    <span key={`s-${i + idx}`} className="sequence__item-wrapper">
                        <SequenceItem symbol={symbol} second equal={first[i + idx] === symbol} />
                    </span>
                ))}
            </div>
        );
    }

    return (
        <div className="sequence__container" ref={containerRef}>
            {chunks}
        </div>
    );
};
