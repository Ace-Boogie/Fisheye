"use client";
import {useState, useEffect, useRef} from "react";
import type {Photographer} from "@/generated/prisma/client";
import styles from "./ContactModal.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

interface ContactModalProps {
    photographer: Photographer;
    onClose: () => void;
}

export default function ContactModal({photographer, onClose}: ContactModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const firstInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({name: "", email: "", message: ""});

    /* =========================
    FOCUS AUTO + ESCAPE
 ========================= */

    useEffect(() => {
        firstInputRef.current?.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }

            // Focus trap
            if (event.key === "Tab" && modalRef.current) {
                const focusableElements = modalRef.current.querySelectorAll<
                    HTMLButtonElement | HTMLInputElement | HTMLTextAreaElement
                >("button, input, textarea");

                const firstElement = focusableElements[0];
                const lastElement =
                    focusableElements[focusableElements.length - 1];

                if (!event.shiftKey && document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }

                if (event.shiftKey && document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    /* =========================
       FORM HANDLERS
    ========================= */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form data:", formData);
        onClose();
    };

    return (
        <div ref={modalRef} role="dialog" aria-modal="true" aria-label={`Contactez ${photographer.name}`} className={styles.modal}>
            <form onSubmit={handleSubmit}>
                <button onClick={onClose}
                        aria-label="Fermer"
                        className={styles.closeButton}>
                    <FontAwesomeIcon icon={faTimes}/>
                </button>
                <label>
                    Nom
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
                </label>
                <label>
                    Email
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required/>
                </label>
                <label>
                    Message
                    <textarea name="message" value={formData.message} onChange={handleChange} required/>
                </label>
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
}