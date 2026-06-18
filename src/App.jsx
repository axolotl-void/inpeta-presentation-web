import React, { useState, useEffect } from 'react';
import { 
  MapPin, Calendar, AlertCircle, Target, Award, Cpu, 
  CheckCircle, Activity, BookOpen, User, Users, GraduationCap,
  Sparkles, Layers, ListChecks, HelpCircle
} from 'lucide-react';
import InteractiveMap from './components/InteractiveMap';
import PerformanceGauges from './components/PerformanceGauges';
import FeatureTable from './components/FeatureTable';
import SlideController from './components/SlideController';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [mode, setMode] = useState('slide'); // 'slide' or 'scroll'
  const [theme, setTheme] = useState('dark');
  const totalSlides = 9;

  // Toggle Theme (add/remove class from body)
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
  }, [theme]);

  // Slide navigation handlers
  const nextSlide = () => {
    if (currentSlide < totalSlides) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 1) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  // Keyboard Navigation Support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (mode !== 'slide') return;
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, mode]);

  // Auto-scroll to section in Scroll Mode when clicking slide indicators
  const scrollToSection = (index) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Content for each slide
  const slidesContent = [
    // Slide 1: Cover Page
    {
      id: 1,
      title: "RE-ENGINEERING SISTEM WEB GIS INPETA ACEH",
      subtitle: "Berbasis Single Page Application (SPA) Menggunakan React.js Untuk Meningkatkan Aksesibilitas Mobile Dan User Experience",
      content: (
        <div style={{ textAlign: 'center', margin: 'auto 0' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            padding: '0.4rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            color: 'var(--primary)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '1.5rem'
          }}>
            <Sparkles size={14} /> DISEMINASI LAPORAN MAGANG
          </div>
          
          <h1 className="text-gradient" style={{ 
            fontSize: '3rem', 
            lineHeight: 1.1, 
            marginBottom: '1rem',
            fontFamily: 'var(--font-heading)'
          }}>
            RE-ENGINEERING SISTEM WEB GIS INPETA ACEH
          </h1>
          
          <p style={{ 
            fontSize: '1.2rem', 
            maxWidth: '850px', 
            margin: '0 auto 3rem auto',
            color: 'var(--text-muted)'
          }}>
            Berbasis Single Page Application (SPA) Menggunakan React.js Untuk Meningkatkan Aksesibilitas Mobile Dan User Experience di UPTD Statistik DISKOMINSA Aceh
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '2rem',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ background: 'var(--primary-glow)', padding: '0.5rem', borderRadius: '8px' }}>
                <User size={20} color="var(--primary)" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dark)' }}>MAHASISWA</span>
                <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>Yogi Prasetya Sadewa</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>NIM. 23210060</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '0.5rem', borderRadius: '8px' }}>
                <GraduationCap size={20} color="var(--accent)" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dark)' }}>DOSEN PEMBIMBING LAPANGAN</span>
                <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>Mukhroji, S.ST., M.T.</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>NIDN. 1326099001</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '0.5rem', borderRadius: '8px' }}>
                <Users size={20} color="var(--warning)" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dark)' }}>MENTOR / PEMBIMBING MITRA</span>
                <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>Bobby Novrizan, S.Si</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>NIP. 198511162024211008</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    // Slide 2: Profil Instansi & Lokasi
    {
      id: 2,
      title: "Profil Instansi & Mitra Magang",
      subtitle: "Dinas Komunikasi, Informatika, dan Persandian (DISKOMINSA) Aceh",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="grid" style={{ gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem' }}>
            <div>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={18} /> UPTD Statistik DISKOMINSA Aceh
              </h3>
              <p style={{ marginBottom: '1rem', fontSize: '0.95rem' }}>
                UPTD Statistik (dibentuk berlandaskan Pergub Aceh No. 61 Tahun 2020) bertugas menyiapkan bahan perumusan kebijakan teknis di bidang <strong>pengumpulan, pengolahan, analisis, diseminasi data statistik daerah</strong>, serta pengembangan sistem informasi statistik terintegrasi dalam ekosistem <strong>Satu Data Aceh</strong>.
              </p>
              
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-date">30 Maret 2026 – 08 Juni 2026</div>
                  <div className="timeline-title">Durasi Pelaksanaan Magang</div>
                  <p style={{ fontSize: '0.85rem' }}>Dilaksanakan secara on-site di UPTD Statistik DISKOMINSA Aceh (Jln. Tgk. Cot Plieng No. 48, Kuta Alam, Banda Aceh) setiap hari kerja.</p>
                </div>
                <div className="timeline-item" style={{ marginBottom: 0 }}>
                  <div className="timeline-date">Fungsi Ke-4 UPTD Statistik</div>
                  <div className="timeline-title">Pengembangan Sistem Informasi</div>
                  <p style={{ fontSize: '0.85rem' }}>Proyek re-engineering inPETA ini merupakan implementasi langsung dari tugas pengembangan sistem yang modern, aman, dan mobile-friendly.</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="glass-card" style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.02)' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>Visi Utama Instansi</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  "Terwujudnya masyarakat yang mampu memilih dan memilah konsumsi informasi untuk membangun masyarakat Aceh yang beradab, beradat dan bermartabat dalam nuansa Islami serta tumbuhnya partisipasi dalam proses pembangunan."
                </p>
              </div>

              <div className="glass-card" style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.02)' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--warning)' }}>Alat / Tools Pendukung</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {['React.js', 'Node.js', 'PostgreSQL', 'Leaflet', 'Figma', 'Lighthouse', 'Vercel'].map(t => (
                    <span key={t} style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-color)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    // Slide 3: Latar Belakang & Masalah
    {
      id: 3,
      title: "Latar Belakang & Identifikasi Masalah",
      subtitle: "Mengapa re-engineering inPETA Aceh diperlukan?",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p style={{ fontSize: '0.95rem' }}>
            Platform **inPETA Aceh** adalah portal pemetaan interaktif yang menyajikan data sektoral peternakan di Provinsi Aceh. Selama magang, teridentifikasi sejumlah hambatan performa dan kegunaan pada sistem lama:
          </p>

          <div className="before-after-container">
            {/* Legacy MPA problems */}
            <div className="ba-card before">
              <h4 style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <AlertCircle size={18} /> Sistem Lama (Legacy MPA)
              </h4>
              <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                <li>
                  <strong>Multi-Page Architecture (MPA):</strong> Interaksi memicu pemuatan ulang halaman penuh (*full page reload*), meningkatkan latensi dan transfer bandwidth.
                </li>
                <li>
                  <strong>Tampilan Kaku & Tidak Responsif:</strong> Menu padat dan peta terpotong saat diakses via browser HP/tablet (tidak mendukung aksesibilitas mobile).
                </li>
                <li>
                  <strong>Data Statis:</strong> Tidak ada dashboard admin yang mudah diakses untuk meremajakan (CRUD) data dan info peta secara dinamis.
                </li>
              </ul>
            </div>

            {/* Re-Engineered SPA solutions */}
            <div className="ba-card after">
              <h4 style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <CheckCircle size={18} /> Sistem Baru (React SPA)
              </h4>
              <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                <li>
                  <strong>Single Page Application (SPA):</strong> Client-side rendering menghasilkan transisi antar-menu yang instan dan mulus tanpa reload.
                </li>
                <li>
                  <strong>Responsive Mobile-First:</strong> Menggunakan card-based layout dan tata letak menu modern yang dioptimalkan penuh untuk interaksi sentuh HP.
                </li>
                <li>
                  <strong>Dashboard Management System:</strong> Backend Node.js & PostgreSQL terintegrasi untuk CRUD berita, fasilitas, logo, dan peta secara real-time.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    // Slide 4: Tujuan & Manfaat
    {
      id: 4,
      title: "Tujuan & Manfaat Kegiatan Magang",
      subtitle: "Target pencapaian dan nilai kontribusi proyek",
      content: (
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target size={18} /> Tujuan Rekayasa Ulang
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.2rem', fontSize: '0.9rem' }}>
              <li>
                <strong>Analisis & Evaluasi:</strong> Mengukur kelemahan kegunaan (*usability*) dan responsivitas web inPETA eksisting menggunakan prinsip *Usability Heuristics*.
              </li>
              <li>
                <strong>Redesain Antarmuka:</strong> Membuat rancangan UI/UX bertema modern, clean, dan mobile-first (Figma/Canva).
              </li>
              <li>
                <strong>Implementasi SPA:</strong> Mengembangkan arsitektur web modern menggunakan pustaka utama React.js.
              </li>
              <li>
                <strong>Pengujian Lintas Perangkat:</strong> Memastikan fungsionalitas peta dan kontrol admin berjalan 100% lancar di desktop, tablet, dan smartphone.
              </li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: 'var(--accent)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={18} /> Manfaat Bagi Stakeholder
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.8rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderLeft: '3px solid var(--primary)', borderRadius: '4px' }}>
                <strong>Instansi (DISKOMINSA):</strong> Memperoleh portal GIS modern yang mudah diperbarui dan siap digunakan untuk menyajikan data statistik daerah.
              </div>
              <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderLeft: '3px solid var(--accent)', borderRadius: '4px' }}>
                <strong>Pengguna Publik:</strong> Kemudahan akses sebaran ternak daerah melalui perangkat mobile dengan peta interaktif yang responsif.
              </div>
              <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderLeft: '3px solid var(--warning)', borderRadius: '4px' }}>
                <strong>Akademik (Kampus UBBG):</strong> Referensi tambahan studi kasus rekayasa sistem nyata menggunakan teknologi React di instansi pemerintah daerah.
              </div>
            </div>
          </div>
        </div>
      )
    },
    // Slide 5: Landasan Teori & Arsitektur
    {
      id: 5,
      title: "Teknologi & Arsitektur Sistem Baru",
      subtitle: "Framework dan library pendukung dalam pembangunan SPA",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p style={{ fontSize: '0.95rem' }}>
            Ekosistem teknologi inPETA baru dirancang dengan arsitektur terpisah (decoupled) untuk performa optimal dan kemudahan pemeliharaan:
          </p>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
            <div className="glass-card" style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.01)' }}>
              <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Cpu size={16} /> React.js
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Library UI utama untuk merakit antarmuka modular berbasis komponen, memanfaatkan Virtual DOM untuk render cepat.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.01)' }}>
              <div style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Layers size={16} /> Leaflet.js
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Library pemetaan open-source yang ringan, disematkan melalui `react-leaflet` untuk layer spasial GIS.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.01)' }}>
              <div style={{ color: '#83cd29', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Activity size={16} /> Node.js & Express
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Runtime server-side untuk melayani endpoint RESTful API secara asinkron dengan konsep non-blocking I/O.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.01)' }}>
              <div style={{ color: '#336791', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ListChecks size={16} /> PostgreSQL
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                RDBMS relasional kelas enterprise untuk mengelola penyimpanan tabel relasi data spasial peternakan.
              </p>
            </div>
          </div>
        </div>
      )
    },
    // Slide 6: Live Web GIS Demo
    {
      id: 6,
      title: "Demonstrasi Live Web GIS inPETA",
      subtitle: "Interaksi pemetaan langsung terintegrasi di presentasi",
      content: (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <InteractiveMap />
        </div>
      )
    },
    // Slide 7: Hasil & 22 Testing Fitur
    {
      id: 7,
      title: "Hasil Implementasi & Pengujian Fitur",
      subtitle: "Daftar fungsionalitas sistem (Tabel Uji Fitur 4.2)",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <FeatureTable />
        </div>
      )
    },
    // Slide 8: Hasil Pengujian & Lighthouse
    {
      id: 8,
      title: "Evaluasi Peningkatan Kinerja",
      subtitle: "Skor Audit Google Lighthouse & Dampak User Experience",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <PerformanceGauges />
        </div>
      )
    },
    // Slide 9: Kesimpulan & Saran
    {
      id: 9,
      title: "Kesimpulan & Rekomendasi",
      subtitle: "Penutupan dan arahan pengembangan masa depan",
      content: (
        <div className="grid" style={{ gridTemplateColumns: '1.1fr 0.9fr', gap: '2rem' }}>
          <div>
            <h3 style={{ color: 'var(--primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={18} /> Kesimpulan Proyek
            </h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
              Proses **re-engineering Web GIS inPETA Aceh** berhasil diselesaikan dengan transisi arsitektur ke **React.js SPA**. 
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <li><strong>Navigasi Seamless:</strong> Waktu rendering terpangkas drastis tanpa perlu pemuatan ulang halaman penuh.</li>
              <li><strong>Aksesibilitas Mobile:</strong> Antarmuka terbukti responsif saat diuji pada berbagai resolusi browser smartphone.</li>
              <li><strong>Manajemen Efisien:</strong> Panel Admin berhasil memusatkan kelola data (CRUD) sehingga mempermudah operasional staf statistik.</li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: 'var(--accent)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <HelpCircle size={18} /> Saran & Rekomendasi
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem' }}>
              <div style={{ padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', borderLeft: '2px solid var(--primary)' }}>
                <strong>Untuk Instansi:</strong> Memperbarui data peta secara berkala untuk menjaga akurasi serta merencanakan rilis aplikasi mobile mandiri.
              </div>
              <div style={{ padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', borderLeft: '2px solid var(--accent)' }}>
                <strong>Untuk Mahasiswa:</strong> Mengasah penguasaan backend Node.js dan pemodelan database PostgreSQL lebih mendalam.
              </div>
              <div style={{ padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', borderLeft: '2px solid var(--warning)' }}>
                <strong>Untuk Kampus:</strong> Meningkatkan materi kuliah berbasis praktik pemrograman web modern dan visualisasi peta geospasial (GIS).
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      {/* Decorative Blur Background Blobs */}
      <div className="gradient-blob blob-blue"></div>
      <div className="gradient-blob blob-teal"></div>

      {/* Navigation Header */}
      <nav className="navbar flex items-center">
        <div className="container flex items-center justify-between">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🗺️</span>
            <div>
              <span style={{ 
                fontFamily: 'var(--font-heading)', 
                fontWeight: 700, 
                fontSize: '1.1rem',
                letterSpacing: '-0.03em',
                color: 'var(--text-main)'
              }}>
                inPETA <span style={{ color: 'var(--primary)' }}>Aceh</span>
              </span>
              <span style={{
                background: 'rgba(59, 130, 246, 0.15)',
                color: 'var(--primary)',
                padding: '0.1rem 0.4rem',
                borderRadius: '4px',
                fontSize: '0.65rem',
                fontWeight: 700,
                marginLeft: '0.5rem',
                verticalAlign: 'middle'
              }}>
                SPA RE-ENGINEERING
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {mode === 'scroll' && (
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', fontWeight: 600 }}>
                {slidesContent.map((s, idx) => (
                  <button 
                    key={s.id}
                    onClick={() => scrollToSection(idx + 1)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-heading)'
                    }}
                    onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
                    onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
                  >
                    S{s.id}
                  </button>
                ))}
              </div>
            )}
            
            <div style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              background: 'rgba(255,255,255,0.03)',
              padding: '0.3rem 0.6rem',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              fontWeight: 500
            }}>
              Yogi Prasetya | Prodi Ilmu Komputer UBBG
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Layout */}
      {mode === 'slide' ? (
        /* Slide Deck View */
        <div className="slide-layout">
          <div className="slide-container">
            {slidesContent.map((slide, index) => {
              const slideNum = index + 1;
              const isActive = currentSlide === slideNum;
              const isPrev = currentSlide > slideNum;
              
              return (
                <div 
                  key={slide.id} 
                  className={`slide-wrapper ${isActive ? 'active' : ''} ${isPrev ? 'prev' : ''}`}
                >
                  <div className="slide-content-card">
                    {/* Header of the Slide */}
                    {slide.id > 1 && (
                      <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          BAGIAN 0{slide.id} — {slide.subtitle}
                        </div>
                        <h2 style={{ fontSize: '1.8rem', margin: 0 }}>
                          {slide.title}
                        </h2>
                      </div>
                    )}
                    {/* Dynamic Slide Content */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: slide.id === 1 ? 'center' : 'stretch' }}>
                      {slide.content}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Scrollable Web Page View */
        <div className="scroll-layout container">
          {slidesContent.map((slide, index) => (
            <section 
              key={slide.id} 
              id={`section-${index + 1}`} 
              className="scroll-section animate-fade-in"
            >
              <div className="glass-card">
                {slide.id > 1 && (
                  <div style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      BAGIAN 0{slide.id} — {slide.subtitle}
                    </span>
                    <h2 style={{ fontSize: '2.2rem', marginTop: '0.25rem', marginBottom: 0 }}>
                      {slide.title}
                    </h2>
                  </div>
                )}
                <div>
                  {slide.content}
                </div>
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Slide / Controls overlay */}
      <SlideController 
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        mode={mode}
        setMode={setMode}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </>
  );
}
