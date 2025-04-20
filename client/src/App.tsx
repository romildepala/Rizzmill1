import { Route, Switch } from "wouter";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "./components/layout/ThemeToggle";
import GeneratePage from "./pages/generate";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <div className="min-h-screen bg-background text-foreground">
        <nav className="fixed top-0 right-0 p-4">
          <ThemeToggle />
        </nav>
        <Switch>
          <Route path="/generate" component={GeneratePage} />
          <Route path="/">
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-4xl font-bold mb-8">Welcome to RizzMill</h1>
              <a href="/generate" className="text-blue-500 hover:underline">
                Go to Image Generator
              </a>
            </div>
          </Route>
        </Switch>
      </div>
    </ThemeProvider>
  );
} 