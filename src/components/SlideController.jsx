import React from 'react';
import { ChevronLeft, ChevronRight, Moon, Sun, LayoutList, Presentation } from 'lucide-react';

export default function SlideController({
  currentSlide,
  totalSlides,
  nextSlide,
  prevSlide,
  mode,
  setMode,
  theme,
  toggleTheme
}) {
  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      background: 'var(--glass-bg)',
      border: '1px solid var(--border-color)',
      padding: '0.6rem 1.2rem',
      borderRadius: '9999px',
      boxShadow: 'var(--glass-shadow)',
      backdropFilter: 'var(--glass-blur)',
      WebkitBackdropFilter: 'var(--glass-blur)',
      transition: 'var(--transition-smooth)'
    }}>
      {/* Mode Toggle: Scroll vs Slide */}
      <div style={{ display: 'flex', borderRight: '1px solid var(--border-color)', paddingRight: '0.75rem', gap: '0.25rem' }}>
        <button
          onClick={() => setMode('scroll')}
          title="Ubah ke Mode Scroll (Web)"
          style={{
            background: mode === 'scroll' ? 'var(--primary)' : 'transparent',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: mode === 'scroll' ? '#fff' : 'var(--text-muted)',
            transition: 'var(--transition-fast)'
          }}
        >
          <LayoutList size={16} />
        </button>
        <button
          onClick={() => setMode('slide')}
          title="Ubah ke Mode Slide (Presentasi)"
          style={{
            background: mode === 'slide' ? 'var(--primary)' : 'transparent',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: mode === 'slide' ? '#fff' : 'var(--text-muted)',
            transition: 'var(--transition-fast)'
          }}
        >
          <Presentation size={16} />
        </button>
      </div>

      {/* Slide Navigation (Only visible/active in Slide Mode) */}
      {mode === 'slide' ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={prevSlide}
            disabled={currentSlide === 1}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: currentSlide === 1 ? 'not-allowed' : 'pointer',
              color: currentSlide === 1 ? 'var(--text-dark)' : 'var(--text-main)',
              transition: 'var(--transition-fast)'
            }}
          >
            <ChevronLeft size={18} />
          </button>
          
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--text-main)',
            minWidth: '70px',
            textAlign: 'center'
          }}>
            {currentSlide} / {totalSlides}
          </span>

          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: currentSlide === totalSlides ? 'not-allowed' : 'pointer',
              color: currentSlide === totalSlides ? 'var(--text-dark)' : 'var(--text-main)',
              transition: 'var(--transition-fast)'
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      ) : (
        <span style={{
          fontSize: '0.8rem',
          fontWeight: 600,
          color: 'var(--text-muted)',
          padding: '0 0.5rem'
        }}>
          Mode Scroll (Scroll ke bawah)
        </span>
      )}

      {/* Theme Toggle (Dark/Light) */}
      <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '0.75rem' }}>
        <button
          onClick={toggleTheme}
          title="Ganti Tema Warna"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-color)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-main)',
            transition: 'var(--transition-fast)'
          }}
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </div>
  );
}
