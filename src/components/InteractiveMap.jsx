import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix Leaflet Marker Icon bug in React/Vite by using custom SVG pins
const createSvgIcon = (color) => {
  return L.divIcon({
    html: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" 
                  fill="${color}" stroke="#ffffff" stroke-width="1.5"/>
            <circle cx="12" cy="9" r="2.5" fill="#ffffff"/>
           </svg>`,
    className: 'custom-leaflet-svg-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -32],
  });
};

const defaultIcon = createSvgIcon('#3b82f6'); // Blue for general
const rphIcon = createSvgIcon('#10b981');     // Green for RPH/Klinik
const pasarIcon = createSvgIcon('#f59e0b');   // Yellow for Pasar Ternak

const mockFacilities = [
  {
    id: 1,
    name: "UPTD Balai Ternak Non-Ruminansia (Sare)",
    type: "Balai Ternak",
    coord: [5.4542, 95.7335],
    desc: "Pusat pembibitan dan pemeliharaan sapi serta unggas daerah Sare, Aceh Besar.",
    details: "Populasi: 450 Ekor Sapi, 1200 Unggas. Luas Lahan: 25 Hektar.",
    icon: defaultIcon,
  },
  {
    id: 2,
    name: "Puskeswan Kuta Malaka",
    type: "Puskeswan & Klinik",
    coord: [5.4412, 95.3995],
    desc: "Pusat Kesehatan Hewan daerah Aceh Besar, melayani pengobatan gratis.",
    details: "Dokter Hewan: 3 Orang, Layanan: Vaksinasi, Inseminasi Buatan, Sterilisasi.",
    icon: rphIcon,
  },
  {
    id: 3,
    name: "Pasar Hewan Sibreh",
    type: "Pasar Ternak",
    coord: [5.4678, 95.3852],
    desc: "Pasar ternak mingguan terbesar di Aceh Besar, aktif setiap hari Rabu.",
    details: "Kapasitas Tampung: 800 ekor sapi/kerbau, transaksi mingguan rata-rata Rp 1,5M.",
    icon: pasarIcon,
  },
  {
    id: 4,
    name: "Rumah Potong Hewan (RPH) Banda Aceh",
    type: "RPH & Klinik",
    coord: [5.5532, 95.3402],
    desc: "RPH Modern bersertifikasi Halal di Kota Banda Aceh.",
    details: "Kapasitas Potong: 30 ekor/hari. Dilengkapi rantai pendingin (cold chain) & dokter hewan pemantau.",
    icon: rphIcon,
  },
  {
    id: 5,
    name: "Puskeswan Kuta Alam",
    type: "Puskeswan & Klinik",
    coord: [5.5654, 95.3341],
    desc: "Unit pelayanan kesehatan hewan peliharaan dan ternak kecil di pusat kota Banda Aceh.",
    details: "Staf Medik: 2 Dokter, Layanan UGD Hewan 24 Jam, Vaksinasi Rabies & Flu Burung.",
    icon: rphIcon,
  }
];

export default function InteractiveMap() {
  const [selectedFac, setSelectedFac] = useState(null);
  const [filterType, setFilterType] = useState('Semua');

  const filteredFacilities = filterType === 'Semua' 
    ? mockFacilities 
    : mockFacilities.filter(f => f.type === filterType);

  return (
    <div className="map-demo-container">
      {/* Control Panel (Sidebar) */}
      <div className="map-sidebar">
        <div>
          <h3 style={{fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '0.5rem'}}>
            Demo Peta inPETA Aceh
          </h3>
          <p style={{fontSize: '0.875rem'}}>
            Visualisasi sebaran fasilitas peternakan hasil re-engineering menggunakan React.js dan Leaflet.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-2">
          <label style={{fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)'}}>FILTER TIPE:</label>
          <div className="flex flex-wrap gap-2">
            {['Semua', 'Balai Ternak', 'Puskeswan & Klinik', 'Pasar Ternak'].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`glow-btn ${filterType === t ? '' : 'glow-btn-accent'}`}
                style={{
                  padding: '0.35rem 0.8rem',
                  fontSize: '0.75rem',
                  borderRadius: '6px',
                  background: filterType === t ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                  border: filterType === t ? 'none' : '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  boxShadow: 'none'
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Details Card */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '1rem',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          {selectedFac ? (
            <div>
              <span style={{
                background: selectedFac.type === 'Pasar Ternak' ? 'rgba(245, 158, 11, 0.15)' : selectedFac.type === 'RPH & Klinik' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                color: selectedFac.type === 'Pasar Ternak' ? 'var(--warning)' : selectedFac.type === 'RPH & Klinik' ? 'var(--accent)' : 'var(--primary)',
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'uppercase'
              }}>
                {selectedFac.type}
              </span>
              <h4 style={{marginTop: '0.5rem', marginBottom: '0.25rem', fontSize: '1rem'}}>{selectedFac.name}</h4>
              <p style={{fontSize: '0.8rem', marginBottom: '0.5rem', color: 'var(--text-muted)'}}>{selectedFac.desc}</p>
              <div style={{
                background: 'rgba(0,0,0,0.2)',
                padding: '0.5rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                borderLeft: '2px solid var(--primary)'
              }}>
                <strong>Detail Teknis:</strong> {selectedFac.details}
              </div>
            </div>
          ) : (
            <p style={{textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-dark)', fontStyle: 'italic'}}>
              Klik pin penanda di peta untuk melihat detail fasilitas secara langsung.
            </p>
          )}
        </div>
      </div>

      {/* Interactive Map */}
      <div className="map-wrapper">
        <MapContainer 
          center={[5.5000, 95.4500]} 
          zoom={11} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {filteredFacilities.map((fac) => (
            <Marker 
              key={fac.id} 
              position={fac.coord} 
              icon={fac.icon}
              eventHandlers={{
                click: () => {
                  setSelectedFac(fac);
                },
              }}
            >
              <Popup>
                <div style={{fontFamily: 'var(--font-sans)', color: 'var(--text-main)'}}>
                  <strong style={{fontSize: '0.9rem'}}>{fac.name}</strong>
                  <p style={{margin: '0.2rem 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)'}}>{fac.type}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
