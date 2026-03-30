"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  emoji?: string;
}

const COLORS = [
  "rgba(139, 92, 246, 0.15)",
  "rgba(244, 114, 182, 0.15)",
  "rgba(251, 191, 36, 0.12)",
  "rgba(52, 211, 153, 0.15)",
  "rgba(56, 189, 248, 0.15)",
];

const EMOJIS = ["✨", "🤖", "🎮", "🎨", "🚀", "💡", "⭐", "🌟", "🎵", "🔬"];

export function FloatingBubbles({ count = 15 }: { count?: number }) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const newBubbles: Bubble[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 30 + Math.random() * 80,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 5,
      emoji: Math.random() > 0.6 ? EMOJIS[Math.floor(Math.random() * EMOJIS.length)] : undefined,
    }));
    setBubbles(newBubbles);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full flex items-center justify-center select-none"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: bubble.size,
            height: bubble.size,
            backgroundColor: bubble.emoji ? "transparent" : bubble.color,
            fontSize: bubble.size * 0.4,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "easeInOut",
          }}
        >
          {bubble.emoji}
        </motion.div>
      ))}
    </div>
  );
}
