import React from 'react';
import type { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useConfig } from '../hooks/useConfig';
import { useTheme } from '../hooks/useTheme';
import { GitHubIcon, LinkedInIcon, StackOverflowIcon, BehanceIcon } from './common/Icons';

interface LayoutProps {
  children: ReactNode;
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors ${
    isActive
      ? 'text-stone-900 dark:text-stone-100'
      : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
  }`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDark, toggleTheme } = useTheme();
  const { config } = useConfig();
  const currentYear = new Date().getFullYear();
  const socials = config?.social;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
      <header className="no-print fixed top-0 inset-x-0 z-50 bg-stone-50/85 dark:bg-stone-950/85 backdrop-blur border-b border-stone-200 dark:border-stone-800">
        <nav className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="font-display text-lg tracking-tight">
            Amzar
          </Link>
          <div className="flex items-center gap-6">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/cv" className={navLinkClass}>
              CV
            </NavLink>
            <NavLink to="/utils" className={navLinkClass}>
              Utils
            </NavLink>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-1.5 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              {isDark ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="no-print border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-stone-500 dark:text-stone-400">
            © {currentYear} Mohamad Amzar
          </p>
          <div className="flex items-center gap-5 text-stone-500 dark:text-stone-400">
            {socials && (
              <>
                <a href={socials.github} aria-label="GitHub" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  <GitHubIcon />
                </a>
                <a href={socials.linkedin} aria-label="LinkedIn" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  <LinkedInIcon />
                </a>
                <a href={socials.stackoverflow} aria-label="Stack Overflow" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  <StackOverflowIcon />
                </a>
                <a href={socials.behance} aria-label="Behance" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  <BehanceIcon />
                </a>
              </>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
