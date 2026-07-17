# PRD Frontend: GeoWisata

## 1. Ringkasan Produk

**Nama project:** GeoWisata  
**Jenis produk:** Web geografis interaktif frontend-only  
**Framework:** Next.js `16.2.10` atau versi stable terbaru saat implementasi dimulai  
**Target platform:** Desktop dan mobile browser  
**Backend:** Tidak ada  
**Database:** Tidak ada  
**Sumber data runtime:** File statis JSON/GeoJSON di dalam project frontend  
**Map engine:** Leaflet via React Leaflet  
**Basemap:** OpenStreetMap tile layer  

GeoWisata adalah aplikasi web geografis untuk mengeksplorasi lokasi wisata Indonesia melalui peta interaktif. Pengguna dapat melihat marker wisata pada map, memfilter berdasarkan kategori dan wilayah, mencari lokasi, membuka detail tempat, melihat statistik sederhana, dan menyimpan favorit secara lokal di browser.

Produk ini dibuat sebagai frontend-only project. Semua data wisata, batas wilayah, metadata kategori, dan statistik awal diletakkan di folder project, misalnya `public/data`, lalu dimuat langsung oleh frontend menggunakan `fetch`.

## 2. Latar Belakang

Project ini berangkat dari kebutuhan membuat web bertema geografis yang benar-benar terlihat jelas fungsi map-nya. Fokus utama bukan sekadar tampilan landing page, tetapi pengalaman eksplorasi lokasi berbasis peta.

Konsep GeoWisata dipilih karena objek wisata adalah data geografis yang natural: setiap lokasi memiliki titik koordinat, kategori, atribut deskriptif, dan bisa divisualisasikan langsung sebagai marker. Dataset dapat disiapkan dari OpenStreetMap, Wikidata, data pemerintah terbuka, atau kurasi manual, lalu diekspor menjadi JSON/GeoJSON agar tidak memerlukan backend.

## 3. Tujuan Produk

Tujuan utama GeoWisata adalah menyediakan aplikasi frontend interaktif untuk membantu pengguna menjelajahi persebaran wisata Indonesia berdasarkan lokasi geografis.

Tujuan spesifik:

- Menampilkan lokasi wisata Indonesia pada map interaktif.
- Memudahkan pengguna mencari dan memfilter lokasi wisata.
- Menyajikan informasi detail setiap lokasi secara ringkas dan visual.
- Menampilkan statistik sederhana berdasarkan data wisata statis.
- Mendukung pengalaman eksplorasi tanpa login, tanpa backend, dan tanpa database.
- Menjadi project portfolio frontend geografis yang jelas, modern, dan mudah dikembangkan.

## 4. Non-Goals

Hal-hal berikut tidak termasuk scope versi awal:

- Backend API.
- Login, register, atau akun pengguna.
- Database server.
- Admin panel untuk input data.
- Booking tiket, pembayaran, atau reservasi.
- Review pengguna real-time.
- Data wisata real-time.
- Navigasi rute turn-by-turn.
- Integrasi Google Maps API berbayar.
- Sistem rekomendasi berbasis machine learning.

## 5. Target Pengguna

Target pengguna utama:

- Pelajar atau mahasiswa yang ingin mengeksplorasi geografi wisata Indonesia.
- Wisatawan yang ingin melihat persebaran destinasi.
- Pengguna umum yang ingin mengenal lokasi wisata berdasarkan peta.
- Reviewer portfolio yang ingin melihat kemampuan frontend, map visualization, filtering, dan data-driven UI.

## 6. Value Proposition

GeoWisata memberikan nilai utama berupa pengalaman eksplorasi wisata yang berbasis lokasi, bukan sekadar daftar tempat.

Nilai produk:

- Map menjadi pusat pengalaman.
- Semua lokasi punya koordinat yang bisa dilihat jelas.
- Data dapat digunakan tanpa backend.
- Pengguna dapat berpindah antara peta, daftar, detail, dan statistik.
- Scope cukup realistis untuk project frontend, tetapi tetap terlihat lengkap.

