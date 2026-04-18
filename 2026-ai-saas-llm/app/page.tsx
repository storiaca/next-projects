import TweetTransformer from "./components/TweetTransformer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#141414] text-[#fafafa] font-sans">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 sm:py-24">
        <div className="w-full max-w-md space-y-12 flex flex-col items-center">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-[#fafafa]">
              TweetSmith
            </h1>
            <p className="text-sm text-[#888888] tracking-wide">
              Transform your tweets with intelligence
            </p>
          </div>

          {/* Transformer Component */}
          <TweetTransformer />
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 py-6 text-center text-xs text-[#888888] border-t border-[#2a2a2a]">
        <p>powered by ollama</p>
      </footer>
    </div>
  );
}
