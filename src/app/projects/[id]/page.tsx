"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { VoteButton } from "@/components/vote-button";
import { Confetti } from "@/components/confetti";
import { AuthModal } from "@/components/auth-modal";
import { getProject } from "@/lib/store";
import { Project, CATEGORIES, User } from "@/lib/types";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const p = getProject(params.id as string);
    if (!p) {
      router.push("/projects");
      return;
    }
    setProject(p);
  }, [params.id, router]);

  const category = project
    ? CATEGORIES.find((c) => c.value === project.category)
    : null;

  const handleAuthSuccess = (_user: User) => {
    setShowAuth(false);
  };

  if (!project) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="text-4xl"
          >
            ⚡
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <Confetti active={showConfetti} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary-600 transition-colors mb-8"
          >
            ← Back to Projects
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm mb-8"
        >
          {/* Emoji banner */}
          <div
            className="h-48 sm:h-56 flex items-center justify-center relative"
            style={{
              background: `linear-gradient(135deg, ${category?.color || "#8b5cf6"}10, ${category?.color || "#8b5cf6"}25)`,
            }}
          >
            <motion.span
              className="text-7xl sm:text-8xl select-none"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {project.imageEmoji}
            </motion.span>
          </div>

          <div className="p-6 sm:p-10">
            {/* Category + title */}
            <div className="mb-6">
              <span
                className="inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full mb-4"
                style={{
                  backgroundColor: `${category?.color || "#8b5cf6"}15`,
                  color: category?.color || "#8b5cf6",
                }}
              >
                {category?.emoji} {category?.label}
              </span>
              <h1 className="font-display font-bold text-3xl sm:text-4xl text-gray-800">
                {project.title}
              </h1>
            </div>

            {/* Creator info */}
            <div className="flex items-center gap-3 mb-8 p-4 bg-surface-1 rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-candy-pink flex items-center justify-center text-white font-bold text-lg">
                {project.creatorName.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-gray-800">
                  {project.creatorName}
                </div>
                <div className="text-sm text-gray-500">
                  Age {project.creatorAge} · {project.creatorSchool}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="font-display font-bold text-xl text-gray-800 mb-3 flex items-center gap-2">
                💡 What is it?
              </h2>
              <p className="text-gray-600 leading-relaxed text-base">
                {project.description}
              </p>
            </div>

            {/* How it works */}
            <div className="mb-8">
              <h2 className="font-display font-bold text-xl text-gray-800 mb-3 flex items-center gap-2">
                ⚙️ How it works
              </h2>
              <p className="text-gray-600 leading-relaxed text-base">
                {project.howItWorks}
              </p>
            </div>

            {/* Vote area */}
            <div className="flex justify-center pt-6 border-t border-gray-100">
              <VoteButton
                projectId={project.id}
                initialVotes={project.votes}
                onNeedAuth={() => setShowAuth(true)}
              />
            </div>
          </div>
        </motion.div>

        {/* Created date */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-gray-400"
        >
          Submitted {new Date(project.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </motion.p>
      </div>

      <AnimatePresence>
        {showAuth && (
          <AuthModal
            onClose={() => setShowAuth(false)}
            onSuccess={handleAuthSuccess}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
