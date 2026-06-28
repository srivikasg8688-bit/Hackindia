import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HackIndia - Discover Hackathons Across India",
  description:
    "The ultimate platform for B.Tech students to find, track, and participate in hackathons and tech events happening across every state in India.",
  keywords: [
    "hackathons",
    "India",
    "B.Tech",
    "coding competitions",
    "tech events",
    "student hackathons",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="h-full font-sans antialiased">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/80">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-sm font-bold text-white shadow-sm">
                H
              </div>
              <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Hack<span className="text-indigo-600 dark:text-indigo-400">India</span>
              </span>
            </Link>

            <nav className="flex items-center gap-6">
              <a
                href="/#browse"
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                Browse
              </a>
              <a
                href="https://devfolio.co/hackathons"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                Devfolio
              </a>
              <a
                href="https://unstop.com/hackathons"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                Unstop
              </a>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
