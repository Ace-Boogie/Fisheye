import { NextRequest, NextResponse } from "next/server";
import { updateNumberOfLikes } from "@/lib/prisma-db";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const mediaId = parseInt(id, 10);
    const { newLikes } = await req.json();

    try {
        await updateNumberOfLikes(mediaId, newLikes);
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to update likes" }, { status: 500 });
    }
}