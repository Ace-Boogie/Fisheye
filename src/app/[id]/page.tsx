import {getPhotographer, getAllMediasForPhotographer} from "@/lib/prisma-db";
import Header from "@/components/Header/Header";
import PhotographerClientPage from "@/components/PhotographerClientPage/PhotographerClientPage";


interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function PhotographerPage({params}: PageProps) {

    const resolvedParams = await params;
    const photographerId = parseInt(resolvedParams.id, 10);


    if (isNaN(photographerId)) {
        return <p>Invalid photographer ID</p>;
    }

    // Récupération des données via Prisma
    const photographer = await getPhotographer(photographerId);
    const medias = await getAllMediasForPhotographer(photographerId);

    if (!photographer) {
        return <p>Photographer not found</p>;
    }

    return (
        <>
            <Header/>
            <PhotographerClientPage photographer={photographer} medias={medias}/>
        </>
    );
}