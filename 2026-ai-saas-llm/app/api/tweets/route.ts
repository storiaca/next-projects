import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

// GET: Fetch all saved tweets ordered by createdAt desc
export async function GET() {
  try {
    const tweets = await prisma.savedTweet.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(tweets, { status: 200 });
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return NextResponse.json(
      { error: "Failed to fetch tweets" },
      { status: 500 },
    );
  }
}

// POST: Save a new tweet
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { original, transformed, context, imageUrl, imageAlt } = body;

    // Validate required fields
    if (!original || !transformed) {
      return NextResponse.json(
        { error: "original and transformed fields are required" },
        { status: 400 },
      );
    }

    const newTweet = await prisma.savedTweet.create({
      data: {
        original,
        transformed,
        context: context || null,
        imageUrl: imageUrl || null,
        imageAlt: imageAlt || null,
      },
    });

    return NextResponse.json(newTweet, { status: 201 });
  } catch (error) {
    console.error("Error creating tweet:", error);
    return NextResponse.json(
      { error: "Failed to create tweet" },
      { status: 500 },
    );
  }
}

// DELETE: Delete a tweet by id
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "id query parameter is required" },
        { status: 400 },
      );
    }

    const deletedTweet = await prisma.savedTweet.delete({
      where: { id },
    });

    return NextResponse.json(deletedTweet, { status: 200 });
  } catch (error) {
    console.error("Error deleting tweet:", error);

    // Handle case where tweet doesn't exist
    if (
      error instanceof Error &&
      error.message.includes("Record to delete does not exist")
    ) {
      return NextResponse.json({ error: "Tweet not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to delete tweet" },
      { status: 500 },
    );
  }
}
