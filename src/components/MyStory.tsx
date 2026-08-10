import React, { useState } from 'react';
import { Calendar, Code, Brain, Zap } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import croppedImage from '../material/Screenshot 2026-08-10 145118.png';
import bacImage from '../material/bac.jpg';
import pristiniImage from '../material/pristini.jpg';
import hackathonImage from '../material/hackathon.jpg';
import todayImage from '../material/today.jpg';

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
      title: 'A Year of Growth',
      description: 'Focused on internships, projects, and deepening my studies — a year of putting theory into real-world practice.',
      icon: <Brain className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-600'
    },
    {
      year: 'Summer 2026',
      title: 'Research in Germany',
      description: 'Joined a research institute in Germany to pursue my end-of-studies project — an exciting chapter bridging academia and cutting-edge research.',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-amber-400 to-orange-500'
    }
  ];

  return (
    <RevealOnScroll>
      <section className="py-10 md:py-20 px-2 md:px-4 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-center mb-8 md:mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            My Journey
          </h2>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 rounded-full"></div>

            {/* Timeline Events */}
            <div className="flex flex-col gap-8 md:space-y-12">
              {events.map((event, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} relative items-stretch md:items-center`}
                >
                  {/* Timeline Node */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 z-10"></div>

                  {/* Event Card */}
                  <div className="w-full md:w-5/12 md:pr-8 md:pl-0 mb-4 md:mb-0">
                    <div
                      className={`holographic-panel p-4 md:p-6 rounded-lg cursor-pointer transition-all duration-300 ${activeEvent === index ? 'scale-105 shadow-2xl' : ''}`}
                      onClick={() => setActiveEvent(index)}
                    >
                      <div className={`inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r ${event.color} mb-2 md:mb-4`}>
                        {event.icon}
                      </div>
                      <h3 className="text-lg md:text-xl font-orbitron font-bold text-cyan-400 mb-1 md:mb-2">
                        {event.year}
                      </h3>
                      <h4 className="text-base md:text-lg font-audiowide text-white mb-1 md:mb-2">
                        {event.title}
                      </h4>
                      <p className="text-cyan-300/80 text-xs md:text-sm">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Event Image */}
                  <div className="w-full md:w-7/12 md:pl-8 md:pr-0">
                    <div className="border-2 border-dashed border-cyan-500/30 rounded-lg p-4 md:p-8 text-center backdrop-blur-sm">
                      {/* // milestone 1 */}
                      {index === 0 && (
                        <div className="w-full flex justify-center">
                          <div className="aspect-w-16 aspect-h-9 w-full max-w-xs md:max-w-full">
                            <img
                              src={bacImage}
                              alt="BAC Achievement"
                              className="w-full h-full object-contain rounded-lg shadow-md"
                            />
                          </div>
                        </div>
                      )}
                      {/* // milestone 2 */}
                      {index === 1 && (
                        <div className="w-full flex justify-center">
                          <div className="aspect-w-16 aspect-h-9 w-full max-w-xs md:max-w-full">
                            <img
                              src={pristiniImage}
                              alt="Pristini Achievement"
                              className="w-full h-full object-contain rounded-lg shadow-md"
                            />
                          </div>
                        </div>
                      )}
                      {/* // milestone 3 */}
                      {index === 2 && (
                        <div className="w-full flex justify-center">
                          <div className="aspect-w-16 aspect-h-9 w-full max-w-xs md:max-w-full">
                            <img
                              src={hackathonImage}
                              alt="Hackathon Achievement"
                              className="w-full h-full object-contain rounded-lg shadow-md"
                            />
                          </div>
                        </div>
                      )}
                      {/* // milestone 4 */}
                      {index === 3 && (
                        <div className="w-full flex justify-center">
                          <div className="aspect-w-16 aspect-h-9 w-full max-w-xs md:max-w-full">
                            <img
                              src={todayImage}
                              alt="Current Achievement"
                              className="w-full h-full object-contain rounded-lg shadow-md"
                            />
                          </div>
                        </div>
                      )}
                      {/* // milestone 5 - Germany Research Institute */}
                      {index === 4 && (
                        <div className="w-full flex justify-center">
                          <div className="aspect-w-16 aspect-h-9 w-full max-w-xs md:max-w-full flex items-center justify-center min-h-[160px] rounded-lg border-2 border-dashed border-amber-400/40 bg-amber-400/5">
                            <img
                            src={croppedImage}
                            alt="Germany Research Institute"
                            className="w-full h-full object-contain rounded-lg shadow-md"
                            />                          </div>
                        </div>
                      )}
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