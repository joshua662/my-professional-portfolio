import React from "react";
import { timelineItems, socialLinks } from "../data/portfolioData";

export default function About() {
  return (
    <section id="about" className="section-muted">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="section-heading animate-fade-in-up">
          <h2>About Me</h2>
          <span />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Bio & Focus Panel */}
          <div className="content-panel animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <h3 className="panel-title">
              <i className="fas fa-user-circle" />
              About Me
            </h3>
            <p className="text-base md:text-lg leading-relaxed text-gray-600">
              I'm an Information Technology student passionate about software
              development, system management, and emerging technologies. My journey
              in IT has been focused on building practical solutions and continuously
              learning new technologies.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 border-t border-gray-100 pt-5">
              <span className="tag">
                <i className="fas fa-graduation-cap" /> IT Student
              </span>
              <span className="tag">
                <i className="fas fa-code" /> Developer
              </span>
              <span className="tag">
                <i className="fas fa-lightbulb" /> Problem Solver
              </span>
            </div>
          </div>

          {/* Experience & Education Timeline Panel */}
          <div className="content-panel animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <h3 className="panel-title">
              <i className="fas fa-briefcase" />
              My Experience
            </h3>
            <div className="space-y-6 border-l-2 border-gray-200 pl-6 ml-2 relative">
              {timelineItems.map((item, index) => (
                <div key={index} className="relative group cursor-default">
                  <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full bg-gray-800 ring-4 ring-white group-hover:scale-150 group-hover:bg-gray-900 group-hover:ring-gray-200 transition-all duration-300" />
                  <p className="font-bold text-gray-900 text-base group-hover:text-gray-700 transition-colors">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-600">{item.detail}</p>
                  <p className="mt-1 text-xs font-semibold text-gray-400">
                    {item.year}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Links Panel */}
        <div className="content-panel mt-6 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <h3 className="panel-title">
            <i className="fas fa-link" />
            Social Links
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="social-link group"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white text-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md">
                    <i className={link.icon} />
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm group-hover:text-gray-700 transition-colors">
                      {link.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate max-w-[160px]">
                      {link.text}
                    </p>
                  </div>
                </div>
                <i className="fas fa-arrow-up-right-from-square text-xs text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
