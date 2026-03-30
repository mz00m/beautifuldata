"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { AuthModal } from "@/components/auth-modal";
import { Confetti } from "@/components/confetti";
import { addProject, getUser } from "@/lib/store";
import { Category, CATEGORIES, User } from "@/lib/types";

const PROJECT_EMOJIS = [
  "🤖", "🚀", "🎮", "🎨", "🎵", "💡", "🔬", "🌱", "⚡", "🛸",
  "🧠", "🎯", "🦾", "📖", "✏️", "🔭", "🎪", "🌈", "🏗️", "♻️",
  "🐾", "🎭", "🧩", "🗺️", "💎", "🛡️", "⭐", "🌊", "🔮", "🎲",
];

export default function SubmitPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [howItWorks, setHowItWorks] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const [creatorName, setCreatorName] = useState("");
  const [creatorAge, setCreatorAge] = useState("");
  const [creatorSchool, setCreatorSchool] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("🤖");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const u = getUser();
    setUser(u);
    if (u) {
      setCreatorName(u.name);
      setCreatorAge(u.age.toString());
    }
  }, []);

  const handleAuthSuccess = (u: User) => {
    setUser(u);
    setShowAuth(false);
    setCreatorName(u.name);
    setCreatorAge(u.age.toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!user) {
      setShowAuth(true);
      return;
    }

    if (!title.trim()) return setError("Your project needs a name! 🏷️");
    if (!description.trim())
      return setError("Tell us what your project does! 💬");
    if (!howItWorks.trim())
      return setError("Explain how it works — even briefly! ⚙️");
    if (!category) return setError("Pick a category! 🏷️");
    if (!creatorName.trim()) return setError("What's your name? 😊");
    const ageNum = parseInt(creatorAge);
    if (!creatorAge || isNaN(ageNum) || ageNum < 5 || ageNum > 99)
      return setError("Enter your age (5-99) 🎂");
    if (!creatorSchool.trim())
      return setError("Which school do you go to? 🏫");

    addProject({
      title: title.trim(),
      description: description.trim(),
      howItWorks: howItWorks.trim(),
      category: category as Category,
      creatorName: creatorName.trim(),
      creatorAge: ageNum,
      creatorSchool: creatorSchool.trim(),
      imageEmoji: selectedEmoji,
    });

    setSubmitted(true);
    setShowConfetti(true);

    setTimeout(() => {
      router.push("/projects");
    }, 3000);
  };

  if (submitted) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <Confetti active={showConfetti} />
        <div className="flex items-center justify-center py-32">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-center"
          >
            <motion.span
              className="text-7xl block mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 3 }}
            >
              🎉
            </motion.span>
            <h1 className="font-display font-bold text-4xl text-gray-800 mb-3">
              Project Submitted!
            </h1>
            <p className="text-gray-500 text-lg">
              Awesome job! Taking you to see all projects...
            </p>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <Confetti active={showConfetti} />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="text-5xl block mb-4">🚀</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-gray-800 mb-3">
            Submit Your Project
          </h1>
          <p className="text-gray-500 text-lg">
            Show the world what you&apos;ve built with AI!
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 space-y-6"
        >
          {/* Project Emoji */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Pick an icon for your project
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-primary-300 transition-colors bg-surface-0"
              >
                <span className="text-3xl">{selectedEmoji}</span>
                <span className="text-sm text-gray-500 font-medium">
                  Click to change
                </span>
              </button>
              <AnimatePresence>
                {showEmojiPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 left-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-10 grid grid-cols-6 gap-2"
                  >
                    {PROJECT_EMOJIS.map((emoji) => (
                      <motion.button
                        key={emoji}
                        type="button"
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setSelectedEmoji(emoji);
                          setShowEmojiPicker(false);
                        }}
                        className={`text-2xl w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                          selectedEmoji === emoji
                            ? "bg-primary-100"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        {emoji}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Project Name ✏️
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. RoboGardener 3000"
              maxLength={60}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring-0 text-sm font-medium bg-surface-0 transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              What does it do? 💬
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your project in a fun way..."
              rows={3}
              maxLength={500}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring-0 text-sm font-medium bg-surface-0 transition-colors resize-none"
            />
            <span className="text-xs text-gray-400">
              {description.length}/500
            </span>
          </div>

          {/* How it works */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              How does the AI part work? ⚙️
            </label>
            <textarea
              value={howItWorks}
              onChange={(e) => setHowItWorks(e.target.value)}
              placeholder="Tell us about the AI / tech you used..."
              rows={3}
              maxLength={500}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring-0 text-sm font-medium bg-surface-0 transition-colors resize-none"
            />
            <span className="text-xs text-gray-400">
              {howItWorks.length}/500
            </span>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Category 🏷️
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => (
                <motion.button
                  key={cat.value}
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setCategory(cat.value)}
                  className={`p-3 rounded-xl text-sm font-bold text-left transition-all ${
                    category === cat.value
                      ? "text-white shadow-md"
                      : "bg-surface-0 text-gray-600 border border-gray-200"
                  }`}
                  style={
                    category === cat.value
                      ? {
                          backgroundColor: cat.color,
                          boxShadow: `0 4px 14px ${cat.color}40`,
                        }
                      : {}
                  }
                >
                  {cat.emoji} {cat.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Creator info */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="font-display font-bold text-lg text-gray-800">
              About You 👋
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  placeholder="e.g. Alex"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring-0 text-sm font-medium bg-surface-0 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  Your Age
                </label>
                <input
                  type="number"
                  value={creatorAge}
                  onChange={(e) => setCreatorAge(e.target.value)}
                  placeholder="10"
                  min={5}
                  max={99}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring-0 text-sm font-medium bg-surface-0 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                School 🏫
              </label>
              <input
                type="text"
                value={creatorSchool}
                onChange={(e) => setCreatorSchool(e.target.value)}
                placeholder="e.g. Sunrise Elementary"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:ring-0 text-sm font-medium bg-surface-0 transition-colors"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <motion.p
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-red-500 text-sm font-bold"
            >
              {error}
            </motion.p>
          )}

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-primary-500 via-candy-pink to-candy-orange text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary-200 hover:shadow-xl transition-shadow"
          >
            Launch My Project! 🚀
          </motion.button>

          {!user && (
            <p className="text-center text-sm text-gray-400">
              You&apos;ll need to sign up first — it&apos;s quick!
            </p>
          )}
        </motion.form>
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
