"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CONFETTI_COLORS = [
  "#8b5cf6",
  "#f472b6",
  "#fbbf24",
  "#34d399",
  "#38bdf8",
  "#f87171",
  "#fb923c",
];

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  rotation: number;
  size: number;
  delay: number;
}

export function Confetti({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (active) {
      const newPieces: ConfettiPiece[] = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        rotation: Math.random() * 720,
        size: 6 + Math.random() * 8,
        delay: Math.random() * 0.5,
      }));
      setPieces(newPieces);
      const timer = setTimeout(() => setPieces([]), 2000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  return (
    <AnimatePresence>
      {pieces.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-[200]">
          {pieces.map((piece) => (
            <motion.div
              key={piece.id}
              initial={{
                x: `${piece.x}vw`,
                y: -20,
                rotate: 0,
                opacity: 1,
              }}
              animate={{
                y: "110vh",
                rotate: piece.rotation,
                opacity: 0,
              }}
              transition={{
                duration: 1.5 + Math.random(),
                delay: piece.delay,
                ease: "easeIn",
              }}
              style={{
                position: "absolute",
                width: piece.size,
                height: piece.size * 1.5,
                backgroundColor: piece.color,
                borderRadius: 2,
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
