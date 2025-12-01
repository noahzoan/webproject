import { Paintbrush } from "lucide-react";

interface ShowAllToggleProps {
  showAll: boolean;
  onToggle: () => void;
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
      <Paintbrush className={`w-6 h-6 transition-opacity duration-200 ${showAll ? 'text-primary' : 'text-foreground opacity-70'}`} />
    </button>
  );
}
