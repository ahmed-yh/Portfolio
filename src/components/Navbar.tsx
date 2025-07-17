import React from 'react';
import { Github, Instagram, Linkedin } from 'lucide-react';

const Navbar: React.FC = () => {
  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      href: "https://github.com/ahmed-yh",
      label: "GitHub"
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      href: "https://www.instagram.com/ahmedd_yh/",
      label: "Instagram"
    },
    {
      icon: <img src="src/material/applemusic (1).png" alt="Apple Music" className="w-6 h-6 object-contain" />,
      href: "https://music.apple.com/profile/yourusername",
      label: "Apple Music"
    },
    {
      icon: <img src="src/material/spotify.png" alt="Spotify" className="w-6 h-6 object-contain" />,
      href: "https://open.spotify.com/user/31pchudikmiougik4vwrmwch7lya",
      label: "Spotify"
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      href: "https://linkedin.com/in/ahmed-yh",
      label: "LinkedIn"
    }
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-theme-dark-primary/30 dark:bg-theme-dark-primary/30 light:bg-theme-light-primary/80 backdrop-blur-md px-6 py-3 rounded-full">
      <ul className="flex items-center space-x-8">
        {socialLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-theme-dark-text dark:text-theme-dark-text light:text-theme-light-text hover:text-theme-dark-accent1 dark:hover:text-theme-dark-accent1 light:hover:text-theme-light-accent1 transition-colors duration-300 flex items-center justify-center"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar; 