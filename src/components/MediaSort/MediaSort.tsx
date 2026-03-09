'use client';

import {useState, useRef, useEffect} from "react";
import styles from "./MediaSort.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";

interface MediaSortProps {
    onSortChange: (criterion: "popularity" | "title" | "date") => void;
}

export default function MediaSort({onSortChange}: MediaSortProps) {

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("Popularité");
    const [focusedIndex, setFocusedIndex] = useState(0);

    const selectRef = useRef<HTMLDivElement>(null);

    const options = [
        {label: "Popularité", value: "popularity"},
        {label: "Titre", value: "title"},
        {label: "Date", value: "date"}
    ];

    const handleSelect = (option: any) => {
        setSelected(option.label);
        onSortChange(option.value);
        setOpen(false);
    };

    /* fermeture si clic extérieur */

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.sortContainer}>
            <span id="sort-label">Trier par :</span>

            <div className={`${styles.customSelect} ${open ? styles.open : ""}`}
                ref={selectRef}>

                <button
                    className={styles.selectButton}
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    aria-labelledby="sort-label"
                    onClick={() => setOpen(!open)}
                    onKeyDown={(e) => {

                        if (e.key === "ArrowDown") {
                            e.preventDefault();
                            setOpen(true);
                            setFocusedIndex((prev) => (prev + 1) % options.length);
                        }

                        if (e.key === "ArrowUp") {
                            e.preventDefault();
                            setOpen(true);
                            setFocusedIndex((prev) =>
                                prev === 0 ? options.length - 1 : prev - 1
                            );
                        }

                        if (e.key === "Enter" && open) {
                            e.preventDefault();
                            handleSelect(options[focusedIndex]);
                        }

                        if (e.key === "Escape") {
                            setOpen(false);
                        }

                    }}
                >
                    {selected}


                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className={styles.arrow}/>

                </button>

                {open && (
                    <ul className={styles.options}
                        role="listbox">
                        {options
                            .map((option, index) => (
                                <li key={option.value}
                                    role="option"
                                    className={focusedIndex === index ? styles.active : ""}
                                    aria-selected={focusedIndex === index}
                                    onClick={() => handleSelect(option)}>

                                    {option.label}
                                </li>
                            ))}
                    </ul>
                )}

            </div>
        </div>
    );
}