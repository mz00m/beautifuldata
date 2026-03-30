"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { voteForProject, hasVoted, getUser } from "@/lib/store";

interface VoteButtonProps {
  projectId: string;
  initialVotes: number;
  onNeedAuth: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

const VOTE_EMOJIS = ["⭐", "🌟", "✨", "💫", "🎉", "🚀", "❤️", "🔥"];

export function VoteButton({ projectId, initialVotes, onNeedAuth }: VoteButtonProps) {
  const [votes, setVotes] = useState(initialVotes);
  const [voted, setVoted] = useState(() => {
    const user = getUser();
    return user ? hasVoted(projectId, user.id) : false;
  });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [justVoted, setJustVoted] = useState(false);

  const handleVote = useCallback(() => {
    const user = getUser();
    if (!user) {
      onNeedAuth();
      return;
    }

    if (voted) return;

    const result = voteForProject(projectId, user.id);
    if (result) {
      setVotes(result.votes);
      setVoted(true);
      setJustVoted(true);

      // Spawn particles
      const newParticles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 200,
        y: -(Math.random() * 150 + 50),
        emoji: VOTE_EMOJIS[Math.floor(Math.random() * VOTE_EMOJIS.length)],
      }));
      setParticles(newParticles);

      setTimeout(() => setParticles([]), 1500);
      setTimeout(() => setJustVoted(false), 2000);
    }
  }, [projectId, voted, onNeedAuth]);

  return (
    <div className="relative inline-flex flex-col items-center">
      {/* Particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute text-xl pointer-events-none z-10"
          >
            {p.emoji}
          </motion.span>
        ))}
      </AnimatePresence>

      <motion.button
        onClick={handleVote}
        whileHover={!voted ? { scale: 1.08 } : {}}
        whileTap={!voted ? { scale: 0.92 } : {}}
        animate={justVoted ? { scale: [1, 1.3, 1] } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className={`relative flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all ${
          voted
            ? "bg-gradient-to-r from-candy-green to-emerald-400 text-white shadow-lg shadow-emerald-200"
            : "bg-gradient-to-r from-primary-500 via-candy-pink to-candy-orange text-white shadow-lg shadow-primary-200 hover:shadow-xl"
        }`}
      >
        <motion.span
          className="text-2xl"
          animate={justVoted ? { rotate: [0, 360] } : {}}
          transition={{ duration: 0.5 }}
        >
          {voted ? "🎉" : "🚀"}
        </motion.span>
        <span>{voted ? "Voted!" : "Launch Vote!"}</span>
        <span className="bg-white/20 rounded-full px-3 py-0.5 text-base">
          {votes}
        </span>
      </motion.button>

      {voted && !justVoted && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-emerald-600 font-semibold mt-2"
        >
          Thanks for your vote! ✨
        </motion.p>
      )}
    </div>
  );
}
