"use client";

import {
  ChevronDown,
  SlidersHorizontal,
  Ban,
  Smile,
  SmilePlus,
} from "lucide-react";

export type Filters = {
  maxChars: number;
  emojiMode: "none" | "few" | "many";
};

interface FilterButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  filters: Filters;
}

interface FilterPanelProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function FilterButton({ isOpen, onToggle, filters }: FilterButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card hover:bg-accent/50 text-sm font-medium transition-colors"
    >
      <SlidersHorizontal className="w-4 h-4" />
      <span>
        Filters {filters.maxChars} · {filters.emojiMode}
      </span>
      <ChevronDown
        className={`w-4 h-4 transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
  );
}

export function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  const handleMaxCharsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      maxChars: parseInt(e.target.value, 10),
    });
  };

  const handleEmojiModeChange = (mode: "none" | "few" | "many") => {
    onFiltersChange({
      ...filters,
      emojiMode: mode,
    });
  };

  return (
    <div className="p-4 rounded-lg border border-border bg-card">
      <div className="flex items-center gap-4">
        {/* Max Characters Section */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium whitespace-nowrap text-foreground">
            Characters:
          </label>
          <input
            type="range"
            min="100"
            max="280"
            step="20"
            value={filters.maxChars}
            onChange={handleMaxCharsChange}
            className="w-32 cursor-pointer"
          />
          <span className="text-sm text-muted-foreground w-10 text-right">
            {filters.maxChars}
          </span>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-border" />

        {/* Emoji Mode Section */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">Emoji:</span>
          <div className="flex gap-1">
            <button
              onClick={() => handleEmojiModeChange("none")}
              className={`h-7 w-7 rounded-md flex items-center justify-center transition-colors ${
                filters.emojiMode === "none"
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent hover:bg-accent/80 text-foreground"
              }`}
              title="No emojis"
              type="button"
            >
              <Ban className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleEmojiModeChange("few")}
              className={`h-7 w-7 rounded-md flex items-center justify-center transition-colors ${
                filters.emojiMode === "few"
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent hover:bg-accent/80 text-foreground"
              }`}
              title="Few emojis"
              type="button"
            >
              <Smile className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleEmojiModeChange("many")}
              className={`h-7 w-7 rounded-md flex items-center justify-center transition-colors ${
                filters.emojiMode === "many"
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent hover:bg-accent/80 text-foreground"
              }`}
              title="Many emojis"
              type="button"
            >
              <SmilePlus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
