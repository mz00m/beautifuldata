"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { getProjects } from "@/lib/store";
import { Project, CATEGORIES } from "@/lib/types";

const TROPHY_EMOJIS = ["🥇", "🥈", "🥉"];
const RANK_COLORS = [
  "from-yellow-400 to-amber-500",
  "from-gray-300 to-gray-400",
  "from-amber-600 to-amber-700",
];

export default function LeaderboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const sorted = getProjects().sort((a, b) => b.votes - a.votes);
    setProjects(sorted);
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-5xl block mb-4">🏆</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-gray-800 mb-3">
            Leaderboard
          </h1>
          <p className="text-gray-500 text-lg">
            The most loved AI projects — ranked by votes!
          </p>
        </motion.div>

        {/* Top 3 podium */}
        {projects.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-3 sm:gap-4 mb-12 items-end"
          >
            {/* 2nd place */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <Link href={`/projects/${projects[1].id}`}>
                <div className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-sm card-hover cursor-pointer">
                  <span className="text-3xl sm:text-4xl">{TROPHY_EMOJIS[1]}</span>
                  <div className="mt-3 text-3xl sm:text-4xl">{projects[1].imageEmoji}</div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-gray-800 mt-2 truncate">
                    {projects[1].title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    by {projects[1].creatorName}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
                    <span className="text-sm">🚀</span>
                    <span className="font-bold text-sm text-gray-700">
                      {projects[1].votes}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* 1st place */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center -mt-4"
            >
              <Link href={`/projects/${projects[0].id}`}>
                <div className="bg-gradient-to-b from-amber-50 to-white rounded-3xl p-4 sm:p-6 border-2 border-amber-200 shadow-lg shadow-amber-100 card-hover cursor-pointer">
                  <motion.span
                    className="text-4xl sm:text-5xl block"
                    animate={{ rotate: [0, -5, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    {TROPHY_EMOJIS[0]}
                  </motion.span>
                  <div className="mt-3 text-4xl sm:text-5xl">{projects[0].imageEmoji}</div>
                  <h3 className="font-display font-bold text-sm sm:text-lg text-gray-800 mt-2 truncate">
                    {projects[0].title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    by {projects[0].creatorName}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1 bg-amber-100 rounded-full px-3 py-1">
                    <span className="text-sm">🚀</span>
                    <span className="font-bold text-sm text-amber-700">
                      {projects[0].votes}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* 3rd place */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <Link href={`/projects/${projects[2].id}`}>
                <div className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-sm card-hover cursor-pointer">
                  <span className="text-3xl sm:text-4xl">{TROPHY_EMOJIS[2]}</span>
                  <div className="mt-3 text-3xl sm:text-4xl">{projects[2].imageEmoji}</div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-gray-800 mt-2 truncate">
                    {projects[2].title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    by {projects[2].creatorName}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
                    <span className="text-sm">🚀</span>
                    <span className="font-bold text-sm text-gray-700">
                      {projects[2].votes}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        )}

        {/* Full ranking list */}
        <div className="space-y-3">
          {projects.map((project, index) => {
            const category = CATEGORIES.find(
              (c) => c.value === project.category
            );
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Link href={`/projects/${project.id}`}>
                  <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 card-hover cursor-pointer group">
                    {/* Rank */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                        index < 3
                          ? `bg-gradient-to-br ${RANK_COLORS[index]} text-white`
                          : "bg-surface-1 text-gray-500"
                      }`}
                    >
                      {index < 3 ? TROPHY_EMOJIS[index] : `#${index + 1}`}
                    </div>

                    {/* Emoji */}
                    <span className="text-2xl flex-shrink-0">
                      {project.imageEmoji}
                    </span>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-gray-800 group-hover:text-primary-600 transition-colors truncate">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>by {project.creatorName}</span>
                        <span>·</span>
                        <span
                          className="font-bold"
                          style={{ color: category?.color }}
                        >
                          {category?.emoji} {category?.label}
                        </span>
                      </div>
                    </div>

                    {/* Votes */}
                    <div className="flex items-center gap-1.5 bg-surface-1 rounded-full px-3 py-1.5 flex-shrink-0">
                      <span className="text-sm">🚀</span>
                      <span className="font-bold text-sm text-gray-700">
                        {project.votes}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-20">
            <span className="text-6xl block mb-4">🌟</span>
            <h3 className="font-display font-bold text-2xl text-gray-600 mb-2">
              No projects yet!
            </h3>
            <p className="text-gray-400 mb-6">
              Be the first to submit an AI project
            </p>
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-xl font-bold"
            >
              Submit a Project 🚀
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
