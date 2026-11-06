import {
  Atom,
  Binary,
  BrainCircuit,
  Braces,
  Code2,
  FileCode2,
  GitBranch,
  Github,
  LineChart,
  Palette,
  PieChart,
  Server,
  Sigma,
  Terminal,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export const profile = {
  firstName: "Avula",
  lastName: "Vamshidhar",
  fullName: "Avula Vamshidhar",
  initials: "AV",
  role: "Software Developer | Data Science Student",
  tagline: "Turning ideas into intelligent digital experiences.",
  location: "Hyderabad, India",
  timeZone: "Asia/Kolkata",
  email: "vamshib986@gmail.com",
  phone: "+91 80743 50349",
  github: "https://github.com/AvulaVamshidhar",
  linkedin:
    "https://www.linkedin.com/in/avula-vamshidhar-414694330",
  resume: "/avula-vamshidhar-resume.pdf",
  availability: "Available for opportunities",
  about:
    "I'm Vamshidhar — a developer combining a strong foundation in algorithms with hands-on experience across full-stack development and data science. I enjoy building practical applications, exploring intelligent systems, solving problems, and experimenting with modern developer technologies.",
  aboutSecondary:
    "My work sits where software engineering meets data: FastAPI services, OCR pipelines, statistical modelling and interfaces that make complex information feel obvious. I care about clean code, algorithmic efficiency, and shipping things people can actually use.",
  currentFocus: "Full-stack development · Applied data science · Developer tooling",
} as const;

export const sectionIds = [
  "home",
  "about",
  "skills",
  "projects",
  "resume",
  "contact",
] as const;

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export type SkillCategory = "programming" | "web" | "data" | "tools";

export interface Skill {
  name: string;
  category: SkillCategory;
  icon: LucideIcon;
  kind: string;
}

export const skillCategories: {
  id: SkillCategory | "all";
  label: string;
}[] = [
  { id: "all", label: "All" },
  { id: "programming", label: "Programming" },
  { id: "web", label: "Web Development" },
  { id: "data", label: "Data Science" },
  { id: "tools", label: "Tools" },
];

export const skills: Skill[] = [
  { name: "Python", category: "programming", icon: Code2, kind: "Language" },
  { name: "C", category: "programming", icon: Binary, kind: "Language" },
  { name: "JavaScript", category: "programming", icon: Braces, kind: "Language" },
  { name: "R", category: "programming", icon: Sigma, kind: "Language" },

  { name: "HTML", category: "web", icon: FileCode2, kind: "Markup" },
  { name: "CSS", category: "web", icon: Palette, kind: "Styling" },
  { name: "React", category: "web", icon: Atom, kind: "Frontend" },
  { name: "Node.js", category: "web", icon: Server, kind: "Backend" },

  { name: "Data Analysis", category: "data", icon: LineChart, kind: "Practice" },
  { name: "Statistics", category: "data", icon: TrendingUp, kind: "Foundation" },
  { name: "Data Visualization", category: "data", icon: PieChart, kind: "Practice" },
  {
    name: "Machine Learning",
    category: "data",
    icon: BrainCircuit,
    kind: "Fundamentals",
  },

  { name: "Git", category: "tools", icon: GitBranch, kind: "Version control" },
  { name: "GitHub", category: "tools", icon: Github, kind: "Collaboration" },
  { name: "VS Code", category: "tools", icon: Code2, kind: "Editor" },
  { name: "Kali Linux", category: "tools", icon: Terminal, kind: "Environment" },
];

export type ProjectMock = "docuhealth" | "fileshare";

export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  highlights: string[];
  tech: string[];
  mock: ProjectMock;
  github: string | null;
  demo: string | null;
}

export const projects: Project[] = [
  {
    id: "docuhealth",
    index: "01",
    title: "DocuHealth AI",
    subtitle: "Clinical Report Analyzer & Patient Health Literacy Engine",
    category: "Healthcare · Applied AI",
    description:
      "An AI-powered healthcare application that processes medical reports and converts technical medical information into easy-to-understand insights.",
    highlights: [
      "Multimodal ingestion of PDFs, images and text with OCR extraction",
      "Biomarker parsing against clinical reference ranges",
      "Plain-language explanations plus questions to ask your doctor",
    ],
    tech: ["Python", "FastAPI", "OCR", "Tesseract", "REST API", "HTML", "CSS"],
    mock: "docuhealth",
    github: null,
    demo: null,
  },
  {
    id: "fileshare",
    index: "02",
    title: "File Sharing Web Application",
    subtitle: "Temporary, link-based file sharing",
    category: "Full-stack · Product",
    description:
      "A modern file-sharing application allowing users to upload files and generate shareable download links — no account required, with uploads that expire automatically after 24 hours.",
    highlights: [
      "Drag-and-drop uploads with a unique link for every file",
      "Direct downloads through the shared link, no sign-up needed",
      "Automatic 24-hour expiry keeps storage and privacy in check",
    ],
    tech: ["React", "Node.js", "JavaScript", "Vercel Blob"],
    mock: "fileshare",
    github: null,
    demo: null,
  },
];

export const education = [
  {
    institution: "Gurunanak Institutions of Technical Campus",
    program: "B.Tech — Computer Science Engineering (Data Science)",
    detail: "3rd year · CGPA 7.72",
    status: "In progress",
  },
  {
    institution: "Vagdevi Junior College",
    program: "Intermediate",
    detail: "Grade 7.78",
    status: "Completed",
  },
  {
    institution: "Providence High School",
    program: "10th Standard",
    detail: "Grade 9.2",
    status: "Completed",
  },
];

export const certifications = [
  {
    name: "MongoDB",
    issuer: "GeeksforGeeks",
    year: "2026",
    href: "https://www.credly.com/badges/56ae2070-a007-4b9f-85fd-d59c7566734a/public_url",
  },
  {
    name: "IBM Data Fundamentals",
    issuer: "IBM",
    year: "2026",
    href: null,
  },
];

export const interests = [
  "Algorithms",
  "Data visualisation",
  "Health tech",
  "OCR & document AI",
  "Statistics",
  "Developer tooling",
];
