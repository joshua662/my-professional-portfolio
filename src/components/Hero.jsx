import React from "react";
import { roles } from "../data/portfolioData";
import MorphText from "./MorphText";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white dark:bg-black py-8 md:py-12 min-h-screen flex flex-col justify-center box-border transition-colors duration-300"
    >
      <div className="container mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 md:grid-cols-[minmax(260px,380px)_1fr] md:gap-10">
        {/* Avatar / Profile Image Container */}
        <div className="mx-auto flex justify-center animate-fade-in-up">
          <div className="relative h-52 w-52 sm:h-72 sm:w-72 rounded-full border-4 border-gray-800 dark:border-gray-100 bg-gray-100 dark:bg-black shadow-2xl p-1 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-gray-400/30 dark:hover:shadow-white/10">
            <img
              src="/image/Profile.jpg"
              alt="Joshua Simpas"
              className="h-full w-full object-cover rounded-full transition-transform duration-700 hover:scale-110"
            />
          </div>
        </div>

        {/* Text Details & Call-To-Action */}
        <div
          className="text-center md:text-left animate-fade-in-up"
          style={{ animationDelay: "150ms" }}
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400">
            Information Technology Student
          </p>
          <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Joshua Simpas
          </h1>
          <div className="mb-6 flex flex-wrap items-center justify-center md:justify-start gap-2 text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200 min-h-[44px]">
            <span className="whitespace-nowrap">I'm a</span>
            <MorphText
              words={roles}
              interval={2600}
              fontSize="clamp(1.15rem, 2.5vw, 1.65rem)"
              fontFamily="inherit"
              className="inline-flex items-center text-gray-900 dark:text-white"
            />
          </div>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300 md:mx-0 sm:text-lg">
            My portfolio showcases academic projects, technical skills, and
            hands-on experiences in software development, system management, and
            emerging technologies.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
            <a
              href="/RESUME AND LETTER.pdf"
              download
              className="button-primary gap-2 group dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
            >
              <i className="fas fa-download transition-transform duration-300 group-hover:-translate-y-0.5" />
              Download CV
            </a>
            <a
              href="/RESUME AND LETTER.pdf"
              target="_blank"
              rel="noreferrer"
              className="button-secondary gap-2 group dark:bg-black dark:border-white dark:text-white dark:hover:bg-white/10"
            >
              <i className="fas fa-eye transition-transform duration-300 group-hover:scale-110" />
              View CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
