import Link from "next/link";
import { Hackathon } from "@/types";

const statusColors = {
  live: "bg-green-500",
  upcoming: "bg-blue-500",
  closed: "bg-gray-500",
};

const statusLabels = {
  live: "● Live",
  upcoming: "Upcoming",
  closed: "Closed",
};

const modeIcons = {
  online: "🌐",
  offline: "📍",
  hybrid: "🔗",
};

export default function HackathonCard({ hackathon }: { hackathon: Hackathon }) {
  const startDate = new Date(hackathon.startDate);
  const endDate = new Date(hackathon.endDate);

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    });

  const dateDisplay =
    formatDate(startDate) === formatDate(endDate)
      ? formatDate(startDate)
      : `${formatDate(startDate)} - ${formatDate(endDate)}`;

  const isHackathon = hackathon.category === "hackathon";

  return (
    <div className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-700 dark:hover:shadow-indigo-950/30">
      {/* Top section — clickable to detail page */}
      <Link
        href={`/hackathons/${hackathon.id}`}
        className="flex flex-col p-5 pb-3"
      >
        {/* Status badge + Category badge */}
        <div className="mb-3 flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium text-white ${statusColors[hackathon.status]}`}
          >
            {statusLabels[hackathon.status]}
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
              isHackathon
                ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
            }`}
          >
            {isHackathon ? "⚡ Hackathon" : "🎤 Tech Event"}
          </span>
        </div>

        {/* Theme tags */}
        <div className="mb-2.5 flex flex-wrap gap-1.5">
          {hackathon.themes.slice(0, 3).map((theme) => (
            <span
              key={theme}
              className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
            >
              {theme}
            </span>
          ))}
          {hackathon.themes.length > 3 && (
            <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
              +{hackathon.themes.length - 3}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-1 text-lg font-semibold leading-tight text-zinc-900 group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400">
          {hackathon.name}
        </h3>

        {/* Tagline */}
        <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {hackathon.tagline}
        </p>

        {/* Details */}
        <div className="mt-auto space-y-1.5">
          <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span className="text-base">📅</span>
            <span>{dateDisplay}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span className="text-base">{modeIcons[hackathon.mode]}</span>
            <span className="capitalize">{hackathon.mode}</span>
            {hackathon.city && <span>· {hackathon.city}</span>}
            <span>· {hackathon.state}</span>
          </div>

          {/* Venue */}
          {hackathon.venue && (
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="text-base">🏛️</span>
              <span className="truncate">{hackathon.venue}</span>
            </div>
          )}

          {/* Prize (only for hackathons) */}
          {isHackathon && (
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="text-base">🏆</span>
              <span>{hackathon.prizePool || "Prizes TBA"}</span>
            </div>
          )}

          {/* Team size */}
          <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span className="text-base">👥</span>
            <span>{hackathon.teamSize}</span>
          </div>
        </div>
      </Link>

      {/* Bottom action bar */}
      <div className="flex items-center gap-2 border-t border-zinc-100 px-5 py-3 dark:border-zinc-800">
        <Link
          href={`/hackathons/${hackathon.id}`}
          className="flex-1 text-center text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          View Details
        </Link>
        <a
          href={hackathon.registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md"
        >
          Apply Now
          <svg
            className="h-3.5 w-3.5"
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
      </div>
    </div>
  );
}
