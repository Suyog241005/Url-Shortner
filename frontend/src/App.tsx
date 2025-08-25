import { Link, Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import Shorten from "./pages/shorten"
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react"
import { Button } from "./components/ui/button"
import { initUser } from "./lib/init-user"
import { useEffect } from "react"
import { ModeToggle } from "./components/mode-toggle"

const App = () => {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      const email = user.emailAddresses[0]?.emailAddress ?? "";
      if (email) {
        void initUser({
          clerkId: user.id,
          emailAddress: email,
          firstName: user.firstName ?? undefined,
          lastName: user.lastName ?? undefined,
        });
      } else {
        console.log("No email found");
      }
    }
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }, [isSignedIn, user]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-20 w-full border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          
          <Link to="/" className="font-semibold tracking-tight text-lg">URL Shortener</Link>

          <div className="flex items-center gap-2">
            <nav className="hidden gap-1 sm:flex">
              <Button variant="ghost" size="sm" asChild className="cursor-pointer">
                <Link to="/">Home</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="cursor-pointer">
                <Link to="/shorten">Shorten</Link>
              </Button>
            </nav>
            <ModeToggle />
            {user ? (
              <UserButton />
            ) : (
              <SignInButton>
                <Button size="sm" variant="default" className="cursor-pointer">Sign in</Button>
              </SignInButton>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <SignedIn>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shorten" element={<Shorten />} />
            </Routes>
          </SignedIn>
          <SignedOut>
            <div className="flex min-h-[60vh] items-center justify-center">
              <div className="rounded-lg border bg-card p-8 text-center">
                <p className="mb-4 text-lg font-medium">Please sign in to continue</p>
                <SignInButton>
                  <Button className="cursor-pointer">Sign in</Button>
                </SignInButton>
              </div>
            </div>
          </SignedOut>
        </div>
      </main>
    </div>
  );
}

export default App