## 7. Prinsip Produk

Prinsip implementasi:

- Frontend-only.
- Data statis, mudah diganti, dan transparan.
- Arsitektur sederhana.
- Map-first interface.
- Tidak membuat fitur yang bergantung pada server.
- UI padat, eksploratif, dan mudah dipindai.
- Semua fitur utama harus tetap berguna walaupun data awal masih terbatas.
- Setiap lokasi harus memiliki `latitude` dan `longitude`.

## 8. Referensi Teknologi

Rekomendasi stack:

- **Next.js:** `16.2.10` atau stable terbaru saat setup project.
- **React:** mengikuti versi bawaan Next.js stable.
- **TypeScript:** wajib.
- **Tailwind CSS:** styling.
- **Leaflet:** engine peta.
- **React Leaflet:** integrasi Leaflet dengan React.
- **OpenStreetMap:** basemap.
- **Lucide React:** ikon UI.
- **Recharts:** chart/statistik sederhana.
- **Zustand atau React Context:** state global ringan, opsional.
- **localStorage:** menyimpan favorit dan preferensi lokal.

Catatan versi:

- Berdasarkan npm, `next@16.2.10` adalah versi stable/latest yang tersedia saat dokumen ini dibuat.
- Rilis `16.3.x` yang muncul di GitHub release list masih berstatus canary/pre-release, sehingga tidak direkomendasikan untuk baseline PRD.

Referensi:

- Next.js: https://nextjs.org
- Next.js npm package: https://www.npmjs.com/package/next
- React Leaflet: https://react-leaflet.js.org
- Leaflet: https://leafletjs.com
- OpenStreetMap: https://www.openstreetmap.org

## 9. Ruang Lingkup MVP

MVP GeoWisata harus memiliki:

- Halaman utama berbasis map.
- Marker lokasi wisata.
- Sidebar filter.
- Search lokasi wisata.
- Detail panel lokasi.
- Kategori wisata.
- Statistik ringkas.
- Favorit lokal.
- Responsive layout.
- Loading state dan empty state.
- Error state ketika data gagal dimuat.

MVP tidak perlu memiliki:

- Multi-user account.
- Sinkronisasi cloud.
- Upload data dari UI.
- Editing dataset dari browser.
- Server-side data mutation.

## 10. Struktur Halaman

### 10.1 Explore Map

Halaman utama aplikasi. Ini menjadi first screen, bukan landing page marketing.

Isi utama:

- Header ringkas.
- Search bar.
- Sidebar filter.
- Map besar.
- Marker wisata.
- Floating map controls.
- Detail drawer/panel.
- Summary stats.

Layout desktop:

- Sidebar kiri: filter dan kategori.
- Area tengah: map.
- Panel kanan: detail lokasi terpilih atau statistik.

Layout mobile:

- Map tetap menjadi area utama.
- Filter dibuka dari bottom sheet.
- Detail lokasi muncul sebagai bottom drawer.
- Search berada di atas map.

### 10.2 Detail Wisata

Detail lokasi dapat muncul sebagai drawer, bukan halaman penuh.

Informasi yang ditampilkan:

- Nama tempat.
- Kategori.
- Provinsi.
- Kabupaten/kota.
- Koordinat.
- Deskripsi singkat.
- Foto utama jika tersedia.
- Atribut tambahan seperti jam buka, website, rating kurasi, atau sumber data.
- Tombol buka di OpenStreetMap.
- Tombol buka di Google Maps menggunakan koordinat.
- Tombol tambah/hapus favorit.

### 10.3 Favorites

Halaman atau panel untuk lokasi yang disimpan pengguna.

Data favorit disimpan di `localStorage`.

Fitur:

- Daftar lokasi favorit.
- Klik item untuk fokus ke marker di map.
- Hapus dari favorit.
- Empty state jika belum ada favorit.

### 10.4 Insights

Panel statistik sederhana dari data lokal.

Chart yang disarankan:

