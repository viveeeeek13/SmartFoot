import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Tournament from "@/models/Tournament";

export async function GET() {
    await dbConnect();
    try {
        const tournaments = await Tournament.find({}).sort({ createdAt: -1 });
        return NextResponse.json(tournaments);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch tournaments" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    await dbConnect();
    try {
        const data = await req.json();
        const tournament = await Tournament.create(data);
        return NextResponse.json(tournament, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create tournament" }, { status: 500 });
    }
}
