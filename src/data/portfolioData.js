// Portfolio Data for Nitesh Kumar - Senior MERN Stack Developer

import { 
  FaReact, FaNodeJs, FaDocker, FaGitAlt, FaGithub, FaAws, FaDatabase, FaServer, FaCode,
  FaMobileAlt, FaSearchPlus, FaBrain, FaShoppingBag, FaComments, FaBriefcase, FaGraduationCap
} from 'react-icons/fa';
import { 
  SiMongodb, SiExpress, SiRedux, SiTailwindcss, SiPostman, SiFirebase, SiMysql,
  SiJavascript, SiHtml5, SiCss, SiNextdotjs, SiTypescript, SiGraphql
} from 'react-icons/si';

export const personalInfo = {
  name: "Nitesh Kumar",
  title: "Full Stack MERN Developer",
  tagline: "Building Scalable Digital Products With MERN Stack",
  bio: "I design and develop modern, responsive, and high-performance web applications using MongoDB, Express.js, React.js, and Node.js with a strong focus on user experience, scalability, and clean architecture.",
  email: "niteshkumar.dev.mern@gmail.com", // Professional placeholder email
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  location: "Bangalore, India",
  availability: "Available For Full-Time Opportunities",
};

export const trustedTechnologies = [
  { name: "React.js", icon: FaReact, color: "text-[#61DAFB]" },
  { name: "Node.js", icon: FaNodeJs, color: "text-[#339933]" },
  { name: "MongoDB", icon: SiMongodb, color: "text-[#47A248]" },
  { name: "Express.js", icon: SiExpress, color: "text-[#000000]" },
  { name: "Redux", icon: SiRedux, color: "text-[#764ABC]" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#06B6D4]" },
  { name: "Docker", icon: FaDocker, color: "text-[#2496ED]" },
  { name: "Git", icon: FaGitAlt, color: "text-[#F05032]" },
  { name: "GitHub", icon: FaGithub, color: "text-[#181717]" },
  { name: "Postman", icon: SiPostman, color: "text-[#FF6C37]" },
  { name: "Firebase", icon: SiFirebase, color: "text-[#FFCA28]" }
];

export const aboutStats = [
  { id: 1, label: "Projects Completed", value: 20 },
  { id: 2, label: "Technologies Mastered", value: 15 },
  { id: 3, label: "GitHub Repositories", value: 50 },
  { id: 4, label: "Hours of Coding", value: 1000 }
];

export const skillsData = {
  frontend: [
    { name: "React.js", level: 95, icon: FaReact },
    { name: "JavaScript (ES6+)", level: 90, icon: SiJavascript },
    { name: "Tailwind CSS", level: 95, icon: SiTailwindcss },
    { name: "HTML5", level: 95, icon: SiHtml5 },
    { name: "CSS3 / Sass", level: 88, icon: SiCss }
  ],
  backend: [
    { name: "Node.js", level: 92, icon: FaNodeJs },
    { name: "Express.js", level: 90, icon: SiExpress },
    { name: "REST APIs", level: 95, icon: FaServer },
    { name: "Next.js", level: 85, icon: SiNextdotjs }
  ],
  database: [
    { name: "MongoDB", level: 90, icon: SiMongodb },
    { name: "MySQL", level: 80, icon: SiMysql },
    { name: "Redis", level: 75, icon: FaDatabase }
  ],
  tools: [
    { name: "Git & GitHub", level: 92, icon: FaGithub },
    { name: "Postman", level: 95, icon: SiPostman },
    { name: "Docker", level: 78, icon: FaDocker },
    { name: "Firebase", level: 85, icon: SiFirebase }
  ]
};

export const projectsData = [
  {
    id: 1,
    title: "AI Interview Platform",
    description: "An enterprise-grade SaaS application that uses Gemini/OpenAI models to conduct mock technical interviews. Includes real-time speech-to-text, automated behavioral & coding analysis, custom feedback reports, and interactive performance tracking.",
    thumbnail: "/images/projects/ai-interview.png",
    techStack: ["Next.js", "React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Gemini API"],
    githubUrl: "https://github.com",
    liveUrl: "https://github.com"
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "A production-ready multi-vendor marketplace featuring product search with fuzzy logic, stripe payment gateway integration, advanced admin dashboard with analytics charts, dynamic product variations, and role-based access control.",
    thumbnail: "/images/projects/ecommerce.png",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Redux Toolkit", "Tailwind CSS", "Stripe API"],
    githubUrl: "https://github.com",
    liveUrl: "https://github.com"
  },
  {
    id: 3,
    title: "Real-Time Chat Application",
    description: "A high-performance chat system supporting public/private channels, real-time typing indicators, read receipts, media sharing, offline message caching, and encrypted messages powered by WebSocket & WebRTC.",
    thumbnail: "/images/projects/chat-app.png",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "Tailwind CSS", "WebRTC"],
    githubUrl: "https://github.com",
    liveUrl: "https://github.com"
  },
  {
    id: 4,
    title: "Enterprise Job Portal",
    description: "An ATS-optimized job board connecting companies with developers. Features resume parsing, smart job recommendations based on skills, internal application tracking system (Kanban board), and automated email notifications.",
    thumbnail: "/images/projects/job-portal.png",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Nodemailer", "Cloudinary"],
    githubUrl: "https://github.com",
    liveUrl: "https://github.com"
  },
  {
    id: 5,
    title: "Learning Management System",
    description: "An educational platform supporting video streaming, student progress tracking, quizzes with automatic grading, course creation dashboard for instructors, certificate generation, and online community forums.",
    thumbnail: "/images/projects/lms.png",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Mux Video", "Tailwind CSS", "PDFKit"],
    githubUrl: "https://github.com",
    liveUrl: "https://github.com"
  },
  {
    id: 6,
    title: "Project Management Dashboard",
    description: "A collaborative workspace tool with interactive Gantt charts, real-time board sync, sprint planning capability, workload distributions, calendar integrations, and custom notification systems.",
    thumbnail: "/images/projects/dashboard.png",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Framer Motion", "Socket.io"],
    githubUrl: "https://github.com",
    liveUrl: "https://github.com"
  }
];

