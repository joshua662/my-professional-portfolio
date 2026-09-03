import React from "react";
import { skillGroups } from "../data/portfolioData";

export function SkillCard({ skill }) {
  const [name, iconUrl] = skill;
  return (
    <div className="skill-card group" tabIndex="0">
      <img
        className="skill-card__icon"
        src={iconUrl}
        alt={name}
        loading="lazy"
      />
      <span className="skill-card__label">{name}</span>
    </div>
  );
}

export default function Skills({ onOpenCategoryModal }) {
  return (
    <section id="resume" className="section-white">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="section-heading">
          <h2>Skills</h2>
          <span />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {Object.entries(skillGroups).map(([group, skills]) => {
            const hasMore =
              group === "Backend Frameworks" || group === "Developer Tools";
            const visibleSkills = hasMore ? skills.slice(0, 3) : skills;

            return (
              <div key={group} className="skill-group">
                <h3 className="mb-5 text-center text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-100 pb-2 w-full">
                  {group}
                </h3>
                <div className="flex flex-col items-center gap-4 w-full">
                  {visibleSkills.map((skill) => (
                    <SkillCard key={skill[0]} skill={skill} />
                  ))}
                </div>
                {hasMore && (
                  <button
                    type="button"
                    className="see-all"
                    onClick={() => onOpenCategoryModal(group, skills)}
                  >
                    See all ({skills.length})
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
