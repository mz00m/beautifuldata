export interface Project {
  id: string;
  title: string;
  description: string;
  howItWorks: string;
  category: Category;
  creatorName: string;
  creatorAge: number;
  creatorSchool: string;
  imageEmoji: string;
  votes: number;
  votedBy: string[];
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  createdAt: string;
}

export type Category =
  | "robots"
  | "games"
  | "art"
  | "music"
  | "health"
  | "environment"
  | "education"
  | "storytelling"
  | "other";

export const CATEGORIES: { value: Category; label: string; emoji: string; color: string }[] = [
  { value: "robots", label: "Robots & Hardware", emoji: "🤖", color: "#6366f1" },
  { value: "games", label: "Games & Fun", emoji: "🎮", color: "#ec4899" },
  { value: "art", label: "Art & Design", emoji: "🎨", color: "#f59e0b" },
  { value: "music", label: "Music & Sound", emoji: "🎵", color: "#10b981" },
  { value: "health", label: "Health & Wellness", emoji: "💚", color: "#14b8a6" },
  { value: "environment", label: "Planet & Nature", emoji: "🌍", color: "#22c55e" },
  { value: "education", label: "Learning & Teaching", emoji: "📚", color: "#8b5cf6" },
  { value: "storytelling", label: "Stories & Writing", emoji: "✨", color: "#f43f5e" },
  { value: "other", label: "Something Else!", emoji: "🚀", color: "#0ea5e9" },
];
