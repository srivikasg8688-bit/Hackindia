"use client";

import { useState, useMemo } from "react";
import HackathonCard from "@/components/HackathonCard";
import FilterSidebar from "@/components/FilterSidebar";
import HeroSection from "@/components/HeroSection";
import { hackathons, allThemes, allStates } from "@/data/hackathons";
import { FilterState, HackathonMode } from "@/types";

const availableModes: HackathonMode[] = ["online", "offline", "hybrid"];

const defaultFilters: FilterState = {
  search: "",
  states: [],
  modes: [],
  themes: [],
  status: [],
  dateRange: "all",
};

type CategoryTab = "hackathon" | "tech-event";

export default function Home() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryTab>("hackathon");

  const filteredHackathons = useMemo(() => {
    return hackathons.filter((h) => {
      // Category filter
      if (h.category !== activeCategory) return false;

      // Search
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matchesSearch =
          h.name.toLowerCase().includes(q) ||
          h.tagline.toLowerCase().includes(q) ||
          h.description.toLowerCase().includes(q) ||
          h.organizer.toLowerCase().includes(q) ||
          h.venue?.toLowerCase().includes(q) ||
          h.city?.toLowerCase().includes(q) ||
          false;
        if (!matchesSearch) return false;
      }

      // Status
      if (filters.status.length > 0 && !filters.status.includes(h.status)) {
        return false;
      }

      // Mode
      if (filters.modes.length > 0 && !filters.modes.includes(h.mode)) {
        return false;
      }

      // Themes
      if (
        filters.themes.length > 0 &&
        !h.themes.some((t) => filters.themes.includes(t))
      ) {
        return false;
      }

      // States
      if (
        filters.states.length > 0 &&
        !filters.states.includes(h.state)
      ) {
        return false;
      }

      return true;
    });
  }, [filters, activeCategory]);

  const liveHackathons = filteredHackathons.filter((h) => h.status === "live");
  const upcomingHackathons = filteredHackathons.filter(
    (h) => h.status === "upcoming"
  );
  const closedHackathons = filteredHackathons.filter(
    (h) => h.status === "closed"
  );

  const hackathonCount = hackathons.filter((h) => h.category === "hackathon").length;
  const techEventCount = hackathons.filter((h) => h.category === "tech-event").length;

  return (
    <>
      <HeroSection activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      <main id="browse" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Mobile filter toggle */}
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            {filteredHackathons.length}{" "}
            {activeCategory === "hackathon" ? "Hackathons" : "Events"}
          </h2>
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters
            {filters.search ||
            filters.states.length > 0 ||
            filters.modes.length > 0 ||
            filters.themes.length > 0 ||
            filters.status.length > 0 ? (
              <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-medium text-white">
                !
              </span>
            ) : null}
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar - desktop */}
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              availableThemes={allThemes}
              availableStates={allStates}
              availableModes={availableModes}
            />
          </div>

          {/* Mobile filters */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setShowMobileFilters(false)}
              />
              <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-white p-6 dark:bg-zinc-900">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <FilterSidebar
                  filters={filters}
                  onFilterChange={setFilters}
                  availableThemes={allThemes}
                  availableStates={allStates}
                  availableModes={availableModes}
                />
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="mt-6 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-700"
                >
                  Show {filteredHackathons.length} results
                </button>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            {/* Results header */}
            <div className="mb-6 hidden items-center justify-between lg:flex">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {filteredHackathons.length}{" "}
                {filteredHackathons.length === 1
                  ? activeCategory === "hackathon"
                    ? "Hackathon"
                    : "Event"
                  : activeCategory === "hackathon"
                    ? "Hackathons"
                    : "Events"}{" "}
                found
              </h2>
            </div>

            {filteredHackathons.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 py-20 dark:border-zinc-700 dark:bg-zinc-900/50">
                <span className="mb-4 text-5xl">🔍</span>
                <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  No {activeCategory === "hackathon" ? "hackathons" : "events"} found
                </h3>
                <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
                  Try adjusting your filters to see more results.
                </p>
                <button
                  onClick={() => setFilters(defaultFilters)}
                  className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="space-y-10">
                {/* Live section */}
                {liveHackathons.length > 0 && (
                  <section>
                    <div className="mb-4 flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                        {activeCategory === "hackathon" ? "Live Now" : "Happening Now"}
                      </h3>
                      <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        {liveHackathons.length}
                      </span>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                      {liveHackathons.map((h) => (
                        <HackathonCard key={h.id} hackathon={h} />
                      ))}
                    </div>
                  </section>
                )}

                {/* Upcoming section */}
                {upcomingHackathons.length > 0 && (
                  <section>
                    <div className="mb-4 flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-blue-500"></span>
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                        {activeCategory === "hackathon" ? "Upcoming" : "Upcoming Events"}
                      </h3>
                      <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        {upcomingHackathons.length}
                      </span>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                      {upcomingHackathons.map((h) => (
                        <HackathonCard key={h.id} hackathon={h} />
                      ))}
                    </div>
                  </section>
                )}

                {/* Closed section */}
                {closedHackathons.length > 0 && (
                  <section>
                    <div className="mb-4 flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-gray-500"></span>
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                        Past Events
                      </h3>
                      <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-900/30 dark:text-gray-400">
                        {closedHackathons.length}
                      </span>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                      {closedHackathons.map((h) => (
                        <HackathonCard key={h.id} hackathon={h} />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="font-bold text-indigo-600 dark:text-indigo-400">
                HackIndia
              </span>
              <span>·</span>
              <span>Discover events across India</span>
            </div>
            <div className="flex gap-6 text-sm text-zinc-500 dark:text-zinc-400">
              <span>Made for B.Tech students</span>
              <span>·</span>
              <a
                href="https://devfolio.co/hackathons"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Devfolio
              </a>
              <a
                href="https://unstop.com/hackathons"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Unstop
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
