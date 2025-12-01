interface ShowAllToggleProps {
  showAll: boolean;
  onToggle: () => void;
}

function InkBrushIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className}
      fill="currentColor"
      stroke="none"
    >
      {/* Brush tip - pointed ink brush bristles */}
      <path d="M12 2 C10 4, 9 7, 9.5 9 C10 11, 11 12, 12 12 C13 12, 14 11, 14.5 9 C15 7, 14 4, 12 2 Z" />
      
      {/* Ferrule - bamboo binding */}
      <rect x="10" y="12" width="4" height="2" rx="0.3" />
      
      {/* Handle - bamboo stick */}
      <path d="M10.5 14 L10.5 22 L13.5 22 L13.5 14 Z" />
      
      {/* Bamboo segments */}
      <line x1="10.5" y1="16" x2="13.5" y2="16" stroke="currentColor" strokeWidth="0.5" fill="none" />
      <line x1="10.5" y1="19" x2="13.5" y2="19" stroke="currentColor" strokeWidth="0.5" fill="none" />
    </svg>
  );
}

export function ShowAllToggle({ showAll, onToggle }: ShowAllToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="p-3 rounded-md bg-background/60 backdrop-blur-md border border-border/50 hover-elevate active-elevate-2 transition-all duration-200"
      data-testid="button-show-all-toggle"
      aria-label={showAll ? "Hide all discoveries" : "Show all discoveries"}
      title={showAll ? "Hide all discoveries" : "Show all discoveries"}
    >
      <InkBrushIcon className={`w-6 h-6 transition-opacity duration-200 rotate-[225deg] ${showAll ? 'text-primary' : 'text-foreground opacity-70'}`} />
    </button>
  );
}
