import {
  Bot,
  FileSearch,
  FileText,
  GraduationCap,
  ScanSearch,
  Sparkles
} from "lucide-react";

export const onboardingSlides = [
  {
    title: "Humanize AI text",
    description: "Turn robotic drafts into natural, polished writing for academic and professional use.",
    icon: Sparkles
  },
  {
    title: "Rewrite with clarity",
    description: "Paraphrase ideas in different tones while keeping intent and structure intact.",
    icon: Bot
  },
  {
    title: "Scan for originality",
    description: "Review similarity signals, matched sources, and export clean reports in a few taps.",
    icon: ScanSearch
  }
];

export const toolCards = [
  {
    title: "AI Humanizer",
    description: "Make AI writing sound natural and confident.",
    icon: Sparkles,
    path: "/tools/humanizer",
    accent: "from-fuchsia-500/30 to-cyan-400/20"
  },
  {
    title: "Paraphraser",
    description: "Rewrite text in multiple tones and lengths.",
    icon: Bot,
    path: "/tools/paraphraser",
    accent: "from-violet-500/30 to-blue-500/20"
  },
  {
    title: "Resume Builder",
    description: "Build ATS-friendly resumes with guided steps.",
    icon: GraduationCap,
    path: "/resume/builder",
    accent: "from-cyan-500/25 to-indigo-500/20"
  },
  {
    title: "Grammar Checker",
    description: "Catch grammar issues and readability gaps fast.",
    icon: FileText,
    path: "/tools/grammar",
    accent: "from-sky-500/25 to-violet-500/20"
  },
  {
    title: "Templates",
    description: "Research structures, outlines, and writing frameworks.",
    icon: FileSearch,
    path: "/templates",
    accent: "from-cyan-500/20 to-emerald-400/20"
  },
  {
    title: "Plagiarism Checker",
    description: "Check similarity and review matched sources.",
    icon: ScanSearch,
    path: "/tools/plagiarism",
    accent: "from-rose-500/20 to-orange-400/20"
  }
];

export const stats = [
  { label: "Words Processed", value: "18.2K" },
  { label: "AI Requests", value: "126" },
  { label: "Scans", value: "22" },
  { label: "Credits Left", value: "84" }
];

export const recentActivity = [
  { title: "Scholarship essay rewrite", type: "Paraphraser", time: "12 min ago" },
  { title: "Literature review template", type: "Template", time: "Yesterday" },
  { title: "Data analyst resume", type: "Resume", time: "2 days ago" }
];

export const templateCategories = [
  "All",
  "Research Proposal",
  "Literature Review",
  "Thesis Outline",
  "Abstract",
  "Citation Format",
  "Project Report",
  "Resume"
];

export const pricingPlans = [
  {
    name: "Student Plan",
    price: "₹29",
    cycle: "/month",
    recommended: false,
    features: ["AI humanizer", "Paraphraser", "Grammar checks", "Basic templates"]
  },
  {
    name: "Premium Plan",
    price: "₹49",
    cycle: "/month",
    recommended: true,
    features: ["Everything in Student", "Plagiarism reports", "Premium templates", "Priority exports"]
  }
];

export const resumeSteps = [
  "Personal",
  "Education",
  "Experience",
  "Skills",
  "Projects",
  "Certificates",
  "Review"
];

