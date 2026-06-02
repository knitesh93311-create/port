const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');

// Initial projects fallback seeding data
const defaultProjects = [
  {
    title: "AI Interview Platform",
    description: "An enterprise-grade SaaS application that uses Gemini/OpenAI models to conduct mock technical interviews. Includes real-time speech-to-text, automated behavioral & coding analysis, custom feedback reports, and interactive performance tracking.",
    techStack: ["Next.js", "React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Gemini API"],
    githubUrl: "https://github.com",
    liveUrl: "https://github.com",
    thumbnail: ""
  },
  {
    title: "E-Commerce Platform",
    description: "A production-ready multi-vendor marketplace featuring product search with fuzzy logic, stripe payment gateway integration, advanced admin dashboard with analytics charts, dynamic product variations, and role-based access control.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Redux Toolkit", "Tailwind CSS", "Stripe API"],
    githubUrl: "https://github.com",
    liveUrl: "https://github.com",
    thumbnail: ""
  },
  {
    title: "Real-Time Chat Application",
    description: "A high-performance chat system supporting public/private channels, real-time typing indicators, read receipts, media sharing, offline message caching, and encrypted messages powered by WebSocket & WebRTC.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "Tailwind CSS", "WebRTC"],
    githubUrl: "https://github.com",
    liveUrl: "https://github.com",
    thumbnail: ""
  },
  {
    title: "Enterprise Job Portal",
    description: "An ATS-optimized job board connecting companies with developers. Features resume parsing, smart job recommendations based on skills, internal application tracking system (Kanban board), and automated email notifications.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Nodemailer", "Cloudinary"],
    githubUrl: "https://github.com",
    liveUrl: "https://github.com",
    thumbnail: ""
  },
  {
    title: "Learning Management System",
    description: "An educational platform supporting video streaming, student progress tracking, quizzes with automatic grading, course creation dashboard for instructors, certificate generation, and online community forums.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Mux Video", "Tailwind CSS", "PDFKit"],
    githubUrl: "https://github.com",
    liveUrl: "https://github.com",
    thumbnail: ""
  },
  {
    title: "Project Management Dashboard",
    description: "A collaborative workspace tool with interactive Gantt charts, real-time board sync, sprint planning capability, workload distributions, calendar integrations, and custom notification systems.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Framer Motion", "Socket.io"],
    githubUrl: "https://github.com",
    liveUrl: "https://github.com",
    thumbnail: ""
  }
];

// @route   GET /api/projects
// @desc    Get all projects (seeds default projects if collection is empty)
// @access  Public
router.get('/', async (req, res) => {
  try {
    let projects = await Project.find().sort({ createdAt: -1 });
    if (projects.length === 0) {
      await Project.insertMany(defaultProjects);
      projects = await Project.find().sort({ createdAt: -1 });
    }
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/projects
// @desc    Create a new project
// @access  Private
router.post('/', auth, async (req, res) => {
  const { title, description, techStack, githubUrl, liveUrl, thumbnail } = req.body;

  if (!title || !description) {
    return res.status(400).json({ msg: 'Title and description are required' });
  }

  try {
    const newProject = new Project({
      title,
      description,
      techStack: Array.isArray(techStack) ? techStack : [],
      githubUrl,
      liveUrl,
      thumbnail
    });

    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/projects/:id
// @desc    Update a project
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { title, description, techStack, githubUrl, liveUrl, thumbnail } = req.body;

  try {
    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    if (title) project.title = title;
    if (description) project.description = description;
    if (techStack) project.techStack = techStack;
    if (githubUrl !== undefined) project.githubUrl = githubUrl;
    if (liveUrl !== undefined) project.liveUrl = liveUrl;
    if (thumbnail !== undefined) project.thumbnail = thumbnail;

    await project.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete a project
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    await Project.deleteOne({ _id: req.params.id });
    res.json({ msg: 'Project removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
