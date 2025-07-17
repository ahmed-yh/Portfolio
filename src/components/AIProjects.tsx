import React, { useState } from 'react';
import { ExternalLink, Play, Github, Zap } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: 'AI/ML' | 'Full Stack' | 'Computer Vision';
  status: 'live' | 'demo' | 'development';
  demoVideo?: string;
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
      description: 'Full-stack web application for plant care using AI-driven insights. Features interactive tools like Fertilizer Predictor and Plant Diagnosis using RAG technology.',
      technologies: ['TypeScript', 'React', 'Next.js', 'Flask', 'Python', 'RAG'],
      category: 'Full Stack',
      status: 'live',
      githubLink: 'https://github.com/ahmed-yh/FertiFy',
      deploymentInfo: 'Frontend on Vercel, Backend on Render'
    },
    {
      id: 2,
      title: 'NexusBI',
      description: 'Business intelligence platform transforming raw data into insights through AI-powered analysis. Features multi-agent system for automated data processing.',
      technologies: ['TypeScript', 'React', 'Next.js', 'Flask', 'Python', 'RAG', 'Multi-Agent System'],
      category: 'AI/ML',
      status: 'demo',
      githubLink: 'https://github.com/ahmed-yh/NexusBI',
      deploymentInfo: 'Frontend on Vercel, AI Backend on Hugging Face Spaces'
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
                className={`px-6 py-3 rounded-full font-audiowide text-sm transition-all duration-300 ${
                  selectedCategory === category
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
                className="floating-card group relative"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Demo/Video Section */}
                <div className="mb-4 h-64 bg-gradient-to-br from-purple-900/20 to-cyan-900/20 rounded-lg overflow-hidden border-2 border-cyan-500/30 backdrop-blur-sm">
                  {project.demoVideo ? (
                    <video
                      className="w-full h-full object-cover"
                      src={project.demoVideo}
                      controls
                      muted
                      loop
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-cyan-400 text-lg font-orbitron mb-2">
                          Project Demo
                        </div>
                        <p className="text-cyan-300/60 text-sm px-4">
                          {project.deploymentInfo}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-orbitron font-bold text-white">
                      {project.title}
                    </h3>
                    <div className={`px-3 py-1 rounded-full text-xs font-audiowide bg-gradient-to-r ${getStatusColor(project.status)}`}>
                      {project.status}
                    </div>
                  </div>

                  <p className="text-cyan-300/80 text-sm mb-4 leading-relaxed">
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
                  <div className="flex gap-3">
                    {project.demoLink ? (
                      <a 
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 cyberpunk-btn cyberpunk-btn-primary text-sm"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        <span>Live Demo</span>
                      </a>
                    ) : (
                      <button 
                        className="flex-1 cyberpunk-btn cyberpunk-btn-primary text-sm opacity-50 cursor-not-allowed"
                        disabled
                      >
                        <Play className="w-4 h-4 mr-2" />
                        <span>Demo Coming Soon</span>
                      </button>
                    )}
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="flex-1 cyberpunk-btn cyberpunk-btn-secondary text-sm"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      <span>Code</span>
                    </a>
                  </div>
                </div>

                {/* Hover Effects */}
                {hoveredProject === project.id && (
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-500/10 rounded-lg pointer-events-none"></div>
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