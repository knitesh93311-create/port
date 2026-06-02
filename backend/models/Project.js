const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  techStack: [{
    type: String
  }],
  githubUrl: {
    type: String,
    default: ""
  },
  liveUrl: {
    type: String,
    default: ""
  },
  thumbnail: {
    type: String,
    default: ""
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
