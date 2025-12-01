import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AccessibleNav } from "@/components/AccessibleNav";
import Home from "@/pages/Home";
import DiscoverDetail from "@/pages/DiscoverDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Contributors from "@/pages/Contributors";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/discover/:slug" component={DiscoverDetail} />
      <Route path="/contributors" component={Contributors} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <AccessibleNav />
          <Toaster />
          <Router />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
