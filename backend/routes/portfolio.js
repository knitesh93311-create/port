const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/auth');

// Helper to get or create the single portfolio configuration document
const getPortfolioDocument = async () => {
  let portfolio = await Portfolio.findOne();
  if (!portfolio) {
    portfolio = new Portfolio({
      personalInfo: {
        name: "Nitesh Kumar",
        title: "Full Stack MERN Developer",
        tagline: "Building Scalable Digital Products With MERN Stack",
        bio: "I design and develop modern, responsive, and high-performance web applications using MongoDB, Express.js, React.js, and Node.js with a strong focus on user experience, scalability, and clean architecture.",
        email: "niteshkumar.dev.mern@gmail.com",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        location: "Bangalore, India",
        availability: "Available For Full-Time Opportunities",
        resumeUrl: "/resume.pdf",
        heroImage: "",
        aboutImage: ""
      },
      aboutStats: [
        { id: 1, label: "Projects Completed", value: 20 },
        { id: 2, label: "Technologies Mastered", value: 15 },
        { id: 3, label: "GitHub Repositories", value: 50 },
        { id: 4, label: "Hours of Coding", value: 1000 }
      ],
      skillsData: {
        frontend: [
          { name: "React.js", level: 95, iconName: "FaReact" },
          { name: "JavaScript (ES6+)", level: 90, iconName: "SiJavascript" },
          { name: "Tailwind CSS", level: 95, iconName: "SiTailwindcss" },
          { name: "HTML5", level: 95, iconName: "SiHtml5" },
          { name: "CSS3 / Sass", level: 88, iconName: "SiCss" }
        ],
        backend: [
          { name: "Node.js", level: 92, iconName: "FaNodeJs" },
          { name: "Express.js", level: 90, iconName: "SiExpress" },
          { name: "REST APIs", level: 95, iconName: "FaServer" },
          { name: "Next.js", level: 85, iconName: "SiNextdotjs" }
        ],
        database: [
          { name: "MongoDB", level: 90, iconName: "SiMongodb" },
          { name: "MySQL", level: 80, iconName: "SiMysql" },
          { name: "Redis", level: 75, iconName: "FaDatabase" }
        ],
        tools: [
          { name: "Git & GitHub", level: 92, iconName: "FaGithub" },
          { name: "Postman", level: 95, iconName: "SiPostman" },
          { name: "Docker", level: 78, iconName: "FaDocker" },
          { name: "Firebase", level: 85, iconName: "SiFirebase" }
        ]
      },
      experienceTimeline: [
        {
          id: 1,
          role: "Full Stack MERN Developer (Intern)",
          company: "Tech Mahindra / Start-up Incubator",
          period: "June 2025 - Nov 2025",
          type: "Internship Experience",
          description: "Developed and optimized key features for high-traffic client websites. Built secure authentication, managed database migrations, and redesigned core dashboard components which reduced load times by 35%.",
          color: "border-blue-500",
          iconName: "FaBriefcase"
        },
        {
          id: 2,
          role: "Full Stack Developer",
          company: "Upwork & Freelance Client Projects",
          period: "Dec 2025 - Present",
          type: "Freelance Work",
          description: "Delivered 10+ custom web applications for international startups. Designed custom REST APIs, automated workflows with third-party webhooks, and integrated secure payment processing with Stripe.",
          color: "border-cyan-500",
          iconName: "FaCode"
        },
        {
          id: 3,
          role: "Open Source Contributor",
          company: "GitHub / Community Projects",
          period: "Ongoing",
          type: "Open Source Contributions",
          description: "Contributed components, documentation fixes, and accessibility audits to popular UI libraries and developer utility toolkits. Maintained a repository of highly reusable MERN boilerplates with 200+ stars.",
          color: "border-emerald-500",
          iconName: "FaGithub"
        },
        {
          id: 4,
          role: "Advanced MERN Specialist Certification",
          company: "Coding Academy / Online",
          period: "2024 - 2025",
          type: "Training & Certifications",
          description: "Completed rigorous 600-hour professional developer track focusing on backend design patterns, microservices architecture, and state management optimization.",
          color: "border-purple-500",
          iconName: "FaGraduationCap"
        }
      ],
      servicesData: [
        { title: "Full Stack Development", description: "End-to-end development of robust, responsive, and secure web applications using React on the front end and Node/Express on the back end.", iconName: "FaCode" },
        { title: "Frontend Development", description: "Pixel-perfect, accessible, and fast web UI development using modern React hooks, state management (Redux/Zustand), and interactive styles.", iconName: "FaReact" },
        { title: "Backend Development", description: "Constructing modular and maintainable server-side logic utilizing Clean Architecture, express routing, middleware, and secure authentication.", iconName: "FaServer" },
        { title: "REST API Development", description: "Designing structured, documented (OpenAPI/Swagger), and highly performant RESTful endpoints supporting pagination, search, and filtering.", iconName: "FaCode" },
        { title: "Database Design", description: "Developing optimized schema diagrams for MongoDB (NoSQL) and MySQL, indexing fields for query speed, and implementing transactional safety.", iconName: "FaDatabase" },
        { title: "Website Optimization", description: "Enhancing Lighthouse metrics to 95+ through server-side optimizations, image compression, asset caching, code-splitting, and render tuning.", iconName: "FaSearchPlus" }
      ],
      testimonialsData: [
        { id: 1, name: "Vikram R.", role: "Lead Software Architect, Product Startup", feedback: "Nitesh delivered a highly performant admin panel using React and Express. His approach to code structures was incredibly clean, following best practices that made integrating his modules into our main codebase effortless.", image: "/images/testimonials/user-1.jpg" },
        { id: 2, name: "Sarah Jenkins", role: "Co-Founder, EdTech Platform", feedback: "Working with Nitesh was a fantastic experience. He built our LMS portal ahead of schedule, solved complex video streaming latency issues, and designed an interface that our students absolutely love. 10/10 recommendation!", image: "/images/testimonials/user-2.jpg" },
        { id: 3, name: "Amit K.", role: "Senior Engineering Manager", feedback: "During his internship, Nitesh demonstrated technical maturity beyond his years. He tackled deep database modeling challenges and redesigned a legacy REST API route structure with remarkable autonomy. He will be a strong asset to any engineering team.", image: "/images/testimonials/user-3.jpg" }
      ]
    });
    await portfolio.save();
  }
  return portfolio;
};

// @route   GET /api/portfolio
// @desc    Get active portfolio settings
// @access  Public
router.get('/', async (req, res) => {
  try {
    const portfolio = await getPortfolioDocument();
    res.json(portfolio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/portfolio
// @desc    Update portfolio details (all or specific sub-fields)
// @access  Private
router.put('/', auth, async (req, res) => {
  try {
    let portfolio = await getPortfolioDocument();
    const updateData = req.body;

    // Direct object key merges
    if (updateData.personalInfo) portfolio.personalInfo = { ...portfolio.personalInfo, ...updateData.personalInfo };
    if (updateData.aboutStats) portfolio.aboutStats = updateData.aboutStats;
    if (updateData.skillsData) portfolio.skillsData = updateData.skillsData;
    if (updateData.experienceTimeline) portfolio.experienceTimeline = updateData.experienceTimeline;
    if (updateData.servicesData) portfolio.servicesData = updateData.servicesData;
    if (updateData.testimonialsData) portfolio.testimonialsData = updateData.testimonialsData;

    await portfolio.save();
    res.json(portfolio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
