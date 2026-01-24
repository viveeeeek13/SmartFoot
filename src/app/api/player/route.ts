import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import PlayerProfile from "@/models/PlayerProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// CREATE or UPDATE profile
export async function POST(req: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    console.log("POST /api/player - Session:", session);

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    const profile = await PlayerProfile.findOneAndUpdate(
        { userId: session.user.id },
        { ...data, userId: session.user.id },
        { upsert: true, new: true }
    );

    return NextResponse.json(profile);
}

// GET profile
export async function GET() {
    await dbConnect();
    const session = await getServerSession(authOptions);
    console.log("GET /api/player - Session:", session);

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await PlayerProfile.findOne({
        userId: session.user.id,
    });

     return NextResponse.json(profile);
}
