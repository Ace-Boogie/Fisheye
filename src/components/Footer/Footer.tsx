import type { Photographer } from "@/generated/prisma/client";
import styles from "./Footer.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";

interface FooterProps {
    photographer: Photographer;
    totalLikes: number;
}

export default function Footer({ photographer, totalLikes }: FooterProps) {
    return (
        <footer className={styles.footer}>
            <p aria-live="polite">{totalLikes} <FontAwesomeIcon icon={faHeart} className={styles.faHeart} /></p>
            <p>{photographer.price}€ / jour</p>
        </footer>
    );
}