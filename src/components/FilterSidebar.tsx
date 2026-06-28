"use client";

import { Hackathon, HackathonMode, HackathonTheme, IndianState, FilterState } from "@/types";

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableThemes: HackathonTheme[];
  availableStates: IndianState[];
  availableModes: HackathonMode[];
}

export default function FilterSidebar({
  filters,
  onFilterChange,
  availableThemes,
  availableStates,
  availableModes,
}: FilterSidebarProps) {
  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (
    current: readonly string[],
    value: string,
    key: "states" | "modes" | "themes" | "status"
  ) => {
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilter(key, updated as FilterState[typeof key]);
  };

  const clearAllFilters = () => {
    onFilterChange({
      search: "",
      states: [],
      modes: [],
      themes: [],
      status: [],
      dateRange: "all",
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.states.length > 0 ||
    filters.modes.length > 0 ||
    filters.themes.length > 0 ||
    filters.status.length > 0 ||
    filters.dateRange !== "all";

  return (
    <aside className="w-full shrink-0 lg:w-64">
      <div className="sticky top-24 space-y-6 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Filters
          </h2>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Search */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Search
          </label>
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search hackathons..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-10 pr-3 text-sm text-zinc-900 placeholder-zinc-400 transition-colors focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-900/30"
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Status
          </label>
          <div className="space-y-2">
            {(["live", "upcoming", "closed"] as const).map((status) => (
              <label
                key={status}
                className="flex cursor-pointer items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <input
                  type="checkbox"
                  checked={filters.status.includes(status)}
                  onChange={() =>
                    toggleArrayFilter(filters.status, status, "status")
                  }
                  className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-zinc-600"
                />
                <span className="capitalize">{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Mode */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Mode
          </label>
          <div className="space-y-2">
            {availableModes.map((mode) => (
              <label
                key={mode}
                className="flex cursor-pointer items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <input
                  type="checkbox"
                  checked={filters.modes.includes(mode)}
                  onChange={() =>
                    toggleArrayFilter(filters.modes, mode, "modes")
                  }
                  className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-zinc-600"
                />
                <span className="capitalize">{mode}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Themes */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Theme
          </label>
          <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
            {availableThemes.map((theme) => (
              <label
                key={theme}
                className="flex cursor-pointer items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <input
                  type="checkbox"
                  checked={filters.themes.includes(theme)}
                  onChange={() =>
                    toggleArrayFilter(filters.themes, theme, "themes")
                  }
                  className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-zinc-600"
                />
                {theme}
              </label>
            ))}
          </div>
        </div>

        {/* States */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            State
          </label>
          <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
            {availableStates.map((state) => (
              <label
                key={state}
                className="flex cursor-pointer items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <input
                  type="checkbox"
                  checked={filters.states.includes(state)}
                  onChange={() =>
                    toggleArrayFilter(filters.states, state, "states")
                  }
                  className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-zinc-600"
                />
                {state}
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
