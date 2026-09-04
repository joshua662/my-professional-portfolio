import React, { useEffect, useState } from "react";
import { roles } from "../data/portfolioData";

export default function Hero() {
  const [role, setRole] = useState("");

  useEffect(() => {
    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const current = roles[roleIndex];
      characterIndex += deleting ? -1 : 1;
      setRole(current.slice(0, characterIndex));
      let delay = deleting ? 50 : 100;

      if (!deleting && characterIndex === current.length) {
        deleting = true;
        delay = 1600;
      } else if (deleting && characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
      }

      timer = window.setTimeout(tick, delay);
    };

    timer = window.setTimeout(tick, 100);
    return () => window.clearTimeout(timer);
  }, []);

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
            Josh Simpas
          </h1>
          <p className="mb-6 text-xl font-semibold text-gray-700 sm:text-2xl min-h-[36px] flex items-center justify-center md:justify-start">
            <span>I'm a </span>
            <span className="ml-2 border-b-2 border-gray-900 text-gray-900 transition-all duration-300">
              {role}
            </span>
            <span className="typing-cursor ml-1 text-gray-500 font-normal">
              |
            </span>
          </p>
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
