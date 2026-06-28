"use client";

import { getFeaturedHackathons, hackathons } from "@/data/hackathons";
import Link from "next/link";
import { EventCategory } from "@/types";

interface HeroSectionProps {
  activeCategory: EventCategory;
  onCategoryChange: (category: EventCategory) => void;
}

export default function HeroSection({ activeCategory, onCategoryChange }: HeroSectionProps) {
  const featured = getFeaturedHackathons();
  const liveCount = featured.filter((h) => h.status === "live" && h.category === activeCategory).length;
  const upcomingCount = featured.filter((h) => h.status === "upcoming" && h.category === activeCategory).length;
  const hackathonCount = hackathons.filter((h) => h.category === "hackathon").length;
  const techEventCount = hackathons.filter((h) => h.category === "tech-event").length;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-950">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-200">
            <span className="h-2 w-2 rounded-full bg-green-400"></span>
            {liveCount} Live · {upcomingCount} Featured Upcoming
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {activeCategory === "hackathon" ? "Discover Hackathons" : "Find Tech Events"}
            <span className="block bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              Across India
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-indigo-200/80 sm:text-xl">
            {activeCategory === "hackathon"
              ? "The ultimate platform for B.Tech students to find, track, and participate in hackathons happening across every state in India."
              : "Discover tech conferences, meetups, workshops, and summits happening across India. Learn, network, and grow with the tech community."}
          </p>

          {/* Category Toggle */}
          <div className="mt-8 inline-flex rounded-xl border border-indigo-400/20 bg-white/5 p-1 backdrop-blur-sm">
            <button
              onClick={() => onCategoryChange("hackathon")}
              className={`flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold transition-all ${
                activeCategory === "hackathon"
                  ? "bg-white text-indigo-900 shadow-sm"
                  : "text-indigo-200 hover:text-white hover:bg-white/10"
              }`}
            >
              <span>⚡</span>
              Hackathons
              <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-xs text-indigo-200">
                {hackathonCount}
              </span>
            </button>
            <button
              onClick={() => onCategoryChange("tech-event")}
              className={`flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold transition-all ${
                activeCategory === "tech-event"
                  ? "bg-white text-indigo-900 shadow-sm"
                  : "text-indigo-200 hover:text-white hover:bg-white/10"
              }`}
            >
              <span>🎤</span>
              Tech Events
              <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-xs text-indigo-200">
                {techEventCount}
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-8">
            <div className="rounded-xl border border-indigo-400/20 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white sm:text-3xl">
                {activeCategory === "hackathon" ? hackathonCount : techEventCount}+
              </div>
              <div className="text-sm text-indigo-300/70">
                {activeCategory === "hackathon" ? "Hackathons" : "Events"} Listed
              </div>
            </div>
            <div className="rounded-xl border border-indigo-400/20 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white sm:text-3xl">
                15+
              </div>
              <div className="text-sm text-indigo-300/70">Cities Covered</div>
            </div>
            <div className="rounded-xl border border-indigo-400/20 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white sm:text-3xl">
                15+
              </div>
              <div className="text-sm text-indigo-300/70">Themes & Domains</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#browse"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-indigo-900 shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-50 hover:shadow-xl hover:shadow-indigo-500/30"
            >
              Browse {activeCategory === "hackathon" ? "Hackathons" : "Events"}
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Link>
            {activeCategory === "hackathon" ? (
              <button
                onClick={() => onCategoryChange("tech-event")}
                className="inline-flex items-center gap-2 rounded-xl border border-indigo-400/30 px-8 py-3.5 text-sm font-semibold text-indigo-200 transition-all hover:bg-white/5 hover:border-indigo-300/50"
              >
                Explore Tech Events
              </button>
            ) : (
              <button
                onClick={() => onCategoryChange("hackathon")}
                className="inline-flex items-center gap-2 rounded-xl border border-indigo-400/30 px-8 py-3.5 text-sm font-semibold text-indigo-200 transition-all hover:bg-white/5 hover:border-indigo-300/50"
              >
                View Hackathons
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
