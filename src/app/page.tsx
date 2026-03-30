"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { FloatingBubbles } from "@/components/floating-bubbles";
import { ProjectCard } from "@/components/project-card";
import { getProjects } from "@/lib/store";
import { Project, CATEGORIES } from "@/lib/types";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const all = getProjects();
    // Show top voted projects
    setProjects([...all].sort((a, b) => b.votes - a.votes).slice(0, 6));
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <FloatingBubbles count={20} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.1,
              }}
              className="text-6xl sm:text-7xl mb-6"
            >
              🤖✨🚀
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl mb-6"
            >
              Where Kids Build
              <br />
              <span className="gradient-text">Amazing AI</span> Projects
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Show off your AI-powered creations, discover what other kids are
              building, and vote for the most awesome projects!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/projects">
                <motion.span
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 via-candy-pink to-candy-orange text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary-200 hover:shadow-xl transition-shadow"
                >
                  🔍 Explore Projects
                </motion.span>
              </Link>
              <Link href="/submit">
                <motion.span
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-white text-primary-600 border-2 border-primary-200 px-8 py-4 rounded-2xl font-bold text-lg hover:border-primary-400 transition-colors shadow-sm"
                >
                  🚀 Submit Yours
                </motion.span>
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-16"
          >
            {[
              { label: "Projects", value: projects.length + "+", emoji: "📦" },
              {
                label: "Votes Cast",
                value:
                  projects.reduce((sum, p) => sum + p.votes, 0).toString(),
                emoji: "🚀",
              },
              { label: "Categories", value: CATEGORIES.length.toString(), emoji: "🏷️" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 1 + i * 0.1,
                  type: "spring",
                  stiffness: 300,
                }}
                className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white shadow-sm"
              >
                <span className="text-2xl">{stat.emoji}</span>
                <div className="font-display font-bold text-2xl text-gray-800">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-800 mb-3">
              Pick a Category 🏷️
            </h2>
            <p className="text-gray-500">
              What kind of AI project are you into?
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.value}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.05,
                  type: "spring",
                  stiffness: 300,
                }}
              >
                <Link href={`/projects?category=${cat.value}`}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white rounded-2xl p-4 sm:p-5 text-center cursor-pointer border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all"
                  >
                    <span className="text-3xl sm:text-4xl block mb-2">
                      {cat.emoji}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-gray-600">
                      {cat.label}
                    </span>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-800 mb-2">
                Trending Projects 🔥
              </h2>
              <p className="text-gray-500">The most popular AI creations</p>
            </div>
            <Link href="/projects">
              <motion.span
                whileHover={{ x: 5 }}
                className="hidden sm:inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700"
              >
                See all →
              </motion.span>
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          <div className="text-center mt-10 sm:hidden">
            <Link
              href="/projects"
              className="text-primary-600 font-bold text-sm"
            >
              See all projects →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-candy-pink to-candy-orange opacity-[0.07] rounded-3xl" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-5xl block mb-6">💡</span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-gray-800 mb-4">
              Got an AI Project Idea?
            </h2>
            <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
              It doesn&apos;t have to be perfect. Share what you&apos;ve been building
              and inspire other kids to experiment with AI too!
            </p>
            <Link href="/submit">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-candy-pink text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary-200"
              >
                Submit Your Project 🚀
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-400 text-sm font-medium">
            ✨ AI Project Showcase — Inspiring the next generation of builders
          </p>
        </div>
      </footer>
    </main>
  );
}
