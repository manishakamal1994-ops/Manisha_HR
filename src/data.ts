import { FileTemplate, ChecklistItem, ArchitectureNode, ProfileInfo } from "./types";

export const DEFAULT_PROFILE: ProfileInfo = {
  fullName: "Manisha Kamal",
  email: "MANISHAKAMAL1994@gmail.com",
  university: "Chandigarh University",
  program: "Master of Business Administration (MBA)",
  specialization: "Marketing & Strategy",
  graduationYear: "2027",
  bio: "A highly driven and goal-oriented MBA scholar at Chandigarh University, specializing in Strategic Marketing and Business Analysis. Analytical, data-driven, and adept at translating market research insights into actionable business frameworks. Experienced in team leadership, corporate communication, and digital brand consulting.",
  skills: [
    "Strategic Brand Management",
    "Market Research & Consumer Behavior",
    "Financial Modeling & Forecasting",
    "Digital Marketing Strategy",
    "Sales & Business Development",
    "Corporate Communications",
    "Business Analytics",
    "Leadership & Project Management"
  ],
  projects: [
    {
      title: "Digital Growth Strategy for Eco-Retail",
      desc: "Designed and piloted a localized omnichannel strategy, resulting in a project-simulated 22% increase in digital brand awareness for partner sustainable cosmetics brand.",
      tag: "Strategic Marketing"
    },
    {
      title: "Retail Financial Outlook Analysis",
      desc: "Evaluated historical cash flow structures of regional retail networks and generated risk assessment models using multi-variant statistical frameworks.",
      tag: "Business Finance"
    },
    {
      title: "Sustainable Business Model Innovation",
      desc: "Developed a comprehensive market entry strategy template focused on biodegradable consumer packaging options in Tier-2 Indian cities.",
      tag: "Corporate Strategy"
    }
  ],
  experience: [
    {
      role: "Strategic Marketing Intern",
      organization: "Nexus Corp Consultants",
      duration: "May 2026 - July 2026",
      description: "Led customer perception interviews to refine go-to-market strategies. Analyzed digital campaign metrics and presented visual reports outlining ROI improvements."
    },
    {
      role: "Class Representative & Event Lead",
      organization: "Chandigarh University MBA Forum",
      duration: "August 2025 - Present",
      description: "Coordinating corporate interactive panels, organizing guest lectures, and managing peer team structures of over 120 students."
    }
  ]
};

