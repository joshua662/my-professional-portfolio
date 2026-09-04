import React from "react";
import { certificates, seminarCertificates } from "../data/portfolioData";
import GooeyTextReveal from "./GooeyTextReveal";
import GooeyElementReveal from "./GooeyElementReveal";

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
        <div className="section-heading">
          <GooeyTextReveal mode="scroll" start="top 85%">
            <h2>Certificates</h2>
          </GooeyTextReveal>
          <span />
        </div>
        <GooeyTextReveal mode="scroll" delay={0.1}>
          <p className="-mt-6 mb-6 text-gray-600 text-sm md:text-base">
            Credentials, continuing education, and recognized achievements.
          </p>
        </GooeyTextReveal>

        <GooeyElementReveal mode="scroll" stagger={0.15} yFrom={25} blurAmount={12}>
          <div className="grid gap-6 md:grid-cols-3">
            {groups.map((group) => (
              <button
                type="button"
                key={group.title}
                className="certificate-card group"
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
        </GooeyElementReveal>
      </div>
    </section>
  );
}
