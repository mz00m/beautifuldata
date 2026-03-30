"use client";

import { Suspense, useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { ProjectCard } from "@/components/project-card";
import { getProjects } from "@/lib/store";
import { Project, Category, CATEGORIES } from "@/lib/types";

type SortOption = "popular" | "newest" | "oldest";

export default function ProjectsPage() {
  return (
    <Suspense fallback={<main className="min-h-screen"><Navbar /><div className="flex items-center justify-center py-32 text-4xl">🔍</div></main>}>
      <ProjectsContent />
    </Suspense>
  );
}

function ProjectsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as Category | null;

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    initialCategory || "all"
  );
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const filtered = useMemo(() => {
    let result = [...projects];

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.creatorName.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "popular":
        result.sort((a, b) => b.votes - a.votes);
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
    }

    return result;
  }, [projects, selectedCategory, sortBy, searchQuery]);

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-gray-800 mb-3">
            Explore Projects 🔍
          </h1>
          <p className="text-gray-500 text-lg">
            Discover what amazing things kids are building with AI
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-xl mx-auto mb-8"
        >
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, creators..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-200 focus:border-primary-400 focus:ring-0 bg-white text-sm font-medium transition-colors shadow-sm"
            />
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                selectedCategory === "all"
                  ? "bg-primary-500 text-white shadow-md shadow-primary-200"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-primary-300"
              }`}
            >
              ✨ All
            </motion.button>
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  selectedCategory === cat.value
                    ? "text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
                }`}
                style={
                  selectedCategory === cat.value
                    ? { backgroundColor: cat.color, boxShadow: `0 4px 14px ${cat.color}40` }
                    : {}
                }
              >
                {cat.emoji} {cat.label}
              </motion.button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex justify-center gap-2">
            {(
              [
                { value: "popular", label: "🔥 Most Popular" },
                { value: "newest", label: "🆕 Newest" },
                { value: "oldest", label: "📅 Oldest" },
              ] as { value: SortOption; label: string }[]
            ).map((option) => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  sortBy === option.value
                    ? "bg-gray-800 text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20"
            >
              <span className="text-6xl block mb-4">🔭</span>
              <h3 className="font-display font-bold text-2xl text-gray-600 mb-2">
                No projects found
              </h3>
              <p className="text-gray-400">
                Try a different search or category!
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-sm text-gray-400 font-semibold"
        >
          {filtered.length} project{filtered.length !== 1 ? "s" : ""} found
        </motion.div>
      </div>
    </main>
  );
}
