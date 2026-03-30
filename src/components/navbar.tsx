"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getUser, logout } from "@/lib/store";
import { User } from "@/lib/types";
import { AuthModal } from "./auth-modal";

export function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const handleAuthSuccess = (u: User) => {
    setUser(u);
    setShowAuth(false);
  };

  const links = [
    { href: "/", label: "Home", emoji: "🏠" },
    { href: "/projects", label: "Projects", emoji: "🔍" },
    { href: "/submit", label: "Submit", emoji: "🚀" },
    { href: "/leaderboard", label: "Leaderboard", emoji: "🏆" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-primary-100/50 shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.span
                className="text-2xl"
                whileHover={{ rotate: 20, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                ✨
              </motion.span>
              <span className="font-display font-bold text-xl gradient-text">
                AI Showcase
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    pathname === link.href
                      ? "text-primary-600"
                      : "text-gray-600 hover:text-primary-500"
                  }`}
                >
                  {pathname === link.href && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-primary-50 rounded-xl"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    <span>{link.emoji}</span>
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* User area */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1.5 rounded-full">
                    👋 {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-500 hover:text-red-500 transition-colors font-medium"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAuth(true)}
                  className="bg-gradient-to-r from-primary-500 to-candy-pink text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary-200"
                >
                  Join the Fun! 🎉
                </motion.button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-primary-50"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="text-xl">{menuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-primary-100/50"
            >
              <div className="px-4 py-3 space-y-1">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                      pathname === link.href
                        ? "bg-primary-50 text-primary-600"
                        : "text-gray-600"
                    }`}
                  >
                    {link.emoji} {link.label}
                  </Link>
                ))}
                <div className="pt-2 border-t border-gray-100">
                  {user ? (
                    <div className="flex items-center justify-between px-4 py-2">
                      <span className="text-sm font-semibold text-primary-600">
                        👋 {user.name}
                      </span>
                      <button
                        onClick={handleLogout}
                        className="text-sm text-red-500 font-medium"
                      >
                        Log out
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setShowAuth(true);
                        setMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-primary-500 to-candy-pink text-white px-5 py-2.5 rounded-xl text-sm font-bold"
                    >
                      Join the Fun! 🎉
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AnimatePresence>
        {showAuth && (
          <AuthModal
            onClose={() => setShowAuth(false)}
            onSuccess={handleAuthSuccess}
          />
        )}
      </AnimatePresence>
    </>
  );
}
