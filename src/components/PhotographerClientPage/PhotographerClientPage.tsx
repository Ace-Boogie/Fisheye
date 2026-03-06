'use client';
import {useState} from "react";
import styles from "./PhotographerClientPage.module.css"
import type {Photographer, Media} from "@/generated/prisma/client";
import PhotographerHeader from "@/components/PhotographerHeader/PhotographerHeader";
import MediaGallery from "@/components/MediaGallery/MediaGallery";
import Footer from "@/components/Footer/Footer";
import MediaSort from "@/components/MediaSort/MediaSort";
import LightBox from "@/components/LightBox/LightBox";
import ContactModal from "@/components/ContactModal/ContactModal";

interface PhotographerClientPageProps {
    photographer: Photographer;
    medias: Media[];
}


export default function PhotographerClientPage({photographer, medias}: PhotographerClientPageProps) {
    /* =========================
     TOTAL LIKES
  ========================= */

    const [totalLikes, setTotalLikes] = useState(
        medias.reduce((sum, media) => sum + media.likes, 0)
    );

    const handleLikeChange = (delta: number) => {
        setTotalLikes((prev) => prev + delta);
    };

    /* =========================
       TRI DES MÉDIAS
    ========================= */

    const [sortedMedias, setSortedMedias] = useState<Media[]>([...medias]);

    const handleSortChange = (criterion: "popularity" | "title" | "date") => {

        const copy = [...sortedMedias];

        if (criterion === "popularity") {
            copy.sort((a, b) => b.likes - a.likes);
        }

        if (criterion === "title") {
            copy.sort((a, b) => a.title.localeCompare(b.title));
        }

        if (criterion === "date") {
            copy.sort(
                (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
            );
        }

        setSortedMedias(copy);
    };

    /* =========================
       LIGHTBOX
    ========================= */

    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setIsLightboxOpen(true);
    };

    const closeLightbox = () => {
        setIsLightboxOpen(false);
    };

    const nextMedia = () => {
        setLightboxIndex((prev) =>
            prev === sortedMedias.length - 1 ? 0 : prev + 1
        );
    };

    const prevMedia = () => {
        setLightboxIndex((prev) =>
            prev === 0 ? sortedMedias.length - 1 : prev - 1
        );
    };

    /* =========================
       CONTACT MODAL
    ========================= */

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    /* =========================
       RENDER
    ========================= */

    return (
        <>
            <main className={styles.main}>
                <PhotographerHeader
                    photographer={photographer}
                    openModal={openModal}/>

                <MediaSort onSortChange={handleSortChange}/>
                <MediaGallery
                    medias={sortedMedias}
                    openLightbox={openLightbox}
                    onLikeChange={handleLikeChange}/>

                {isLightboxOpen &&
                    <LightBox
                        medias={sortedMedias}
                        index={lightboxIndex}
                        onClose={closeLightbox}
                        onNext={nextMedia}
                        onPrev={prevMedia}/>}

                {isModalOpen &&
                    <ContactModal
                        photographer={photographer}
                        onClose={closeModal}/>}
            </main>

            <Footer
                photographer={photographer}
                totalLikes={totalLikes}/>
        </>
    );
}