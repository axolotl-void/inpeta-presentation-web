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
  const strokeColor = color || (score >= 90 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444');

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '1rem',
      background: 'rgba(255, 255, 255, 0.01)',
      border: '1px solid var(--border-color)',
      borderRadius: '12px',
      transition: 'var(--transition-smooth)'
    }}>
      <div style={{ position: 'relative', width: '100px', height: '100px' }}>
        <svg className="gauge-svg" viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)' }}>
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
            style={{
              transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.5s ease'
            }}
          />
        </svg>
        {/* Score overlay */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-heading)',
          fontWeight: '700',
          fontSize: '1.25rem',
          color: strokeColor
        }}>
          {score}
        </div>
      </div>
      <span style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.8rem',
        fontWeight: '600',
        color: 'var(--text-muted)',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
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
    <div style={{ width: '100%' }}>
      {/* Header and Toggle */}
      <div style={{
        display: 'flex',
        justifyContent: 'between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '1rem'
      }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '0.25rem' }}>
            Hasil Audit Lighthouse Google
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Perbandingan kinerja web inPETA eksisting (MPA) vs hasil re-engineering (React SPA).
          </p>
        </div>
        
        {/* Mode Toggle Button */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '4px',
          borderRadius: '8px',
          display: 'flex',
          border: '1px solid var(--border-color)'
        }}>
          <button
            onClick={() => setActiveTab('new')}
            style={{
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.8rem',
              fontFamily: 'var(--font-heading)',
              background: activeTab === 'new' ? 'var(--accent)' : 'transparent',
              color: activeTab === 'new' ? '#fff' : 'var(--text-muted)',
              transition: 'var(--transition-fast)'
            }}
          >
            React SPA (Baru)
          </button>
          <button
            onClick={() => setActiveTab('old')}
            style={{
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.8rem',
              fontFamily: 'var(--font-heading)',
              background: activeTab === 'old' ? 'var(--danger)' : 'transparent',
              color: activeTab === 'old' ? '#fff' : 'var(--text-muted)',
              transition: 'var(--transition-fast)'
            }}
          >
            Legacy MPA (Lama)
          </button>
        </div>
      </div>

      {/* Gauges Grid */}
      <div className="grid stats-grid" style={{ marginBottom: '2rem' }}>
        {currentScores.map((item) => (
          <CircularGauge
            key={item.label}
            score={item.score}
            label={item.label}
            color={activeTab === 'new' ? '#10b981' : '#ef4444'}
          />
        ))}
      </div>

      {/* Summary Bullet Points */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '1.25rem',
        fontSize: '0.85rem'
      }}>
        {activeTab === 'new' ? (
          <div>
            <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem', fontWeight: 700 }}>
              🚀 Keunggulan Arsitektur React SPA
            </h4>
            <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)' }}>
              <li style={{ marginBottom: '0.3rem' }}><strong>Client-Side Rendering:</strong> Transisi halaman secepat kilat tanpa pemuatan ulang dokumen (Zero Full Page Reloads).</li>
              <li style={{ marginBottom: '0.3rem' }}><strong>Mobile-First Design:</strong> Navigasi dan rasio aspek dioptimalkan penuh untuk layar smartphone.</li>
              <li style={{ marginBottom: '0.3rem' }}><strong>100% SEO Friendly:</strong> Optimasi pre-rendering dan semantic HTML menghasilkan skor SEO sempurna.</li>
            </ul>
          </div>
        ) : (
          <div>
            <h4 style={{ color: 'var(--danger)', marginBottom: '0.5rem', fontWeight: 700 }}>
              ⚠️ Kendala Sistem Legacy MPA
            </h4>
            <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)' }}>
              <li style={{ marginBottom: '0.3rem' }}><strong>High Latency:</strong> Pemuatan ulang halaman penuh (full document transfer) pada setiap perpindahan menu.</li>
              <li style={{ marginBottom: '0.3rem' }}><strong>Buruk di Mobile:</strong> Tata letak peta dan sidebar terpotong di layar kecil, serta tidak ramah input sentuh.</li>
              <li style={{ marginBottom: '0.3rem' }}><strong>Struktur Kode Kuno:</strong> Kode modular sulit dirawat dan minim optimasi file aset.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
