// src/app/api/getSectionWithSubSections/route.js

import connectDB from "@/lib/Database";
import { getAllSectionsWithSubsections } from "@/Controller/Section";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const result = await getAllSectionsWithSubsections();

    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error",error }, { status: 500 });
  }
}
