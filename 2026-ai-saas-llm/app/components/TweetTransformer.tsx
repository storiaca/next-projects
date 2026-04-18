"use client";

import { useState } from "react";

export default function TweetTransformer() {
  const [draft, setDraft] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const charCount = draft.length;
  const isDisabled = charCount === 0 || isLoading;

  const handleTransform = async () => {
    // Reset error and result states
    setError("");
    setResult("");
    setIsLoading(true);

    try {
      // Call transform API
      const response = await fetch("/api/transform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ draft }),
      });

      // Check if request was successful
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      // Parse and set the transformed tweet
      const data = await response.json();
      setResult(data.transformed);
    } catch (err) {
      // Set error message on failure
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(`Failed to transform tweet: ${errorMessage}`);
    } finally {
      // Always set loading to false
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      {/* Input Section */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold tracking-widest text-[#888888] uppercase">
          Your Tweet
        </label>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Paste your draft tweet here..."
          className="w-full h-32 px-4 py-3 bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg text-[#fafafa] placeholder-[#888888] focus:outline-none focus:border-[#888888] focus:ring-0 resize-none font-sans text-sm leading-relaxed"
        />
        <div className="flex justify-end text-xs text-[#888888]">
          <span>
            {charCount} / <span className="text-[#666666]">280</span>
          </span>
        </div>
      </div>

      {/* Transform Button */}
      <button
        onClick={handleTransform}
        disabled={isDisabled}
        className="w-full px-4 py-3 bg-[#fafafa] text-[#141414] font-semibold rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-[#f0f0f0] text-sm uppercase tracking-wide"
      >
        {isLoading ? "Transforming..." : "Transform"}
      </button>

      {/* Error Message */}
      {error && <div className="text-sm text-red-500 px-2 py-1">{error}</div>}

      {/* Output Section */}
      {result && (
        <div className="space-y-3">
          <label className="block text-xs font-semibold tracking-widest text-[#888888] uppercase">
            Transformed Tweet
          </label>
          <div className="w-full px-4 py-3 bg-[#1c1c1c] border border-[#2a2a2a] rounded-lg text-[#fafafa] text-sm leading-relaxed min-h-24">
            {result}
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(result);
            }}
            className="w-full px-4 py-2 bg-[#2a2a2a] text-[#fafafa] font-semibold rounded-lg transition-all duration-200 hover:bg-[#333333] text-xs uppercase tracking-wide"
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
}
