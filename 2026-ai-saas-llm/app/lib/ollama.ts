/**
 * Ollama LLM Helper
 * Communicates with local Ollama instance for text generation
 */

const OLLAMA_BASE_URL = "http://localhost:11434";
const OLLAMA_MODEL = "gemma3:4b";

/**
 * Request type for Ollama API
 */
interface OllamaRequest {
  model: string;
  prompt: string;
  stream: boolean;
}

/**
 * Response type from Ollama API
 */
interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

/**
 * Generates text using local Ollama LLM
 * @param prompt - The prompt to send to the model
 * @returns The generated response text
 * @throws Error if the request fails or model is unavailable
 */
export async function generateWithOllama(prompt: string): Promise<string> {
  try {
    // Prepare the request payload
    const requestPayload: OllamaRequest = {
      model: OLLAMA_MODEL,
      prompt,
      stream: false,
    };

    // Send POST request to Ollama API
    const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    });

    // Check if request was successful
    if (!response.ok) {
      throw new Error(
        `Ollama API error: ${response.status} ${response.statusText}`,
      );
    }

    // Parse the response
    const data: OllamaResponse = await response.json();

    // Return the generated response text
    return data.response;
  } catch (error) {
    // Provide helpful error messages
    if (error instanceof Error) {
      throw new Error(`Failed to generate with Ollama: ${error.message}`);
    }
    throw new Error("Failed to generate with Ollama: Unknown error");
  }
}
