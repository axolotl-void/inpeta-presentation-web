# 🗺️ Web Presentasi Magang: Re-Engineering Web GIS inPETA Aceh

Website presentasi interaktif (mode slide & scroll) berbasis **React.js** dan **Leaflet.js** yang dirancang khusus untuk diseminasi laporan magang Yogi Prasetya Sadewa di **DISKOMINSA Provinsi Aceh (UPTD Statistik)**.

Laporan Magang: *Re-Engineering Sistem Web GIS inPETA Aceh Berbasis Single Page Application (SPA) Menggunakan React.js Untuk Meningkatkan Aksesibilitas Mobile Dan User Experience.*

---

## 🚀 Fitur Utama Website Presentasi

1. **Dual-Mode Layout (Slide Deck & Scroll Page):**
   * **Mode Slide:** Navigasi interaktif mirip PowerPoint dengan animasi transisi yang mulus. Mendukung navigasi tombol panah keyboard (`ArrowLeft` & `ArrowRight`) atau tombol spasi (`Space`).
   * **Mode Scroll:** Berubah menjadi website landing page (scrollytelling) memanjang ke bawah dengan Glassmorphism card.
2. **Demo Live Web GIS:**
   * Peta spasial interaktif berbasis Leaflet dengan marker SVG kustom untuk memetakan fasilitas peternakan di Aceh (Puskeswan, Rumah Potong Hewan, Pasar Ternak).
   * Fitur penyaringan tipe fasilitas dan panel detail informasi dinamis saat marker diklik.
3. **Uji Fitur Interaktif:**
   * Pencarian (search) dan filter status kesiapan sistem real-time untuk melacak status pengerjaan 22 fitur inPETA yang diuji (Tabel 4.2 dari laporan magang).
4. **Visualisasi Skor Google Lighthouse:**
   * Animasi grafik SVG pengukur (gauge) performa untuk membandingkan peningkatan arsitektur SPA baru vs legacy MPA lama.
5. **Tema Dinamis:**
   * Pengganti tema warna (Dark Mode & Light Mode) terintegrasi pada tombol melayang.

---

## 🛠️ Tech Stack & Dependencies

* **Frontend Framework:** [React.js](https://react.dev/) & [Vite](https://vitejs.dev/) (Client-Side Rendering)
* **GIS Pemetaan:** [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
* **Ikon Grafik:** [Lucide React](https://lucide.dev/)
* **Desain & Gaya (Styling):** Vanilla CSS dengan *CSS Custom Variables* (Glassmorphism & Neon Glow)
* **Desain UI/UX:** Figma & Canva

---

## ⚙️ Cara Menjalankan Project Secara Lokal

1. **Clone Repository:**
   ```bash
   git clone https://github.com/axolotl-void/inpeta-presentation-web.git
   cd inpeta-presentation-web
   ```

2. **Instalasi Dependencies:**
   ```bash
   npm install
   ```

3. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```
   Akses di browser Anda melalui alamat: `http://localhost:5173`

4. **Build untuk Produksi:**
   ```bash
   npm run build
   ```
   Aset terkompilasi akan berada di folder `dist/` dan siap dideploy ke layanan hosting seperti Vercel, Netlify, atau GitHub Pages.

---

## 🧑‍💻 Biodata Penulis Magang

* **Nama:** Yogi Prasetya Sadewa
* **NIM:** 23210060
* **Program Studi:** S1 Ilmu Komputer
* **Fakultas:** Sains Teknologi dan Ilmu Kesehatan (FSTIK)
* **Kampus:** Universitas Bina Bangsa Getsempena (UBBG) Banda Aceh
* **DPL:** Mukhroji, S.ST., M.T. (NIDN. 1326099001)
* **Mentor Mitra:** Bobby Novrizan, S.Si (DISKOMINSA UPTD Statistik Aceh)
