import React, { useEffect } from 'react';
import { 
  MapPin, Calendar, AlertCircle, Target, Award, Cpu, 
  CheckCircle, Activity, BookOpen, User, Users, GraduationCap,
  Sparkles, Layers, ListChecks, HelpCircle, ChevronDown
} from 'lucide-react';
import InteractiveMap from './components/InteractiveMap';
import PerformanceGauges from './components/PerformanceGauges';
import FeatureTable from './components/FeatureTable';
import WebGLGlobe from './components/WebGLGlobe';
import SectionIndicator from './components/SectionIndicator';
import useScrollProgress from './hooks/useScrollProgress';

// Profile photos
import photoYogi from './assets/yogi-prasetya.jpeg';
import photoMukhroji from './assets/mukhroji.jpg';
import photoBobby from './assets/Bobby-Novrizan.png';

// inPETA screenshots
import imgLamaLanding from './assets/inpeta-foto/landing page inpeta LAMA_11zon.png';
import imgBaruLanding from './assets/inpeta-foto/landing page inpeta baru_11zon.png';

export default function App() {
  const totalSections = 9;
  const { scrollProgress, currentSection } = useScrollProgress(totalSections);

  useEffect(() => {
    document.body.className = 'dark-theme';
  }, []);

  return (
    <>
      {/* === WebGL EARTH 3D LAYER (fixed behind everything) === */}
      <WebGLGlobe scrollProgress={scrollProgress} />

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
        <section className={`scroll-section instansi-section ${currentSection === 2 ? 'active' : ''}`} id="section-2">
          <div className="section-inner instansi-inner">
            <div className="split-layout-left">
              <div className="section-header-modern">
                <span className="section-tag-modern">BAGIAN 02 — DISKOMINSA ACEH</span>
                <h2 className="section-title-modern">Profil Instansi &amp; Mitra Magang</h2>
              </div>

              {/* Main Profile Card */}
              <div className="premium-glass-card card-reveal-1">
                <h3 className="card-inner-title">
                  <MapPin size={18} className="icon-pulse" /> UPTD Statistik DISKOMINSA Aceh
                </h3>
                <p className="card-description">
                  UPTD Statistik (Pergub Aceh No. 61/2020) menyelenggarakan perumusan kebijakan teknis di bidang <strong>pengumpulan, pengolahan, analisis, diseminasi data statistik sektoral</strong> untuk mendukung ekosistem <strong>Satu Data Aceh</strong>.
                </p>
                
                <div className="modern-timeline">
                  <div className="timeline-node">
                    <div className="node-dot"></div>
                    <div className="node-content">
                      <span className="node-date">30 Maret – 08 Juni 2026</span>
                      <span className="node-title">Durasi Pelaksanaan Magang</span>
                      <p className="node-desc">Dilaksanakan secara on-site di UPTD Statistik DISKOMINSA Aceh (Jln. Tgk. Cot Plieng No. 48, Kuta Alam, Banda Aceh).</p>
                    </div>
                  </div>
                  <div className="timeline-node">
                    <div className="node-dot"></div>
                    <div className="node-content">
                      <span className="node-date">Fungsi Ke-4 UPTD Statistik</span>
                      <span className="node-title">Pengembangan Sistem Informasi</span>
                      <p className="node-desc">Proyek re-engineering inPETA ini merupakan implementasi langsung dari tugas pengembangan sistem yang modern, aman, dan mobile-friendly.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visi Card */}
              <div className="premium-glass-card card-reveal-2 card-accent-green">
                <h4 className="card-inner-subtitle accent-green">Visi Utama Instansi</h4>
                <p className="card-vision-text">
                  "Terwujudnya masyarakat yang mampu memilih dan memilah konsumsi informasi untuk membangun masyarakat Aceh yang beradab, beradat dan bermartabat dalam nuansa Islami serta tumbuhnya partisipasi dalam proses pembangunan."
                </p>
              </div>

              {/* Tools Card */}
              <div className="premium-glass-card card-reveal-3 card-accent-purple">
                <h4 className="card-inner-subtitle accent-purple">Alat / Tools Pendukung</h4>
                <div className="tech-tags-container">
                  {['React.js', 'Node.js', 'PostgreSQL', 'Leaflet', 'Figma', 'Lighthouse', 'Vercel'].map(t => (
                    <span key={t} className="tech-tag-premium">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: LATAR BELAKANG & MASALAH ── */}
        <section className={`scroll-section masalah-section ${currentSection === 3 ? 'active' : ''}`} id="section-3">
          <div className="section-inner">
            <div className="section-header-modern">
              <span className="section-tag-modern">BAGIAN 03 — Mengapa re-engineering inPETA Aceh diperlukan?</span>
              <h2 className="section-title-modern">Latar Belakang &amp; Identifikasi Masalah</h2>
            </div>

            <p className="section-intro-text">
              Platform <strong>inPETA Aceh</strong> adalah portal pemetaan interaktif yang menyajikan data sektoral peternakan di Provinsi Aceh. Selama magang, teridentifikasi sejumlah hambatan performa dan kegunaan pada sistem lama:
            </p>

            <div className="before-after-container">
              <div className="ba-card before premium-glass-card card-reveal-left">
                <h4 style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '1.05rem', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>
                  <AlertCircle size={18} /> Sistem Lama (Legacy MPA)
                </h4>
                
                {/* Browser Mockup */}
                <div className="browser-mockup">
                  <div className="browser-header">
                    <div className="browser-dot red"></div>
                    <div className="browser-dot yellow"></div>
                    <div className="browser-dot green"></div>
                    <div className="browser-address">http://inpeta.acehprov.go.id/legacy</div>
                  </div>
                  <div className="browser-body">
                    <img src={imgLamaLanding} alt="inPETA Legacy Version" className="browser-image" />
                  </div>
                </div>

                <div className="custom-icon-list">
                  <div className="custom-list-item">
                    <AlertCircle size={16} className="list-icon text-danger" />
                    <div>
                      <strong>Multi-Page Architecture (MPA):</strong> Interaksi memicu pemuatan ulang halaman penuh (<em>full page reload</em>), meningkatkan latensi dan transfer bandwidth.
                    </div>
                  </div>
                  <div className="custom-list-item">
                    <AlertCircle size={16} className="list-icon text-danger" />
                    <div>
                      <strong>Tampilan Kaku &amp; Tidak Responsif:</strong> Menu padat dan peta terpotong saat diakses via browser HP/tablet.
                    </div>
                  </div>
                  <div className="custom-list-item">
                    <AlertCircle size={16} className="list-icon text-danger" />
                    <div>
                      <strong>Data Statis:</strong> Tidak ada dashboard admin yang mudah diakses untuk meremajakan (CRUD) data dan info peta secara dinamis.
                    </div>
                  </div>
                </div>
              </div>

              <div className="ba-card after premium-glass-card card-reveal-right card-accent-green">
                <h4 style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '1.05rem', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>
                  <CheckCircle size={18} /> Sistem Baru (React SPA)
                </h4>

                {/* Browser Mockup */}
                <div className="browser-mockup">
                  <div className="browser-header">
                    <div className="browser-dot red"></div>
                    <div className="browser-dot yellow"></div>
                    <div className="browser-dot green"></div>
                    <div className="browser-address">http://inpeta.acehprov.go.id/spa</div>
                  </div>
                  <div className="browser-body">
                    <img src={imgBaruLanding} alt="inPETA Revamped React SPA" className="browser-image" />
                  </div>
                </div>

                <div className="custom-icon-list">
                  <div className="custom-list-item">
                    <CheckCircle size={16} className="list-icon text-success" />
                    <div>
                      <strong>Single Page Application (SPA):</strong> Client-side rendering menghasilkan transisi antar-menu yang instan dan mulus tanpa reload.
                    </div>
                  </div>
                  <div className="custom-list-item">
                    <CheckCircle size={16} className="list-icon text-success" />
                    <div>
                      <strong>Responsive Mobile-First:</strong> Menggunakan card-based layout dan tata letak menu modern yang dioptimalkan penuh untuk interaksi sentuh HP.
                    </div>
                  </div>
                  <div className="custom-list-item">
                    <CheckCircle size={16} className="list-icon text-success" />
                    <div>
                      <strong>Dashboard Management System:</strong> Backend Node.js &amp; PostgreSQL terintegrasi untuk CRUD berita, fasilitas, logo, dan peta secara real-time.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: TUJUAN & MANFAAT ── */}
        <section className={`scroll-section tujuan-section ${currentSection === 4 ? 'active' : ''}`} id="section-4">
          <div className="section-inner">
            <div className="section-header-modern">
              <span className="section-tag-modern">BAGIAN 04 — Target pencapaian dan nilai kontribusi proyek</span>
              <h2 className="section-title-modern">Tujuan &amp; Manfaat Kegiatan Magang</h2>
            </div>

            <div className="content-grid two-col">
              {/* Tujuan Card */}
              <div className="premium-glass-card card-reveal-left">
                <h3 className="card-inner-title">
                  <Target size={18} /> Tujuan Rekayasa Ulang
                </h3>
                <div className="custom-icon-list" style={{ gap: '1.2rem' }}>
                  <div className="custom-list-item">
                    <Target size={16} className="list-icon text-blue" style={{ color: 'var(--primary)', filter: 'drop-shadow(0 0 4px var(--primary-glow))' }} />
                    <div>
                      <strong>Analisis &amp; Evaluasi:</strong> Mengukur kelemahan kegunaan (<em>usability</em>) dan responsivitas web inPETA eksisting menggunakan prinsip <em>Usability Heuristics</em>.
                    </div>
                  </div>
                  <div className="custom-list-item">
                    <Target size={16} className="list-icon text-blue" style={{ color: 'var(--primary)', filter: 'drop-shadow(0 0 4px var(--primary-glow))' }} />
                    <div>
                      <strong>Redesain Antarmuka:</strong> Membuat rancangan UI/UX bertema modern, clean, dan mobile-first (Figma/Canva).
                    </div>
                  </div>
                  <div className="custom-list-item">
                    <Target size={16} className="list-icon text-blue" style={{ color: 'var(--primary)', filter: 'drop-shadow(0 0 4px var(--primary-glow))' }} />
                    <div>
                      <strong>Implementasi SPA:</strong> Mengembangkan arsitektur web modern menggunakan pustaka utama React.js.
                    </div>
                  </div>
                  <div className="custom-list-item">
                    <Target size={16} className="list-icon text-blue" style={{ color: 'var(--primary)', filter: 'drop-shadow(0 0 4px var(--primary-glow))' }} />
                    <div>
                      <strong>Pengujian Lintas Perangkat:</strong> Memastikan fungsionalitas peta dan kontrol admin berjalan 100% lancar di desktop, tablet, dan smartphone.
                    </div>
                  </div>
                </div>
              </div>

              {/* Manfaat Card */}
              <div className="premium-glass-card card-reveal-right card-accent-green">
                <h3 className="card-inner-title" style={{ color: 'var(--accent)' }}>
                  <Award size={18} /> Manfaat Bagi Stakeholder
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1rem' }}>
                  {/* Benefit Instansi */}
                  <div className="premium-benefit-item benefit-accent-blue">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                      <Users size={16} style={{ color: 'var(--primary)', filter: 'drop-shadow(0 0 4px var(--primary-glow))' }} />
                      <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>Instansi (DISKOMINSA)</strong>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                      Memperoleh portal GIS modern yang mudah diperbarui dan siap digunakan untuk menyajikan data statistik daerah secara dinamis.
                    </p>
                  </div>

                  {/* Benefit Publik */}
                  <div className="premium-benefit-item benefit-accent-green">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                      <Activity size={16} style={{ color: 'var(--accent)', filter: 'drop-shadow(0 0 4px var(--accent-glow))' }} />
                      <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>Pengguna Publik</strong>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                      Kemudahan akses sebaran ternak daerah melalui perangkat mobile dengan peta interaktif yang responsif.
                    </p>
                  </div>

                  {/* Benefit Akademik */}
                  <div className="premium-benefit-item benefit-accent-purple">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                      <GraduationCap size={16} style={{ color: '#a78bfa', filter: 'drop-shadow(0 0 4px rgba(167, 139, 250, 0.4))' }} />
                      <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>Akademik (Kampus UBBG)</strong>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                      Referensi tambahan studi kasus rekayasa sistem nyata menggunakan teknologi React di instansi pemerintah daerah.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: TEKNOLOGI & ARSITEKTUR ── */}
        <section className={`scroll-section tech-section ${currentSection === 5 ? 'active' : ''}`} id="section-5">
          <div className="section-inner">
            <div className="section-header-modern">
              <span className="section-tag-modern">BAGIAN 05 — Framework dan library pendukung dalam pembangunan SPA</span>
              <h2 className="section-title-modern">Teknologi &amp; Arsitektur Sistem Baru</h2>
            </div>

            <div className="content-grid two-col">
              <div className="card-reveal-left tech-cards-container">
                <p className="tech-intro-text">
                  Ekosistem teknologi inPETA baru dirancang dengan arsitektur terpisah (*decoupled*) untuk performa optimal, loading cepat, dan kemudahan pemeliharaan jangka panjang:
                </p>

                <div className="tech-grid-modern">
                  <div className="premium-glass-card tech-card tech-card-react">
                    <div className="tech-card-header">
                      <Cpu size={18} className="tech-card-icon react-color" />
                      <span className="tech-card-name">React.js (Frontend)</span>
                    </div>
                    <p className="tech-card-description">
                      Pustaka UI utama untuk merakit antarmuka modular berbasis komponen, memanfaatkan Virtual DOM untuk perenderan performa tinggi.
                    </p>
                  </div>

                  <div className="premium-glass-card tech-card tech-card-leaflet">
                    <div className="tech-card-header">
                      <Layers size={18} className="tech-card-icon leaflet-color" />
                      <span className="tech-card-name">Leaflet.js (GIS Map)</span>
                    </div>
                    <p className="tech-card-description">
                      Pustaka pemetaan open-source yang sangat ringan untuk mengelola layer spasial, marker interaktif, dan kontrol peta.
                    </p>
                  </div>

                  <div className="premium-glass-card tech-card tech-card-node">
                    <div className="tech-card-header">
                      <Activity size={18} className="tech-card-icon node-color" />
                      <span className="tech-card-name">Node.js &amp; Express (API)</span>
                    </div>
                    <p className="tech-card-description">
                      Server-side runtime asinkron dengan konsep non-blocking I/O untuk melayani permintaan data spasial secara real-time.
                    </p>
                  </div>

                  <div className="premium-glass-card tech-card tech-card-postgres">
                    <div className="tech-card-header">
                      <ListChecks size={18} className="tech-card-icon postgres-color" />
                      <span className="tech-card-name">PostgreSQL (Database)</span>
                    </div>
                    <p className="tech-card-description">
                      RDBMS relasional enterprise untuk mengelola penyimpanan tabel relasi data spasial peternakan secara aman.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-reveal-right tech-arch-container">
                <div className="premium-glass-card tech-arch-card">
                  <div className="arch-header">
                    <Sparkles size={16} className="text-blue" />
                    <span>Visualisasi Aliran Data (Decoupled Flow)</span>
                  </div>
                  
                  <div className="arch-diagram">
                    {/* Node 1: Client */}
                    <div className="arch-node arch-node-client">
                      <div className="node-icon-wrapper react-bg">
                        <Cpu size={18} className="node-icon" />
                      </div>
                      <div className="node-info">
                        <span className="node-title">Client Tier (Frontend)</span>
                        <span className="node-subtitle">React.js &amp; Leaflet</span>
                      </div>
                    </div>

                    {/* Connection 1 */}
                    <div className="arch-connection">
                      <div className="connection-line">
                        <span className="connection-pulse"></span>
                      </div>
                      <span className="connection-label">REST API (HTTP)</span>
                    </div>

                    {/* Node 2: Server */}
                    <div className="arch-node arch-node-server">
                      <div className="node-icon-wrapper node-bg">
                        <Activity size={18} className="node-icon" />
                      </div>
                      <div className="node-info">
                        <span className="node-title">API Tier (Backend)</span>
                        <span className="node-subtitle">Node.js &amp; Express</span>
                      </div>
                    </div>

                    {/* Connection 2 */}
                    <div className="arch-connection">
                      <div className="connection-line">
                        <span className="connection-pulse"></span>
                      </div>
                      <span className="connection-label">SQL Query</span>
                    </div>

                    {/* Node 3: Database */}
                    <div className="arch-node arch-node-db">
                      <div className="node-icon-wrapper postgres-bg">
                        <ListChecks size={18} className="node-icon" />
                      </div>
                      <div className="node-info">
                        <span className="node-title">Database Tier</span>
                        <span className="node-subtitle">PostgreSQL RDBMS</span>
                      </div>
                    </div>
                  </div>

                  <div className="arch-footer">
                    <div className="arch-badge">
                      <span className="badge-dot"></span>
                      <span>Arsitektur terpisah ini meniadakan lag render, menghasilkan UI 60 FPS yang responsif.</span>
                    </div>
                  </div>
                </div>
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
