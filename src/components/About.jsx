import React from "react";
import { timelineItems, socialLinks } from "../data/portfolioData";
import GooeyTextReveal from "./GooeyTextReveal";
import GooeyElementReveal from "./GooeyElementReveal";

export default function About() {
  return (
    <section id="about" className="section-muted">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="section-heading">
          <GooeyTextReveal mode="scroll" start="top 85%">
            <h2>About Me</h2>
          </GooeyTextReveal>
          <span />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Bio & Focus Panel */}
          <GooeyElementReveal mode="scroll" delay={0.1} yFrom={30}>
            <div className="content-panel h-full">
              <h3 className="panel-title">
                <i className="fas fa-user-circle" />
                About Me
              </h3>
              <GooeyTextReveal mode="scroll" delay={0.2} blurAmount={0.3}>
                <p className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                  I'm an Information Technology student passionate about
                  software development, system management, and emerging
                  technologies. My journey in IT has been focused on building
                  practical solutions and continuously learning new
                  technologies.
                </p>
              </GooeyTextReveal>

              <div className="mt-6 flex flex-wrap gap-3 border-t border-gray-100 dark:border-gray-800 pt-5">
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
          </GooeyElementReveal>

          {/* Experience & Education Timeline Panel */}
          <GooeyElementReveal mode="scroll" delay={0.25} yFrom={30}>
            <div className="content-panel h-full">
              <h3 className="panel-title">
                <i className="fas fa-briefcase" />
                My Experience
              </h3>
              <div className="space-y-6 border-l-2 border-gray-200 dark:border-gray-800 pl-6 ml-2 relative">
                {timelineItems.map((item, index) => (
                  <div key={index} className="relative group cursor-default">
                    <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full bg-gray-800 dark:bg-gray-100 ring-4 ring-white dark:ring-gray-900 group-hover:scale-150 group-hover:bg-gray-900 dark:group-hover:bg-white group-hover:ring-gray-200 dark:group-hover:ring-gray-700 transition-all duration-300" />
                    <p className="font-bold text-gray-900 dark:text-white text-base group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.detail}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-gray-400 dark:text-gray-500">
                      {item.year}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </GooeyElementReveal>
        </div>

        {/* Social Links Panel */}
        <GooeyElementReveal mode="scroll" delay={0.3} yFrom={30}>
          <div className="content-panel mt-6">
            <h3 className="panel-title">
              <i className="fas fa-link" />
              Social Links
            </h3>
            <GooeyElementReveal mode="scroll" stagger={0.12} yFrom={20}>
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
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md">
                        <i className={link.icon} />
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                          {link.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[160px]">
                          {link.text}
                        </p>
                      </div>
                    </div>
                    <i className="fas fa-arrow-up-right-from-square text-xs text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </a>
                ))}
              </div>
            </GooeyElementReveal>
          </div>
        </GooeyElementReveal>
      </div>
    </section>
  );
}
