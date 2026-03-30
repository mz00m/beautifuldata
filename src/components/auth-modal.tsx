"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { saveUser } from "@/lib/store";
import { User } from "@/lib/types";

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (user: User) => void;
}

export function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) return setError("What's your name? 😊");
    if (!email.trim() || !email.includes("@"))
      return setError("We need a valid email! 📧");
    const ageNum = parseInt(age);
    if (!age || isNaN(ageNum) || ageNum < 5 || ageNum > 99)
      return setError("Please enter your age (5-99) 🎂");

    const user = saveUser({ name: name.trim(), email: email.trim(), age: ageNum });
    onSuccess(user);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-candy-pink/20 to-primary-200/20 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-br from-candy-blue/20 to-candy-green/20 blur-2xl" />

        <div className="relative">
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
              className="text-5xl mb-3"
            >
              🌟
            </motion.div>
            <h2 className="font-display font-bold text-2xl text-gray-800">
              Join the Adventure!
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Sign up to vote and submit your own projects
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1.5">
                Your Name ✏️
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring-0 transition-colors text-sm font-medium bg-surface-0"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1.5">
                Email 📧
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@school.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring-0 transition-colors text-sm font-medium bg-surface-0"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1.5">
                Your Age 🎂
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="10"
                min={5}
                max={99}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring-0 transition-colors text-sm font-medium bg-surface-0"
              />
            </div>

            {error && (
              <motion.p
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-red-500 text-sm font-semibold"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-primary-500 via-candy-pink to-candy-orange text-white py-3.5 rounded-xl font-bold text-base shadow-lg shadow-primary-200 hover:shadow-xl transition-shadow"
            >
              Let&apos;s Go! 🚀
            </motion.button>
          </form>

          <button
            onClick={onClose}
            className="absolute top-0 right-0 text-gray-400 hover:text-gray-600 text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            ×
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
