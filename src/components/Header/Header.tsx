import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header({ title }: { title?: string }) {
    return (
        <header className={styles.header}>
            <Link href="/">
                <Image
                    src="/logo.png"
                    alt="Fisheye Home page"
                    width={200}
                    height={50}
                    className={styles.logo}
                />
            </Link>

            {title && <h1 aria-labelledby="photographers-title" id="photographers-title" className={styles.title}>{title}</h1>}
        </header>
    );
}