- Jumlah lokasi per kategori.
- Jumlah lokasi per provinsi.
- Top provinsi dengan lokasi terbanyak.
- Distribusi jenis wisata.

Statistik dapat dihitung di frontend dari file JSON. Jika dataset besar, boleh disiapkan sebagai file `stats.json` statis.

### 10.5 About Data

Halaman kecil atau modal yang menjelaskan sumber dan batasan data.

Isi:

- Sumber dataset.
- Tanggal data diproses.
- Lisensi.
- Catatan bahwa data bersifat statis.
- Catatan bahwa koordinat mengikuti dataset dan mungkin tidak selalu presisi ke gerbang utama lokasi.

## 11. Fitur Detail

### 11.1 Interactive Map

Map harus menampilkan Indonesia sebagai fokus awal.

Kebutuhan:

- Default center: Indonesia.
- Default zoom: menampilkan seluruh Indonesia.
- Marker berdasarkan data wisata.
- Marker berbeda berdasarkan kategori.
- Marker clustering jika jumlah data banyak.
- Klik marker membuka detail.
- Hover marker menampilkan tooltip nama lokasi.
- Tombol reset view ke Indonesia.
- Tombol locate user opsional, menggunakan browser geolocation.

Acceptance criteria:

- Pengguna dapat melihat marker wisata di peta.
- Klik marker menampilkan detail lokasi yang sesuai.
- Map dapat di-zoom dan digeser.
- Marker tetap dapat digunakan di desktop dan mobile.

### 11.2 Search

Search mencari lokasi berdasarkan:

- Nama tempat.
- Provinsi.
- Kota/kabupaten.
- Kategori.
- Tag.

Perilaku:

- Search berjalan client-side.
- Input debounced minimal 200 ms.
- Hasil search memperbarui list dan marker.
- Jika hasil hanya satu dan user memilihnya, map fokus ke lokasi tersebut.

Acceptance criteria:

- Pengguna bisa mengetik nama wisata dan melihat hasil terkait.
- Empty state muncul jika tidak ada hasil.
- Search tidak membuat halaman reload.

### 11.3 Filter Kategori

Kategori awal yang disarankan:

- Pantai.
- Gunung.
- Danau.
- Air terjun.
- Taman nasional.
- Museum.
- Candi/situs sejarah.
- Pulau.
- Desa wisata.
- Wisata alam lainnya.

Filter:

- Multi-select kategori.
- Filter provinsi.
- Filter pulau.
- Filter ketersediaan foto.
- Filter sumber data, opsional.

Acceptance criteria:

- Pengguna dapat memilih satu atau lebih kategori.
- Marker dan list mengikuti filter.
- Jumlah hasil aktif ditampilkan.

### 11.4 List View

Selain map, aplikasi perlu menampilkan daftar lokasi hasil filter.

Isi item:

- Nama lokasi.
- Kategori.
- Provinsi.
- Kota/kabupaten.
- Jarak dari posisi pengguna jika geolocation aktif.
- Tombol favorit.

Acceptance criteria:

- Klik item list membuka detail dan fokus ke marker.
- List mengikuti search dan filter.
- List nyaman digunakan di mobile.

### 11.5 Detail Drawer

Detail drawer muncul saat marker atau item list dipilih.

Isi wajib:

- Nama.
- Kategori.
- Lokasi administratif.
- Koordinat.
- Deskripsi.
- Sumber data.
- Link navigasi eksternal.

Isi opsional:

- Foto.
- Website.
- Wikipedia/Wikidata.
- Jam buka.
- Aktivitas yang cocok.
- Tingkat popularitas kurasi.

Acceptance criteria:

- Detail sesuai dengan lokasi yang dipilih.
- Drawer bisa ditutup.
- Tombol eksternal membuka tab baru.

### 11.6 Favorites

Favorit menggunakan `localStorage`.

Data yang disimpan:

```json
{
  "favoritePlaceIds": ["place-001", "place-002"]
}
```

Acceptance criteria:

