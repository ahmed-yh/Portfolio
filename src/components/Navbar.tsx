import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const Navbar: React.FC = () => {
  const socialLinks = [
    {
      icon: <Github className="w-5 h-5 md:w-6 md:h-6" />,
      href: "https://github.com/ahmed-yh",
      label: "GitHub"
    },
    {
      icon: <Linkedin className="w-5 h-5 md:w-6 md:h-6" />,
      href: "https://linkedin.com/in/ahmed-yh",
      label: "LinkedIn"
    }
  ];

  return (
    <nav className="fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-theme-dark-primary/30 dark:bg-theme-dark-primary/30 light:bg-theme-light-primary/80 backdrop-blur-md px-4 md:px-8 py-2 md:py-3 rounded-full w-auto max-w-full overflow-x-auto">
      <ul className="flex items-center space-x-6 md:space-x-10">
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