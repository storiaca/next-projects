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
    const { draft, maxChars = 280, emojiMode = "few", context } = body;

    // Validate input
    if (!draft || typeof draft !== "string") {
      return NextResponse.json(
        { error: "Invalid input: 'draft' must be a non-empty string" },
        { status: 400 },
      );
    }

    // Build emoji rule
    const emojiRules = {
      none: "No emojis allowed",
      few: "Use 1-2 emojis if they add value",
      many: "Use 3-5 emojis to make it fun and expressive",
    };
    const emojiRule =
      emojiRules[emojiMode as keyof typeof emojiRules] || emojiRules.few;

    // Build the prompt for the LLM
    let prompt = `STRICT LIMITS:
- Maximum ${maxChars} characters (THIS IS MANDATORY)
- ${emojiRule}
- No hashtags`;

    if (context && context.trim()) {
      prompt += `\n\nAuthor style: ${context}`;
    }

    prompt += `

GUIDELINES:
- Lead with the value or hook
- Sound human and authentic
- Make it engaging and worth retweeting

Draft tweet: "${draft}"

Respond with ONLY the rewritten tweet. No quotes, no explanation.`;

    // Call Ollama to generate the transformed tweet
    const transformed = await generateWithOllama(prompt);

    // Return the transformed tweet
    return NextResponse.json({ transformed: transformed.trim() });
  } catch (error) {
    // Handle errors
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    // Check if it's an Ollama connection error
    const isOllamaError =
      errorMessage.includes("Failed to connect") ||
      errorMessage.includes("fetch") ||
      errorMessage.includes("ECONNREFUSED");

    const userMessage = isOllamaError
      ? `Ollama service is not running. Make sure Ollama is running at http://localhost:11434. Details: ${errorMessage}`
      : `Failed to transform tweet: ${errorMessage}`;

    return NextResponse.json({ error: userMessage }, { status: 500 });
  }
}
