"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { supabase } from "@/lib/supabase";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!supabase) return;

    let isMounted = true;

    const getInitialSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        setUser(null);
        return;
      }

      if (isMounted) {
        setUser(data.session?.user ?? null);
      }
    };

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "logout" }),
      });
    } catch {
      // Ignore network errors and continue client-side cleanup.
    }

    if (supabase) {
      await supabase.auth.signOut();
    }

    setUser(null);
    router.replace("/login");
    router.refresh();
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <header className="border-b border-border bg-background text-foreground">
            <nav className="mx-auto flex w-full max-w-5xl items-center justify-between gap-6 px-6 py-4">
              <div className="flex items-center gap-6">
                <Link className="text-sm font-medium transition-opacity hover:opacity-80" href="/">
                  Main
                </Link>
                <Link className="text-sm font-medium transition-opacity hover:opacity-80" href="/home">
                  Home
                </Link>
                <Link className="text-sm font-medium transition-opacity hover:opacity-80" href="/about">
                  About
                </Link>
                <Link className="text-sm font-medium transition-opacity hover:opacity-80" href="/shadcntest">
                  shadcnTest
                </Link>
                <Link className="text-sm font-medium transition-opacity hover:opacity-80" href="/tailwind">
                  Tailwind
                </Link>
              </div>
              
              <div className="ml-auto flex items-center gap-3">
                <ThemeToggle />
                {!user ? (
                  <Link
                    className="rounded-md border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
                    href="/login"
                  >
                    Login
                  </Link>
                ) : (
                  <>
                    <Link
                      className="rounded-md border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
                      href="/profile"
                    >
                      프로필 폼
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="rounded-md border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      로그아웃
                    </button>
                  </>
                )}
              </div>
            </nav>
          </header>
          <div className="flex-1">{children}</div>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
