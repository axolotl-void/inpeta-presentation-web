import React, { useState, useEffect } from 'react';

function CircularGauge({ score, label, color }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const [strokeOffset, setStrokeOffset] = useState(circumference);

  useEffect(() => {
    // Animate the progress drawing
    const progress = score / 100;
    const offset = circumference - progress * circumference;
    const timer = setTimeout(() => {
      setStrokeOffset(offset);
    }, 100);
    return () => clearTimeout(timer);
  }, [score, circumference]);

  // Determine stroke color based on score value
  const strokeColor = color || (score >= 90 ? 'var(--accent)' : score >= 50 ? 'var(--warning)' : 'var(--danger)');

  return (
    <div className="perf-gauge-card">
      <div className="perf-gauge-svg-wrapper">
        <svg className="gauge-svg" viewBox="0 0 80 80">
          {/* Background circle */}
          <circle
            className="gauge-bg"
            cx="40"
            cy="40"
            r={radius}
          />
          {/* Active progress circle */}
          <circle
            className="gauge-value"
            cx="40"
            cy="40"
            r={radius}
            stroke={strokeColor}
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
          />
        </svg>
        {/* Score overlay */}
        <div className="perf-gauge-score" style={{ color: strokeColor }}>
          {score}
        </div>
      </div>
      <span className="perf-gauge-label">
        {label}
      </span>
    </div>
  );
}

export default function PerformanceGauges() {
  const [activeTab, setActiveTab] = useState('new'); // 'new' or 'old'

  const newSystemScores = [
    { label: 'Performance', score: 95 },
    { label: 'Accessibility', score: 98 },
    { label: 'Best Practices', score: 92 },
    { label: 'SEO', score: 100 },
  ];

  const oldSystemScores = [
    { label: 'Performance', score: 48 },
    { label: 'Accessibility', score: 55 },
    { label: 'Best Practices', score: 60 },
    { label: 'SEO', score: 65 },
  ];

  const currentScores = activeTab === 'new' ? newSystemScores : oldSystemScores;

  return (
    <div className="perf-gauges-wrapper">
      {/* Header and Toggle */}
      <div className="perf-header-group">
        <div className="perf-header-info">
          <h3 className="perf-header-title">
            Hasil Audit Lighthouse Google
          </h3>
          <p className="perf-header-desc">
            Perbandingan kinerja web inPETA eksisting (MPA) vs hasil re-engineering (React SPA).
          </p>
        </div>
        
        {/* Mode Toggle Button */}
        <div className="perf-toggle-container">
          <button
            onClick={() => setActiveTab('new')}
            className={`perf-toggle-btn btn-new ${activeTab === 'new' ? 'active' : ''}`}
          >
            React SPA (Baru)
          </button>
          <button
            onClick={() => setActiveTab('old')}
            className={`perf-toggle-btn btn-old ${activeTab === 'old' ? 'active' : ''}`}
          >
            Legacy MPA (Lama)
          </button>
        </div>
      </div>

      {/* Gauges Grid */}
      <div className="grid stats-grid">
        {currentScores.map((item) => (
          <CircularGauge
            key={item.label}
            score={item.score}
            label={item.label}
            color={activeTab === 'new' ? 'var(--accent)' : 'var(--danger)'}
          />
        ))}
      </div>

      {/* Summary Bullet Points */}
      <div className={`perf-summary-card type-${activeTab}`}>
        {activeTab === 'new' ? (
          <div className="perf-summary-content">
            <h4 className="summary-title text-success">
              🚀 Keunggulan Arsitektur React SPA
            </h4>
            <ul className="summary-list">
              <li className="summary-item"><strong>Client-Side Rendering:</strong> Transisi halaman secepat kilat tanpa pemuatan ulang dokumen (Zero Full Page Reloads).</li>
              <li className="summary-item"><strong>Mobile-First Design:</strong> Navigasi dan rasio aspek dioptimalkan penuh untuk layar smartphone.</li>
              <li className="summary-item"><strong>100% SEO Friendly:</strong> Optimasi pre-rendering dan semantic HTML menghasilkan skor SEO sempurna.</li>
            </ul>
          </div>
        ) : (
          <div className="perf-summary-content">
            <h4 className="summary-title text-danger">
              ⚠️ Kendala Sistem Legacy MPA
            </h4>
            <ul className="summary-list">
              <li className="summary-item"><strong>High Latency:</strong> Pemuatan ulang halaman penuh (full document transfer) pada setiap perpindahan menu.</li>
              <li className="summary-item"><strong>Buruk di Mobile:</strong> Tata letak peta dan sidebar terpotong di layar kecil, serta tidak ramah input sentuh.</li>
              <li className="summary-item"><strong>Struktur Kode Kuno:</strong> Kode modular sulit dirawat dan minim optimasi file aset.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
