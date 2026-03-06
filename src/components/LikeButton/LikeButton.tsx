'use client';

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import styles from "@/components/MediaGallery/MediaGallery.module.css";

interface LikeButtonProps {
    mediaId: number;
    initialLikes: number;
    onLikeChange: (delta: number) => void;
    title: string;
}

export default function LikeButton({
                                       mediaId,
                                       initialLikes,
                                       onLikeChange,
                                       title
                                   }: LikeButtonProps) {

    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false);

    const toggleLike = async () => {

        const newLiked = !liked;
        const delta = newLiked ? 1 : -1;
        const newLikes = likes + delta;

        setLiked(newLiked);
        setLikes(newLikes);

        // Mise à jour du total des likes dans le parent
        onLikeChange(delta);

        try {
            await fetch(`/api/media/${mediaId}/like`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ newLikes })
            });
        } catch (error) {
            console.error("Erreur lors de la mise à jour du like", error);
        }
    };

    return (
        <button
            onClick={toggleLike}
            aria-label={`${liked ? "Retirer le like de" : "Ajouter un like à"} ${title}`}
            aria-pressed={liked}
        >
            {likes}
            <FontAwesomeIcon
                icon={liked ? faHeartSolid : faHeartRegular}
                className={styles.faHeartSolid}
            />
        </button>
    );
}