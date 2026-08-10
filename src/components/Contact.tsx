import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, MapPin } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkjwjgkr'; // Replace YOUR_FORM_ID with your Formspree form ID

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/ahmed-yh', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/ahmed-yh', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:ahmedhachem0420@gmail.com', label: 'Email' }
  ];

  return (
    <RevealOnScroll>
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Get In Touch
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="glassmorphism-panel p-6 rounded-xl">
                <h3 className="text-xl font-orbitron font-bold text-cyan-400 mb-4">
                  Let's Connect
                </h3>
                <p className="text-cyan-300/80 text-sm leading-relaxed mb-6">
                  I would love to hear from you! Whether it's a project idea, collaboration, or just a hello — reach out.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                    <span className="text-cyan-300">Sousse, Tunisia</span>
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
                <div className="grid grid-cols-3 gap-4">
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
            </div>

            {/* Contact Form */}
            <div className="glassmorphism-panel p-6 rounded-xl">
              <h3 className="text-xl font-orbitron font-bold text-cyan-400 mb-6">
                Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-audiowide text-cyan-400 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full bg-white/5 border border-cyan-500/20 rounded-lg px-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-audiowide text-cyan-400 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-cyan-500/20 rounded-lg px-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-audiowide text-cyan-400 mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                    className="w-full bg-white/5 border border-cyan-500/20 rounded-lg px-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-audiowide text-cyan-400 mb-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project or idea..."
                    className="w-full bg-white/5 border border-cyan-500/20 rounded-lg px-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  />
                </div>

                {submitStatus === 'success' && (
                  <p className="text-emerald-400 text-sm font-audiowide">✓ Message sent! I'll get back to you soon.</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-400 text-sm font-audiowide">✗ Something went wrong. Please try emailing me directly.</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cyberpunk-btn cyberpunk-btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </RevealOnScroll>
  );
};

export default Contact;