export const NEXT_BOILERPLATE_FILES: FileTemplate[] = [
  {
    id: "next-page",
    path: "src/app/page.tsx",
    description: "The primary responsive React view built using Next.js App Router. Implements professional MBA showcase cards with elegant typography, smooth gradients, and interactive layouts.",
    category: "nextjs",
    language: "typescript",
    content: `import React from "react";
import { Mail, GraduationCap, Award, Briefcase, ChevronRight, CheckCircle2, Linkedin, Phone, BookOpen, Sparkles } from "lucide-react";

export default function Home() {
  const profile = {
    fullName: "VAR_FULL_NAME",
    email: "VAR_EMAIL",
    university: "VAR_UNIVERSITY",
    program: "VAR_PROGRAM",
    specialization: "VAR_SPECIALIZATION",
    graduationYear: "VAR_GRADUATION_YEAR",
    bio: "VAR_BIO"
  };

  const skills = VAR_SKILLS_JSON;
  const projects = VAR_PROJECTS_JSON;
  const experience = VAR_EXPERIENCE_JSON;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Hero Banner Grid block */}
      <div className="relative overflow-hidden border-b border-slate-900 bg-gradient-to-b from-indigo-950/40 via-slate-950 to-slate-950 py-20 px-6 sm:px-12 lg:px-24">
        <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-cyan-600/10 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-violet-600/10 blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-950/40 text-cyan-400 border border-cyan-500/20 text-xs rounded-full font-medium mb-6 uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            MBA Portfolio
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-sans bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
            {profile.fullName}
          </h1>
          <p className="text-lg sm:text-xl text-cyan-400 font-medium mt-3 font-sans">
            {profile.program} &bull; {profile.university}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 text-xs bg-slate-900 text-slate-350 border border-slate-800 rounded-full font-mono">
              Specialization: {profile.specialization}
            </span>
            <span className="px-3 py-1 text-xs bg-slate-900 text-slate-350 border border-slate-800 rounded-full font-mono">
              Class of {profile.graduationYear}
            </span>
          </div>
          <p className="max-w-2xl mx-auto text-slate-400 mt-6 leading-relaxed text-sm sm:text-base">
            {profile.bio}
          </p>
          
          <div className="mt-8 flex justify-center gap-4">
            <a 
              href={\`mailto:\${profile.email}\`}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-cyan-950/40 transition-all flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-16 px-6 space-y-16">
        
        {/* Education Credentials Card */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <GraduationCap className="h-5 text-cyan-400" />
            Academic Foundation
          </h2>
          <div className="bg-slate-900/40 border border-slate-900 p-6 rounded-2xl flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-200">{profile.university}</h3>
              <p className="text-sm text-cyan-400 font-medium mt-0.5">{profile.program}</p>
              <p className="text-xs text-slate-400 mt-2">
                Deep diving into business strategy, operations, macroeconomics, digital leadership, corporate governance, and statistics.
              </p>
            </div>
            <div className="text-right sm:text-right text-left">
              <span className="inline-block px-3 py-1 bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 font-mono text-xs rounded-full font-semibold">
                Expected {profile.graduationYear}
              </span>
            </div>
          </div>
        </section>

        {/* Business Specialties Component */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Award className="h-5 text-indigo-400" />
            Core Business Specialties
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {skills.map((skill: string, index: number) => (
              <div 
                key={index}
                className="p-3 bg-slate-900/30 border border-slate-900 rounded-xl hover:border-slate-800 transition-all text-center flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4 text-cyan-500 shrink-0" />
                <span className="text-xs font-semibold text-slate-300 font-sans">{skill}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Experience List */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Briefcase className="h-5 text-violet-400" />
            Professional Milestones
          </h2>
          <div className="space-y-4">
            {experience.map((exp: any, index: number) => (
              <div 
                key={index} 
                className="bg-slate-900/30 border border-slate-900 p-6 rounded-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-indigo-500"></div>
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">{exp.role}</h3>
                    <p className="text-sm text-cyan-400 font-medium">{exp.organization}</p>
                  </div>
                  <span className="text-xs font-mono text-slate-500 bg-slate-950 px-2.5 py-1 rounded border border-slate-900">
                    {exp.duration}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Initiatives Section */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="h-5 text-rose-400" />
            Strategic Academic Initiatives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map((proj: any, index: number) => (
              <div 
                key={index}
                className="bg-slate-900/30 border border-slate-900 p-5 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-rose-400 px-2 py-0.5 bg-rose-500/10 border border-rose-500/20 rounded">
                    {proj.tag}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-200 mt-2.5 leading-tight">{proj.title}</h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {proj.desc}
                  </p>
                </div>
                <div className="mt-4 pt-1.5 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Case Study</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Styled Footer block */}
      <footer className="border-t border-slate-900 bg-slate-950 py-10 text-center text-xs text-slate-500 font-mono">
        <p>Copyright &copy; {new Date().getFullYear()} {profile.fullName} &bull; University ID Showcase</p>
        <p className="mt-1 text-slate-650">Deployed Serverlessly via Vercel Edge Framework</p>
      </footer>
    </main>
  );
}`
  },
  {
    id: "next-layout",
    path: "src/app/layout.tsx",
    description: "Configures global fonts, theme layouts, and metadata bindings suitable for the Vercel compiler.",
    category: "nextjs",
    language: "typescript",
    content: `import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VAR_FULL_NAME | MBA Portfolio & Biodata",
  description: "Professional digital dossier of VAR_FULL_NAME, Student in the Master of Business Administration program at Chandigarh University.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}`
  },
  {
    id: "next-globals",
    path: "src/app/globals.css",
    description: "Configures CSS directives integrating Tailwind utility systems with safety margins.",
    category: "style",
    language: "css",
    content: `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #020617;
  color: #f8fafc;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}`
  },
  {
    id: "next-package",
    path: "package.json",
    description: "Defines lightweight production packages ready for Vercel imports without heavy server footprints.",
    category: "config",
    language: "json",
    content: `{
  "name": "manisha-kamal-mba-portfolio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.379.0"
  },
  "devDependencies": {
    "@types/node": "^20.12.12",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.3",
    "typescript": "^5.4.5"
  }
}`
  },
  {
    id: "next-tailwind-config",
    path: "tailwind.config.ts",
    description: "Maps core screen styles and brand-complementary dark palette values.",
    category: "config",
    language: "typescript",
    content: `import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;`
  },
  {
    id: "next-config",
    path: "next.config.mjs",
    description: "Sets optimal compiler parameters ensuring error-free standard Next.js deployments.",
    category: "config",
    language: "javascript",
    content: `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Standard configurations
  }
};

export default nextConfig;`
  },
  {
    id: "next-readme",
    path: "README.md",
    description: "Complete checklist instruction walking you through unzipping, initializing, and syncing to Vercel.",
    category: "readme",
    language: "markdown",
    content: `# VAR_FULL_NAME 🌌 Business Portfolio

Welcome to my professional Next.js digital biodata and business portfolio! This repository is fully optimized for **Vercel Serverless Hosting** and configured to showcase my MBA trajectory at **VAR_UNIVERSITY**.

## 🚀 How to deploy this onto Vercel in 4 minutes:

### 1. Download or Unzip the template
- Ensure all files inside the zip target are extracted directly into your root local folder or inside **GitHub Codespaces**.

### 2. Push files into GitHub Repository
Register your repository and issue the following terminal commands:
\`\`\`bash
git init
git add .
git commit -m 'Initial setup of Next.js MBA Biodata'
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/NEW_REPO_NAME.git
git branch -M main
git push -u origin main
\`\`\`

### 3. Deploy onto Vercel
1. Log into [vercel.com](https://vercel.com).
2. Click **Add New Project**, select **Import Git Repository**, and search for your new repository.
3. Keep default settings (Vercel automatically detects Next.js framework).
4. Click **Deploy**! Your stunning personal MBA Biodata goes live globally in seconds!
`
  }
];

