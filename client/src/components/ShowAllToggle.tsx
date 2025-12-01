interface ShowAllToggleProps {
  showAll: boolean;
  onToggle: () => void;
}

function BrushIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className}
      fill="currentColor"
      stroke="none"
    >
      {/* Brush tip/bristles */}
      <path d="M3 2 C4 3, 6 5, 7 7 C8 9, 7.5 10, 6.5 10.5 C5.5 11, 4.5 10.5, 4 9 C3 7, 2 4, 3 2 Z" />
      
      {/* Ferrule (metal band) */}
      <rect x="6" y="9" width="4" height="2" rx="0.5" transform="rotate(45, 8, 10)" />
      
      {/* Handle */}
      <path d="M8.5 11 L19 21.5 C19.5 22, 20.5 22, 21 21.5 C21.5 21, 21.5 20, 21 19.5 L10.5 9 Z" />
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
      <BrushIcon className={`w-6 h-6 transition-opacity duration-200 ${showAll ? 'text-primary' : 'text-foreground opacity-70'}`} />
    </button>
  );
}
