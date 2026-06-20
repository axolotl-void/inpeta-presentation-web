import React from 'react';

/*
 * SectionIndicator — Floating dot navigation on the right side
 * Shows current section and allows clicking to scroll to any section.
 */
const sectionLabels = [
  'Cover',
  'Instansi',
  'Masalah',
  'Tujuan',
  'Teknologi',
  'Demo GIS',
  'Fitur',
  'Performa',
  'Penutup'
];

export default function SectionIndicator({ currentSection, totalSections }) {
  const scrollToSection = (index) => {
    const el = document.getElementById(`section-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="section-indicator" id="section-indicator">
      {Array.from({ length: totalSections }, (_, i) => {
        const sectionNum = i + 1;
        const isActive = currentSection === sectionNum;
        return (
          <button
            key={sectionNum}
            className={`indicator-dot ${isActive ? 'active' : ''}`}
            onClick={() => scrollToSection(sectionNum)}
            aria-label={`Go to section ${sectionNum}: ${sectionLabels[i]}`}
            title={sectionLabels[i]}
          >
            <span className="indicator-line" />
            {isActive && (
              <span className="indicator-label">{sectionLabels[i]}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
