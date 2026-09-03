import React, { useState } from "react";
import { navItems } from "../data/portfolioData";

export default function Navbar({ activeSection, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (id) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <nav className="container mx-auto px-6 py-3.5">
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="flex items-center gap-3 group focus:outline-none"
            onClick={() => handleNavClick("home")}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-lg font-bold text-white shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              J
            </span>
            <div className="text-left">
              <span className="text-lg font-bold text-gray-900 block leading-none group-hover:text-gray-700 transition-colors">
                Joshua Simpas
              </span>
              <span className="text-xs font-semibold text-gray-500 tracking-wider uppercase">
                Portfolio
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map(({ id, label }) => (
              <button
                type="button"
                key={id}
                onClick={() => handleNavClick(id)}
                className={`nav-link ${activeSection === id ? "active" : ""}`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <i
              className={`text-xl fas ${
                menuOpen ? "fa-times rotate-90" : "fa-bars"
              } transition-transform duration-300`}
            />
          </button>
        </div>

        {/* Mobile Dropdown Menu with Animated Expand / Collapse */}
        <div
          className={`grid transition-all duration-300 ease-in-out md:hidden ${
            menuOpen
              ? "grid-rows-[1fr] opacity-100 mt-3 pt-3 border-t border-gray-100"
              : "grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-0"
          }`}
        >
          <div className="overflow-hidden flex flex-col gap-2">
            {navItems.map(({ id, label }) => (
              <button
                type="button"
                key={id}
                onClick={() => handleNavClick(id)}
                className={`text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeSection === id
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
