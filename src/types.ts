export interface ProfileProject {
  title: string;
  desc: string;
  tag: string;
}

export interface ProfileExperience {
  role: string;
  organization: string;
  duration: string;
  description: string;
}

export interface ProfileInfo {
  fullName: string;
  email: string;
  university: string;
  program: string;
  specialization: string;
  graduationYear: string;
  bio: string;
  skills: string[];
  projects: ProfileProject[];
  experience: ProfileExperience[];
}

export interface FileTemplate {
  id: string;
  path: string;
  description: string;
  category: "nextjs" | "config" | "style" | "readme";
  language: string;
  content: string;
}

export interface ChecklistItem {
  id: string;
  step: string;
  title: string;
  description: string;
  isCompleted: boolean;
  resourceLinks?: { label: string; url: string }[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  description: string;
  status: "pending" | "ready" | "active";
}
