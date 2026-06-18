import React, { useState } from 'react';

const featureData = [
  { id: 1, name: "Login Admin", backend: "Autentikasi & JWT Token", frontend: "Form Login + Protect Route", status: true },
  { id: 2, name: "Data Wilayah", backend: "CRUD Data Wilayah", frontend: "Kelola List Wilayah", status: true },
  { id: 3, name: "Landing Page", backend: "CRUD Hero & Konten", frontend: "Pengaturan Slider/Hero", status: true },
  { id: 4, name: "Logo Instansi", backend: "CRUD File Logo", frontend: "Upload & Preview Logo", status: true },
  { id: 5, name: "Statistik Hero", backend: "CRUD Counter Statistik", frontend: "Visualisasi Angka Jumlah Ternak", status: true },
  { id: 6, name: "Struktur Navbar", backend: "CRUD Menu & Link", frontend: "Dynamic Header Navbar", status: true },
  { id: 7, name: "Kelola Tentang", backend: "CRUD Deskripsi Profil", frontend: "Editor Konten Tentang Kami", status: true },
  { id: 8, name: "Poin Tentang", backend: "CRUD Sub-poin Profil", frontend: "Poin List Visual Tentang", status: true },
  { id: 9, name: "Fitur Unggulan", backend: "CRUD Layanan Utama", frontend: "Card Grid Fitur Utama", status: true },
  { id: 10, name: "FAQ (Tanya Jawab)", backend: "CRUD Data Tanya Jawab", frontend: "Accordion Dropdown FAQ", status: true },
  { id: 11, name: "Berita & Info Sektoral", backend: "CRUD Berita & Upload Gambar", frontend: "Grid Artikel & Detail Berita", status: true },
  { id: 12, name: "Footer Info", backend: "CRUD Link Medsos & Kontak", frontend: "Section Footer & Hak Cipta", status: true },
  { id: 13, name: "Fasilitas & Lokasi", backend: "CRUD Fasilitas Peternakan", frontend: "Manajemen Data Lokasi", status: true },
  { id: 14, name: "Pengaturan Akun", backend: "CRUD Profil User", frontend: "Form Edit Sandi & Profil", status: true },
  { id: 15, name: "Akun Admin (Multiuser)", backend: "CRUD Kelola Admin Lain", frontend: "Tabel User & Role Control", status: true },
  { id: 16, name: "API Keys & Export Data", backend: "CRUD Token API & PDF/Excel Export", frontend: "Menu Developer API", status: true },
  { id: 17, name: "GIS Batas Wilayah", backend: "Integrasi GeoJSON Kabupaten/Kota", frontend: "Peta Batas Wilayah (Polygon)", status: true },
  { id: 18, name: "GIS Lahan & Habitat", backend: "GeoJSON Kawasan Peternakan", frontend: "Filter Layer Lahan Hijau", status: false },
  { id: 19, name: "GIS Puskeswan & Pasar", backend: "Point Koordinat Puskeswan & Pasar", frontend: "Marker Map Puskeswan & Pasar", status: true },
  { id: 20, name: "GIS RPH & Klinik Hewan", backend: "Point Koordinat RPH & Klinik", frontend: "Marker Map RPH & Klinik", status: true },
  { id: 21, name: "GIS Geospasial & Polygon", backend: "Buffer Area & Overlay Spasial", frontend: "Menggambar Layer Polygon Baru", status: false },
  { id: 22, name: "Reset Koordinat Peta", backend: "Reset Viewport Database", frontend: "Tombol Default Center Map", status: false }
];

export default function FeatureTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');

  const filteredFeatures = featureData.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          f.backend.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          f.frontend.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'Semua') return matchesSearch;
    if (statusFilter === 'Selesai') return matchesSearch && f.status;
    if (statusFilter === 'Belum') return matchesSearch && !f.status;
    return matchesSearch;
  });

  const successCount = featureData.filter(f => f.status).length;
  const totalCount = featureData.length;
  const percentage = Math.round((successCount / totalCount) * 100);

  return (
    <div style={{ width: '100%' }}>
      {/* Metrics Banner */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(59, 130, 246, 0.05)',
        border: '1px solid rgba(59, 130, 246, 0.15)',
        borderRadius: '12px',
        padding: '1rem 1.5rem',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>PERSENTASE KESIAPAN SISTEM:</span>
          <h3 style={{ fontSize: '1.75rem', color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
            {percentage}% <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>({successCount} dari {totalCount} Fitur Selesai)</span>
          </h3>
        </div>
        
        {/* Progress bar */}
        <div style={{ width: '150px', height: '10px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '9999px', overflow: 'hidden' }}>
          <div style={{ width: `${percentage}%`, height: '100%', background: 'var(--primary)', borderRadius: '9999px' }}></div>
        </div>
      </div>

      {/* Controls Container */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        smDirection: 'row',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        {/* Search */}
        <input
          type="text"
          placeholder="Cari fitur (misal: GIS, CRUD, Admin)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          style={{ flex: 1 }}
        />

        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['Semua', 'Selesai', 'Belum'].map(filter => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              style={{
                background: statusFilter === filter ? 'var(--primary)' : 'rgba(255,255,255,0.03)',
                color: statusFilter === filter ? 'white' : 'var(--text-muted)',
                border: '1px solid var(--border-color)',
                padding: '0.4rem 0.9rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 600,
                transition: 'var(--transition-fast)'
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="custom-table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th style={{ width: '5%' }}>No</th>
              <th style={{ width: '30%' }}>Nama Fitur</th>
              <th style={{ width: '30%' }}>Implementasi Back-End</th>
              <th style={{ width: '25%' }}>Implementasi Front-End</th>
              <th style={{ width: '10%', textAlign: 'center' }}>Hasil</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeatures.length > 0 ? (
              filteredFeatures.map((feat, index) => (
                <tr key={feat.id}>
                  <td>{index + 1}</td>
                  <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>{feat.name}</td>
                  <td style={{ fontSize: '0.85rem' }}>{feat.backend}</td>
                  <td style={{ fontSize: '0.85rem' }}>{feat.frontend}</td>
                  <td style={{ textAlign: 'center' }}>
                    {feat.status ? (
                      <span style={{
                        background: 'rgba(16, 185, 129, 0.12)',
                        color: 'var(--accent)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 700
                      }}>
                        ✔️ Sukses
                      </span>
                    ) : (
                      <span style={{
                        background: 'rgba(239, 68, 68, 0.12)',
                        color: 'var(--danger)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 700
                      }}>
                        ❌ Belum
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-dark)' }}>
                  Fitur tidak ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
