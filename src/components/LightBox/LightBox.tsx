'use client';
import {useEffect, useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import type {Media} from "@/generated/prisma/client";
import styles from "./LightBox.module.css";
import Image from "next/image";

interface LightBoxProps {
    medias: Media[];
    index: number;
    onClose: () => void;
    onPrev?: () => void;
    onNext?: () => void;
}

export default function LightBox({medias, index, onClose, onPrev, onNext}: LightBoxProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    const media = medias[index];

    useEffect(() => {
        modalRef.current?.focus();
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
            if (event.key === "ArrowLeft" && onPrev) onPrev();
            if (event.key === "ArrowRight" && onNext) onNext();
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose, onPrev, onNext]);

    return (
        <div className={styles.overlay}>
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`lightbox-title-${media.id}`}
                tabIndex={-1}
                className={styles.lightbox}
            >

                <div className={styles.mediaContainer}>
                    <button
                        onClick={onPrev}
                        aria-label="Précédent"
                        className={styles.onPrevLightBox}
                    >
                        <FontAwesomeIcon icon={faChevronLeft}/>
                    </button>


                    {media.image && (
                        <Image
                            src={`/assets/${media.image}`}
                            alt={media.title}
                            fill
                            sizes="(max-width: 1200px) 90vw, 1050px"
                            className={styles.mediaImage}
                        />
                    )}

                    {media.video && (
                        <video controls className={styles.mediaVideo}>
                            <source src={`/assets/${media.video}`} type="video/mp4"/>
                        </video>
                    )}

                    <button
                        onClick={onNext}
                        aria-label="Suivant"
                        className={styles.onNextLightBox}
                    >
                        <FontAwesomeIcon icon={faChevronRight}/>
                    </button>

                    <button
                        onClick={onClose}
                        aria-label="Fermer"
                        className={styles.closeLightBox}
                    >
                        <FontAwesomeIcon icon={faTimes}/>
                    </button>

                </div>

                <p id={`lightbox-title-${media.id}`}>
                    {media.title}
                </p>

            </div>
        </div>
    );
}