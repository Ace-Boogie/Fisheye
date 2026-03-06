import Image from "next/image";
import type { Media } from "@/generated/prisma/client";
import LikeButton from "@/components/LikeButton/LikeButton";
import styles from "./MediaGallery.module.css";

interface MediaGalleryProps {
    medias: Media[];
    openLightbox: (index: number) => void;
    onLikeChange: (delta: number) => void;
}

export default function MediaGallery({ medias, openLightbox, onLikeChange }: MediaGalleryProps) {
    return (
        <section className={styles.gallery} aria-label="Galerie des travaux">
            {medias.map((media, index) => (
                <article key={media.id} className={styles.mediaCard}>
                    <button
                        className={styles.mediaButton}
                        onClick={() => openLightbox(index)}
                        aria-label={`Ouvrir ${media.title}`}
                    >
                        {media.image &&
                            <Image
                                src={`/assets/${media.image}`}
                                alt={media.title}
                                className={styles.mediaImage}
                                width={900}
                                height={650}
                                quality={80}
                                sizes="(max-width: 1000px) 90vw, 900px"
                                loading="lazy"
                            />}
                        {media.video && (
                            <video src={`/assets/${media.video}`} className={styles.mediaVideo} />
                        )}
                    </button>

                    <div className={styles.mediaInfo}>
                        <h2>{media.title}</h2>
                        <LikeButton
                            mediaId={media.id}
                            initialLikes={media.likes}
                            onLikeChange={onLikeChange}
                            title={media.title}
                        />
                    </div>
                </article>
            ))}
        </section>
    );
}