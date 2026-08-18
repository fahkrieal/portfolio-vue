export const projectsData = [
  {
    id: 'sistem-prediksi-servis-motor',
    slug: 'sistem-prediksi-servis-motor',
    index: '01',
    title: 'Sistem Prediksi Servis Motor',
    subtitle: 'Kilometer-Based Vehicle Maintenance & Service Forecasting Platform',
    role: 'Full-Stack Developer',
    category: 'Web Application & Forecasting',
    year: '2026',
    image: '/projects/mmssport.png',
    summary: 'Aplikasi monitoring dan prediksi servis kendaraan berbasis web yang mengotomasi estimasi waktu servis berkala menggunakan kalkulasi kilometer tempuh dan riwayat perawatan kendaraan.',
    description: 'Aplikasi web komprehensif yang dirancang untuk bengkel dan pemilik kendaraan, menyediakan dashboard monitoring real-time, logbook riwayat perawatan, dan algoritma kalkulasi interval servis berbasis jarak tempuh.',
    tech: ['Laravel', 'Vue.js', 'MySQL', 'REST API', 'Tailwind CSS'],
    stats: [
      { label: 'Role', value: 'Full-Stack Dev' },
      { label: 'Platform', value: 'Web Dashboard' },
      { label: 'Type', value: 'Academic Project' },
      { label: 'Year', value: '2026' }
    ],
    overview: 'Aplikasi monitoring dan penjadwalan servis kendaraan berbasis web yang dirancang untuk membantu pemilik kendaraan dan mekanik memantau riwayat perawatan serta mengestimasikan jadwal servis berkala berdasarkan kilometer tempuh dan durasi pemakaian.',
    problem: 'Banyak pemilik kendaraan sering kali terlambat melakukan perawatan rutin seperti penggantian oli mesin, kampas rem, atau transmisi karena tidak mencatat riwayat pemakaian secara akurat. Keterlambatan ini kerap berujung pada kerusakan komponen vital dan biaya perbaikan yang tinggi.',
    approach: 'Membangun platform terpusat yang memadukan input data odometer berkala dengan rumus interval standar pabrikan untuk menghasilkan jadwal estimasi servis yang jelas dan mudah dipantau melalui antarmuka responsif.',
    architecture: [
      'Backend RESTful API menggunakan framework Laravel dengan arsitektur MVC dan Eloquent ORM.',
      'Logika kalkulasi interval servis berbasis perhitungan rata-rata kilometer harian dan ambang batas km tiap komponen.',
      'Frontend Vue.js interaktif dengan state handling dinamis untuk pembaruan log servis tanpa reload.',
      'Relasi database MySQL ternormalisasi antara entitas Pengguna, Kendaraan, Jadwal Servis, dan Riwayat Komponen.'
    ],
    features: [
      'Dashboard monitoring status servis aktif dan notifikasi mendekati batas kilometer.',
      'Pencatatan riwayat servis (service logbook) dengan detail pengerjaan dan pergantian suku cadang.',
      'Manajemen multi-kendaraan dalam satu akun pengguna.',
      'Estimasi otomatis jadwal servis berikutnya berdasarkan rata-rata akumulasi odometer.',
      'Manajemen data komponen dan batas toleransi jarak tempuh.'
    ],
    challenges: 'Menghitung estimasi tanggal servis yang realistis saat jarak tempuh harian pengguna bervariasi. Hal ini diselesaikan dengan membuat algoritma rata-rata bergerak (moving average) dari data odometer historis.',
    github: 'https://github.com/fahkrieal',
    liveUrl: null,
    status: 'Completed / 2026'
  },
  {
    id: 'profilex',
    slug: 'profilex',
    index: '02',
    title: 'ProFileX',
    subtitle: 'Modular SaaS Platform for Company Profile & Portfolio Generation',
    role: 'Full-Stack Developer',
    category: 'SaaS Platform',
    year: '2026',
    image: '/projects/profilex.png',
    summary: 'Platform SaaS modern untuk pembuatan dan pengelolaan profil perusahaan dengan autentikasi berbasis token, dashboard admin terintegrasi, dan arsitektur REST API.',
    description: 'Solusi Content Management System berbasis SaaS yang memungkinkan bisnis membangun website profil perusahaan yang elegan, responsif, dan mudah diperbarui tanpa perlu mengedit kode sumber secara manual.',
    tech: ['Laravel', 'Vue.js', 'Sanctum', 'TailAdmin', 'MySQL', 'REST API'],
    stats: [
      { label: 'Role', value: 'Full-Stack Dev' },
      { label: 'Platform', value: 'SaaS Web App' },
      { label: 'Type', value: 'Academic Project' },
      { label: 'Year', value: '2026' }
    ],
    overview: 'ProFileX adalah platform SaaS yang dirancang untuk memudahkan UMKM, agensi, dan profesional dalam mempublikasikan company profile yang profesional secara instan dengan manajemen konten terpadu.',
    problem: 'Membangun website profil perusahaan dari nol membutuhkan waktu dan biaya yang tidak sedikit. Di sisi lain, perubahan informasi bisnis kecil (seperti portofolio baru atau kontak) seringkali memerlukan bantuan developer.',
    approach: 'Menghadirkan CMS modular berbasis web di mana pengguna dapat memilih tata letak, mengunggah aset visual, dan mengatur detail profil perusahaan melalui dashboard administrasi yang intuitif.',
    architecture: [
      'Laravel Backend dengan autentikasi token berbasis Laravel Sanctum untuk keamanan data pengguna.',
      'REST API modular untuk operasi CRUD pada section profil (Tentang, Layanan, Portofolio, Testimoni, Kontak).',
      'Frontend Vue.js dikombinasikan dengan TailAdmin template untuk antarmuka dashboard yang bersih dan efisien.',
      'Skema database MySQL yang fleksibel untuk menyimpan metadata dan preferensi tampilan per perusahaan.'
    ],
    features: [
      'Generator Company Profile dinamis dengan live content editor.',
      'Dashboard analitik dan pengelolaan data profil berbasis peran (Role-based access).',
      'Autentikasi aman menggunakan token Sanctum.',
      'Struktur data modular untuk portofolio, katalog layanan, dan galeri pengerjaan.',
      'Desain responsif optimal di desktop, tablet, dan smartphone.'
    ],
    challenges: 'Menyusun struktur tabel database yang cukup fleksibel untuk mengakomodasi berbagai jenis informasi profil tanpa memicu query n+1 atau memperlambat rendering API.',
    github: 'https://github.com/fahkrieal',
    liveUrl: null,
    status: 'Completed / 2026'
  },
  {
    id: 'coffeefinder',
    slug: 'coffeefinder',
    index: '03',
    title: 'CoffeeFinder',
    subtitle: 'Spatial Geographic Information System for Coffee Shop Discovery',
    role: 'Frontend & GIS Integration',
    category: 'GIS Web Application',
    year: '2026',
    image: '/projects/coffeefinder.png',
    summary: 'Sistem Informasi Geografis berbasis web untuk eksplorasi coffee shop dengan visualisasi peta interaktif Leaflet, filtering fasilitas spesifik, dan pencarian koordinat.',
    description: 'Aplikasi web SIG interaktif yang membantu pengguna menemukan lokasi coffee shop yang ideal untuk bekerja (WFC) dengan filter fasilitas seperti colokan listrik, koneksi Wi-Fi, ruangan ber-AC, dan area outdoor.',
    tech: ['Vue.js', 'Leaflet', 'OpenStreetMap', 'Laravel', 'MySQL', 'Tailwind CSS'],
    stats: [
      { label: 'Role', value: 'Frontend & GIS' },
      { label: 'Platform', value: 'Interactive Web GIS' },
      { label: 'Type', value: 'Academic Project' },
      { label: 'Year', value: '2026' }
    ],
    overview: 'CoffeeFinder adalah aplikasi Sistem Informasi Geografis (SIG) yang memetakan coffee shop dengan fokus pada kebutuhan remote worker dan mahasiswa yang membutuhkan tempat kerja produktif.',
    problem: 'Peta digital umum sering kali tidak menyediakan filter mendalam terkait kelengkapan fasilitas bekerja, seperti ketersediaan stopkontak di setiap meja, kecepatan Wi-Fi, atau suasana ruangan yang tenang.',
    approach: 'Mengintegrasikan engine peta Leaflet.js dengan data geospatial dan database fasilitas terstruktur sehingga pengguna dapat memfilter coffee shop berdasarkan atribut kerja spesifik secara visual di peta.',
    architecture: [
      'Peta interaktif berbasis Leaflet.js dengan tile provider OpenStreetMap yang ringan dan cepat.',
      'Frontend responsif Vue.js dengan binding reaktif terhadap event pergeseran dan zoom peta.',
      'Backend Laravel untuk melayani endpoint koordinat geospatial, data fasilitas, dan jam operasional.',
      'Penyimpanan koordinat latitude dan longitude dengan indexing spasial pada MySQL.'
    ],
    features: [
      'Peta interaktif dengan custom interactive marker dan popup info ringkas.',
      'Filter multi-fasilitas (Power outlet, Fast Wi-Fi, Smoking Area, Parking, Mosque).',
      'Pencarian lokasi berbasis nama coffee shop, wilayah, atau radius terdekat.',
      'Drawer detail informasi dengan jam buka, rentang harga, dan galeri foto tempat.',
      'Antarmuka mobile-first yang nyaman digunakan saat bepergian.'
    ],
    challenges: 'Mengoptimalkan interaksi peta dan reaktivitas Vue.js agar pergantian filter fasilitas memperbarui marker di layar secara instan tanpa glitch rendering.',
    github: 'https://github.com/fahkrieal',
    liveUrl: null,
    status: 'Completed / 2026'
  }
]
