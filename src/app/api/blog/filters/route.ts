import { getTags } from "@/data/blog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tags = await getTags();

    return NextResponse.json({
      tags,
    });
  } catch (error) {
    console.error("Error fetching blog filters:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog filters" },
      { status: 500 }
    );
  }
} 