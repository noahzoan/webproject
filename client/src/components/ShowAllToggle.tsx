import { Eye, EyeOff } from "lucide-react";

interface ShowAllToggleProps {
  showAll: boolean;
  onToggle: () => void;
}

export function ShowAllToggle({ showAll, onToggle }: ShowAllToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-background/60 backdrop-blur-md border border-border/50 hover-elevate active-elevate-2 transition-all duration-200"
      data-testid="button-show-all-toggle"
      aria-label={showAll ? "Hide all discoveries" : "Show all discoveries"}
    >
      {showAll ? (
        <>
          <EyeOff className="w-5 h-5 text-foreground" />
          <span className="text-sm font-medium text-foreground hidden sm:inline">Hide All</span>
        </>
      ) : (
        <>
          <Eye className="w-5 h-5 text-foreground" />
          <span className="text-sm font-medium text-foreground hidden sm:inline">Show All</span>
        </>
      )}
    </button>
  );
}
