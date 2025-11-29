import { Eye, EyeOff } from "lucide-react";

interface ShowAllToggleProps {
  showAll: boolean;
  onToggle: () => void;
}

export function ShowAllToggle({ showAll, onToggle }: ShowAllToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-3 px-3 py-2 transition-all duration-200"
      data-testid="button-show-all-toggle"
      aria-label={showAll ? "Hide all discoveries" : "Show all discoveries"}
      title={showAll ? "Hide all discoveries" : "Show all discoveries"}
    >
      {showAll ? (
        <svg viewBox="0 0 32 28" className="w-7 h-6" fill="none">
          {/* Left eye closed - ink brush strokes */}
          <path d="M 4 10 Q 8 14, 12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          {/* Right eye closed - ink brush strokes */}
          <path d="M 20 10 Q 24 14, 28 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          {/* Decorative stroke */}
          <path d="M 2 22 Q 16 24, 30 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
      ) : (
        <svg viewBox="0 0 32 28" className="w-7 h-6" fill="none">
          {/* Left eye open - ink brush style */}
          <ellipse cx="8" cy="10" rx="4" ry="6" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="8" cy="10" r="2" fill="currentColor" />
          {/* Right eye open - ink brush style */}
          <ellipse cx="24" cy="10" rx="4" ry="6" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="24" cy="10" r="2" fill="currentColor" />
          {/* Decorative stroke */}
          <path d="M 2 22 Q 16 24, 30 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
      )}
      <span className="text-sm font-medium text-foreground hidden sm:inline">
        {showAll ? "Hide All" : "Show All"}
      </span>
    </button>
  );
}
