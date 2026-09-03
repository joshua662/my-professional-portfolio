import React from "react";

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-gray-900 py-10 text-gray-400 border-t border-gray-800">
      <div className="container mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs sm:text-sm">
          &copy; {new Date().getFullYear()} Josh Simpas. All rights reserved.
        </p>

        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
        >
          <span>Back to top</span>
          <i className="fas fa-arrow-up" />
        </button>
      </div>
    </footer>
  );
}
