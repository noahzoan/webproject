interface ShowAllToggleProps {
  showAll: boolean;
  onToggle: () => void;
}

export function ShowAllToggle({ showAll, onToggle }: ShowAllToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-3 py-2 transition-all duration-200"
      data-testid="button-show-all-toggle"
      aria-label={showAll ? "Hide all discoveries" : "Show all discoveries"}
      title={showAll ? "Hide all discoveries" : "Show all discoveries"}
    >
      {showAll ? (
        <svg viewBox="0 0 32 24" className="w-6 h-5" fill="none">
          {/* Ink brush X - crossed strokes */}
          <path d="M 6 6 Q 16 12, 26 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 26 6 Q 16 12, 6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 32 24" className="w-6 h-5" fill="none">
          {/* Ink brush plus - thick strokes */}
          <path d="M 16 2 Q 16 8, 16 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 16 12 Q 16 16, 16 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 4 12 Q 10 12, 16 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 16 12 Q 22 12, 28 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )}
      <span className="text-sm font-medium text-foreground hidden sm:inline">
        {showAll ? "Hide All" : "Show All"}
      </span>
    </button>
  );
}
