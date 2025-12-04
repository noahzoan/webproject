import { Switch, Route, Router as WouterRouter } from "wouter";
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

// Get base path for GitHub Pages deployment
const getBasePath = () => {
  // With custom domain (www.noah-zhou.com), no base path needed
  // The site is served from root, not a subdirectory
  return "";
};

function AppRoutes() {
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
  const base = getBasePath();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <WouterRouter base={base}>
            <AccessibleNav />
            <Toaster />
            <AppRoutes />
          </WouterRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
