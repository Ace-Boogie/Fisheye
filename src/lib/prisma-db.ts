import { PrismaClient } from "@/generated/prisma/client";
import {PrismaBetterSqlite3} from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: "file:./prisma/dev.db" });
const prisma = new PrismaClient({ adapter });

export const getAllPhotographers = () =>
    prisma.photographer.findMany();

export const getPhotographer = (id: number) =>
    prisma.photographer.findUnique({
        where: { id },
    });

export const getAllMediasForPhotographer = (photographerId: number) =>
    prisma.media.findMany({
        where: { photographerId },
    });

export const updateNumberOfLikes = (
    mediaId: number,
    newNumberOfLikes: number
) =>
    prisma.media.update({
        where: { id: mediaId },
        data: { likes: newNumberOfLikes },
    });