import {getAllPhotographers} from "@/lib/prisma-db";
import type {Photographer} from "@/generated/prisma/client";
import Image from "next/image";
import Link from "next/link";
import styles from "./PhotographersPage.module.css";

export default async function PhotographersPage() {
    const photographers: Photographer[] = await getAllPhotographers();

    return (
        <section className={styles.photographersContainer}>
            <ul className={styles.photographersGrid}>
                {photographers.map((photographer) => (
                    <li key={photographer.id}>
                        <article className={styles.card}>
                            <Link
                                href={`/${photographer.id}`}
                                aria-label={`Voir le profil de ${photographer.name}`}
                            >
                                <Image
                                    src={`/assets/${photographer.portrait}`}
                                    alt={`Portrait de ${photographer.name}`}
                                    width={200}
                                    height={200}
                                    quality={75}
                                    priority
                                />

                                <h2>{photographer.name}</h2>

                                <p className={styles.country}>{photographer.city}, {photographer.country}</p>
                                <p className={styles.tagline}>{photographer.tagline}</p>
                                <p className={styles.price}>{photographer.price}€/jour</p>
                            </Link>
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    );
}