- Pengguna bisa menyimpan lokasi.
- Favorit tetap ada setelah refresh browser.
- Pengguna bisa menghapus favorit.
- Tidak ada backend yang dipanggil.

### 11.7 Share URL

Gunakan query parameter untuk state ringan.

Contoh:

```text
/?category=beach&province=Bali&place=tanah-lot
```

State yang boleh masuk URL:

- Kategori aktif.
- Provinsi aktif.
- ID lokasi terpilih.
- Query search.

Acceptance criteria:

- URL dapat dibuka ulang dan menampilkan state yang sama.
- Tidak semua state UI perlu disimpan ke URL.

### 11.8 Data Source Info

Setiap lokasi wajib menyimpan sumber data.

Contoh:

```json
{
  "source": {
    "name": "OpenStreetMap",
    "url": "https://www.openstreetmap.org",
    "license": "ODbL"
  }
}
```

Acceptance criteria:

- Pengguna dapat melihat sumber data pada detail lokasi.
- Halaman About Data menjelaskan lisensi dan batasan dataset.

## 12. Dataset

### 12.1 Lokasi Data

Data disimpan di dalam project frontend.

Struktur yang disarankan:

```text
geowisata/
  public/
    data/
      places.json
      places.geojson
      provinces.geojson
      categories.json
      islands.json
      stats.json
      dataset-metadata.json
```

Minimal untuk MVP:

```text
public/data/places.json
public/data/categories.json
public/data/dataset-metadata.json
```

Jika ingin polygon provinsi:

```text
public/data/provinces.geojson
```

### 12.2 Format `places.json`

Format utama yang disarankan:

```json
[
  {
    "id": "place-001",
    "name": "Pantai Kuta",
    "slug": "pantai-kuta",
    "category": "beach",
    "categoryLabel": "Pantai",
    "description": "Pantai populer di Bali yang dikenal sebagai area wisata pesisir.",
    "province": "Bali",
    "city": "Kabupaten Badung",
    "island": "Bali",
    "latitude": -8.718492,
    "longitude": 115.168632,
    "imageUrl": "/images/places/pantai-kuta.jpg",
    "tags": ["pantai", "sunset", "wisata alam"],
    "website": null,
    "osmUrl": "https://www.openstreetmap.org/",
    "wikidataId": null,
    "source": {
      "name": "OpenStreetMap",
      "url": "https://www.openstreetmap.org",
      "license": "ODbL"
    },
    "coordinateAccuracy": "point",
    "updatedAt": "2026-07-17"
  }
]
```

Field wajib:

- `id`
- `name`
- `slug`
- `category`
- `province`
- `city`
- `island`
- `latitude`
- `longitude`
- `source`

Field opsional:

- `description`
- `imageUrl`
- `tags`
- `website`
- `phone`
- `openingHours`
- `osmUrl`
- `wikidataId`
- `wikipediaUrl`
- `coordinateAccuracy`
- `updatedAt`

### 12.3 Format GeoJSON Alternatif

