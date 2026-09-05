import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [activeModal, setActiveModal] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Sync theme with document.documentElement class & localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Smooth scroll handler
  const handleNavigate = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // ScrollSpy active section detector
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ["home", "about", "resume", "portfolio", "blog", "contact"];
      const current = sectionIds.find((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Modal Handlers
  const handleOpenProjectModal = (project) => {
    setActiveModal({ item: project, title: project.title });
  };

  const handleOpenCertificatesModal = (title, items) => {
    setActiveModal({ items, title });
  };

  const handleOpenCategorySkillModal = (groupTitle, skills) => {
    setActiveModal({ skills, title: `${groupTitle} Skills` });
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans text-gray-800 dark:text-gray-100 antialiased selection:bg-gray-800 selection:text-white dark:selection:bg-gray-200 dark:selection:text-gray-900 transition-colors duration-300">
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main>
        <Hero />
        <About />
        <Skills onOpenCategoryModal={handleOpenCategorySkillModal} />
        <Projects onOpenProjectModal={handleOpenProjectModal} />
        <Certificates onOpenCertificatesModal={handleOpenCertificatesModal} />
        <Contact />
      </main>

      <Footer onNavigate={handleNavigate} />

      <Modal activeModal={activeModal} onClose={handleCloseModal} />
    </div>
  );
}