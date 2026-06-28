import Link from "next/link";
import { notFound } from "next/navigation";
import { getHackathonById, hackathons } from "@/data/hackathons";
import HackathonCard from "@/components/HackathonCard";

const modeColors = {
  online:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  offline:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  hybrid:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

const statusColors = {
  live: "bg-green-500",
  upcoming: "bg-blue-500",
  closed: "bg-gray-500",
};

const statusLabels = {
  live: "● Live Now",
  upcoming: "Upcoming",
  closed: "Closed",
};

export async function generateStaticParams() {
  return hackathons.map((h) => ({
    id: h.id,
  }));
}

export default async function HackathonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hackathon = getHackathonById(id);

  if (!hackathon) {
    notFound();
  }

  const isHackathon = hackathon.category === "hackathon";

  const startDate = new Date(hackathon.startDate);
  const endDate = new Date(hackathon.endDate);
  const deadline = new Date(hackathon.registrationDeadline);

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-IN", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const similarHackathons = hackathons
    .filter(
      (h) =>
        h.id !== hackathon.id &&
        (h.themes.some((t) => hackathon.themes.includes(t)) ||
          h.state === hackathon.state)
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Back button */}
      <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to all {isHackathon ? "hackathons" : "events"}
        </Link>
      </div>

      {/* Hero section */}
      <div className="mx-auto max-w-5xl px-4 pb-8 pt-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          {/* Top gradient bar */}
          <div
            className={`h-2 ${
              hackathon.status === "live"
                ? "bg-gradient-to-r from-green-500 to-emerald-500"
                : hackathon.status === "upcoming"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                  : "bg-gradient-to-r from-gray-400 to-gray-500"
            }`}
          />

          <div className="p-6 sm:p-8 lg:p-10">
            {/* Status, Category & Mode badges */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white ${statusColors[hackathon.status]}`}
              >
                {statusLabels[hackathon.status]}
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                  isHackathon
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                }`}
              >
                {isHackathon ? "⚡ Hackathon" : "🎤 Tech Event"}
              </span>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${modeColors[hackathon.mode]}`}
              >
                {hackathon.mode === "online"
                  ? "🌐 Online"
                  : hackathon.mode === "offline"
                    ? "📍 Offline"
                    : "🔗 Hybrid"}
              </span>
              {hackathon.isFeatured && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                  ⭐ Featured
                </span>
              )}
            </div>

            {/* Title & tagline */}
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
              {hackathon.name}
            </h1>
            <p className="mt-2 text-lg text-zinc-500 dark:text-zinc-400">
              {hackathon.tagline}
            </p>

            {/* Meta grid */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
                <div className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Date
                </div>
                <div className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {formatDate(startDate)}
                </div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  {formatDate(startDate) === formatDate(endDate)
                    ? "Single day event"
                    : `to ${formatDate(endDate)}`}
                </div>
              </div>

              <div className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
                <div className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Location
                </div>
                <div className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {hackathon.mode === "online"
                    ? "Online (National)"
                    : hackathon.city
                      ? `${hackathon.city}, ${hackathon.state}`
                      : hackathon.state}
                </div>
                <div className="text-sm capitalize text-zinc-500 dark:text-zinc-400">
                  {hackathon.mode} event
                </div>
              </div>

              <div className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
                <div className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Registration Deadline
                </div>
                <div className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {formatDate(deadline)}
                </div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  {Math.ceil(
                    (deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                  ) > 0
                    ? `${Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days left`
                    : "Deadline passed"}
                </div>
              </div>

              <div className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
                <div className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  {isHackathon ? "Prize Pool" : "Entry"}
                </div>
                <div className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {hackathon.prizePool || "TBA"}
                </div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  Team size: {hackathon.teamSize}
                </div>
              </div>
            </div>

            {/* Venue section */}
            {hackathon.venue && (
              <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-900/30 dark:bg-indigo-950/30">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-xl">🏛️</span>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
                      Venue
                    </div>
                    <div className="mt-1 text-base font-semibold text-indigo-900 dark:text-indigo-200">
                      {hackathon.venue}
                    </div>
                    {hackathon.city && (
                      <div className="mt-0.5 text-sm text-indigo-600/70 dark:text-indigo-300/70">
                        📍 {hackathon.city}, {hackathon.state}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mt-8">
              <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                About this {isHackathon ? "hackathon" : "event"}
              </h2>
              <p className="leading-relaxed text-zinc-600 dark:text-zinc-300">
                {hackathon.description}
              </p>
            </div>

            {/* Themes */}
            <div className="mt-6">
              <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Themes & Domains
              </h2>
              <div className="flex flex-wrap gap-2">
                {hackathon.themes.map((theme) => (
                  <span
                    key={theme}
                    className="rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            {/* Organizer */}
            <div className="mt-6">
              <h2 className="mb-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Organized by
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300">
                {hackathon.organizer}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={hackathon.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-500/30"
              >
                Apply Now
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
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-8 py-3.5 text-sm font-semibold text-zinc-700 transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Browse More {isHackathon ? "Hackathons" : "Events"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Similar hackathons */}
      {similarHackathons.length > 0 && (
        <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Similar {isHackathon ? "Hackathons" : "Events"}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similarHackathons.map((h) => (
              <HackathonCard key={h.id} hackathon={h} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