Jika ingin langsung menggunakan GeoJSON:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [115.168632, -8.718492]
      },
      "properties": {
        "id": "place-001",
        "name": "Pantai Kuta",
        "category": "beach",
        "province": "Bali",
        "city": "Kabupaten Badung"
      }
    }
  ]
}
```

Catatan:

- GeoJSON memakai urutan `[longitude, latitude]`.
- UI internal boleh menormalisasi menjadi `{ lat, lng }`.

### 12.4 Format `categories.json`

```json
[
  {
    "id": "beach",
    "label": "Pantai",
    "icon": "Waves",
    "color": "#0EA5E9"
  },
  {
    "id": "mountain",
    "label": "Gunung",
    "icon": "Mountain",
    "color": "#16A34A"
  }
]
```

### 12.5 Format `dataset-metadata.json`

```json
{
  "project": "geowisata",
  "generatedAt": "2026-07-17",
  "dataSources": [
    {
      "name": "OpenStreetMap",
      "url": "https://www.openstreetmap.org",
      "license": "ODbL"
    }
  ],
  "notes": [
    "Dataset digunakan sebagai data statis frontend.",
    "Koordinat mengikuti sumber data dan perlu divalidasi sebelum penggunaan resmi.",
    "Aplikasi tidak menyediakan informasi real-time."
  ]
}
```

## 13. Sumber Data yang Direkomendasikan

Sumber utama:

- OpenStreetMap untuk titik lokasi wisata dan atribut dasar.
- Wikidata untuk enrichment seperti deskripsi, gambar, atau identifier.
- Data pemerintah terbuka jika tersedia untuk objek tertentu seperti museum, taman nasional, atau destinasi wisata.

Cara pemakaian:

- Data dikumpulkan sekali di luar aplikasi.
- Data dibersihkan dan dinormalisasi.
- Output disimpan sebagai JSON/GeoJSON.
- Frontend hanya membaca file tersebut.

Catatan penting:

- Jangan melakukan query Overpass/OpenStreetMap langsung dari aplikasi utama untuk MVP.
- Jangan bergantung pada API eksternal saat runtime.
- Cantumkan sumber dan lisensi data.
- Validasi koordinat untuk data unggulan.

## 14. Arsitektur Frontend

Arsitektur dibuat sederhana.

```text
geowisata/
  app/
    page.tsx
    layout.tsx
    globals.css
    favorites/
      page.tsx
    about-data/
      page.tsx
  components/
    map/
      MapView.tsx
      PlaceMarker.tsx
      MarkerClusterLayer.tsx
      MapControls.tsx
    places/
      PlaceList.tsx
      PlaceDetailDrawer.tsx
      PlaceCard.tsx
      FavoriteButton.tsx
    filters/
      SearchBox.tsx
      CategoryFilter.tsx
      ProvinceFilter.tsx
      IslandFilter.tsx
    insights/
      StatsSummary.tsx
      CategoryChart.tsx
      ProvinceChart.tsx
    layout/
      AppShell.tsx
      Sidebar.tsx
      TopBar.tsx
  lib/
    data.ts
    filters.ts
    geo.ts
    storage.ts
    constants.ts
  types/
    place.ts
    category.ts
  public/
    data/
      places.json
      categories.json
      dataset-metadata.json
    images/
      places/
