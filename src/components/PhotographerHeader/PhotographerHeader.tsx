import Image from "next/image";
import type {Photographer} from "@/generated/prisma/client";
import styles from "./PhotographerHeader.module.css";
import React from "react";

interface PhotographerHeaderProps {
    photographer: Photographer;
    openModal: () => void;
    contactButtonRef: React.RefObject<HTMLButtonElement | null>;
}

export default function PhotographerHeader({photographer, openModal, contactButtonRef}: PhotographerHeaderProps) {

    return (
        <header className={styles.header}>
            <div className={styles.headerInfo}>
                <h1>{photographer.name}</h1>
                <h2>{photographer.city}, {photographer.country}</h2>
                <p>{photographer.tagline}</p>
            </div>
            <button className="button-primary"
                    onClick={openModal}
                    ref={contactButtonRef}
                    aria-haspopup="dialog">
                Contactez-moi
            </button>
            <Image
                src={`/assets/${photographer.portrait}`}
                alt={photographer.name}
                width={200}
                height={200}
                priority
                quality={75}
                className={styles.headerImage}
            />
        </header>
    );
}