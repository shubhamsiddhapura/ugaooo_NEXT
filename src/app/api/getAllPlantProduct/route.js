// src/app/api/getAllPlantProduct/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/Database";
import { getAllProductsBySection } from "@/Controller/Section";

export async function POST(req) {
  try {
    await connectDB();

    const { name } = await req.json();
    const result = await getAllProductsBySection(name);

    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    console.error("🔴 API Error in getAllPlantProduct:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
