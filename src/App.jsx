import React, { useEffect } from 'react';
import { 
  MapPin, Calendar, AlertCircle, Target, Award, Cpu, 
  CheckCircle, Activity, BookOpen, User, Users, GraduationCap,
  Sparkles, Layers, ListChecks, HelpCircle, ChevronDown
} from 'lucide-react';
import InteractiveMap from './components/InteractiveMap';
import PerformanceGauges from './components/PerformanceGauges';
import FeatureTable from './components/FeatureTable';
import Scene3D from './components/Scene3D';
import WebGLGlobe from './components/WebGLGlobe';
import SectionIndicator from './components/SectionIndicator';
import useScrollProgress from './hooks/useScrollProgress';

// Profile photos
import photoYogi from './assets/yogi-prasetya.jpeg';
import photoMukhroji from './assets/mukhroji.jpg';
import photoBobby from './assets/Bobby-Novrizan.png';

export default function App() {
  const totalSections = 9;
  const { scrollProgress, currentSection } = useScrollProgress(totalSections);

  useEffect(() => {
    document.body.className = 'dark-theme';
  }, []);

  const showGlobe = scrollProgress < 0.35 || scrollProgress >= 0.85;
  const showLaptop = scrollProgress >= 0.35 && scrollProgress < 0.85;

  return (
    <>
      {/* === WebGL EARTH 3D LAYER (fixed behind everything) === */}
      {showGlobe && <WebGLGlobe scrollProgress={scrollProgress} />}

      {/* === 3D CANVAS LAYER (fixed behind everything) === */}
      {showLaptop && <Scene3D scrollProgress={scrollProgress} />}

      {/* === FLOATING NAV BAR === */}
      <nav className="navbar-3d" id="navbar-3d">
        <div className="navbar-3d-inner">
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
                fontSize: '0.6rem',
                fontWeight: 700,
                marginLeft: '0.5rem',
                verticalAlign: 'middle'
              }}>
                3D EXPERIENCE
              </span>
            </div>
          </div>

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
      </nav>

      {/* === SCROLL SECTION INDICATOR (right side dots) === */}
      <SectionIndicator currentSection={currentSection} totalSections={totalSections} />

      {/* === SCROLL PROGRESS BAR === */}
      <div className="scroll-progress-bar" id="scroll-progress-bar">
        <div 
          className="scroll-progress-fill" 
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* ========================================== */}
      {/* === SCROLLABLE CONTENT SECTIONS (HTML) === */}
      {/* ========================================== */}
      <div className="scroll-content" id="scroll-content">

        {/* ── SECTION 1: HERO COVER — Cinematic ── */}
        <section className="scroll-section hero-section" id="section-1">
          <div className="section-inner hero-inner">
            <div className="hero-badge">
              DISEMINASI LAPORAN MAGANG
            </div>
            
            {/* Split Title — Mixed Weight Typography */}
            <h1 className="hero-title-block">
              <span className="hero-line hero-line-1">
                {['RE-ENGINEERING'].map((word, i) => (
                  <span key={i} className="word-reveal" style={{ animationDelay: `${0.8 + i * 0.08}s` }}>
                    {word}
                  </span>
                ))}
              </span>
              <span className="hero-line hero-line-2">
                {['SISTEM', 'WEB', 'GIS'].map((word, i) => (
                  <span key={i} className="word-reveal" style={{ animationDelay: `${1.0 + i * 0.08}s` }}>
                    {word}
                  </span>
                ))}
              </span>
              <span className="hero-line hero-line-3">
                {['inPETA', 'Aceh'].map((word, i) => (
                  <span key={i} className="word-reveal hero-line-3-text" style={{ animationDelay: `${1.25 + i * 0.1}s` }}>
                    {word}
                  </span>
                ))}
              </span>
            </h1>
            
            {/* Glass Frame Subtitle */}
            <div className="subtitle-glass-frame">
              <p className="hero-subtitle">
                Berbasis Single Page Application (SPA) Menggunakan React.js Untuk Meningkatkan Aksesibilitas Mobile Dan User Experience di UPTD Statistik DISKOMINSA Aceh
              </p>
            </div>

            {/* Profile Cards — Premium */}
            <div className="profile-cards-row">
              <div className="profile-card" id="card-mahasiswa">
                <div className="profile-photo-wrapper">
                  <img src={photoYogi} alt="Yogi Prasetya Sadewa" className="profile-photo" />
                </div>
                <span className="profile-card-label">Mahasiswa</span>
                <p className="profile-card-name">Yogi Prasetya Sadewa</p>
                <span className="profile-card-id">NIM. 23210060</span>
              </div>

              <div className="profile-card" id="card-dosen">
                <div className="profile-photo-wrapper">
                  <img src={photoMukhroji} alt="Mukhroji, S.ST., M.T." className="profile-photo" />
                </div>
                <span className="profile-card-label">Dosen Pembimbing</span>
                <p className="profile-card-name">Mukhroji, S.ST., M.T.</p>
                <span className="profile-card-id">NIDN. 1326099001</span>
              </div>

              <div className="profile-card" id="card-mentor">
                <div className="profile-photo-wrapper">
                  <img src={photoBobby} alt="Bobby Novrizan, S.Si" className="profile-photo" />
                </div>
                <span className="profile-card-label">Mentor Mitra</span>
                <p className="profile-card-name">Bobby Novrizan, S.Si</p>
                <span className="profile-card-id">NIP. 198511162024211008</span>
              </div>
            </div>

            <div className="scroll-cta">
              <ChevronDown size={18} className="bounce-arrow" />
              <span>Scroll untuk melihat presentasi</span>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: PROFIL INSTANSI ── */}
        <section className="scroll-section" id="section-2">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-tag">BAGIAN 02 — Dinas Komunikasi, Informatika, dan Persandian (DISKOMINSA) Aceh</span>
              <h2 className="section-title">Profil Instansi &amp; Mitra Magang</h2>
            </div>

            <div className="content-grid two-col">
              <div className="glass-card-3d">
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
                    <p style={{ fontSize: '0.85rem' }}>Dilaksanakan secara on-site di UPTD Statistik DISKOMINSA Aceh (Jln. Tgk. Cot Plieng No. 48, Kuta Alam, Banda Aceh).</p>
                  </div>
                  <div className="timeline-item" style={{ marginBottom: 0 }}>
                    <div className="timeline-date">Fungsi Ke-4 UPTD Statistik</div>
                    <div className="timeline-title">Pengembangan Sistem Informasi</div>
                    <p style={{ fontSize: '0.85rem' }}>Proyek re-engineering inPETA ini merupakan implementasi langsung dari tugas pengembangan sistem yang modern, aman, dan mobile-friendly.</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="glass-card-3d" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>Visi Utama Instansi</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    "Terwujudnya masyarakat yang mampu memilih dan memilah konsumsi informasi untuk membangun masyarakat Aceh yang beradab, beradat dan bermartabat dalam nuansa Islami serta tumbuhnya partisipasi dalam proses pembangunan."
                  </p>
                </div>

                <div className="glass-card-3d" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--warning)' }}>Alat / Tools Pendukung</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                    {['React.js', 'Node.js', 'PostgreSQL', 'Leaflet', 'Figma', 'Lighthouse', 'Vercel'].map(t => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: LATAR BELAKANG & MASALAH ── */}
        <section className="scroll-section" id="section-3">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-tag">BAGIAN 03 — Mengapa re-engineering inPETA Aceh diperlukan?</span>
              <h2 className="section-title">Latar Belakang &amp; Identifikasi Masalah</h2>
            </div>

            <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Platform <strong>inPETA Aceh</strong> adalah portal pemetaan interaktif yang menyajikan data sektoral peternakan di Provinsi Aceh. Selama magang, teridentifikasi sejumlah hambatan performa dan kegunaan pada sistem lama:
            </p>

            <div className="before-after-container">
              <div className="ba-card before glass-card-3d">
                <h4 style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <AlertCircle size={18} /> Sistem Lama (Legacy MPA)
                </h4>
                <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                  <li>
                    <strong>Multi-Page Architecture (MPA):</strong> Interaksi memicu pemuatan ulang halaman penuh (<em>full page reload</em>), meningkatkan latensi dan transfer bandwidth.
                  </li>
                  <li>
                    <strong>Tampilan Kaku &amp; Tidak Responsif:</strong> Menu padat dan peta terpotong saat diakses via browser HP/tablet.
                  </li>
                  <li>
                    <strong>Data Statis:</strong> Tidak ada dashboard admin yang mudah diakses untuk meremajakan (CRUD) data dan info peta secara dinamis.
                  </li>
                </ul>
              </div>

              <div className="ba-card after glass-card-3d">
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
                    <strong>Dashboard Management System:</strong> Backend Node.js &amp; PostgreSQL terintegrasi untuk CRUD berita, fasilitas, logo, dan peta secara real-time.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: TUJUAN & MANFAAT ── */}
        <section className="scroll-section" id="section-4">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-tag">BAGIAN 04 — Target pencapaian dan nilai kontribusi proyek</span>
              <h2 className="section-title">Tujuan &amp; Manfaat Kegiatan Magang</h2>
            </div>

            <div className="content-grid two-col">
              <div className="glass-card-3d">
                <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Target size={18} /> Tujuan Rekayasa Ulang
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.2rem', fontSize: '0.9rem' }}>
                  <li>
                    <strong>Analisis &amp; Evaluasi:</strong> Mengukur kelemahan kegunaan (<em>usability</em>) dan responsivitas web inPETA eksisting menggunakan prinsip <em>Usability Heuristics</em>.
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

              <div className="glass-card-3d">
                <h3 style={{ color: 'var(--accent)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Award size={18} /> Manfaat Bagi Stakeholder
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.8rem' }}>
                  <div className="benefit-item" style={{ borderLeftColor: 'var(--primary)' }}>
                    <strong>Instansi (DISKOMINSA):</strong> Memperoleh portal GIS modern yang mudah diperbarui dan siap digunakan untuk menyajikan data statistik daerah.
                  </div>
                  <div className="benefit-item" style={{ borderLeftColor: 'var(--accent)' }}>
                    <strong>Pengguna Publik:</strong> Kemudahan akses sebaran ternak daerah melalui perangkat mobile dengan peta interaktif yang responsif.
                  </div>
                  <div className="benefit-item" style={{ borderLeftColor: 'var(--warning)' }}>
                    <strong>Akademik (Kampus UBBG):</strong> Referensi tambahan studi kasus rekayasa sistem nyata menggunakan teknologi React di instansi pemerintah daerah.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: TEKNOLOGI & ARSITEKTUR ── */}
        <section className="scroll-section" id="section-5">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-tag">BAGIAN 05 — Framework dan library pendukung dalam pembangunan SPA</span>
              <h2 className="section-title">Teknologi &amp; Arsitektur Sistem Baru</h2>
            </div>

            <div className="content-grid two-col">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                  Ekosistem teknologi inPETA baru dirancang dengan arsitektur terpisah (decoupled) untuk performa optimal dan kemudahan pemeliharaan:
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div className="glass-card-3d tech-item">
                    <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Cpu size={16} /> React.js
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Library UI utama untuk merakit antarmuka modular berbasis komponen, memanfaatkan Virtual DOM untuk render cepat.
                    </p>
                  </div>

                  <div className="glass-card-3d tech-item">
                    <div style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Layers size={16} /> Leaflet.js
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Library pemetaan open-source yang ringan, disematkan melalui react-leaflet untuk layer spasial GIS.
                    </p>
                  </div>

                  <div className="glass-card-3d tech-item">
                    <div style={{ color: '#83cd29', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Activity size={16} /> Node.js &amp; Express
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Runtime server-side untuk melayani endpoint RESTful API secara asinkron dengan konsep non-blocking I/O.
                    </p>
                  </div>

                  <div className="glass-card-3d tech-item">
                    <div style={{ color: '#336791', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <ListChecks size={16} /> PostgreSQL
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      RDBMS relasional kelas enterprise untuk mengelola penyimpanan tabel relasi data spasial peternakan.
                    </p>
                  </div>
                </div>
              </div>

              <div className="laptop-spacer" style={{ pointerEvents: 'none' }}>
                {/* Empty column to let the 3D laptop float beautifully on the right side */}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 6: LIVE WEB GIS DEMO ── */}
        <section className="scroll-section section-wide" id="section-6">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-tag">BAGIAN 06 — Interaksi pemetaan langsung terintegrasi di presentasi</span>
              <h2 className="section-title">Demonstrasi Live Web GIS inPETA</h2>
            </div>

            <div className="glass-card-3d map-container-3d">
              <InteractiveMap />
            </div>
          </div>
        </section>

        {/* ── SECTION 7: HASIL IMPLEMENTASI ── */}
        <section className="scroll-section section-wide" id="section-7">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-tag">BAGIAN 07 — Daftar fungsionalitas sistem (Tabel Uji Fitur 4.2)</span>
              <h2 className="section-title">Hasil Implementasi &amp; Pengujian Fitur</h2>
            </div>

            <div className="glass-card-3d">
              <FeatureTable />
            </div>
          </div>
        </section>

        {/* ── SECTION 8: LIGHTHOUSE PERFORMANCE ── */}
        <section className="scroll-section" id="section-8">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-tag">BAGIAN 08 — Skor Audit Google Lighthouse &amp; Dampak User Experience</span>
              <h2 className="section-title">Evaluasi Peningkatan Kinerja</h2>
            </div>

            <div className="glass-card-3d">
              <PerformanceGauges />
            </div>
          </div>
        </section>

        {/* ── SECTION 9: KESIMPULAN ── */}
        <section className="scroll-section" id="section-9">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-tag">BAGIAN 09 — Penutupan dan arahan pengembangan masa depan</span>
              <h2 className="section-title">Kesimpulan &amp; Rekomendasi</h2>
            </div>

            <div className="content-grid two-col">
              <div className="glass-card-3d">
                <h3 style={{ color: 'var(--primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={18} /> Kesimpulan Proyek
                </h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                  Proses <strong>re-engineering Web GIS inPETA Aceh</strong> berhasil diselesaikan dengan transisi arsitektur ke <strong>React.js SPA</strong>. 
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <li><strong>Navigasi Seamless:</strong> Waktu rendering terpangkas drastis tanpa perlu pemuatan ulang halaman penuh.</li>
                  <li><strong>Aksesibilitas Mobile:</strong> Antarmuka terbukti responsif saat diuji pada berbagai resolusi browser smartphone.</li>
                  <li><strong>Manajemen Efisien:</strong> Panel Admin berhasil memusatkan kelola data (CRUD) sehingga mempermudah operasional staf statistik.</li>
                </ul>
              </div>

              <div className="glass-card-3d">
                <h3 style={{ color: 'var(--accent)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <HelpCircle size={18} /> Saran &amp; Rekomendasi
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem' }}>
                  <div className="benefit-item" style={{ borderLeftColor: 'var(--primary)' }}>
                    <strong>Untuk Instansi:</strong> Memperbarui data peta secara berkala untuk menjaga akurasi serta merencanakan rilis aplikasi mobile mandiri.
                  </div>
                  <div className="benefit-item" style={{ borderLeftColor: 'var(--accent)' }}>
                    <strong>Untuk Mahasiswa:</strong> Mengasah penguasaan backend Node.js dan pemodelan database PostgreSQL lebih mendalam.
                  </div>
                  <div className="benefit-item" style={{ borderLeftColor: 'var(--warning)' }}>
                    <strong>Untuk Kampus:</strong> Meningkatkan materi kuliah berbasis praktik pemrograman web modern dan visualisasi peta geospasial (GIS).
                  </div>
                </div>
              </div>
            </div>

            {/* Thank you footer */}
            <div className="thank-you">
              <h2 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                Terima Kasih
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Yogi Prasetya Sadewa — Program Studi Ilmu Komputer — Universitas Bina Bangsa Getsempena
              </p>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
