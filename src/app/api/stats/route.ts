import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import MatchStats from "@/models/MatchStats";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// ADD MATCH STATS
export async function POST(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  const stats = await MatchStats.create({
    ...data,
    playerId: session.user.id,
  });

  return NextResponse.json(stats, { status: 201 });
}

// GET MATCH STATS
export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stats = await MatchStats.find({
    playerId: session.user.id,
  }).sort({ matchDate: -1 });

  return NextResponse.json(stats);
}
