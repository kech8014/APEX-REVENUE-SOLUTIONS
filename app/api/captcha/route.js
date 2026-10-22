import { NextResponse } from "next/server";
import { createChallenge } from "@/lib/captcha";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(createChallenge(), { headers: { "Cache-Control": "no-store" } });
}
