const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  personalInfo: {
    name: { type: String, default: "Nitesh Kumar" },
    title: { type: String, default: "Full Stack MERN Developer" },
    tagline: { type: String, default: "Building Scalable Digital Products With MERN Stack" },
    bio: { type: String, default: "" },
    email: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    location: { type: String, default: "Bangalore, India" },
    availability: { type: String, default: "Available For Full-Time Opportunities" },
    resumeUrl: { type: String, default: "/resume.pdf" },
    heroImage: { type: String, default: "" },
    aboutImage: { type: String, default: "" }
  },
  aboutStats: [
    {
      id: Number,
      label: String,
      value: Number
    }
  ],
  skillsData: {
    frontend: [{ name: String, level: Number, iconName: String }],
    backend: [{ name: String, level: Number, iconName: String }],
    database: [{ name: String, level: Number, iconName: String }],
    tools: [{ name: String, level: Number, iconName: String }]
  },
  experienceTimeline: [
    {
      id: Number,
      role: String,
      company: String,
      period: String,
      type: { type: String },
      description: String,
      color: String,
      iconName: String
    }
  ],
  servicesData: [
    {
      title: String,
      description: String,
      iconName: String
    }
  ],
  testimonialsData: [
    {
      id: Number,
      name: String,
      role: String,
      feedback: String,
      image: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', PortfolioSchema);