```

### 14.1 App Router

Gunakan Next.js App Router.

Route:

```text
/              Explore Map
/favorites     Favorit
/about-data    Informasi dataset
```

Jika ingin lebih sederhana, `/favorites` dan `/about-data` boleh berupa panel/modal di halaman utama.

### 14.2 Client Components

Komponen map harus berjalan di client.

Gunakan dynamic import untuk menghindari masalah SSR Leaflet:

```ts
const MapView = dynamic(() => import("@/components/map/MapView"), {
  ssr: false
});
```

Komponen yang perlu client-side:

- `MapView`
- `PlaceMarker`
- `PlaceDetailDrawer`
- `FavoriteButton`
- Filter interactive.

### 14.3 Data Loading

Karena data berada di `public/data`, frontend dapat memuat:

```ts
fetch("/data/places.json")
```

Rekomendasi:

- Buat helper di `lib/data.ts`.
- Validasi data minimal saat load.
- Tampilkan error state jika file tidak ditemukan.
- Untuk dataset kecil, load semua data di awal.
- Untuk dataset besar, pisahkan per kategori atau per pulau.

### 14.4 State Management

State utama:

- `places`
- `selectedPlace`
- `searchQuery`
- `activeCategories`
- `activeProvince`
- `activeIsland`
- `favorites`
- `mapViewState`

Untuk MVP, gunakan React state dan custom hooks.

Jika state mulai menyebar, gunakan Zustand.

## 15. UX dan UI

### 15.1 Karakter Visual

GeoWisata harus terasa seperti aplikasi eksplorasi geografis, bukan landing page promosi.

Arah UI:

- Map sebagai area dominan.
- Sidebar padat dan mudah dipindai.
- Panel detail bersih.
- Warna kategori jelas.
- Tipografi sederhana.
- Kontrol map mudah dijangkau.

Palet warna disarankan:

- Hijau alam untuk kategori alam.
- Biru laut untuk pantai/danau.
- Kuning/emas sebagai aksen lokasi unggulan.
- Abu netral untuk background UI.
- Hindari satu warna dominan berlebihan.

### 15.2 Desktop Layout

Desktop layout:

```text
+----------------------------------------------------------+
| Top Bar: GeoWisata | Search | Quick Stats                |
+-------------+--------------------------------+-----------+
| Sidebar     | Map                            | Detail    |
| Filters     | Markers                        | Drawer    |
| Categories  | Controls                       | /Stats    |
+-------------+--------------------------------+-----------+
```

### 15.3 Mobile Layout

Mobile layout:

```text
+----------------------------+
| Search + Filter Button     |
+----------------------------+
| Map                        |
|                            |
|                            |
+----------------------------+
| Bottom Sheet Detail/List   |
+----------------------------+
```

### 15.4 Empty State

Contoh kondisi:

- Tidak ada hasil filter.
- Belum ada favorit.
- Data gagal dimuat.

Empty state harus memberi aksi:

- Reset filter.
- Hapus query search.
- Kembali ke semua kategori.

### 15.5 Loading State

Tampilkan loading ringan:

- Skeleton sidebar.
- Loading marker state.
- Pesan "Memuat data wisata".

## 16. Functional Requirements

### FR-001: Load Dataset

Sistem harus memuat data wisata dari file JSON/GeoJSON lokal.

Acceptance criteria:

- Data dimuat dari `/data/places.json` atau `/data/places.geojson`.
- Tidak ada request ke backend.
- Error ditampilkan jika data gagal dimuat.

### FR-002: Render Map

Sistem harus menampilkan peta Indonesia.

Acceptance criteria:

- Map tampil pada halaman utama.
- Basemap OpenStreetMap tampil.
- Default viewport mengarah ke Indonesia.

### FR-003: Render Markers

Sistem harus menampilkan marker berdasarkan data wisata.

Acceptance criteria:

- Setiap data valid dengan koordinat tampil sebagai marker.
- Marker memiliki visual berdasarkan kategori.
- Marker dapat diklik.

### FR-004: Show Place Detail

Sistem harus menampilkan detail lokasi saat marker atau list item dipilih.

Acceptance criteria:

- Detail menampilkan nama, kategori, wilayah, koordinat, deskripsi, dan sumber.
- Detail dapat ditutup.

### FR-005: Search Places

Sistem harus menyediakan pencarian.

Acceptance criteria:

- Search mencari berdasarkan nama, wilayah, kategori, dan tag.
- Hasil search memperbarui marker dan list.

### FR-006: Filter Places

Sistem harus menyediakan filter kategori, provinsi, dan pulau.

Acceptance criteria:

- Filter dapat dikombinasikan.
- Hasil aktif ditampilkan.
- Reset filter tersedia.

### FR-007: Favorite Places

Sistem harus memungkinkan pengguna menyimpan lokasi favorit.

Acceptance criteria:

- Favorit disimpan di `localStorage`.
- Favorit tetap ada setelah refresh.
- Favorit bisa dihapus.

### FR-008: External Map Link

Sistem harus menyediakan tombol membuka lokasi di map eksternal.

Acceptance criteria:

- Link Google Maps menggunakan `latitude,longitude`.
- Link OpenStreetMap tersedia jika ada.
- Link terbuka di tab baru.

### FR-009: Insights

Sistem harus menampilkan statistik sederhana.

Acceptance criteria:

- Jumlah lokasi total terlihat.
- Jumlah lokasi per kategori terlihat.
- Jumlah lokasi per provinsi terlihat.

### FR-010: About Data

Sistem harus menampilkan informasi sumber data.

Acceptance criteria:

- Sumber dan lisensi dataset terlihat.
- Tanggal pembaruan dataset terlihat jika tersedia.
- Batasan data dijelaskan.

## 17. Non-Functional Requirements

### 17.1 Performance

Target:

- Initial UI tampil cepat.
- Map tidak freeze saat memuat marker.
- Filter terasa instan untuk dataset kecil-menengah.

Rekomendasi:

- Gunakan marker clustering untuk dataset besar.
- Lazy-load komponen map.
- Batasi ukuran gambar.
- Gunakan format gambar modern seperti WebP.
- Pertimbangkan split data per kategori jika file terlalu besar.

### 17.2 Accessibility

Kebutuhan:

- Tombol memiliki label.
- Kontras teks cukup.
- Navigasi keyboard untuk filter, search, dan drawer.
- Focus state terlihat.
- Jangan menyampaikan kategori hanya dengan warna.

### 17.3 Responsiveness

Kebutuhan:

- Desktop, tablet, dan mobile harus usable.
- Sidebar berubah menjadi drawer/bottom sheet di mobile.
- Text tidak boleh tumpang tindih.
- Kontrol map tidak tertutup panel.

### 17.4 Reliability

Kebutuhan:

- Data invalid tidak membuat seluruh aplikasi crash.
- Lokasi tanpa koordinat tidak dirender sebagai marker dan masuk laporan invalid di console/dev mode.
- Error state jelas jika file data tidak tersedia.

### 17.5 Privacy

Kebutuhan:

- Tidak ada akun.
- Tidak ada tracking wajib.
- Geolocation hanya aktif jika pengguna menekan tombol locate.
- Favorit hanya disimpan di browser pengguna.

## 18. Data Validation Rules

Saat load dataset, validasi minimal:

- `id` harus unik.
- `name` wajib ada.
- `latitude` harus number antara -90 sampai 90.
- `longitude` harus number antara -180 sampai 180.
- `category` harus terdaftar di `categories.json`.
- `province` tidak boleh kosong.
- `source.name` tidak boleh kosong.

Data invalid:

- Tidak dirender sebagai marker.
- Dicatat di console saat development.
- Dihitung dalam metadata validasi jika diperlukan.

## 19. Prioritas Fitur

### P0

- Next.js setup.
- Load data JSON.
- Render map.
- Render marker.
- Detail drawer.
- Search.
- Filter kategori.
- Responsive basic.

### P1

- Filter provinsi dan pulau.
- List view.
- Favorites dengan `localStorage`.
- Statistik kategori dan provinsi.
- Share URL state.
- About Data.

### P2

- Marker clustering.
- Geolocation pengguna.
- Image gallery.
- Province polygon/heatmap.
- Dataset split per kategori.
- Export/share card lokasi.

## 20. Milestone Implementasi

### Milestone 1: Project Foundation

Output:

- Project Next.js dibuat.
- Tailwind aktif.
- Struktur folder dibuat.
- File sample data tersedia.
- Halaman utama tampil.

### Milestone 2: Map MVP

Output:

- Map tampil.
- Data dimuat dari JSON.
- Marker tampil.
- Klik marker membuka detail.

### Milestone 3: Exploration Tools

Output:

- Search aktif.
- Filter kategori aktif.
- List lokasi aktif.
- Reset filter tersedia.

### Milestone 4: Local Experience

Output:

- Favorite aktif.
- Data tersimpan di `localStorage`.
- Share URL state dasar aktif.

### Milestone 5: Insights and Polish

Output:

- Statistik tampil.
- About Data tampil.
- Responsive mobile diperbaiki.
- Loading, empty, dan error state selesai.

## 21. Acceptance Criteria MVP

MVP dianggap selesai jika:

- Aplikasi dapat berjalan tanpa backend.
- Data lokasi wisata dimuat dari file lokal di frontend.
- Map Indonesia tampil dengan marker wisata.
- Setiap marker dapat dibuka detailnya.
- Search dan filter bekerja.
- Favorit tersimpan di browser.
- UI dapat digunakan di desktop dan mobile.
- Tidak ada error fatal di console untuk flow utama.
- File data dan sumber data terdokumentasi.

## 22. Risiko dan Mitigasi

### Risiko: Dataset terlalu besar

Mitigasi:

- Mulai dari dataset kecil terkurasi.
- Gunakan marker clustering.
- Split data per kategori.

### Risiko: Koordinat tidak akurat

Mitigasi:

- Tambahkan `coordinateAccuracy`.
- Validasi lokasi unggulan secara manual.
- Tampilkan sumber data.

### Risiko: Leaflet bermasalah dengan SSR

Mitigasi:

- Render map sebagai client component.
- Gunakan dynamic import dengan `ssr: false`.

### Risiko: Lisensi data tidak jelas

Mitigasi:

- Gunakan sumber dengan lisensi jelas.
- Simpan metadata lisensi.
- Tampilkan About Data.

### Risiko: UI terlalu mirip landing page

Mitigasi:

- Jadikan map sebagai layar utama.
- Hindari hero marketing besar.
- Fokus pada eksplorasi data.

## 23. Rekomendasi Prompt Awal untuk Codex

Gunakan instruksi berikut saat mulai implementasi:

```text
Buat project frontend bernama geowisata menggunakan Next.js stable terbaru, TypeScript, Tailwind CSS, React Leaflet, Leaflet, Lucide React, dan Recharts. Project harus frontend-only tanpa backend.

