"use client";

import {useEffect} from "react";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({error, reset}: ErrorProps) {
    useEffect(() => {
        console.error("Application error:", error);
    }, [error]);

    return (
        <div className="error-container">
            <h2>Une erreur est survenue</h2>

            <p>
                Impossible de charger les données. Merci de réessayer.
            </p>

            <button onClick={() => reset()}>
                Réessayer
            </button>
        </div>
    );
}