import React, { useState } from 'react';
import { Calendar, Code, Brain, Zap } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const MyStory: React.FC = () => {
  const [activeEvent, setActiveEvent] = useState(0);

  const events: TimelineEvent[] = [
    {
      year: 'June 2023',
      title: 'Journey Begins',
      description: 'Graduated with a Baccalaureate in Electromechanics,  it was the perfect launchpad for my journey into AI development',
      icon: <Brain className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      year: 'September 2023',
      title: 'My Starting Point in Higher Education',
      description: 'I began my higher studies at Pristini School of AI It’s where I laid the foundation for my career in artificial intelligence and started turning my curiosity into real-world skills ',
      icon: <Code className="w-6 h-6" />,
      color: 'from-cyan-400 to-blue-500'
    },
    {
      year: '2024',
      title: 'When It Finally Clicked',
      description: 'Started understanding actual concepts like computer vision, deep learning, and machine learning, and won my first ever hackathon :) .',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-green-400 to-emerald-500'
    },
    {
      year: '2025',
      title: 'Back to the Present',
      description: 'Focusing on my internships, projects, and studies.',
      icon: <Brain className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-600'
    }
  ];

  return (
    <RevealOnScroll>
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            My Journey
          </h2>

          {/* 
          🎯 PERSONAL MEDIA DROP ZONE 🎯
          Add your personal photos, AI avatars, or digital art here
        */}
          <div className="mb-16 text-center">
            <div className="inline-block p-8 border-2 border-dashed border-purple-500/30 rounded-lg backdrop-blur-sm">
              <img
                src="src/material/cropped_image.png" // <-- Put your image path here (e.g., /my-photo.jpg)
                alt="Ahmed Yassine"
                className="rounded-full mx-auto shadow-lg"
                style={{ width: 200, height: 200, objectFit: 'cover' }}
              />
              <div className="text-purple-400 text-lg font-orbitron mt-4">
                Ahmed Yassine
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 rounded-full"></div>

            {/* Timeline Events */}
            <div className="space-y-12">
              {events.map((event, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  } relative`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 z-10"></div>

                  {/* Event Card */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div
                      className={`holographic-panel p-6 rounded-lg cursor-pointer transition-all duration-300 ${
                        activeEvent === index ? 'scale-105 shadow-2xl' : ''
                      }`}
                      onClick={() => setActiveEvent(index)}
                    >
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${event.color} mb-4`}>
                        {event.icon}
                      </div>
                      <h3 className="text-xl font-orbitron font-bold text-cyan-400 mb-2">
                        {event.year}
                      </h3>
                      <h4 className="text-lg font-audiowide text-white mb-2">
                        {event.title}
                      </h4>
                      <p className="text-cyan-300/80 text-sm">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* 
                  // milestone 1
                  🎯 MEDIA DROP ZONE for each timeline event 🎯
                  Add specific images, videos, or 3D models for each milestone
                */}
                  <div className={`w-7/12 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                    <div className="border-2 border-dashed border-cyan-500/30 rounded-lg p-8 text-center backdrop-blur-sm">
                      {/* // milestone 1 */}
                      {index === 0 && (
                        <img
                          src="src/material/bac.jpg" // milestone 1 image
                          alt="Milestone 1"
                          className="mx-auto rounded-lg shadow-lg mb-2 object-cover"
                          style={{ width: 300, height: 350 }} // 16:9 aspect ratio, larger
                        />
                      )}
                      {/* // milestone 2 */}
                      {index === 1 && (
                        <img
                          src="src/material/pristini.jpg" // milestone 2 image
                          alt="Milestone 2"
                          className="mx-auto rounded-lg shadow-lg mb-2 object-cover"
                          style={{ width: 300, height: 350 }} // 16:9 aspect ratio, larger
                        />
                      )}
                      {/* // milestone 3 */}
                      {index === 2 && (
                        <img
                          src="src/material/hackathon.jpg" // milestone 3 image
                          alt="Milestone 3"
                          className="mx-auto rounded-lg shadow-lg mb-2 object-cover"
                          style={{ width: 300, height: 350 }} // 16:9 aspect ratio, larger
                        />
                      )}
                      {/* // milestone 4 */}
                      {index === 3 && (
                        <img
                          src="src/material/today.jpg" // milestone 4 image
                          alt="Milestone 4"
                          className="mx-auto rounded-lg shadow-lg mb-2 object-cover"
                          style={{ width: 350, height: 350 }} // 16:9 aspect ratio, larger
                        />
                      )}
                      <div className="text-cyan-400 text-sm font-orbitron mb-2">
                        
                      </div>
                      <p className="text-cyan-300/60 text-xs">
                        
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </RevealOnScroll>
  );
};

export default MyStory;