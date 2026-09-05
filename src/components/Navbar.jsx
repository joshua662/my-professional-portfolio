import React, { useEffect, useState, useRef } from "react";
import { navItems } from "../data/portfolioData";

export default function Navbar({ activeSection, onNavigate, theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTopHovered, setIsTopHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const scrollTimerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal navbar on scroll
      setIsVisible(true);

      // Reset 3-second inactivity timer
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }

      scrollTimerRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial 3-second hide timer
    scrollTimerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

  const handleNavClick = (id) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  const isNavVisible = isVisible || isTopHovered || menuOpen;

  return (
    <>
      {/* Top Hover Detection Sensor Area (Triggers reveal when mouse approaches top 60px) */}
      <div
        className="fixed top-0 inset-x-0 h-16 z-50 pointer-events-auto"
        onMouseEnter={() => setIsTopHovered(true)}
        onMouseLeave={() => setIsTopHovered(false)}
      />

      <header
        onMouseEnter={() => setIsTopHovered(true)}
        onMouseLeave={() => setIsTopHovered(false)}
        className={`fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-500 ease-out transform ${
          isNavVisible
            ? "translate-y-0 opacity-100 scale-100"
            : "-translate-y-20 opacity-0 scale-95"
        }`}
      >
        <nav className="pointer-events-auto flex items-center gap-1 sm:gap-2 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-gray-200/90 dark:border-gray-800/90 p-1.5 shadow-xl shadow-black/5 dark:shadow-black/40 transition-all duration-300">
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 sm:gap-2 px-1">
            {navItems.map(({ id, label }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleNavClick(id)}
                  className={`relative px-3 py-1.5 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer focus:outline-none ${
                    isActive
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}
                >
                  {label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-gray-900 dark:text-white text-sm font-black leading-none select-none">
                      •
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="hidden md:block h-4 w-px bg-gray-200 dark:bg-gray-800 mx-1.5" />

          {/* Functional Dark/Light Theme Button: Image 1 Sun icon in Dark Mode, Image 2 Moon icon in Light Mode */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200/80 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-2xs focus:outline-none cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              /* Image 1: 8-ray Sun Icon in Dark Mode */
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4.5" />
                <path d="M12 2v2.5" />
                <path d="M12 19.5v2.5" />
                <path d="M4.56 4.56l1.77 1.77" />
                <path d="M17.67 17.67l1.77 1.77" />
                <path d="M2 12h2.5" />
                <path d="M19.5 12h2.5" />
                <path d="M4.56 19.44l1.77-1.77" />
                <path d="M17.67 6.33l1.77-1.77" />
              </svg>
            ) : (
              /* Image 2: Crescent Moon Icon in Light Mode */
              <svg className="w-4 h-4 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="p-1.5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 md:hidden focus:outline-none ml-1 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <i
              className={`text-sm fas ${
                menuOpen ? "fa-times rotate-90" : "fa-bars"
              } transition-transform duration-300`}
            />
          </button>
        </nav>

        {/* Mobile Dropdown Pill */}
        {menuOpen && (
          <div className="pointer-events-auto fixed top-18 inset-x-4 max-w-sm mx-auto z-50 rounded-2xl bg-white/95 dark:bg-black/95 backdrop-blur-xl border border-gray-200/90 dark:border-gray-800/90 p-3 shadow-xl md:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map(({ id, label }) => {
                const isActive = activeSection === id;
                return (
                  <button
                    type="button"
                    key={id}
                    onClick={() => handleNavClick(id)}
                    className={`text-left px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-between cursor-pointer ${
                      isActive
                        ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <span>{label}</span>
                    {isActive && <span className="text-xs font-bold">•</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
