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
    <div className="min-h-screen bg-white font-sans text-gray-800 antialiased selection:bg-gray-800 selection:text-white">
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

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