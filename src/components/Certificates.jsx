import React from "react";
import { certificates, seminarCertificates } from "../data/portfolioData";

export default function Certificates({ onOpenCertificatesModal }) {
  const groups = [
    {
      title: "LinkedIn Credentials",
      provider: "LinkedIn Learning",
      items: certificates,
      icon: "fab fa-linkedin-in",
    },
    {
      title: "Online Seminars",
      provider: "Online Seminar",
      items: seminarCertificates.slice(0, 2),
      icon: "fas fa-laptop-code",
    },
    {
      title: "Seminar Certificates",
      provider: "CHED RAISE & Professional Events",
      items: seminarCertificates.slice(2),
      icon: "fas fa-certificate",
    },
  ];

  return (
    <section id="blog" className="section-white">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="section-heading animate-fade-in-up">
          <h2>Certificates</h2>
          <span />
        </div>
        <p className="-mt-8 mb-8 text-gray-600 text-sm md:text-base animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          Credentials, continuing education, and recognized achievements.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {groups.map((group, index) => (
            <button
              type="button"
              key={group.title}
              className="certificate-card group animate-fade-in-up"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
              onClick={() => onOpenCertificatesModal(group.title, group.items)}
            >
              <div className="flex items-center gap-4">
                <span className="certificate-icon">
                  <i className={group.icon} />
                </span>
                <div>
                  <strong className="block text-base font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                    {group.title}
                  </strong>
                  <small className="text-xs text-gray-500 font-semibold">
                    {group.items.length} Certificate{group.items.length > 1 ? "s" : ""}
                  </small>
                </div>
              </div>
              <i className="fas fa-arrow-right text-gray-400 group-hover:text-gray-900 group-hover:translate-x-2 transition-all duration-300" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
