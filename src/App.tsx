import React, { useState, useRef, useEffect } from "react";
import {
  Terminal,
  ChevronRight,
  Copy,
  Check,
  Award,
  Briefcase,
  Mail,
  FileCode,
  Globe,
  Github,
  Sparkles,
  Code2,
  Sliders,
  ArrowRight,
  Plus,
  Trash2,
  Monitor,
  Eye,
  Settings,
  Send,
  RefreshCw,
  GraduationCap,
  Play,
  Download,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Lock,
  Unlock,
  EyeOff
} from "lucide-react";
import { DEFAULT_PROFILE, NEXT_BOILERPLATE_FILES, BIODATA_CHECKLIST, NEW_ARCHITECTURE_NODES } from "./data";
import { FileTemplate, ChecklistItem, ChatMessage, ArchitectureNode, ProfileInfo } from "./types";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Navigation mode state - "website" shows the direct full webpage, "developer" shows the toolbox, "backend" shows password-protected panel
  const [viewMode, setViewMode] = useState<"website" | "developer" | "backend">("website");

  // Profile state for live-customization
  const [profile, setProfile] = useState<ProfileInfo>(DEFAULT_PROFILE);
  const [newSkill, setNewSkill] = useState<string>("");

  // Next.js templates, active selector state
  const [files, setFiles] = useState<FileTemplate[]>(NEXT_BOILERPLATE_FILES);
  const [selectedFileId, setSelectedFileId] = useState<string>("next-page");
  const [copiedFileId, setCopiedFileId] = useState<string | null>(null);

  // Tab systems inside developer mode
  const [leftTab, setLeftTab] = useState<"checklist" | "editor">("editor");
  const [rightPanel, setRightPanel] = useState<"preview" | "assistant">("preview");

  // Checklist state
  const [checklist, setChecklist] = useState<ChecklistItem[]>(BIODATA_CHECKLIST);

  // Architecture Pipeline monitoring nodes
  const [nodes, setNodes] = useState<ArchitectureNode[]>(NEW_ARCHITECTURE_NODES);
  const [activeNodeId, setActiveNodeId] = useState<string>("node-user-editor");

  // Interactive message mockup stats
  const [contactForm, setContactForm] = useState({ name: "", email: "", msg: "", subject: "MBA Marketing Advisory" });
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  // Password-protected Admin settings states
  const [isAdminAuthorized, setIsAdminAuthorized] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  // Live webpage toggle section statuses
  const [showSkills, setShowSkills] = useState<boolean>(true);
  const [showExperience, setShowExperience] = useState<boolean>(true);
  const [showProjects, setShowProjects] = useState<boolean>(true);
  const [showAcademicBackground, setShowAcademicBackground] = useState<boolean>(true);
  const [showContactForm, setShowContactForm] = useState<boolean>(true);

  // Experience and Projects mutation handlers for the secure back-office manager
  const handleAddExperience = () => {
    const newExp = {
      role: "Strategy & Marketing Analyst",
      organization: "Dynamic Corporate Ventures LLC",
      duration: "Present Milestone",
      description: "Administer growth strategies, perform regression-based performance assays, and construct market capitalization reviews."
    };
    setProfile(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const handleRemoveExperience = (idx: number) => {
    setProfile(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== idx)
    }));
  };

  const handleExperienceFieldUpdate = (idx: number, field: "role" | "organization" | "duration" | "description", val: string) => {
    setProfile(prev => {
      const updated = [...prev.experience];
      updated[idx] = { ...updated[idx], [field]: val };
      return { ...prev, experience: updated };
    });
  };

  const handleAddProject = () => {
    const newProj = {
      title: "Executive Strategic Restructures Proposal",
      desc: "Designed and mapped cross-functional framework models to mitigate brand deterioration threats in saturated FMCG hubs.",
      tag: "Case Study"
    };
    setProfile(prev => ({
      ...prev,
      projects: [...prev.projects, newProj]
    }));
  };

  const handleRemoveProject = (idx: number) => {
    setProfile(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== idx)
    }));
  };

  const handleProjectFieldUpdate = (idx: number, field: "title" | "desc" | "tag", val: string) => {
    setProfile(prev => {
      const updated = [...prev.projects];
      updated[idx] = { ...updated[idx], [field]: val };
      return { ...prev, projects: updated };
    });
  };

  const handleAdminEnterRequest = () => {
    if (isAdminAuthorized) {
      setViewMode("backend");
    } else {
      setShowLoginModal(true);
    }
  };

  // Gemini assistant console state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-portfolio",
      sender: "ai",
      text: "Hello Manisha! I have initiated the Next.js personal biodata workspace for you. Adjust your details in the editor on the left. The source code on the central explorer and the live visual mockups on the right will update instantaneously as you type! Ask me any questions about unzipping, linking GitHub, or customizing experiences.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [userInput, setUserInput] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat thread
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isAiLoading]);

  // Method to insert modified profile state into Next.js source code in real-time
  const getRenderedContent = (file: FileTemplate): string => {
    let result = file.content;
    
    // Replace standard placeholders
    result = result.replace(/VAR_FULL_NAME/g, profile.fullName);
    result = result.replace(/VAR_EMAIL/g, profile.email);
    result = result.replace(/VAR_UNIVERSITY/g, profile.university);
    result = result.replace(/VAR_PROGRAM/g, profile.program);
    result = result.replace(/VAR_SPECIALIZATION/g, profile.specialization);
    result = result.replace(/VAR_GRADUATION_YEAR/g, profile.graduationYear);
    result = result.replace(/VAR_BIO/g, profile.bio.replace(/"/g, '\\"'));

    // Inject arrays formatted as valid JSON expressions
    if (file.id === "next-page") {
      result = result.replace("VAR_SKILLS_JSON", JSON.stringify(profile.skills, null, 2));
      result = result.replace("VAR_PROJECTS_JSON", JSON.stringify(profile.projects, null, 2));
      result = result.replace("VAR_EXPERIENCE_JSON", JSON.stringify(profile.experience, null, 2));
    }

    return result;
  };

  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFileId(id);
    setTimeout(() => setCopiedFileId(null), 2000);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()]
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (indexToRemove: number) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((_, idx) => idx !== indexToRemove)
    });
  };

  const handleProjectChange = (index: number, field: "title" | "desc" | "tag", val: string) => {
    const updatedProjects = [...profile.projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: val };
    setProfile({ ...profile, projects: updatedProjects });
  };

  const handleExperienceChange = (index: number, field: "role" | "organization" | "duration" | "description", val: string) => {
    const updatedExp = [...profile.experience];
    updatedExp[index] = { ...updatedExp[index], [field]: val };
    setProfile({ ...profile, experience: updatedExp });
  };

  const handleToggleStep = (stepId: string) => {
    setChecklist(
      checklist.map((item) => {
        if (item.id === stepId) {
          const updated = !item.isCompleted;
          // Synchronize architecture statuses
          if (stepId === "new-repo") {
            updateNodeState("node-new-github", updated ? "ready" : "pending");
          } else if (stepId === "new-vercel") {
            updateNodeState("node-vercel-cd", updated ? "ready" : "pending");
          } else if (stepId === "new-custom") {
            updateNodeState("node-user-editor", updated ? "active" : "active");
          } else if (stepId === "new-export") {
            updateNodeState("node-nextjs-exporter", updated ? "active" : "ready");
          } else if (stepId === "new-commit") {
            updateNodeState("node-new-github", updated ? "active" : "ready");
          } else if (stepId === "new-live") {
            updateNodeState("node-vercel-cd", updated ? "active" : "pending");
          }
          return { ...item, isCompleted: updated };
        }
        return item;
      })
    );
  };

  const updateNodeState = (nodeId: string, status: "pending" | "ready" | "active") => {
    setNodes((prevNodes) =>
      prevNodes.map((n) => (n.id === nodeId ? { ...n, status } : n))
    );
  };

  // Serve backend AI help
  const handleSendMessage = async (customPrompt?: string | null) => {
    const queryText = customPrompt || userInput;
    if (!queryText.trim() || isAiLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setUserInput("");
    setIsAiLoading(true);

    // Auto set panel to assistant so user sees responses
    setRightPanel("assistant");

    try {
      const response = await fetch("/api/help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: queryText,
          context: {
            fullName: profile.fullName,
            university: profile.university,
            program: profile.program,
            specialization: profile.specialization,
            skillsCount: profile.skills.length,
            completedSteps: checklist.filter(c => c.isCompleted).map(c => c.title)
          }
        })
      });

      const data = await response.json();
      if (response.ok) {
        setChatMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}-ai`,
            sender: "ai",
            text: data.text || "I have received your query. Please let me know how I can further tailor your MBA profile code.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        throw new Error(data.error || "No response text");
      }
    } catch (err: any) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}-ai-fail`,
          sender: "ai",
          text: `💡 Gemini Offline Tip: If your secret key is currently unconfigured, here is standard guidance:\n\nTo unzip files inside Vercel, note that Vercel performs builds natively using Git hooks! You do not manually unzip files inside Vercel's dashboard. Simply unzip files locally or within GitHub Codespaces, drag/push them to your remote repository on GitHub, and Vercel will instantly detect and compile your raw Next.js codebase.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleMockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.msg) return;
    setIsSubmitSuccess(true);
    setTimeout(() => {
      setIsSubmitSuccess(false);
      setContactForm({ name: "", email: "", msg: "", subject: "MBA Marketing Advisory" });
    }, 4500);
  };

  const SUGGESTIONS = [
    { title: "How to unzip in Codespace?", prompt: "Could you write out the exact CLI commands to unzip our portfolio zip package inside GitHub Codespaces terminal?" },
    { title: "Improve my Bio text", prompt: "I am majoring in MBA Marketing & Strategy at Chandigarh University. Rewrite my biography to sound highly professional, polished, and suitable for marketing internships." },
    { title: "Link repository to Vercel", prompt: "Give me step-by-step instructions to connect my brand-new GitHub repository to my Vercel profile." }
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col justify-start relative overflow-x-hidden" id="app_root">
      
      {/* Dynamic Persistent Banner for Quick View Switch */}
      <div className="bg-gradient-to-r from-emerald-950 via-indigo-950 to-emerald-950 border-b border-emerald-500/20 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs z-30 shadow-lg shrink-0">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
          <span className="text-emerald-300 font-mono font-semibold tracking-wider uppercase text-[10px]">
            {viewMode === "website" ? "LIVE WEBSITE DEMO" : "DEVELOPER SOURCE MODE"}
          </span>
          <span className="text-slate-400 text-xs hidden sm:inline">|</span>
          <p className="text-slate-200 text-xs">
            {viewMode === "website" 
              ? "This is your compiled MBA Biodata website. Want to see, copy or customize the Next.js files and export to GitHub?"
              : "Scaffold, edit profile attributes, download configs, and follow the Vercel deploy checklist."}
          </p>
        </div>

        <button 
          onClick={() => setViewMode(viewMode === "website" ? "developer" : "website")}
          className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-450 text-slate-950 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all shadow-md shadow-emerald-950/40 cursor-pointer"
        >
          {viewMode === "website" ? (
            <>
              <Code2 className="h-3.5 w-3.5" />
              <span>Open Developer Code Exporter</span>
            </>
          ) : (
            <>
              <Eye className="h-3.5 w-3.5" />
              <span>Back to Active Webpage View</span>
            </>
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        
        {/* VIEW 1: FULL WEBSITE PORTFOLIO (Default View Mode) */}
        {viewMode === "website" ? (
          <motion.div
            key="website_view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-grow flex flex-col w-full"
          >
            {/* Elegant Header Section */}
            <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-20 py-4 px-6 md:px-12 flex justify-between items-center max-w-7xl mx-auto w-full">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-indigo-600 to-cyan-500 rounded-xl">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-display font-extrabold text-white text-base tracking-tight">{profile.fullName}</span>
                  <div className="text-[10px] text-cyan-400 font-mono tracking-wider uppercase mt-0.5">{profile.program}</div>
                </div>
              </div>

              {/* Quick Contacts */}
              <div className="flex items-center gap-4 text-xs">
                <div className="hidden lg:flex items-center gap-4">
                  <a href={`mailto:${profile.email}`} className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-cyan-400" />
                    <span>{profile.email}</span>
                  </a>
                  <span className="text-slate-800">|</span>
                  <span className="text-zinc-400 font-mono">{profile.university}</span>
                  <span className="text-slate-800">|</span>
                </div>
                
                <button 
                  onClick={handleAdminEnterRequest}
                  className="px-3.5 py-1.5 bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-505 border-indigo-500/30 text-indigo-300 hover:text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all shadow-sm shadow-indigo-950/60 cursor-pointer"
                  id="header_edit_button"
                >
                  <Lock className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Edit you page</span>
                </button>
              </div>
            </header>

            {/* Hero Segment */}
            <section className="relative overflow-hidden bg-gradient-to-b from-indigo-950/30 via-slate-950 to-slate-950 py-24 px-6 sm:px-12 md:px-24 border-b border-slate-900">
              <div className="absolute top-12 left-1/4 h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl"></div>
              <div className="absolute bottom-12 right-1/4 h-80 w-80 rounded-full bg-violet-600/5 blur-3xl"></div>
              
              <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-950 border border-indigo-500/20 text-indigo-400 text-xs rounded-full font-mono uppercase tracking-wider">
                  <Sparkles className="h-3 w-3 animate-spin" />
                  Master of Business Administration
                </div>
                
                <h1 className="text-4xl sm:text-7xl font-black tracking-tight text-white font-sans bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 leading-tight">
                  {profile.fullName}
                </h1>
                
                <p className="text-lg sm:text-2xl text-cyan-400 font-medium font-sans">
                  {profile.program} Scholar &bull; <span className="text-indigo-300 font-semibold">{profile.university}</span>
                </p>

                <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                  <span className="px-3.5 py-1 text-xs bg-indigo-950/20 text-indigo-300 border border-indigo-500/20 rounded-full font-semibold font-mono">
                    Speciality: {profile.specialization}
                  </span>
                  <span className="px-3.5 py-1 text-xs bg-slate-905 border border-slate-800 text-slate-400 rounded-full font-mono">
                    Expected Graduation: {profile.graduationYear}
                  </span>
                  <span className="px-3.5 py-1 text-xs bg-emerald-950/20 text-emerald-400 border border-emerald-500/10 rounded-full font-mono font-semibold">
                    Vercel Ready Portfolio
                  </span>
                </div>

                <p className="max-w-3xl mx-auto text-slate-400 mt-6 leading-relaxed text-sm sm:text-lg font-sans">
                  {profile.bio}
                </p>

                <div className="pt-6 flex flex-wrap justify-center gap-4">
                  <a 
                    href={`mailto:${profile.email}`}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <Mail className="h-4.5 w-4.5" />
                    Connect Directly
                  </a>
                  <button 
                    onClick={() => setViewMode("developer")}
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 font-semibold rounded-xl text-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Code2 className="h-4.5 w-4.5 text-emerald-400 animate-pulse" />
                    Get Next.js Code files
                  </button>
                </div>
              </div>
            </section>

            {/* Core Info Blocks Grid */}
            <section className="bg-slate-950 py-20 px-6 sm:px-12 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10">
                          {/* Timeline Experience (Col-Span-7) */}
              <div className="lg:col-span-7 space-y-8 text-left">
                {showExperience && (
                  <>
                    <div className="flex items-center gap-2.5 pb-2 border-b border-slate-900">
                      <div className="p-2 bg-violet-950 text-violet-400 rounded-lg">
                        <Briefcase className="h-4 w-4" />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">Professional Trajectory</h2>
                    </div>

                    <div className="space-y-6">
                      {profile.experience.map((exp, idx) => (
                        <div 
                          key={idx}
                          className="bg-slate-900/40 border border-slate-900 p-6 rounded-2xl relative overflow-hidden group hover:border-slate-800 transition-all shadow-md"
                        >
                          <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-indigo-600 group-hover:from-cyan-400"></div>
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3">
                            <div>
                              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{exp.role}</h3>
                              <p className="text-sm text-indigo-400 font-medium font-mono">{exp.organization}</p>
                            </div>
                            <span className="text-xs font-mono text-slate-400 bg-slate-950 border border-slate-800 px-3 py-1 rounded-full">
                              {exp.duration}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Academic projects Case studies */}
                {showProjects && (
                  <div className="pt-6 space-y-6">
                    <div className="flex items-center gap-2.5 pb-2 border-b border-slate-900">
                      <div className="p-2 bg-rose-950 text-rose-400 rounded-lg">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">Strategic Academic Initiatives</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {profile.projects.map((proj, idx) => (
                        <div 
                          key={idx}
                          className="bg-slate-900/30 border border-slate-900 p-5 rounded-2xl flex flex-col justify-between group hover:border-slate-800 transition-all text-left"
                        >
                          <div>
                            <div className="flex justify-between items-center mb-2.5">
                              <span className="text-[9px] uppercase font-mono tracking-widest text-rose-400 px-2.5 py-0.5 bg-rose-500/10 border border-rose-500/10 rounded">
                                {proj.tag}
                              </span>
                              <span className="text-[10px] font-mono text-slate-500">Market Study</span>
                            </div>
                            <h3 className="text-sm sm:text-base font-bold text-slate-200 mt-2 leading-tight group-hover:text-white">{proj.title}</h3>
                            <p className="text-xs text-slate-400 mt-2.5 leading-relaxed line-clamp-3">
                              {proj.desc}
                            </p>
                          </div>
                          
                          <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] text-indigo-400 font-mono">
                            <span>Verified Analysis</span>
                            <ChevronRight className="h-3 w-3 text-indigo-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!showExperience && !showProjects && (
                  <div className="p-10 bg-slate-900/20 border border-slate-900/60 rounded-3xl text-center space-y-2">
                    <EyeOff className="h-10 w-10 text-slate-600 mx-auto" />
                    <p className="text-sm text-slate-400 font-semibold font-mono uppercase tracking-wider">Timeline Trajectory Off</p>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                      The candidate has temporarily disabled professional timeline experiences and academic initiatives from rendering.
                    </p>
                  </div>
                )}

              </div>

              {/* Key Competencies & Contact Panel (Col-Span-5) */}
              <div className="lg:col-span-5 space-y-8 text-left">
                
                {/* Academic Background Card */}
                {showAcademicBackground && (
                  <div className="bg-gradient-to-br from-indigo-950/50 to-slate-950 border border-slate-900 p-6 rounded-3xl space-y-4 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 h-40 w-40 bg-indigo-500/10 rounded-full blur-2xl"></div>
                    <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Academic Foundation</h3>
                    
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-white font-sans">{profile.university}</h4>
                      <p className="text-sm text-slate-300">{profile.program}</p>
                      <p className="text-xs text-indigo-400 font-medium">Specialization: {profile.specialization}</p>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      Building robust administrative faculties centered on Corporate Development, Advanced Financial Forecasting, Omnichannel marketing paradigms, and Team leadership structures.
                    </p>
                    
                    <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-xs font-mono text-slate-450">
                      <span className="text-slate-500">Graduation Timeline</span>
                      <span className="px-2.5 py-0.5 bg-cyan-950 text-cyan-400 border border-cyan-500/20 rounded-full">
                        Expected {profile.graduationYear}
                      </span>
                    </div>
                  </div>
                )}

                {/* Specialties Matrix */}
                {showSkills && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-indigo-950">
                      <div className="p-1.5 bg-cyan-950 text-cyan-400 rounded-md">
                        <Award className="h-4 w-4" />
                      </div>
                      <h3 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wide">Key Professional Specialties</h3>
                    </div>

                    <div className="flex flex-wrap gap-2 text-left">
                      {profile.skills.map((skill, index) => (
                        <div 
                          key={index}
                          className="py-2 px-3 bg-slate-900/40 border border-slate-900 rounded-xl hover:border-slate-800 transition-all flex items-center gap-2"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                          <span className="text-xs font-semibold text-slate-300">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interactive Contact simulator form */}
                {showContactForm && (
                  <div className="bg-slate-900/20 border border-slate-900 p-6 rounded-2xl space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Mail className="h-4 w-4 text-cyan-400" />
                        Get In Touch (Enquiries)
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">Send a corporate proposal or message to Manisha.</p>
                    </div>

                    <form onSubmit={handleMockSubmit} className="space-y-3">
                      <div>
                        <input 
                          type="text" 
                          required
                          placeholder="Your Name (e.g. Hiring Manager)"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs outline-none focus:border-indigo-500 text-slate-200"
                        />
                      </div>
                      <div>
                        <input 
                          type="email" 
                          placeholder="Your Email Coordinate (Optional)"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs outline-none focus:border-indigo-500 text-slate-200"
                        />
                      </div>
                      <div>
                        <textarea 
                          rows={3}
                          required
                          placeholder="Write your message detail here..."
                          value={contactForm.msg}
                          onChange={(e) => setContactForm({ ...contactForm, msg: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs outline-none focus:border-indigo-500 text-slate-200"
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full py-2 bg-gradient-to-r from-cyan-600 to-indigo-650 justify-center bg-indigo-900/60 hover:bg-indigo-900 border border-indigo-500/20 text-indigo-200 font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-all text-white cursor-pointer"
                      >
                        <Send className="h-3 w-3" />
                        <span>Transmit Interactive Message</span>
                      </button>
                    </form>

                    <AnimatePresence>
                      {isSubmitSuccess && (
                        <motion.div 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="p-3 bg-emerald-950/40 text-emerald-300 border border-emerald-500/20 rounded-lg text-[11px] text-left leading-relaxed flex gap-2 items-start"
                        >
                          <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold">Transmission Successful!</p>
                            <p className="text-slate-400 mt-0.5">Your simulation message has been captured. In the compiled Next.js site code, this will forward directly to {profile.email}.</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {!showAcademicBackground && !showSkills && !showContactForm && (
                  <div className="p-8 bg-slate-900/20 border border-slate-900/60 rounded-3xl text-center space-y-1">
                    <EyeOff className="h-8 w-8 text-slate-650 mx-auto mb-1" />
                    <p className="text-xs text-slate-450 font-semibold font-mono uppercase text-slate-400">Right Desk Modules Disabled</p>
                  </div>
                )}

              </div>

            </section>

            {/* Structured Page Footer */}
            <footer className="border-t border-slate-900 bg-slate-950 py-12 px-6 text-center text-xs text-slate-500 font-mono space-y-2 mt-auto">
              <div className="flex justify-center flex-wrap gap-3">
                <button 
                  onClick={() => setViewMode("developer")}
                  className="text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Code2 className="h-3.5 w-3.5" />
                  <span>Interactive Next.js Code Exporter</span>
                </button>
                <span>&bull;</span>
                <button 
                  onClick={handleAdminEnterRequest}
                  className="text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>Edit you page (Admin Portal)</span>
                </button>
                <span>&bull;</span>
                <span className="text-slate-500">{profile.university} Candidate Showcase</span>
              </div>
              <p>Copyright &copy; {new Date().getFullYear()} {profile.fullName} &bull; Strategic MBA Biodata Portfolio</p>
              <p className="text-[10px] text-zinc-650">Fully responsive single-screen deployment package ready for GitHub Pages & Vercel compiles</p>
            </footer>
          </motion.div>
        ) : viewMode === "developer" ? (
          
          /* VIEW 2: MULTI-COLUMN DEVELOPER SETUP EXPORTER & LIVE CUSTOMIZER WORKSPACE */
          <motion.div
            key="developer_view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-grow flex flex-col p-4 md:p-6 text-left"
          >
            {/* Developer Section Header */}
            <header className="mb-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-900 backdrop-blur-md" id="app_header">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl shadow-lg shadow-indigo-950/40">
                  <GraduationCap className="h-6 w-6 text-indigo-200" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="font-display font-bold text-xl sm:text-2xl tracking-tight text-white">Next.js Package Assembler</h1>
                    <span className="px-2 py-0.5 text-[9px] font-mono tracking-wider bg-indigo-950/40 text-indigo-400 border border-indigo-500/10 rounded">
                      Vercel Optimized
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                    Change attributes in the builder to automatically regenerate the Next.js target code. Read unzipping guides below.
                  </p>
                </div>
              </div>

              {/* Action commands */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setViewMode("website")}
                  className="px-4 py-2 bg-slate-950 border border-slate-800 text-slate-200 hover:text-white rounded-xl text-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Eye className="h-4 w-4 text-cyan-400" />
                  <span>Preview Full Webpage</span>
                </button>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950/60 rounded-lg border border-slate-900 text-xs text-slate-350 select-none">
                  <Github className="h-3.5 w-3.5 text-zinc-400" />
                  <span className="font-mono text-zinc-400">Status: Vercel Ready</span>
                </div>
              </div>
            </header>

            {/* Three Column Builder Desk */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch flex-grow" id="app_main">
              
              {/* Left Column (xl:col-span-4): Configurator / Checklist Tabs */}
              <section className="xl:col-span-4 flex flex-col gap-5" id="profile_form_section">
                <div className="bg-slate-900/50 border border-slate-900 p-5 rounded-2xl flex-grow flex flex-col justify-between">
                  <div>
                    {/* Switcher Tab buttons inside left section */}
                    <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-900 mb-5">
                      <button
                        onClick={() => setLeftTab("editor")}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          leftTab === "editor"
                            ? "bg-indigo-900/40 text-indigo-200 border-b-2 border-indigo-500 shadow-md"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <Sliders className="h-3.5 w-3.5" />
                        Customize Biosuite
                      </button>
                      <button
                        onClick={() => setLeftTab("checklist")}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          leftTab === "checklist"
                            ? "bg-indigo-900/40 text-indigo-200 border-b-2 border-indigo-500 shadow-md"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Vercel Checklist ({checklist.filter(c => c.isCompleted).length}/{checklist.length})
                      </button>
                    </div>

                    {/* Left Form Panel content scrolling */}
                    <div className="overflow-y-auto pr-1 max-h-[480px] space-y-4">
                      
                      <AnimatePresence mode="wait">
                        {leftTab === "editor" ? (
                          <motion.div
                            key="editor"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4 text-xs text-slate-300 text-left"
                          >
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[9px] uppercase font-mono tracking-wider text-slate-500 mb-1">Full Name</label>
                                <input
                                  type="text"
                                  value={profile.fullName}
                                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                                  className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-1.5 outline-none focus:border-indigo-500 text-white font-medium"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] uppercase font-mono tracking-wider text-slate-500 mb-1">Email Coordinates</label>
                                <input
                                  type="email"
                                  value={profile.email}
                                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                  className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-1.5 outline-none focus:border-indigo-500 text-white font-mono"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[9px] uppercase font-mono tracking-wider text-slate-500 mb-1">University</label>
                                <input
                                  type="text"
                                  value={profile.university}
                                  onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                                  className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-1.5 outline-none focus:border-indigo-500 text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] uppercase font-mono tracking-wider text-slate-500 mb-1">Graduation Year</label>
                                <input
                                  type="text"
                                  value={profile.graduationYear}
                                  onChange={(e) => setProfile({ ...profile, graduationYear: e.target.value })}
                                  className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-1.5 outline-none focus:border-indigo-500 text-white font-mono"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[9px] uppercase font-mono tracking-wider text-slate-500 mb-1">Academic Degree</label>
                                <input
                                  type="text"
                                  value={profile.program}
                                  onChange={(e) => setProfile({ ...profile, program: e.target.value })}
                                  className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-1.5 outline-none focus:border-indigo-500 text-slate-200"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] uppercase font-mono tracking-wider text-slate-500 mb-1">Major Specialty</label>
                                <input
                                  type="text"
                                  value={profile.specialization}
                                  onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
                                  className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-1.5 outline-none focus:border-indigo-500 text-white font-semibold"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[9px] uppercase font-mono tracking-wider text-slate-500 mb-1">Biography / Career Outlook</label>
                              <textarea
                                value={profile.bio}
                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                rows={3}
                                className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-1.5 outline-none focus:border-indigo-500 text-slate-300 text-xs leading-relaxed"
                              />
                            </div>

                            {/* Core skills competency pills */}
                            <div>
                              <label className="block text-[9px] uppercase font-mono tracking-wider text-slate-500 mb-1">Key MBA Skills</label>
                              <div className="flex gap-2 mb-2">
                                <input
                                  type="text"
                                  value={newSkill}
                                  onChange={(e) => setNewSkill(e.target.value)}
                                  onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                                  placeholder="e.g. Quantitative Market Analysis"
                                  className="flex-grow bg-slate-950 border border-slate-850 rounded-md px-3 py-1 outline-none focus:border-indigo-500 text-xs"
                                />
                                <button
                                  onClick={handleAddSkill}
                                  className="px-3 bg-indigo-950 text-indigo-300 border border-indigo-500/20 text-xs rounded-md font-bold hover:bg-indigo-900 transition-all cursor-pointer"
                                >
                                  +
                                </button>
                              </div>
                              <div className="flex flex-wrap gap-1 p-1 bg-slate-950 border border-slate-850 rounded-lg max-h-24 overflow-y-auto">
                                {profile.skills.map((skill, sIdx) => (
                                  <span
                                    key={sIdx}
                                    className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-[10px] text-zinc-350"
                                  >
                                    <span>{skill}</span>
                                    <button
                                      onClick={() => handleRemoveSkill(sIdx)}
                                      className="text-rose-450 text-rose-500 font-bold hover:text-rose-400 cursor-pointer"
                                    >
                                      &times;
                                    </button>
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="checklist"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-2.5 text-left"
                          >
                            {checklist.map((item) => (
                              <div
                                key={item.id}
                                className={`p-3 rounded-xl border transition-all text-xs ${
                                  item.isCompleted
                                    ? "bg-slate-950/20 border-slate-900 text-slate-500"
                                    : "bg-slate-950 border-slate-850 text-slate-250"
                                }`}
                              >
                                <div className="flex items-start gap-2.5">
                                  <button
                                    onClick={() => handleToggleStep(item.id)}
                                    className={`h-4 w-4 rounded border mt-0.5 flex items-center justify-center shrink-0 cursor-pointer transition-all ${
                                      item.isCompleted
                                        ? "bg-emerald-500 border-emerald-400 text-slate-950"
                                        : "border-slate-700 hover:border-slate-500 text-transparent"
                                    }`}
                                  >
                                    <Check className="h-3 w-3" />
                                  </button>

                                  <div className="flex-grow">
                                    <div className="flex justify-between items-center">
                                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500">{item.step}</span>
                                      {item.isCompleted && <span className="text-[9px] text-emerald-400 font-bold uppercase font-mono">Done</span>}
                                    </div>
                                    <h4 className={`font-bold mt-0.5 ${item.isCompleted ? "text-slate-500 line-through" : "text-slate-100"}`}>
                                      {item.title}
                                    </h4>
                                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                                      {item.description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  </div>

                  {/* Micro Pipeline map at bottom or Switcher button */}
                  <div className="mt-4 pt-4 border-t border-slate-900 text-xs">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block mb-1">ACTIVE TARGET STRUCTURE</span>
                    <div className="grid grid-cols-4 gap-1">
                      {nodes.map((node) => (
                        <div 
                          key={node.id} 
                          title={node.description}
                          className="px-2 py-1 bg-slate-950 border border-slate-900 rounded text-center"
                        >
                          <div className="h-1 bg-slate-800 rounded-full overflow-hidden mb-1">
                            <div className={`h-full ${node.status === "active" ? "bg-emerald-500" : node.status === "ready" ? "bg-indigo-500 animate-pulse" : "bg-zinc-800"}`}></div>
                          </div>
                          <span className="text-[8px] font-mono block text-slate-400 truncate">{node.label.split(" ")[0]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </section>

              {/* Center Column (xl:col-span-4): Next.js Live Code Exporter */}
              <section className="xl:col-span-4 flex flex-col gap-5" id="code_exporter_section">
                <div className="bg-slate-905 bg-slate-900/50 border border-slate-900 p-5 rounded-2xl flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                          <Code2 className="h-4 w-4 text-cyan-400" />
                          Code Assembler
                        </h3>
                        <p className="text-[9px] text-zinc-550 text-slate-400 mt-0.5">Ready-to-copy source tree for your local workspace folder</p>
                      </div>
                      <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 border border-cyan-500/20 rounded">
                        Next.js 14
                      </span>
                    </div>

                    {/* File selection badges */}
                    <div className="flex flex-wrap gap-1 mb-4 select-none">
                      {files.map((file) => {
                        const isSelected = selectedFileId === file.id;
                        return (
                          <button
                            key={file.id}
                            onClick={() => setSelectedFileId(file.id)}
                            className={`px-2 py-1 rounded text-[10px] font-mono border transition-all cursor-pointer ${
                              isSelected 
                                ? "bg-emerald-950 text-emerald-300 border-emerald-500/25" 
                                : "bg-slate-950 border-slate-900 text-slate-400 hover:text-slate-200"
                            }`}
                          >
                            <span>{file.path.split("/").pop()}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Code block pre window */}
                    <div className="relative text-left">
                      <div className="absolute top-2.5 right-2 flex items-center gap-1.5 z-10">
                        <button
                          onClick={() => {
                            const targetFile = files.find(f => f.id === selectedFileId);
                            if (targetFile) {
                              handleCopyCode(getRenderedContent(targetFile), targetFile.id);
                            }
                          }}
                          className="px-2.5 py-1 bg-slate-900/90 hover:bg-slate-850 text-white rounded text-[10px] border border-slate-850 transition-all flex items-center gap-1 cursor-pointer"
                        >
                          {copiedFileId === selectedFileId ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-400 font-bold" />
                              <span className="text-emerald-400 font-mono text-[9px] font-bold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3 text-slate-300" />
                              <span className="font-mono text-slate-300">Copy Block</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="bg-slate-950 rounded-xl border border-slate-900 overflow-hidden shadow-2xl">
                        <div className="px-4 py-1.5 bg-slate-900/40 border-b border-slate-900 text-[10px] font-mono text-zinc-400 flex items-center justify-between">
                          <span>{files.find(f => f.id === selectedFileId)?.path}</span>
                        </div>
                        <pre className="p-3 overflow-x-auto max-h-[300px] font-mono text-[10px] text-slate-300 leading-relaxed overflow-y-auto selection:bg-indigo-500/20">
                          <code>{getRenderedContent(files.find(f => f.id === selectedFileId) || files[0])}</code>
                        </pre>
                      </div>
                    </div>
                  </div>

                  {/* Description guide block */}
                  <div className="mt-4 p-3 bg-slate-950 border border-slate-850 rounded-xl flex gap-1.5 items-start text-xs text-left">
                    <BookOpen className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">File Purpose</span>
                      <p className="text-[10.5px] text-slate-400 mt-0.5">
                        {files.find(f => f.id === selectedFileId)?.description}
                      </p>
                    </div>
                  </div>

                </div>
              </section>

              {/* Right Column (xl:col-span-4): Mini Website Sandbox Preview & Assistant */}
              <section className="xl:col-span-4 flex flex-col gap-5" id="right_preview_section">
                <div className="bg-slate-900/50 border border-slate-900 p-5 rounded-2xl flex-grow flex flex-col justify-between">
                  <div className="flex flex-col h-full justify-between">
                    
                    {/* Header bar selectors */}
                    <div className="flex justify-between items-center border-b border-slate-900 pb-3 mb-4 select-none">
                      <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-850">
                        <button
                          onClick={() => setRightPanel("preview")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5 ${
                            rightPanel === "preview"
                              ? "bg-indigo-900/40 text-indigo-200 border border-indigo-500/10"
                              : "text-slate-450 hover:text-slate-200"
                          }`}
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Mini Mobile Sandbox
                        </button>
                        <button
                          onClick={() => setRightPanel("assistant")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5 ${
                            rightPanel === "assistant"
                              ? "bg-indigo-900/40 text-indigo-200 border border-indigo-500/10"
                              : "text-slate-455 hover:text-slate-222 text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
                          Unzip Assistant (AI)
                        </button>
                      </div>

                      <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                    </div>

                    {/* Right Panel Contents scrollable */}
                    <div className="flex-grow overflow-y-auto mb-2 text-left">
                      <AnimatePresence mode="wait">
                        {rightPanel === "preview" ? (
                          <motion.div
                            key="mini-mobile-frame"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="space-y-4"
                          >
                            <div className="bg-slate-950 rounded-xl border border-slate-850 h-[220px] overflow-y-auto p-4 space-y-4 text-[10.5px]">
                              
                              {/* Hero simulation inside small sandbox */}
                              <div className="text-center pb-4 border-b border-slate-900 relative">
                                <h1 className="text-sm font-bold text-white">{profile.fullName}</h1>
                                <p className="text-[9px] text-cyan-400 mt-1 font-mono">{profile.program}</p>
                                <p className="text-[9px] text-slate-500 italic mt-2">"{profile.bio.substring(0, 75)}..."</p>
                              </div>

                              {/* Skills preview mock */}
                              <div className="space-y-1">
                                <span className="text-[8px] font-mono uppercase text-slate-500 block">Strategic Competency Check</span>
                                <div className="grid grid-cols-2 gap-1">
                                  {profile.skills.slice(0, 4).map((skill, index) => (
                                    <div key={index} className="p-1 px-1.5 bg-slate-900 border border-slate-850 text-[8.5px] rounded truncate text-slate-350 flex items-center gap-1">
                                      <span className="h-1 w-1 bg-emerald-400 rounded-full shrink-0"></span>
                                      <span>{skill}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Timelines mini mockup */}
                              <div className="space-y-1.5">
                                <span className="text-[8px] font-mono uppercase text-slate-505 text-slate-550 block text-slate-500">Corporate Milestones</span>
                                {profile.experience.map((exp, idx) => (
                                  <div key={idx} className="p-1.5 bg-slate-900/60 border border-slate-900 rounded">
                                    <div className="flex justify-between font-bold text-[9px] text-slate-200">
                                      <span className="truncate">{exp.role}</span>
                                      <span className="font-mono text-[8px] shrink-0 text-slate-500">{exp.duration.split(" ")[0]}</span>
                                    </div>
                                    <span className="text-[8px] text-indigo-400">{exp.organization}</span>
                                  </div>
                                ))}
                              </div>

                            </div>

                            <p className="text-[10px] text-slate-450 leading-relaxed leading-normal text-slate-500 italic">
                              💡 To customize this mockup live, use the "Customize Biosuite" fields on the left. The compiler integrates changes automatically.
                            </p>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="unzip-ai-chat"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col h-full justify-between"
                          >
                            {/* Message thread inside toolbox */}
                            <div className="h-[210px] overflow-y-auto pr-1 space-y-2 text-xs scrollbar-thin">
                              {chatMessages.map((msg) => (
                                <div key={msg.id} className="space-y-0.5">
                                  <div className="flex justify-between items-center text-[8.5px] font-mono text-slate-500">
                                    <span className={msg.sender === "user" ? "text-cyan-400" : "text-violet-400"}>
                                      {msg.sender === "user" ? "You" : "Setup Assistant"}
                                    </span>
                                  </div>
                                  <div className={`p-2.5 rounded-lg border leading-relaxed text-left ${
                                    msg.sender === "user" 
                                      ? "bg-cyan-950/20 border-cyan-500/10 text-cyan-200" 
                                      : "bg-slate-955 bg-slate-950 border-slate-900 text-slate-350"
                                  }`}>
                                    {msg.text}
                                  </div>
                                </div>
                              ))}
                              {isAiLoading && (
                                <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                                  <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full animate-ping"></span>
                                  <span>Writing custom response...</span>
                                </div>
                              )}
                              <div ref={chatBottomRef}></div>
                            </div>

                            {/* Recommendations query buttons */}
                            <div className="mt-3 space-y-1">
                              <span className="text-[8.5px] font-mono text-zinc-500 block uppercase">Ask about unzipping:</span>
                              <div className="flex flex-col gap-1">
                                {SUGGESTIONS.map((s, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handleSendMessage(s.prompt)}
                                    className="px-2 py-1 bg-slate-950 hover:bg-slate-850 rounded border border-slate-850 text-[9px] text-slate-400 hover:text-white transition-all text-left truncate cursor-pointer"
                                  >
                                    + {s.title}
                                  </button>
                                ))}
                              </div>
                            </div>

                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Text input for AI setup guide chat */}
                    {rightPanel === "assistant" && (
                      <div className="flex gap-1.5 mt-2">
                        <input
                          type="text"
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                          placeholder="How do I unzip and deploy on Vercel?"
                          className="flex-grow bg-slate-950 border border-slate-850 rounded-lg px-2.5 py-1.5 outline-none focus:border-indigo-500 text-xs text-slate-200"
                        />
                        <button
                          onClick={() => handleSendMessage()}
                          className="p-1.5 bg-indigo-950 text-indigo-300 border border-indigo-500/20 rounded-lg hover:bg-indigo-900 transition-all cursor-pointer flex items-center justify-center shrink-0"
                        >
                          <Send className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}

                  </div>
                </div>
              </section>

            </div>
          </motion.div>
        ) : (
          /* VIEW 3: SECURE BACKEND PORTAL */
          <motion.div
            key="backend_view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex-grow flex flex-col p-4 md:p-8 text-left bg-slate-950 w-full space-y-6"
          >
            {/* Dashboard Header Banner */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-xl text-white shadow-lg shadow-emerald-950/40">
                  <Settings className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-xl font-extrabold text-white">MBA Backend Customizer Engine</h1>
                  <p className="text-xs text-emerald-400 font-mono flex items-center gap-1.5 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>SESSION SECURE &bull; CANDIDATE: MANISHA KAMAL</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setViewMode("website")}
                  className="px-4 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Return to Webpage</span>
                </button>
                <button
                  onClick={() => setViewMode("developer")}
                  className="px-4 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-350 hover:text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <Code2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Next.js Source code</span>
                </button>
                <button
                  onClick={() => {
                    setIsAdminAuthorized(false);
                    setViewMode("website");
                  }}
                  className="px-4 py-2 bg-rose-950 hover:bg-rose-900 border border-rose-900/10 text-rose-300 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>Lock Console / Exit</span>
                </button>
              </div>
            </div>

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Essential Toggles & Attributes (Col-Span-4) */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* 1. SECTION VISIBILITY INTERACTIVE CONTROLS */}
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg space-y-4">
                  <h3 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wider pb-2 border-b border-slate-800 flex items-center gap-2">
                    <Sliders className="h-4 w-4 text-emerald-400" />
                    Layout Section Toggles
                  </h3>
                  
                  <div className="space-y-3.5 text-xs text-slate-300">
                    
                    {/* Toggle 1: Academic Background */}
                    <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                      <div>
                        <p className="font-bold font-sans">Academic Foundation</p>
                        <p className="text-[10px] text-slate-500">School & Degree overview</p>
                      </div>
                      <button
                        onClick={() => setShowAcademicBackground(!showAcademicBackground)}
                        className={`w-10 h-5 rounded-full p-0.5 transition-all outline-none cursor-pointer flex ${
                          showAcademicBackground ? "bg-emerald-500 justify-end" : "bg-slate-800 justify-start"
                        }`}
                      >
                        <span className="w-4 h-4 bg-white rounded-full shadow-md"></span>
                      </button>
                    </div>

                    {/* Toggle 2: Skills */}
                    <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                      <div>
                        <p className="font-bold">Specialties Matrix</p>
                        <p className="text-[10px] text-slate-500">Skills chips block</p>
                      </div>
                      <button
                        onClick={() => setShowSkills(!showSkills)}
                        className={`w-10 h-5 rounded-full p-0.5 transition-all outline-none cursor-pointer flex ${
                          showSkills ? "bg-emerald-500 justify-end" : "bg-slate-800 justify-start"
                        }`}
                      >
                        <span className="w-4 h-4 bg-white rounded-full shadow-md"></span>
                      </button>
                    </div>

                    {/* Toggle 3: Experiences */}
                    <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                      <div>
                        <p className="font-bold">Professional Trajectory</p>
                        <p className="text-[10px] text-slate-500">Milestone timeline blocks</p>
                      </div>
                      <button
                        onClick={() => setShowExperience(!showExperience)}
                        className={`w-10 h-5 rounded-full p-0.5 transition-all outline-none cursor-pointer flex ${
                          showExperience ? "bg-emerald-500 justify-end" : "bg-slate-800 justify-start"
                        }`}
                      >
                        <span className="w-4 h-4 bg-white rounded-full shadow-md"></span>
                      </button>
                    </div>

                    {/* Toggle 4: Projects */}
                    <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                      <div>
                        <p className="font-bold">Strategic Initiatives</p>
                        <p className="text-[10px] text-slate-500">Academic projects & study cases</p>
                      </div>
                      <button
                        onClick={() => setShowProjects(!showProjects)}
                        className={`w-10 h-5 rounded-full p-0.5 transition-all outline-none cursor-pointer flex ${
                          showProjects ? "bg-emerald-500 justify-end" : "bg-slate-800 justify-start"
                        }`}
                      >
                        <span className="w-4 h-4 bg-white rounded-full shadow-md"></span>
                      </button>
                    </div>

                    {/* Toggle 5: Contacts */}
                    <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                      <div>
                        <p className="font-bold">Interactive Enquiries Form</p>
                        <p className="text-[10px] text-slate-500">Contact simulators</p>
                      </div>
                      <button
                        onClick={() => setShowContactForm(!showContactForm)}
                        className={`w-10 h-5 rounded-full p-0.5 transition-all outline-none cursor-pointer flex ${
                          showContactForm ? "bg-emerald-500 justify-end" : "bg-slate-800 justify-start"
                        }`}
                      >
                        <span className="w-4 h-4 bg-white rounded-full shadow-md"></span>
                      </button>
                    </div>

                  </div>
                </div>

                {/* 2. CORE BIODATA ATTRIBUTES */}
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg space-y-4">
                  <h3 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wider pb-2 border-b border-slate-800 flex items-center gap-2">
                    <Award className="h-4 w-4 text-emerald-400" />
                    Essential Metadata
                  </h3>
                  
                  <div className="space-y-3.5 text-xs text-slate-300">
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-500 uppercase">Full Name</label>
                      <input
                        type="text"
                        value={profile.fullName}
                        onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-550 text-slate-500 uppercase">Education Coordinates</label>
                      <input
                        type="text"
                        value={profile.university}
                        onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-500 uppercase">MBA Program Title</label>
                      <input
                        type="text"
                        value={profile.program}
                        onChange={(e) => setProfile({ ...profile, program: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-slate-500 uppercase">Specialization</label>
                        <input
                          type="text"
                          value={profile.specialization}
                          onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white outline-none focus:border-emerald-500 font-semibold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-slate-500 uppercase">Graduation Year</label>
                        <input
                          type="text"
                          value={profile.graduationYear}
                          onChange={(e) => setProfile({ ...profile, graduationYear: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white tracking-widest font-mono outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-500 uppercase">Corporate Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-emerald-500 font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Career Outline / Bio</label>
                      <textarea
                        rows={4}
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-slate-300 leading-relaxed outline-none focus:border-emerald-500"
                      />
                    </div>

                  </div>
                </div>

              </div>

              {/* Right Column: Experience timelines and Projects (Col-Span-8) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* 3. PROFESSIONAL MILESTONES (EXPERIENCE BUILDER) */}
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <h3 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wide flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-cyan-400" />
                      Trajectory Milestones Timeline
                    </h3>
                    <button
                      type="button"
                      onClick={handleAddExperience}
                      className="px-2.5 py-1 bg-gradient-to-r from-cyan-600 to-indigo-650 justify-center text-[11px] font-bold border border-indigo-500/20 text-white rounded hover:text-cyan-200 flex items-center gap-1 cursor-pointer transition-all"
                    >
                      <Plus className="h-3 w-3" />
                      Add Milestone
                    </button>
                  </div>

                  <div className="space-y-4">
                    {profile.experience.length === 0 ? (
                      <div className="text-center py-6 text-xs text-slate-500 font-mono">
                        No milestone timeline segments present. Click "Add Milestone" to populate strategic experiences.
                      </div>
                    ) : (
                      profile.experience.map((exp, idx) => (
                        <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 relative space-y-3">
                          <button type="button" className="absolute top-2.5 right-2 px-1.5 py-1 bg-red-950/20 border border-red-500/10 rounded flex items-center justify-center text-red-400 hover:bg-rose-900/40 transition-all cursor-pointer" onClick={() => handleRemoveExperience(idx)}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="space-y-0.5">
                              <span className="text-[9px] uppercase font-mono text-slate-500">Corporate Role / Title</span>
                              <input
                                type="text"
                                value={exp.role}
                                onChange={(e) => handleExperienceFieldUpdate(idx, "role", e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white font-bold outline-none focus:border-cyan-500"
                              />
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-[9px] uppercase font-mono text-slate-500">Organization</span>
                              <input
                                type="text"
                                value={exp.organization}
                                onChange={(e) => handleExperienceFieldUpdate(idx, "organization", e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-indigo-300 font-semibold outline-none focus:border-cyan-500"
                              />
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-[9px] uppercase font-mono text-slate-500">Duration Range</span>
                              <input
                                type="text"
                                value={exp.duration}
                                onChange={(e) => handleExperienceFieldUpdate(idx, "duration", e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-350 outline-none focus:border-cyan-500 font-mono"
                              />
                            </div>
                          </div>

                          <div className="space-y-0.5">
                            <span className="text-[9px] uppercase font-mono text-slate-500">Activity Outline Detail</span>
                            <textarea
                              rows={2}
                              value={exp.description}
                              onChange={(e) => handleExperienceFieldUpdate(idx, "description", e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-300 leading-normal outline-none focus:border-cyan-500"
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* 4. STRATEGIC INITIATIVES & ACADEMIC CASES */}
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800 font-bold">
                    <h3 className="text-sm font-mono text-slate-300 uppercase tracking-wider flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-rose-400" />
                      Academic Case Studies & Strategic Initiatives
                    </h3>
                    <button
                      type="button"
                      onClick={handleAddProject}
                      className="px-2.5 py-1 bg-gradient-to-r from-rose-600 to-indigo-650 justify-center text-[11px] font-bold border border-rose-500/20 text-white rounded hover:text-rose-200 flex items-center gap-1 cursor-pointer transition-all"
                    >
                      <Plus className="h-3 w-3" />
                      Add Case Analysis
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {profile.projects.length === 0 ? (
                      <div className="text-center py-6 text-xs text-slate-500 font-mono">
                        No strategic case initiatives defined. Click "Add Case Analysis" to initiate.
                      </div>
                    ) : (
                      profile.projects.map((proj, idx) => (
                        <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 relative space-y-3">
                          <button type="button" className="absolute top-2.5 right-2 px-1.5 py-1 bg-red-950/20 border border-red-500/10 rounded flex items-center justify-center text-red-400 hover:bg-rose-900/40 transition-all cursor-pointer" onClick={() => handleRemoveProject(idx)}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-0.5">
                              <span className="text-[9px] uppercase font-mono text-slate-500 font-bold">Project Headline Title</span>
                              <input
                                type="text"
                                value={proj.title}
                                onChange={(e) => handleProjectFieldUpdate(idx, "title", e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white outline-none focus:border-rose-500"
                              />
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-[9px] uppercase font-mono text-slate-500">Case Taxonomy / Tag</span>
                              <input
                                type="text"
                                value={proj.tag}
                                onChange={(e) => handleProjectFieldUpdate(idx, "tag", e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-350 outline-none focus:border-rose-500 font-semibold"
                              />
                            </div>
                          </div>

                          <div className="space-y-0.5">
                            <span className="text-[9px] uppercase font-mono text-slate-500">Problem Hypothesis & Findings</span>
                            <textarea
                              rows={2}
                              value={proj.desc}
                              onChange={(e) => handleProjectFieldUpdate(idx, "desc", e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-300 leading-normal outline-none focus:border-rose-500"
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* 5. DYNAMIC CHIPS COMPETENCIES */}
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg space-y-4">
                  <h3 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <Award className="h-4 w-4 text-emerald-400" />
                    Key Specialties & Interactive Chip Competencies
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-1.5 px-3 py-1 bg-slate-950 border border-slate-800 rounded-full text-xs text-cyan-300">
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => setProfile({ ...profile, skills: profile.skills.filter((_, i) => i !== index) })}
                          className="h-3.5 w-3.5 rounded-full hover:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-white cursor-pointer leading-none text-center font-bold text-lg"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 text-xs">
                    <input
                      type="text"
                      placeholder="Add another competence (e.g., Financial Modeling)"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && newSkill.trim()) {
                          setProfile({ ...profile, skills: [...profile.skills, newSkill.trim()] });
                          setNewSkill("");
                        }
                      }}
                      className="flex-grow bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newSkill.trim()) {
                          setProfile({ ...profile, skills: [...profile.skills, newSkill.trim()] });
                          setNewSkill("");
                        }
                      }}
                      className="px-4 py-2 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-200 rounded-lg font-mono tracking-wide hover:text-white cursor-pointer"
                    >
                      + Add Chip
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Password Verification Modal overlay */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl relative text-left"
          >
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
              <div className="p-2 bg-indigo-950 text-indigo-400 rounded-lg">
                <Lock className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Backend Portal Access</h3>
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest leading-none block mt-0.5">Security Gateway</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Please enter the security password to unlock the backend biodata management console.
              <span className="text-cyan-400 font-semibold mt-1 font-mono text-[11px] block">Hint: Default passcode is "1212"</span>
            </p>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (passwordInput === "1212") {
                setIsAdminAuthorized(true);
                setShowLoginModal(false);
                setPasswordError("");
                setPasswordInput("");
                setViewMode("backend");
              } else {
                setPasswordError("Incorrect passcode. Try again!");
              }
            }} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-mono tracking-wider text-slate-500 font-bold">Passcode Pin</label>
                <input 
                  type="password"
                  autoFocus
                  placeholder="••••"
                  maxLength={4}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white tracking-widest font-mono text-center outline-none focus:border-indigo-500"
                />
              </div>

              {passwordError && (
                <p className="text-[10.5px] text-rose-400 font-semibold bg-rose-950/20 border border-rose-500/10 p-2 rounded-lg leading-relaxed text-center">
                  ⚠️ {passwordError}
                </p>
              )}

              <div className="flex justify-end gap-2 pt-2 text-xs">
                <button 
                  type="button" 
                  onClick={() => {
                    setShowLoginModal(false);
                    setPasswordError("");
                    setPasswordInput("");
                  }}
                  className="px-4 py-2 bg-slate-950 border border-slate-800 text-slate-350 hover:text-white rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-indigo-650 justify-center bg-indigo-900/60 hover:bg-emerald-600 hover:text-slate-955 text-slate-200 font-bold border border-indigo-500/20 rounded-lg flex items-center gap-1.5 cursor-pointer text-white"
                >
                  Unlock Editor
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}