export const experienceTimeline = [
  {
    id: 1,
    role: "Full Stack MERN Developer (Intern)",
    company: "Tech Mahindra / Start-up Incubator",
    period: "June 2025 - Nov 2025",
    type: "Internship Experience",
    description: "Developed and optimized key features for high-traffic client websites. Built secure authentication, managed database migrations, and redesigned core dashboard components which reduced load times by 35%.",
    color: "border-blue-500",
    icon: FaBriefcase
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Upwork & Freelance Client Projects",
    period: "Dec 2025 - Present",
    type: "Freelance Work",
    description: "Delivered 10+ custom web applications for international startups. Designed custom REST APIs, automated workflows with third-party webhooks, and integrated secure payment processing with Stripe.",
    color: "border-cyan-500",
    icon: FaCode
  },
  {
    id: 3,
    role: "Open Source Contributor",
    company: "GitHub / Community Projects",
    period: "Ongoing",
    type: "Open Source Contributions",
    description: "Contributed components, documentation fixes, and accessibility audits to popular UI libraries and developer utility toolkits. Maintained a repository of highly reusable MERN boilerplates with 200+ stars.",
    color: "border-emerald-500",
    icon: FaGithub
  },
  {
    id: 4,
    role: "Advanced MERN Specialist Certification",
    company: "Coding Academy / Online",
    period: "2024 - 2025",
    type: "Training & Certifications",
    description: "Completed rigorous 600-hour professional developer track focusing on backend design patterns, microservices architecture, and state management optimization.",
    color: "border-purple-500",
    icon: FaGraduationCap
  }
];

export const servicesData = [
  {
    title: "Full Stack Development",
    description: "End-to-end development of robust, responsive, and secure web applications using React on the front end and Node/Express on the back end.",
    icon: FaCode
  },
  {
    title: "Frontend Development",
    description: "Pixel-perfect, accessible, and fast web UI development using modern React hooks, state management (Redux/Zustand), and interactive styles.",
    icon: FaReact
  },
  {
    title: "Backend Development",
    description: "Constructing modular and maintainable server-side logic utilizing Clean Architecture, express routing, middleware, and secure authentication.",
    icon: FaServer
  },
  {
    title: "REST API Development",
    description: "Designing structured, documented (OpenAPI/Swagger), and highly performant RESTful endpoints supporting pagination, search, and filtering.",
    icon: FaCode
  },
  {
    title: "Database Design",
    description: "Developing optimized schema diagrams for MongoDB (NoSQL) and MySQL, indexing fields for query speed, and implementing transactional safety.",
    icon: FaDatabase
  },
  {
    title: "Website Optimization",
    description: "Enhancing Lighthouse metrics to 95+ through server-side optimizations, image compression, asset caching, code-splitting, and render tuning.",
    icon: FaSearchPlus
  }
];

export const testimonialsData = [
  {
    id: 1,
    name: "Vikram R.",
    role: "Lead Software Architect, Product Startup",
    feedback: "Nitesh delivered a highly performant admin panel using React and Express. His approach to code structures was incredibly clean, following best practices that made integrating his modules into our main codebase effortless.",
    image: "/images/testimonials/user-1.jpg"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Co-Founder, EdTech Platform",
    feedback: "Working with Nitesh was a fantastic experience. He built our LMS portal ahead of schedule, solved complex video streaming latency issues, and designed an interface that our students absolutely love. 10/10 recommendation!",
    image: "/images/testimonials/user-2.jpg"
  },
  {
    id: 3,
    name: "Amit K.",
    role: "Senior Engineering Manager",
    feedback: "During his internship, Nitesh demonstrated technical maturity beyond his years. He tackled deep database modeling challenges and redesigned a legacy REST API route structure with remarkable autonomy. He will be a strong asset to any engineering team.",
    image: "/images/testimonials/user-3.jpg"
  }
];
