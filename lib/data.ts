export interface Service {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Portfolio {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDesc: string;
  description: string;
  techStack: string[];
  client: string;
  year: number;
  featured?: boolean;
  image: string;
  status?: string;
  caseStudy?: {
    problem: string;
    analysis: string;
    solution: string;
    technology: string;
    result: string;
  };
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  content: string;
  author: string;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  skills: string[];
  photo?: string;
  linkedin?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  testimonial: string;
  rating: number;
}

export interface TrustIndicator {
  stat: string;
  title: string;
  description: string;
}

export interface CoreValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const trustIndicatorsData: TrustIndicator[] = [
  {
    stat: "50+",
    title: "Projects Selesai",
    description: "Solusi website, ERP, hingga aplikasi custom yang telah digunakan oleh berbagai industri."
  },
  {
    stat: "20+",
    title: "Partnership",
    description: "Membangun hubungan jangka panjang sebagai mitra teknologi terpercaya."
  },
  {
    stat: "100%",
    title: "Custom Dev",
    description: "Tidak ada template — dikembangkan khusus sesuai kebutuhan unik bisnis Anda."
  },
  {
    stat: "3+",
    title: "Tahun Pengalaman",
    description: "Konsisten & profesional delivering solusi teknologi berkualitas tinggi."
  }
];

export const coreValuesData: CoreValue[] = [
  {
    id: "innovation",
    title: "Innovation First",
    description: "Menghadirkan teknologi modern seperti Next.js, AI automation, dan visual 3D interaktif untuk menjaga bisnis Anda tetap unggul.",
    icon: "Sparkles"
  },
  {
    id: "partnership",
    title: "Long-term Partnership",
    description: "Kami tidak sekadar menyelesaikan project, melainkan menjadi mitra tumbuh jangka panjang dalam perjalanan digital Anda.",
    icon: "Users"
  },
  {
    id: "quality",
    title: "Performance & Quality",
    description: "Kode bersih, kecepatan tinggi, keamanan terjamin, dan desain responsive tanpa kompromi.",
    icon: "ShieldCheck"
  },
  {
    id: "mission",
    title: "Mission-Driven",
    description: "Berkomitmen memberikan solusi digital yang relevan dan berdampak nyata bagi pertumbuhan dan efisiensi bisnis.",
    icon: "Target"
  }
];

export const visionPhilosophyData = {
  visi: "Menjadi studio solusi digital terdepan yang mendefinisikan ulang standar kualitas, estetika, dan performa teknologi di Indonesia.",
  filosofi: "Understand Problems First, Build Solutions. Kami menganalisis akar masalah bisnis sebelum menulis sebaris kode.",
  komitmen: "100% On-time delivery, transparansi proses development, dan support berkelanjutan pasca peluncuran."
};

export const servicesData: Service[] = [
  {
    id: "web-development",
    name: "Website Development",
    category: "Development",
    shortDesc: "Bangun kehadiran digital yang kuat dengan website premium, cepat, dan SEO-ready.",
    description: "Pengembangan website modern, responsif, & performa tinggi menggunakan Next.js, React, dan Tailwind CSS.",
    icon: "Globe",
    features: ["Company Profile", "Landing Page Konversi Tinggi", "E-Commerce System", "Portal & Directory"]
  },
  {
    id: "system-development",
    name: "System Development & ERP",
    category: "Enterprise",
    shortDesc: "Sistem bisnis custom yang efisien — dari ERP, POS, hingga dashboard monitoring.",
    description: "Sistem manajemen bisnis terintegrasi yang disesuaikan dengan alur kerja perusahaan Anda secara real-time.",
    icon: "Cpu",
    features: ["Inventory System", "ERP System", "POS System Kasir", "HR Management"]
  },
  {
    id: "iot-smart-automation",
    name: "Sistem IoT & Smart Automation",
    category: "IoT & Hardware",
    shortDesc: "Integrasi sensor IoT real-time, protokol MQTT, dan otomatisasi kontrol perangkat industri.",
    description: "Solusi IoT terpadu untuk pemantauan parameter kualitas air, suhu, kelembaban, dan aktuator kontrol industri.",
    icon: "Radio",
    features: ["Monitoring Kualitas Air & pH", "Protokol MQTT & Telemetri Real-Time", "Otomasi Aktuator & Relai Industri", "Dashboard Monitoring Interaktif"]
  },
  {
    id: "mentoring-coaching",
    name: "Mentoring & IT Coaching",
    category: "Mentoring & Education",
    shortDesc: "Program mentoring teknis 1-on-1 & bimbingan skripsi / up-skilling tim IT perusahaan.",
    description: "Bimbingan privat software engineering, arsitektur Next.js fullstack, IoT, dan konsultasi proyek IT.",
    icon: "GraduationCap",
    features: ["Mentoring Next.js & Fullstack", "Arsitektur System & Database", "Bimbingan Tugas Akhir & Skripsi", "Up-skilling Tim IT Internal"]
  },
  {
    id: "branding-creative",
    name: "Branding & Creative",
    category: "Branding",
    shortDesc: "Identitas visual yang kuat dan konsisten untuk brand yang mudah diingat.",
    description: "Desain antarmuka modern UI/UX, brand identity kohesif, dan aset visual premium.",
    icon: "Layers",
    features: ["UI/UX Design Prototypes", "Brand Identity & Guidelines", "Content Strategy", "Motion Graphic & Assets"]
  },
  {
    id: "automation-ai",
    name: "Automation & AI",
    category: "Automation",
    shortDesc: "Otomasi proses bisnis dan integrasi AI untuk efisiensi operasional maksimal.",
    description: "Solusi otomasi alur kerja, integrasi API, bot WhatsApp cerdas, dan pelaporan otomatis.",
    icon: "Cpu",
    features: ["API System Integration", "WhatsApp Automation Bot", "AI Workflow Analysis", "Auto Reporting Dashboard"]
  }
];

export const portfolioData: Portfolio[] = [
  {
    id: "1",
    slug: "katalog-pemesanan",
    name: "Katalog Pemesanan",
    category: "Web App / E-commerce",
    shortDesc: "Sistem katalog pemesanan online interaktif dengan manajemen produk dan pesanan instan.",
    description: "Aplikasi katalog pemesanan online custom yang memudahkan klien memamerkan produk dan memproses pesanan masuk secara real-time.",
    techStack: ["React", "Next.js", "Node.js"],
    client: "PT Pemesanan Nusantara",
    year: 2026,
    featured: true,
    status: "Published",
    image: "https://images.unsplash.com/photo-1556742049-0a675659e9cf?auto=format&fit=crop&w=800&q=80",
    caseStudy: {
      problem: "Proses pemesanan barang masih dilakukan manual via chat yang membingungkan inventaris.",
      analysis: "Kebutuhan katalog interaktif dengan opsi pesanan otomatis langsung ke WhatsApp/Admin.",
      solution: "Web App katalog terintegrasi dengan pembaruan stok real-time.",
      technology: "React, Next.js App Router, dan Node.js API backend.",
      result: "Kecepatan pemrosesan order naik 250% dan kesalahan pengiriman berkurang 90%."
    }
  },
  {
    id: "2",
    slug: "novadex-direktori-umkm-salatiga",
    name: "NovaDex – Direktori UMKM Salatiga",
    category: "Web App / Directory",
    shortDesc: "Portal direktori digital terintegrasi untuk katalogisasi dan promosi UMKM di daerah Salatiga.",
    description: "Platform direktori modern untuk menghubungkan ratusan UMKM Salatiga dengan calon konsumen secara digital.",
    techStack: ["Next.js", "Tailwind", "MySQL"],
    client: "Dinas UMKM Salatiga",
    year: 2026,
    featured: true,
    status: "Published",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    caseStudy: {
      problem: "Pelaku UMKM kesulitan memperluas jangkauan pasar di luar area lokal.",
      analysis: "Diperlukan direktori terpusat dengan fitur pencarian lokasi, kategori produk, dan kontak WA langsung.",
      solution: "Pengembangan portal NovaDex berkecepatan tinggi berbasis Next.js & MySQL.",
      technology: "Next.js 14, Tailwind CSS, MySQL database.",
      result: "500+ UMKM terdaftar dan trafik kunjungan meningkat 400% dalam 3 bulan."
    }
  },
  {
    id: "3",
    slug: "dasterku-website-grosir-daster-wanita",
    name: "DasterKu – Website Grosir Daster Wanita",
    category: "E-Commerce",
    shortDesc: "Platform toko grosir online daster wanita dengan fitur kalkulasi diskon grosir otomatis.",
    description: "Website e-commerce grosir yang dirancang khusus untuk pembelian kuantitas besar dengan perhitungan ongkir dan diskon otomatis.",
    techStack: ["Laravel", "Bootstrap", "MySQL"],
    client: "DasterKu Official",
    year: 2025,
    featured: true,
    status: "Published",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "4",
    slug: "dapur-ceria-sistem-manajemen-bakery",
    name: "Dapur Ceria – Sistem Manajemen Bakery",
    category: "POS & Web App",
    shortDesc: "Sistem Point of Sale (POS) dan manajemen stok bahan baku resep bakery terpadu.",
    description: "Aplikasi POS dan manajemen resep bahan baku bakery untuk menghitung HPP otomatis dan mencatat kasir cabang.",
    techStack: ["React", "Node.js", "PostgreSQL"],
    client: "Dapur Ceria Group",
    year: 2025,
    featured: false,
    status: "Published",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "5",
    slug: "mitraman-sistem-manajemen-mitra-honorarium",
    name: "MitraMan – Sistem Manajemen Mitra & Honorarium",
    category: "Enterprise Web App",
    shortDesc: "Platform otomatisasi penggajian, komisi, dan pencatatan kerja mitra lapangan.",
    description: "Sistem enterprise untuk mengelola ribuan mitra kerja, kalkulasi honorarium berbasis KPI, dan pencairan dana terstruktur.",
    techStack: ["Next.js", "Express", "PostgreSQL"],
    client: "PT Mitra Mandiri Utama",
    year: 2025,
    featured: false,
    status: "Published",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "6",
    slug: "worktrack-sistem-manajemen-karyawan-dan-payroll",
    name: "WorkTrack – Sistem Manajemen Karyawan dan Payroll",
    category: "HR & Payroll System",
    shortDesc: "Sistem pelacakan absensi GPS, klaim lembur, dan slip gaji terotomatisasi.",
    description: "Sistem HR internal untuk absensi berbasis lokasi, persetujuan cuti digital, dan generate slip gaji PDF terenkripsi.",
    techStack: ["Vue.js", "Laravel", "MySQL"],
    client: "WorkTrack Indonesia",
    year: 2024,
    featured: false,
    status: "Published",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "7",
    slug: "sistem-monitoring-kualitas-air-berbasis-iot",
    name: "Sistem Monitoring Kualitas Air Berbasis IoT",
    category: "IoT & Web App",
    shortDesc: "Dashboard pemantauan sensor pH, keruhan, dan TDS air secara real-time via MQTT.",
    description: "Solusi IoT terintegrasi untuk industri dan budidaya air dengan peringatan dini berbasis insiden sensor.",
    techStack: ["React", "Node.js", "MQTT"],
    client: "PT Tirta Bening Utama",
    year: 2026,
    featured: true,
    status: "Published",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "8",
    slug: "sistem-otomasi-kontrol-kualitas-penetral-ph-air",
    name: "Sistem Otomasi Kontrol Kualitas & Penetral pH Air",
    category: "IoT Automation",
    shortDesc: "Sistem otomatisasi penambahan larutan penetral pH berbasis aktuator cerdas.",
    description: "Pengontrol otomatis penetral pH air limbah industri dengan feedback loop akuisisi data real-time.",
    techStack: ["React", "Python", "C++"],
    client: "Industri Pengolahan Limbah",
    year: 2026,
    featured: false,
    status: "Published",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "9",
    slug: "erp-manufacturing-system",
    name: "ERP Manufacturing System",
    category: "Enterprise Software",
    shortDesc: "Sistem ERP manufaktur untuk integrasi jadwal mesin, bahan baku, dan siklus produksi.",
    description: "Platform ERP Manufaktur custom dengan visual grafik beban mesin, persediaan bahan baku, dan biaya HPP per lot.",
    techStack: ["Next.js", "Node.js", "PostgreSQL"],
    client: "PT Maju Industri Manufaktur",
    year: 2024,
    featured: true,
    status: "Published",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "10",
    slug: "hr-management-system",
    name: "HR Management System",
    category: "Enterprise Web App",
    shortDesc: "Portal HRD modern untuk pengelolaan performa karyawan, pelatihan, dan KPI.",
    description: "Dashboard pengelolaan sumber daya manusia terintegrasi dengan modul evaluasi 360 derajat.",
    techStack: ["React", "Express", "MySQL"],
    client: "CV Berkah Jaya Korpora",
    year: 2024,
    featured: false,
    status: "Published",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
  }
];

export const teamData: TeamMember[] = [
  {
    id: "1",
    name: "Solvia Nova",
    position: "Founder & CEO",
    bio: "Memimpin visi dan strategi Solvia Nova dalam membangun ekosistem digital yang berdampak. Berpengalaman lebih dari 5 tahun di industri teknologi dan digital business.",
    skills: ["PHP", "System Architecture", "Business Strategy", "Project Management"],
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "2",
    name: "Dev Team Lead",
    position: "Lead Fullstack Developer",
    bio: "Membangun sistem dan aplikasi web dengan standar kode yang bersih dan performa tinggi. Spesialis dalam membangun aplikasi yang scalable.",
    skills: ["Laravel", "React", "Vue.js", "MySQL", "Docker", "Redis"],
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "3",
    name: "Design Team Lead",
    position: "UI/UX & Visual Designer",
    bio: "Merancang pengalaman pengguna yang intuitif dan visual yang premium untuk setiap produk digital yang kami bangun.",
    skills: ["Figma", "Framer", "TailwindCSS", "Motion Design", "Prototyping"],
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "4",
    name: "Content Strategist",
    position: "Content & Growth Specialist",
    bio: "Membangun narasi brand yang kuat dan strategi konten yang menggerakkan audiens. Spesialis SEO dan digital marketing.",
    skills: ["Copywriting", "SEO", "Social Media Strategy", "Analytics"],
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "5",
    name: "System Analyst Lead",
    position: "Lead System Analyst",
    bio: "Menjembatani kebutuhan bisnis dengan solusi teknis. Memastikan setiap sistem yang dibangun benar-benar menjawab masalah nyata.",
    skills: ["Business Analysis", "ERD", "System Design", "Documentation", "QA"],
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: "1",
    clientName: "Budi Santoso",
    company: "CEO, PT Maju Bersama",
    testimonial: "Solvia Nova benar-benar mengubah cara kami beroperasi. Sistem ERP yang mereka bangun sangat intuitif dan tim kami langsung bisa adaptasi. Highly recommended!",
    rating: 5
  },
  {
    id: "2",
    clientName: "Rina Wijaya",
    company: "Founder, Toko Online Nusantara",
    testimonial: "Website e-commerce kami sekarang jauh lebih profesional. Penjualan meningkat 40% dalam 3 bulan pertama setelah launch. Tim Solvia Nova sangat responsif dan profesional.",
    rating: 5
  },
  {
    id: "3",
    clientName: "Ahmad Fauzi",
    company: "Marketing Director, Brand Lokal",
    testimonial: "Branding yang mereka rancang benar-benar merepresentasikan nilai brand kami. Proses kerja sama sangat menyenangkan dan hasilnya melebihi ekspektasi.",
    rating: 5
  }
];

export interface ClientPartner {
  id: string;
  name: string;
  category: string;
  logoText: string;
}

export const trustedClientsData: ClientPartner[] = [
  { id: "1", name: "PT Nusantara Digital", category: "Technology & Software", logoText: "NUSANTARA" },
  { id: "2", name: "PT Maju Industri", category: "Manufacturing & ERP", logoText: "MAJU IND" },
  { id: "3", name: "CV Berkah Jaya", category: "Enterprise & HR", logoText: "BERKAH JAYA" },
  { id: "4", name: "Toko Online Nusantara", category: "E-Commerce Platform", logoText: "TONSTORE" },
  { id: "5", name: "Brand Lokal Indonesia", category: "FMCG & Branding", logoText: "BRAND LOKAL" },
  { id: "6", name: "PT Solusi Terbaik", category: "Corporate Business", logoText: "SOLUSI BEST" },
];

export const articlesData: Article[] = [
  {
    id: "1",
    slug: "membangun-sistem-iot-skala-industri",
    title: "Panduan Membangun Arsitektur IoT Skala Industri yang Andal",
    category: "IoT & Cloud",
    date: "10 September 2026",
    readTime: "5 min read",
    summary: "Pelajari bagaimana merancang infrastruktur broker MQTT dan database time-series untuk jutaan sensor.",
    content: "Dalam lanskap industri 4.0, efisiensi operasional sangat bergantung pada pemantauan perangkat secara real-time...",
    author: "Solvia Nova",
    image: "/assets/images/article-1.jpg"
  },
  {
    id: "2",
    slug: "kenapa-nextjs-pilihan-terbaik-web-modern",
    title: "Mengapa Next.js App Router Menjadi Standar Utama Web Modern 2026",
    category: "Web Tech",
    date: "25 Agustus 2026",
    readTime: "4 min read",
    summary: "Membahas performa Server Components, Streaming SSR, dan fleksibilitas integrasi 3D WebGL.",
    content: "Next.js memberikan efisiensi luar biasa dalam menyajikan performa halaman kilat sekaligus kemampuan interaksi 3D kaya...",
    author: "Dev Team",
    image: "/assets/images/article-2.jpg"
  }
];

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
}

export const galleryData: GalleryItem[] = [
  {
    id: "1",
    title: "Solusi Reklame & Advertising Digital",
    category: "Branding & Advertising",
    date: "10 Sep 2026",
    image: "https://images.unsplash.com/photo-1542744094-3a31216955a4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    title: "NovaDex – Direktori UMKM Salatiga",
    category: "Web Application",
    date: "02 Sep 2026",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    title: "Dapur Ceria – Sistem Manajemen Bakery",
    category: "Point of Sale",
    date: "25 Aug 2026",
    image: "https://images.unsplash.com/photo-1556742049-0a675659e9cf?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    title: "DasterKu – Website Grosir Daster Wanita",
    category: "E-Commerce",
    date: "18 Aug 2026",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "5",
    title: "WorkTrack – Sistem Manajemen Karyawan dan Payroll",
    category: "HR Management",
    date: "10 Aug 2026",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "6",
    title: "MitraMan – Sistem Manajemen Mitra & Honorarium",
    category: "Enterprise System",
    date: "01 Aug 2026",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  },
];
