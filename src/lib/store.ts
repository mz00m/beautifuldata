"use client";

import { Project, User } from "./types";

const PROJECTS_KEY = "aiprojects_projects";
const USER_KEY = "aiprojects_user";

const SEED_PROJECTS: Project[] = [
  {
    id: "seed-1",
    title: "RoboGardener 3000",
    description:
      "An AI-powered plant watering system that uses a camera to check if my plants are happy or sad, and waters them automatically when they look droopy!",
    howItWorks:
      "I trained a simple image classifier to recognize healthy vs. droopy leaves. A Raspberry Pi checks the camera every hour and triggers a water pump when the plant needs help.",
    category: "robots",
    creatorName: "Maya",
    creatorAge: 11,
    creatorSchool: "Sunrise Elementary",
    imageEmoji: "🌱",
    votes: 42,
    votedBy: [],
    createdAt: "2026-03-15T10:00:00Z",
  },
  {
    id: "seed-2",
    title: "StoryBuddy",
    description:
      "A chatbot that helps you write creative stories! You pick the characters and setting, and it helps you build an adventure together.",
    howItWorks:
      "I used a language model API to create a story co-writer. You type what happens next and the AI suggests twists and new characters. It also draws scene illustrations!",
    category: "storytelling",
    creatorName: "Liam",
    creatorAge: 10,
    creatorSchool: "Oak Park School",
    imageEmoji: "📖",
    votes: 38,
    votedBy: [],
    createdAt: "2026-03-18T14:30:00Z",
  },
  {
    id: "seed-3",
    title: "Beat Machine AI",
    description:
      "Draw shapes on screen and the AI turns them into music beats! Circles are drums, squares are bass, triangles are melody.",
    howItWorks:
      "I built a canvas where you draw shapes. A shape-detection model identifies what you drew, then maps each shape to a different instrument and note. The position on screen controls pitch and timing!",
    category: "music",
    creatorName: "Aisha",
    creatorAge: 12,
    creatorSchool: "Brookfield Academy",
    imageEmoji: "🥁",
    votes: 55,
    votedBy: [],
    createdAt: "2026-03-20T09:15:00Z",
  },
  {
    id: "seed-4",
    title: "Trash Sorter Vision",
    description:
      "Point your phone camera at any piece of trash and the AI tells you which bin it goes in — recycle, compost, or landfill!",
    howItWorks:
      "I fine-tuned an image classifier on pictures of different types of waste. The app runs on a phone and gives instant feedback with a fun animation for each bin type.",
    category: "environment",
    creatorName: "Carlos",
    creatorAge: 11,
    creatorSchool: "Green Valley Elementary",
    imageEmoji: "♻️",
    votes: 61,
    votedBy: [],
    createdAt: "2026-03-22T11:45:00Z",
  },
  {
    id: "seed-5",
    title: "MathQuest RPG",
    description:
      "A role-playing game where you fight monsters by solving math problems! The AI adjusts difficulty based on how well you're doing.",
    howItWorks:
      "The game tracks your accuracy and speed. An adaptive algorithm picks harder problems when you're on a streak and easier ones when you're struggling. Boss battles need combo math!",
    category: "games",
    creatorName: "Priya",
    creatorAge: 10,
    creatorSchool: "Hillcrest Primary",
    imageEmoji: "⚔️",
    votes: 47,
    votedBy: [],
    createdAt: "2026-03-25T08:00:00Z",
  },
  {
    id: "seed-6",
    title: "DoodleAlive",
    description:
      "Draw any doodle and the AI animates it! Your stick figures walk, your cars drive, and your birds fly across the screen.",
    howItWorks:
      "I use a sketch recognition model to identify what you drew, then apply pre-made animation skeletons to bring the drawing to life. You can also add backgrounds!",
    category: "art",
    creatorName: "Zoe",
    creatorAge: 9,
    creatorSchool: "Rainbow Bridge School",
    imageEmoji: "✏️",
    votes: 73,
    votedBy: [],
    createdAt: "2026-03-26T16:20:00Z",
  },
];

export function getProjects(): Project[] {
  if (typeof window === "undefined") return SEED_PROJECTS;
  const stored = localStorage.getItem(PROJECTS_KEY);
  if (!stored) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(SEED_PROJECTS));
    return SEED_PROJECTS;
  }
  return JSON.parse(stored);
}

export function getProject(id: string): Project | undefined {
  return getProjects().find((p) => p.id === id);
}

export function addProject(project: Omit<Project, "id" | "votes" | "votedBy" | "createdAt">): Project {
  const projects = getProjects();
  const newProject: Project = {
    ...project,
    id: `proj-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    votes: 0,
    votedBy: [],
    createdAt: new Date().toISOString(),
  };
  projects.unshift(newProject);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  return newProject;
}

export function voteForProject(projectId: string, userId: string): Project | null {
  const projects = getProjects();
  const project = projects.find((p) => p.id === projectId);
  if (!project) return null;
  if (project.votedBy.includes(userId)) return null;
  project.votes += 1;
  project.votedBy.push(userId);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  return project;
}

export function hasVoted(projectId: string, userId: string): boolean {
  const project = getProject(projectId);
  if (!project) return false;
  return project.votedBy.includes(userId);
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(USER_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function saveUser(user: Omit<User, "id" | "createdAt">): User {
  const newUser: User = {
    ...user,
    id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(USER_KEY, JSON.stringify(newUser));
  return newUser;
}

export function logout(): void {
  localStorage.removeItem(USER_KEY);
}
