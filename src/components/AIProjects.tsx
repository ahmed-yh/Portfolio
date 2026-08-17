import React, { useState } from 'react';
import { Github, ExternalLink, Cpu, LayoutDashboard, Eye } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: 'AI/ML' | 'Full Stack' | 'Computer Vision';
  status: 'live' | 'demo' | 'development';
  githubLink: string;
  demoLink?: string;
  deploymentInfo?: string;
}

const AIProjects: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const projects: Project[] = [
    {
      id: 1,
      title: 'FertiFy',
      description: 'Full-stack plant care web app using React, Next.js, Flask, and RAG. Features two AI models for fertilizer prediction and plant diagnosis, delivering real-time insights through a responsive UI.',
      technologies: ['React', 'Next.js', 'Flask', 'Python', 'RAG'],
      category: 'Full Stack',
      status: 'live',
      githubLink: 'https://github.com/ahmed-yh/FertiFy',
      demoLink: 'https://fertify.netlify.app/', // Add your Vercel URL here e.g. 'https://fertify.vercel.app'
    },
    {
      id: 2,
      title: 'NexusBI',
      description: 'Full-stack business intelligence platform using React, Flask, and multi-agent system. Transforms raw data (CSV/Excel/JSON) into actionable insights with Google Generative AI-powered reports and automated end-to-end workflows.',
      technologies: ['React', 'Next.js', 'Flask', 'Python', 'RAG', 'Multi-Agent System'],
      category: 'AI/ML',
      status: 'demo',
      githubLink: 'https://github.com/ahmed-yh/NexusBI',
      demoLink: 'https://nexusbi.netlify.app/', // Add your Vercel URL here e.g. 'https://nexusbi.vercel.app'
    },
    {
      id: 3,
      title: 'Queue Intelligence System',
      description: 'End-to-end queue intelligence system using YOLOv8, OpenCV, and Python for real-time customer tracking. Features polygon-based worker exclusion zones, confusion detection with LLM-powered correction via Google Gemini.',
      technologies: ['Python', 'YOLOv8', 'OpenCV', 'Streamlit', 'Computer Vision', 'Agent System'],
      category: 'Computer Vision',
      status: 'demo',
      githubLink: 'https://github.com/ahmed-yh/queue-intelligence',
      demoLink: 'https://qintelligencesystem.streamlit.app',
      deploymentInfo: 'Demo Version'
    }
  ];

  const categories = ['all', 'AI/ML', 'Full Stack', 'Computer Vision'];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'from-green-400 to-emerald-500';
      case 'demo': return 'from-cyan-400 to-blue-500';
      case 'development': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'live': return '● Live';
      case 'demo': return '◎ Demo';
      case 'development': return '⋯ In Dev';
      default: return status;
    }
  };

  return (
    <RevealOnScroll>
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            AI Projects
          </h2>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-audiowide text-sm transition-all duration-300 ${selectedCategory === category
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-black'
                  : 'bg-white/5 text-cyan-400 hover:bg-white/10'
                  }`}
              >
                {category === 'all' ? 'All Projects' : category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="floating-card group relative flex flex-col"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Banner */}
                <div className={`h-44 rounded-t-lg overflow-hidden border-b border-cyan-500/20 relative flex items-center justify-center ${project.category === 'Full Stack' ? 'bg-gradient-to-br from-green-900/40 to-emerald-900/20' :
                  project.category === 'AI/ML' ? 'bg-gradient-to-br from-purple-900/40 to-cyan-900/20' :
                    'bg-gradient-to-br from-orange-900/40 to-amber-900/20'
                  }`}>
                  <div className="flex flex-col items-center gap-3 opacity-60 group-hover:opacity-90 transition-opacity duration-300">
                    {project.category === 'Full Stack' && <LayoutDashboard className="w-14 h-14 text-emerald-400" />}
                    {project.category === 'AI/ML' && <Cpu className="w-14 h-14 text-cyan-400" />}
                    {project.category === 'Computer Vision' && <Eye className="w-14 h-14 text-amber-400" />}
                    <span className="font-orbitron text-sm tracking-widest text-white/50 uppercase">{project.category}</span>
                  </div>
                  {/* Status badge */}
                  <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-audiowide bg-gradient-to-r ${getStatusColor(project.status)} text-black shadow-lg`}>
                    {getStatusLabel(project.status)}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-3">
                    <h3 className="text-xl font-orbitron font-bold text-white mb-1">
                      {project.title}
                    </h3>
                    {project.deploymentInfo && (
                      <p className="text-xs text-cyan-400/60 font-audiowide">{project.deploymentInfo}</p>
                    )}
                  </div>

                  <p className="text-cyan-300/80 text-sm mb-4 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/5 text-cyan-400 text-xs rounded-full border border-cyan-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`cyberpunk-btn cyberpunk-btn-primary text-sm flex items-center justify-center gap-2 ${project.demoLink ? 'flex-1' : 'w-full'}`}
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 cyberpunk-btn text-sm flex items-center justify-center gap-2 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Hover Glow */}
                {hoveredProject === project.id && (
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-500/10 rounded-lg pointer-events-none" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </RevealOnScroll>
  );
};

export default AIProjects;