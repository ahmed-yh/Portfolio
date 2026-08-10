import React from 'react';
import RevealOnScroll from './RevealOnScroll';
import croppedImage from '../material/cropped_image.png';
import { SiPython, SiTensorflow, SiJavascript, SiReact, SiFlask, SiFigma, SiAdobephotoshop, SiAdobepremierepro, SiAdobeaftereffects, SiC, SiPandas, SiNumpy, SiScikitlearn } from 'react-icons/si';
import { FaGraduationCap, FaBrain, FaCode, FaLanguage, FaJava } from 'react-icons/fa';

const AboutMe: React.FC = () => {
  const education = [
    {
      period: "Sep 2023 – May 2026",
      title: "Applied Artificial Intelligence",
      institution: "Pristini School of AI, Sousse, Tunisia",
      description: "Deep Learning | Machine Learning | Advanced Python | C | Java | Data Engineering | Data Administration | Computer Vision"
    }
  ];

  const experience = [
    {
      period: "June 2025 – July 2025",
      title: "AI Engineer Intern",
      company: "Brokins FR, France",
      description: "Built production-ready AI tools including a RAG chatbot for insurance data search and a smart insurance comparator. Handled server deployment via SSH, PUTTY, and FileZilla."
    },
    {
      period: "June 2024 – July 2024",
      title: "AI Data Labeling Intern",
      company: "PURA Solutions, Sousse",
      description: "Led AI training initiative, labeled 20,000+ images with 98% accuracy. Designed scalable pipeline reducing project time by 67%, improved model accuracy by 20%."
    }
  ];

  const programmingLanguages = [
    { name: "Python", icon: <SiPython className="w-8 h-8" /> },
    { name: "C", icon: <SiC className="w-8 h-8" /> },
    { name: "Java", icon: <FaJava className="w-8 h-8" /> },
    { name: "JavaScript", icon: <SiJavascript className="w-8 h-8" /> }
  ];

  const technologies = [
    { name: "React", icon: <SiReact className="w-8 h-8" /> },
    { name: "Flask", icon: <SiFlask className="w-8 h-8" /> },
    { name: "TensorFlow", icon: <SiTensorflow className="w-8 h-8" /> },
    { name: "Pandas", icon: <SiPandas className="w-8 h-8" /> },
    { name: "NumPy", icon: <SiNumpy className="w-8 h-8" /> },
    { name: "Scikit-learn", icon: <SiScikitlearn className="w-8 h-8" /> }
  ];

  const tools = [
    { name: "Figma", icon: <SiFigma className="w-8 h-8" /> },
    { name: "Photoshop", icon: <SiAdobephotoshop className="w-8 h-8" /> },
    { name: "Premiere Pro", icon: <SiAdobepremierepro className="w-8 h-8" /> },
    { name: "After Effects", icon: <SiAdobeaftereffects className="w-8 h-8" /> }
  ];

  const languages = [
    { name: "English", level: "C1", proficiency: "Advanced" },
    { name: "French", level: "B2", proficiency: "Upper Intermediate" },
    { name: "Arabic", level: "Native", proficiency: "Native Speaker" },
    { name: "German", level: "A1", proficiency: "Beginner" },
    { name: "Spanish", level: "A1", proficiency: "Beginner" }
  ];

  return (
    <section className="min-h-screen py-20 relative">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-12 gap-8">
          {/* Left Column - Photo and About Me */}
          <div className="md:col-span-4">
            <RevealOnScroll>
              <div className="glassmorphism p-4 md:p-6 rounded-xl">
                <div className="mb-6 md:mb-8 text-center">
                  <img
                    src={croppedImage}
                    alt="Profile"
                    className="w-32 h-32 md:w-64 md:h-64 rounded-full object-cover shadow-lg mx-auto"
                  />
                  <h1 className="text-2xl md:text-3xl font-bold mt-2 md:mt-4 bg-gradient-to-r from-theme-dark-accent1 to-theme-dark-accent2 bg-clip-text text-transparent">
                    Hi, I'm Ahmed!
                  </h1>
                </div>

                {/* Personal Text */}
                <div className="mt-4 md:mt-6 space-y-2 md:space-y-4">
                  <p className="text-base md:text-xl font-caveat font-bold text-theme-dark-text/90 leading-relaxed tracking-wide">
                    I enjoy diving into the details and solving problems thoughtfully
                  </p>
                  <p className="text-base md:text-xl font-caveat font-bold text-theme-dark-text/90 leading-relaxed tracking-wide">
                    Curiosity and creativity have always been central to my life. When I'm not tinkering at work, I love exploring, learning, trying new things and diving into new hobbies.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Column - Details */}
          <div className="md:col-span-8">
            <RevealOnScroll>
              {/* Education Section */}
              <div className="glassmorphism p-6 rounded-xl mb-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-theme-dark-accent1">
                  <FaGraduationCap className="w-6 h-6" />
                  Education
                </h2>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-theme-dark-accent1/30 pl-4">
                      <div className="text-sm text-theme-dark-accent2">{edu.period}</div>
                      <div className="text-xl font-semibold text-theme-dark-text">{edu.title}</div>
                      <div className="text-theme-dark-accent1">{edu.institution}</div>
                      <div className="text-theme-dark-text/70">{edu.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Section */}
              <div className="glassmorphism p-6 rounded-xl mb-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-theme-dark-accent1">
                  <FaBrain className="w-6 h-6" />
                  Experience
                </h2>
                <div className="space-y-6">
                  {experience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-theme-dark-accent1/30 pl-4">
                      <div className="text-sm text-theme-dark-accent2">{exp.period}</div>
                      <div className="text-xl font-semibold text-theme-dark-text">{exp.title}</div>
                      <div className="text-theme-dark-accent1">{exp.company}</div>
                      <div className="text-theme-dark-text/70">{exp.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Programming Languages Section */}
              <div className="glassmorphism p-6 rounded-xl mb-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-theme-dark-accent1">
                  <FaCode className="w-6 h-6" />
                  Programming Languages
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {programmingLanguages.map((lang, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center p-4 rounded-lg bg-theme-dark-primary/20 hover:bg-theme-dark-primary/30 transition-all duration-300"
                    >
                      {lang.icon}
                      <span className="mt-2 text-sm text-theme-dark-text">{lang.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Section */}
              <div className="glassmorphism p-6 rounded-xl mb-6">
                <h2 className="text-2xl font-bold mb-6 text-theme-dark-accent1">
                  Technologies
                </h2>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
                  {technologies.map((tech, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center p-4 rounded-lg bg-theme-dark-primary/20 hover:bg-theme-dark-primary/30 transition-all duration-300"
                    >
                      {tech.icon}
                      <span className="mt-2 text-sm text-theme-dark-text">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools Section */}
              <div className="glassmorphism p-6 rounded-xl mb-6">
                <h2 className="text-2xl font-bold mb-6 text-theme-dark-accent1">
                  Software & Tools
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {tools.map((tool, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center p-4 rounded-lg bg-theme-dark-primary/20 hover:bg-theme-dark-primary/30 transition-all duration-300"
                    >
                      {tool.icon}
                      <span className="mt-2 text-sm text-theme-dark-text">{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages Section */}
              <div className="glassmorphism p-6 rounded-xl">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-theme-dark-accent1">
                  <FaLanguage className="w-6 h-6" />
                  Languages
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {languages.map((lang, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center p-4 rounded-lg bg-theme-dark-primary/20"
                    >
                      <h3 className="text-xl font-bold text-theme-dark-text">{lang.name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm text-theme-dark-accent2 font-semibold">{lang.level}</span>
                        <span className="text-xs text-theme-dark-text/70">({lang.proficiency})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe; 