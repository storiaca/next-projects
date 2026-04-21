import { NextRequest, NextResponse } from "next/server";
import { generateWithOllama } from "@/app/lib/ollama";

/**
 * POST /api/transform
 * Transforms a draft tweet using Ollama LLM
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { draft } = body;

    // Validate input
    if (!draft || typeof draft !== "string") {
      return NextResponse.json(
        { error: "Invalid input: 'draft' must be a non-empty string" },
        { status: 400 }
      );
    }

    // Build the prompt for the LLM
    const prompt = `You are a professional tweet formatter. Your task is to improve the following draft tweet by making it:
- Cleaner and easier to read
- More engaging and compelling
- Well-formatted with proper punctuation and spacing
- Under 280 characters

Draft tweet: "${draft}"

Return ONLY the improved tweet, nothing else. No explanations or markdown.`;

    // Call Ollama to generate the transformed tweet
    const transformed = await generateWithOllama(prompt);

    // Return the transformed tweet
    return NextResponse.json({ transformed: transformed.trim() });
  } catch (error) {
    // Handle errors
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    // Check if it's an Ollama connection error
    const isOllamaError = errorMessage.includes("Failed to connect")
      || errorMessage.includes("fetch")
      || errorMessage.includes("ECONNREFUSED");

    const userMessage = isOllamaError
      ? `Ollama service is not running. Make sure Ollama is running at http://localhost:11434. Details: ${errorMessage}`
      : `Failed to transform tweet: ${errorMessage}`;

    return NextResponse.json({ error: userMessage }, { status: 500 });
  }
}
