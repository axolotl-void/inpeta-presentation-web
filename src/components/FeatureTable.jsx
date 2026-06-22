import React, { useState } from 'react';
import { CheckCircle2, Clock } from 'lucide-react';

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
    <div className="feature-table-wrapper">
      {/* Metrics Banner */}
      <div className="feature-metrics-banner">
        <div className="metrics-text-group">
          <span className="metrics-label">PERSENTASE KESIAPAN SISTEM:</span>
          <h3 className="metrics-title">
            {percentage}% <span className="metrics-detail">({successCount} dari {totalCount} Fitur Selesai)</span>
          </h3>
        </div>
        
        {/* Progress bar */}
        <div className="feature-progress-container">
          <div className="feature-progress-fill" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>

      {/* Controls Container */}
      <div className="feature-controls">
        {/* Search */}
        <input
          type="text"
          placeholder="Cari fitur (misal: GIS, CRUD, Admin)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {/* Filter Buttons */}
        <div className="feature-filter-buttons">
          {['Semua', 'Selesai', 'Belum'].map(filter => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`feature-filter-btn ${statusFilter === filter ? 'active' : ''}`}
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
              <th className="col-no">No</th>
              <th className="col-name">Nama Fitur</th>
              <th className="col-backend">Implementasi Back-End</th>
              <th className="col-frontend">Implementasi Front-End</th>
              <th className="col-status">Hasil</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeatures.length > 0 ? (
              filteredFeatures.map((feat, index) => (
                <tr key={feat.id} className="animated-row" style={{ animationDelay: `${index * 0.05}s` }}>
                  <td className="col-no-val">{index + 1}</td>
                  <td className="col-name-val">{feat.name}</td>
                  <td className="col-backend-val">{feat.backend}</td>
                  <td className="col-frontend-val">{feat.frontend}</td>
                  <td className="col-status-val">
                    {feat.status ? (
                      <span className="status-badge status-success">
                        <CheckCircle2 size={14} strokeWidth={3} /> Selesai
                      </span>
                    ) : (
                      <span className="status-badge status-pending">
                        <Clock size={14} strokeWidth={3} /> Belum
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="table-empty-row">
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
