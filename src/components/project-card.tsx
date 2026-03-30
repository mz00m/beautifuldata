"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Project, CATEGORIES } from "@/lib/types";

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const category = CATEGORIES.find((c) => c.value === project.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
    >
      <Link href={`/projects/${project.id}`}>
        <div className="card-hover bg-white rounded-3xl border border-gray-100 overflow-hidden group cursor-pointer">
          {/* Emoji Header */}
          <div
            className="h-36 flex items-center justify-center relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${category?.color || "#8b5cf6"}15, ${category?.color || "#8b5cf6"}30)`,
            }}
          >
            <motion.span
              className="text-6xl select-none"
              whileHover={{ scale: 1.3, rotate: 10 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {project.imageEmoji}
            </motion.span>

            {/* Vote count badge */}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5 shadow-sm">
              <span className="text-sm">🚀</span>
              <span className="text-sm font-bold text-gray-700">
                {project.votes}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Category badge */}
            <span
              className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full mb-3"
              style={{
                backgroundColor: `${category?.color || "#8b5cf6"}15`,
                color: category?.color || "#8b5cf6",
              }}
            >
              {category?.emoji} {category?.label}
            </span>

            <h3 className="font-display font-bold text-lg text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
              {project.title}
            </h3>

            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">
              {project.description}
            </p>

            {/* Creator */}
            <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-300 to-candy-pink flex items-center justify-center text-white text-xs font-bold">
                {project.creatorName.charAt(0)}
              </div>
              <div>
                <span className="text-xs font-semibold text-gray-700">
                  {project.creatorName}
                </span>
                <span className="text-xs text-gray-400 ml-1">
                  age {project.creatorAge}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
