import React from "react";
import { roles } from "../data/portfolioData";
import MorphText from "./MorphText";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white py-12 md:py-16 min-h-[calc(100vh-70px)] flex flex-col justify-center box-border"
    >
      <div className="container mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-[minmax(260px,380px)_1fr]">
        {/* Avatar / Profile Image Container */}
        <div className="mx-auto flex justify-center animate-fade-in-up">
          <div className="relative h-64 w-64 sm:h-80 sm:w-80 rounded-full border-4 border-gray-800 bg-gray-100 shadow-2xl p-1 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-gray-400/30">
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
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
            Information Technology Student
          </p>
          <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Joshua Simpas
          </h1>
          <div className="mb-6 flex flex-wrap items-center justify-center md:justify-start gap-2 text-xl sm:text-2xl font-semibold text-gray-700 min-h-[44px]">
            <span className="whitespace-nowrap">I'm a</span>
            <MorphText
              words={roles}
              interval={2600}
              fontSize="clamp(1.15rem, 2.5vw, 1.65rem)"
              fontFamily="inherit"
              className="inline-flex items-center"
            />
          </div>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-gray-600 md:mx-0 sm:text-lg">
            My portfolio showcases academic projects, technical skills, and
            hands-on experiences in software development, system management, and
            emerging technologies.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
            <a
              href="/RESUME AND LETTER.pdf"
              download
              className="button-primary gap-2 group"
            >
              <i className="fas fa-download transition-transform duration-300 group-hover:-translate-y-0.5" />
              Download CV
            </a>
            <a
              href="/RESUME AND LETTER.pdf"
              target="_blank"
              rel="noreferrer"
              className="button-secondary gap-2 group"
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