Data wisata disimpan di public/data sebagai JSON/GeoJSON. Buat sample dataset tempat wisata Indonesia dengan field id, name, slug, category, province, city, island, latitude, longitude, description, source, dan coordinateAccuracy.

Halaman utama harus langsung berupa aplikasi map explorer, bukan landing page. Tampilkan peta Indonesia, marker wisata, sidebar filter kategori/provinsi/pulau, search, list lokasi, detail drawer, favorite localStorage, dan statistik sederhana.

Gunakan arsitektur sederhana sesuai PRD. Map component harus client-side dan aman untuk Next.js App Router.
```

## 24. Definition of Done

Project GeoWisata selesai untuk versi frontend MVP jika:

- Source code bisa dijalankan lokal.
- Tidak membutuhkan backend.
- Data berada di dalam project.
- Map dan marker berjalan.
- Search, filter, detail, dan favorite berjalan.
- Responsive layout layak digunakan.
- Dokumentasi dataset tersedia.
- Build production berhasil.

## 25. Lampiran: Contoh Struktur Data Final

Contoh minimal `places.json`:

```json
[
  {
    "id": "bali-pantai-kuta",
    "name": "Pantai Kuta",
    "slug": "pantai-kuta",
    "category": "beach",
    "categoryLabel": "Pantai",
    "description": "Pantai populer di Bali yang dikenal sebagai area wisata pesisir dan sunset.",
    "province": "Bali",
    "city": "Kabupaten Badung",
    "island": "Bali",
    "latitude": -8.718492,
    "longitude": 115.168632,
    "imageUrl": null,
    "tags": ["pantai", "sunset", "wisata alam"],
    "website": null,
    "osmUrl": "https://www.openstreetmap.org/",
    "wikidataId": null,
    "source": {
      "name": "OpenStreetMap",
      "url": "https://www.openstreetmap.org",
      "license": "ODbL"
    },
    "coordinateAccuracy": "point",
    "updatedAt": "2026-07-17"
  }
]
```

Contoh minimal `categories.json`:

```json
[
  {
    "id": "beach",
    "label": "Pantai",
    "icon": "Waves",
    "color": "#0EA5E9"
  },
  {
    "id": "mountain",
    "label": "Gunung",
    "icon": "Mountain",
    "color": "#16A34A"
  },
  {
    "id": "waterfall",
    "label": "Air Terjun",
    "icon": "Droplets",
    "color": "#06B6D4"
  },
  {
    "id": "national-park",
    "label": "Taman Nasional",
    "icon": "Trees",
    "color": "#15803D"
  },
  {
    "id": "heritage",
    "label": "Situs Sejarah",
    "icon": "Landmark",
    "color": "#D97706"
  }
]
```

