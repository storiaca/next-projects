"use client";

import { useEffect, useState } from "react";
import { User, ChevronDown } from "lucide-react";

interface ContextButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  hasContext: boolean;
}

interface ContextPanelProps {
  onContextChange: (context: string) => void;
}

export function ContextButton({
  isOpen,
  onToggle,
  hasContext,
}: ContextButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="relative flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card hover:bg-accent/50 text-sm font-medium transition-colors"
    >
      <User className="w-4 h-4" />
      <span>Context</span>
      {hasContext && (
        <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
      )}
      <ChevronDown
        className={`w-4 h-4 transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
  );
}

export function ContextPanel({ onContextChange }: ContextPanelProps) {
  const [context, setContext] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("TweetSmith-context");
    if (saved) {
      setContext(saved);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage and notify parent
  const handleContextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContext = e.target.value;
    setContext(newContext);
    localStorage.setItem("TweetSmith-context", newContext);
    onContextChange(newContext);
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="p-4 rounded-lg border border-border bg-card">
      <textarea
        value={context}
        onChange={handleContextChange}
        placeholder="Describe your style, tone, or context (e.g., 'professional developer, humorous take on tech trends')"
        rows={2}
        className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder-muted-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
