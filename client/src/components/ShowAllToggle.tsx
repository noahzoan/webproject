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
      {/* Soft bristle head */}
      <path d="M4.18 3.06c1.14-.18 2.92.62 4.52 2.26 1.54 1.58 2.42 3.33 2.2 4.48-.23 1.21-1.52 1.93-2.62 2.05-1.36.14-2.58-.44-3.44-1.3C3.07 9.7 2.47 8.32 2.7 7.1c.19-1.05.77-3.67 1.48-4.04z" />
      {/* Ferrule */}
      <path d="M9.02 9.18l1.99-1.99a.8.8 0 0 1 1.13 0l2.21 2.21a.8.8 0 0 1 0 1.13l-1.99 1.99z" />
      {/* Handle */}
      <path d="M12.18 12.34l6.62 6.62c.72.72.72 1.9 0 2.62-.72.72-1.9.72-2.62 0l-6.62-6.62z" />
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