export const BIODATA_CHECKLIST: ChecklistItem[] = [
  {
    id: "new-repo",
    step: "Step 1",
    title: "Make a New GitHub Repo",
    description: "Go to github.com/new and create a brand new repo (e.g. 'Manisha_Kamal_Biodata'). Keep it public or private as you prefer.",
    isCompleted: false
  },
  {
    id: "new-vercel",
    step: "Step 2",
    title: "Connect Repo to Vercel",
    description: "Log in to vercel.com, click 'Add New Project', import your newly created repository and let it wait for the initial code push.",
    isCompleted: false
  },
  {
    id: "new-custom",
    step: "Step 3",
    title: "Customize Bio Live",
    description: "Use our interactive studio fields on the right/left to adjust your specialization, program, name, or experiences to match your authentic biodata.",
    isCompleted: false
  },
  {
    id: "new-export",
    step: "Step 4",
    title: "Extract Code Files",
    description: "Browse the file scaffolding files, copy the template files, or compress them into a .zip. Make sure you unzip all files into your repository's root folder.",
    isCompleted: false
  },
  {
    id: "new-commit",
    step: "Step 5",
    title: "Commit and Push to GitHub",
    description: "Launch your terminal, execute 'git add . && git commit -m \"setup Portfolio\" && git push' to publish files in your remote Github repository.",
    isCompleted: false
  },
  {
    id: "new-live",
    step: "Step 6",
    title: "Enjoy Your Live Portfolio Page",
    description: "Vercel automatically hooks to your repository and schedules a compilation. Your personal MBA page goes live under your own vercel.app link instantly!",
    isCompleted: false
  }
];

export const NEW_ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: "node-user-editor",
    label: "Manisha Kamal Editor",
    description: "Dynamic profile editor tailored to customize specific MBA specialties, projects, and contact info.",
    status: "active"
  },
  {
    id: "node-nextjs-exporter",
    label: "Next.js Code Packer",
    description: "Vercel-native Next.js App Router boilerplate incorporating customizable configurations.",
    status: "ready"
  },
  {
    id: "node-new-github",
    label: "New GitHub Repository",
    description: "Target repository housing the unzipped and committed files linked via webhook.",
    status: "pending"
  },
  {
    id: "node-vercel-cd",
    label: "Vercel Edge CDN",
    description: "Receives commits instantly, building static assets under optimized cloud endpoints.",
    status: "pending"
  }
];
