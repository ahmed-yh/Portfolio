import React, { useState } from 'react';
import { Mail, Github, Linkedin, Twitter, Send, MapPin, Phone } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Message sent! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: 'mailto:your.email@example.com', label: 'Email' }
  ];

  return (
    <RevealOnScroll>
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Get In Touch
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form - Glassmorphism Panel */}
            <div className="glassmorphism-panel p-8 rounded-xl">
              <h3 className="text-2xl font-orbitron font-bold text-cyan-400 mb-6">
                Send a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-cyan-300 text-sm font-audiowide mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="cyberpunk-input"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-cyan-300 text-sm font-audiowide mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="cyberpunk-input"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-cyan-300 text-sm font-audiowide mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="cyberpunk-input"
                    placeholder="Project Collaboration"
                  />
                </div>

                <div>
                  <label className="block text-cyan-300 text-sm font-audiowide mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="cyberpunk-input resize-none"
                    placeholder="Tell me about your AI project or collaboration idea..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cyberpunk-btn cyberpunk-btn-primary w-full"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="glassmorphism-panel p-6 rounded-xl">
                <h3 className="text-xl font-orbitron font-bold text-cyan-400 mb-4">
                  Let's Connect
                </h3>
                <p className="text-cyan-300/80 text-sm leading-relaxed mb-6">
                  Ready to push the boundaries of AI together? Whether you're looking for collaboration, 
                  consultation, or just want to discuss the future of artificial intelligence, I'd love to hear from you.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                    <span className="text-cyan-300">Sousse, Tunisia</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-cyan-400" />
                    <span className="text-cyan-300">+216 96-440-496</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <span className="text-cyan-300">ahmedhachem0420@gmail.com</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="glassmorphism-panel p-6 rounded-xl">
                <h3 className="text-xl font-orbitron font-bold text-cyan-400 mb-4">
                  Follow My Work
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link group"
                    >
                      <link.icon className="w-6 h-6 text-cyan-400 group-hover:text-white transition-colors" />
                      <span className="text-cyan-300 group-hover:text-white font-audiowide">
                        {link.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* 
                🎯 CONTACT MEDIA DROP ZONE 🎯
                Add your professional photo, office setup, or AI workspace
              */}
              <div className="glassmorphism-panel p-6 rounded-xl">
                <div className="text-center">
                  <div className="text-purple-400 text-lg font-orbitron mb-2">
                    📷 WORKSPACE SHOWCASE 📷
                  </div>
                  <p className="text-purple-300/60 text-sm">
                    Professional photo | AI workspace | Setup tour
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </RevealOnScroll>
  );
};

export default Contact;