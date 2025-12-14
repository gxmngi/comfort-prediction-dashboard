// app/api/db-test/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ ok: true, message: "DB connection OK" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "DB connection FAILED" },
      { status: 500 }
    );
  }
}
