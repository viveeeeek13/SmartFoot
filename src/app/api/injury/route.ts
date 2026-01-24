import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import MatchStats from "@/models/MatchStats";
import InjuryRecord from "@/models/InjuryRecord";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);

  const matchesLastWeek = await MatchStats.countDocuments({
    playerId: session.user.id,
    matchDate: { $gte: last7Days },
  });

  const injuries = await InjuryRecord.countDocuments({
    playerId: session.user.id,
  });

  const restDays = Math.max(0, 7 - matchesLastWeek);

  const riskScore =
    matchesLastWeek * 15 +
    injuries * 20 -
    restDays * 10;

  let riskLevel = "LOW";
  if (riskScore > 60) riskLevel = "HIGH";
  else if (riskScore > 30) riskLevel = "MEDIUM";

  return NextResponse.json({
    riskScore,
    riskLevel,
  });
}
