# 📋 DOKUMEN HANDOVER: Perkembangan Proyek Presentasi Magang inPETA

Dokumen ini ditujukan untuk AI Agent berikutnya agar dapat memahami struktur proyek, riwayat perubahan, performa, dan kelanjutan pengerjaan tanpa harus membaca ulang riwayat chat sebelumnya.

---

## 🚀 Ringkasan Proyek
* **Nama Proyek**: Web Presentasi Interaktif Magang (Diseminasi Re-Engineering Web GIS inPETA Aceh)
* **Penulis (Mahasiswa)**: Yogi Prasetya Sadewa (NIM. 23210060) - S1 Ilmu Komputer UBBG
* **Teknologi Utama**: React.js, Vite, Leaflet (Pemetaan GIS), Lucide Icons, CSS Vanilla (Premium Glassmorphism & Custom 3D Transitions)
* **Dev Server**: `http://localhost:5173` (jalankan `npm run dev` untuk memulai)

---

## 🛠️ Optimasi Performa & Bug Kunci (Sangat Penting)
Sebelum melanjutkan, AI harus tahu bahwa proyek ini telah melalui optimasi performa krusial:
1. **WebGL Earth Context Loss (Globe Putih/Crash)**:
   * **Penyebab**: Globe 3D di-mount/unmount secara dinamis saat berganti halaman, menyebabkan GPU memory bocor.
   * **Solusi**: Komponen `<WebGLGlobe>` dipasang secara **permanen (unconditional mount)** di [App.jsx](file:///Users/yogiprasetyasadewa/Documents/03_Proyek/web-presentasi-magang-yogi/src/App.jsx). Visibilitasnya dikendalikan murni menggunakan CSS (`opacity: 0` / `display: none` di luar Section 2). Scrolling kembali menjadi instan dan mulus (60 FPS).
2. **CPU Berat & Frame Drop (Penghapusan Model Laptop 3D)**:
   * **Penyebab**: Canvas 3D background (`Scene3D` & `Laptop3D`) sangat membebani CPU/GPU pada Section 4 & 5.
   * **Solusi**: **Telah dihapus sepenuhnya** dari codebase. Sebagai pengganti pada Section 5, dibuat visualisasi diagram arsitektur berbasis CSS murni yang super ringan dan estetis.

---

## 📈 Status Perkembangan Section (1 - 9)

### 🟢 BAGIAN 01 — Halaman Utama (Hero Page) [SELESAI]
* **Desain**: Teks judul utama dinaikkan dan diberi bingkai glassmorphic tebal agar kontras dengan background bintang.
* **Fitur**: Menampilkan 3 kartu profil beranimasi (Mahasiswa, Dosen Pembimbing, Mentor Mitra) menggunakan foto asli dari direktori `src/assets/`.
* **Animasi**: Transisi masuk bertahap (*staggered animations*) dengan efek 3D rotasi halus.

### 🟢 BAGIAN 02 — Profil Instansi (DISKOMINSA) [SELESAI]
* **Desain**: Globe 3D WebGL diperlebar ke `180vw` dengan offset kiri `-40vw` untuk menyembunyikan tepi lengkung dan mencegah garis vertikal terpotong. Peta posisi instansi nampak jelas di sebelah kanan.
* **Fitur**: Marker koordinat kantor DISKOMINSA Aceh dengan popup bergaya glassmorphism gelap.
* **Animasi**: Popup Leaflet ditunda (*delay*) hingga pergeseran globe selesai agar transisi mulus. Kartu deskripsi menggunakan efek masuk *3D staggered swing*.

### 🟢 BAGIAN 03 — Latar Belakang & Masalah (Lama vs Baru) [SELESAI]
* **Desain**: Terdapat mockup bingkai browser realistis lengkap dengan tombol navigasi window dan bilah alamat URL tiruan.
* **Fitur**: Membandingkan screenshot Web GIS inPETA Lama vs inPETA Baru (menggunakan aset di `src/assets/inpeta-foto/`).
* **Animasi**: Kartu glassmorphic swing masuk dari arah kiri & kanan ketika section aktif.

### 🟢 BAGIAN 04 — Tujuan & Manfaat Magang [SELESAI]
* **Desain**: Kartu terbagi 2 kolom (*50/50 split*). Kolom kiri berisi Tujuan dengan ikon `Target` biru. Kolom kanan berisi Manfaat bagi Stakeholder (Instansi, Publik, Akademik).
* **Fitur**: Kartu manfaat dirancang berupa sub-card glassmorphic dengan border aksen kiri warna-warni yang menyala (*glowing*) saat di-hover.
* **Animasi**: Efek hover *floating transform* (`translateY(-2px)`) dan staggered 3D entrance.

### 🟢 BAGIAN 05 — Teknologi & Arsitektur Baru [SELESAI]
* **Desain**: Kolom kiri berisi grid 4 kartu teknologi (React, Leaflet, Node, Postgres) dengan glow neon. Kolom kanan berisi **Visualisasi Aliran Data (Decoupled Flow Diagram)**.
* **Fitur**: Diagram arsitektur murni CSS dengan background bermotif mesh grid blueprint, disertai animasi partikel data yang mengalir turun (`data-flow-down`) dari Client $\rightarrow$ API $\rightarrow$ Database.
* **Animasi**: Efek hover interaktif dan 3D staggered entrance reveal.

### 🔴 BAGIAN 06 — Demonstrasi Live Web GIS [BELUM DIREVISI]
* **Status**: Masih menggunakan layout lama, judul standar, dan container `.glass-card-3d`.
* **Tugas Berikutnya**: 
  1. Ubah header menggunakan `.section-header-modern`, `.section-tag-modern`, dan `.section-title-modern`.
  2. Rapikan layout container peta (`InteractiveMap`) agar selaras dengan desain premium glassmorphic section lainnya.
  3. Pastikan transisi masuk mulus dan tidak merusak layout peta.

### 🔴 BAGIAN 07 — Hasil Pengujian Fitur [BELUM DIREVISI]
* **Status**: Masih menggunakan layout lama dan tabel standar.
* **Tugas Berikutnya**: Percantik tampilan tabel fitur agar bernuansa gelap-glassmorphic modern dengan indikator centang/sukses yang menyala.

### 🔴 BAGIAN 08 — Lighthouse Performance [BELUM DIREVISI]
* **Status**: Masih menggunakan layout lama dan gauge standar.
* **Tugas Berikutnya**: Desain ulang visualisasi skor audit Google Lighthouse (MPA vs SPA) agar nampak futuristik dan interaktif.

### 🔴 BAGIAN 09 — Penutup / Kesimpulan [BELUM DIREVISI]
* **Status**: Masih menggunakan layout lama.
* **Tugas Berikutnya**: Buat penutupan presentasi yang elegan dan bersih.

---

## 🎨 Token Desain & Sistem Kelas (Gunakan Selalu)
Pertahankan konsistensi visual di [index.css](file:///Users/yogiprasetyasadewa/Documents/03_Proyek/web-presentasi-magang-yogi/src/index.css) menggunakan kelas-kelas berikut untuk modifikasi section selanjutnya:
* **Header Modern**:
  ```html
  <div className="section-header-modern">
    <span className="section-tag-modern">BAGIAN XX — Subtitle Tag</span>
    <h2 className="section-title-modern">Judul Utama</h2>
  </div>
  ```
* **Kartu Premium**: Gunakan kelas `.premium-glass-card` (bukan `.glass-card-3d` lama).
* **Triger Animasi**: Tambahkan deteksi kelas active pada kontainer luar section:
  ```html
  <section className={`scroll-section ${currentSection === X ? 'active' : ''}`} id="section-X">
  ```
* **Efek Swing Masuk**: Gunakan pembungkus `.card-reveal-left` dan `.card-reveal-right` di dalam kolom untuk efek 3D masuk yang selaras.

---

## 🛠️ Langkah untuk AI Baru
1. Jalankan `npm run dev` untuk memastikan build berjalan dengan aman di localhost.
2. Buka [App.jsx](file:///Users/yogiprasetyasadewa/Documents/03_Proyek/web-presentasi-magang-yogi/src/App.jsx) dan mulailah merombak **BAGIAN 06** (mencari id `section-6` dan komponen `InteractiveMap`).
3. Selalu periksa performa scroll halaman setelah melakukan perubahan CSS/JS agar tetap berada di 60 FPS tanpa lag.
