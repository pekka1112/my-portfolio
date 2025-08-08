import { searchPosts } from "@/data/blog";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter 'q' is required" },
        { status: 400 }
      );
    }

    const posts = await searchPosts(query);

    return NextResponse.json({
      posts,
      query,
      total: posts.length,
    });
  } catch (error) {
    console.error("Error searching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to search blog posts" },
      { status: 500 }
    );
  }
} 