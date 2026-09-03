import React from "react";
import { projects } from "../data/portfolioData";

export default function Projects({ onOpenProjectModal }) {
  return (
    <section id="portfolio" className="section-muted">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="section-heading animate-fade-in-up">
          <h2>Projects</h2>
          <span />
        </div>
        <p className="-mt-8 mb-10 text-gray-600 text-sm md:text-base animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          A snapshot of recent web apps, hardware IoT integrations, and academic systems.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, index) => (
            <button
              type="button"
              key={project.id}
              className="project-card flex flex-col justify-between text-left group animate-fade-in-up"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
              onClick={() => onOpenProjectModal(project)}
            >
              <div>
                <div className="aspect-video w-full overflow-hidden rounded-xl bg-gray-100 p-2 flex items-center justify-center relative">
                  <img
                    src={project.image || project.poster}
                    alt={project.title}
                    className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/5 transition-colors duration-300 rounded-xl" />
                </div>
                <h3 className="mt-4 text-base font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                  {project.title}
                </h3>
                <span className="mt-1 block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {project.type}
                </span>
              </div>

              {project.technologies && (
                <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-gray-100">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold text-gray-600 group-hover:bg-gray-200 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="rounded-lg bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold text-gray-500">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
