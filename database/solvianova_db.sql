-- ============================================================
-- Solvia Nova — Database Schema
-- Version: 1.0.0
-- ============================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+07:00";

CREATE DATABASE IF NOT EXISTS `solvianova_db`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE `solvianova_db`;

-- ============================================================
-- TABLE: admins
-- ============================================================
CREATE TABLE IF NOT EXISTS `admins` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(100) NOT NULL,
  `username`   VARCHAR(50)  NOT NULL UNIQUE,
  `email`      VARCHAR(150) NOT NULL UNIQUE,
  `password`   VARCHAR(255) NOT NULL,
  `role`       ENUM('superadmin','admin') NOT NULL DEFAULT 'admin',
  `is_active`  TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Default admin: username=admin, password=admin123
INSERT INTO `admins` (`name`, `username`, `email`, `password`, `role`) VALUES
('Super Admin', 'admin', 'admin@solvianova.com', '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'superadmin');
-- Password hash above = 'password' (bcrypt)
-- To generate your own: php -r "echo password_hash('yourpassword', PASSWORD_BCRYPT, ['cost'=>12]);"

-- ============================================================
-- TABLE: portfolios
-- ============================================================
CREATE TABLE IF NOT EXISTS `portfolios` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`        VARCHAR(200) NOT NULL,
  `slug`        VARCHAR(220) NOT NULL UNIQUE,
  `category`    VARCHAR(50)  NOT NULL DEFAULT 'Website',
  `short_desc`  VARCHAR(300) NULL,
  `description` LONGTEXT NULL,
  `tech_stack`  VARCHAR(300) NULL,
  `client`      VARCHAR(150) NULL,
  `year`        YEAR NULL,
  `project_url` VARCHAR(300) NULL,
  `thumbnail`   VARCHAR(300) NULL,
  `case_study`  JSON NULL,
  `sort_order`  SMALLINT NOT NULL DEFAULT 0,
  `is_active`   TINYINT(1) NOT NULL DEFAULT 1,
  `created_at`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_slug` (`slug`),
  INDEX `idx_category` (`category`),
  INDEX `idx_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: services
-- ============================================================
CREATE TABLE IF NOT EXISTS `services` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`        VARCHAR(150) NOT NULL,
  `slug`        VARCHAR(170) NOT NULL UNIQUE,
  `category`    VARCHAR(80)  NOT NULL,
  `short_desc`  VARCHAR(300) NULL,
  `description` TEXT NULL,
  `icon`        VARCHAR(50)  NULL,
  `sort_order`  SMALLINT NOT NULL DEFAULT 0,
  `is_active`   TINYINT(1) NOT NULL DEFAULT 1,
  `created_at`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_category` (`category`),
  INDEX `idx_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: team_members
-- ============================================================
CREATE TABLE IF NOT EXISTS `team_members` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(100) NOT NULL,
  `position`   VARCHAR(100) NOT NULL,
  `bio`        TEXT NULL,
  `skills`     VARCHAR(300) NULL,
  `photo`      VARCHAR(300) NULL,
  `linkedin`   VARCHAR(200) NULL,
  `sort_order` SMALLINT NOT NULL DEFAULT 0,
  `is_active`  TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: gallery
-- ============================================================
CREATE TABLE IF NOT EXISTS `gallery` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `image`      VARCHAR(300) NOT NULL,
  `caption`    VARCHAR(200) NULL,
  `sort_order` SMALLINT NOT NULL DEFAULT 0,
  `is_active`  TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: articles
-- ============================================================
CREATE TABLE IF NOT EXISTS `articles` (
  `id`           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title`        VARCHAR(250) NOT NULL,
  `slug`         VARCHAR(270) NOT NULL UNIQUE,
  `excerpt`      VARCHAR(400) NULL,
  `content`      LONGTEXT NOT NULL,
  `thumbnail`    VARCHAR(300) NULL,
  `category`     VARCHAR(80)  NULL,
  `tags`         VARCHAR(300) NULL,
  `meta_title`   VARCHAR(200) NULL,
  `meta_desc`    VARCHAR(300) NULL,
  `status`       ENUM('draft','published') NOT NULL DEFAULT 'draft',
  `author_id`    INT UNSIGNED NULL,
  `views`        INT UNSIGNED NOT NULL DEFAULT 0,
  `published_at` DATETIME NULL,
  `created_at`   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`   DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_slug` (`slug`),
  INDEX `idx_status` (`status`),
  INDEX `idx_category` (`category`),
  INDEX `idx_published` (`published_at`),
  CONSTRAINT `fk_article_author` FOREIGN KEY (`author_id`) REFERENCES `admins` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: testimonials
-- ============================================================
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `client_name` VARCHAR(100) NOT NULL,
  `company`     VARCHAR(150) NULL,
  `testimonial` TEXT NOT NULL,
  `rating`      TINYINT NOT NULL DEFAULT 5,
  `photo`       VARCHAR(300) NULL,
  `result`      VARCHAR(200) NULL,
  `sort_order`  SMALLINT NOT NULL DEFAULT 0,
  `is_active`   TINYINT(1) NOT NULL DEFAULT 1,
  `created_at`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: messages
-- ============================================================
CREATE TABLE IF NOT EXISTS `messages` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(100) NOT NULL,
  `email`      VARCHAR(150) NOT NULL,
  `phone`      VARCHAR(30)  NULL,
  `subject`    VARCHAR(200) NULL,
  `message`    TEXT NOT NULL,
  `is_read`    TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_read` (`is_read`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: settings
-- ============================================================
CREATE TABLE IF NOT EXISTS `settings` (
  `id`    INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `key`   VARCHAR(100) NOT NULL UNIQUE,
  `value` TEXT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Default settings
INSERT INTO `settings` (`key`, `value`) VALUES
('site_name',             'Solvia Nova'),
('site_email',            'hello@solvianova.com'),
('site_phone',            '+62 831-4880-1578'),
('site_whatsapp',         '6283148801578'),
('site_instagram',        '@solvianova'),
('site_linkedin',         'solvianova'),
('site_address',          'Indonesia'),
('seo_title',             'Solvia Nova — Digital Solution & Software House Modern'),
('seo_description',       'Solvia Nova membantu bisnis membangun sistem digital, website, aplikasi, dan branding modern dengan visual premium dan performa profesional.'),
('seo_keywords',          'software house, digital solution, website development, system development, branding, UI/UX, automation'),
('google_analytics',      ''),
('google_search_console', '');

-- ============================================================
-- SAMPLE DATA — PORTFOLIOS
-- ============================================================
INSERT INTO `portfolios` (`name`, `slug`, `category`, `short_desc`, `tech_stack`, `client`, `year`, `sort_order`, `is_active`, `case_study`) VALUES
('E-Commerce Platform', 'e-commerce-platform', 'Website', 'Platform belanja online lengkap dengan manajemen produk, payment gateway, dan laporan penjualan real-time.', 'Laravel, Vue.js, MySQL, Midtrans', 'PT Nusantara Digital', 2024, 1, 1, '{"Problem":"UMKM fashion lokal kehilangan potensi penjualan karena tidak memiliki platform online yang proper.","Analysis":"Analisis menunjukkan 70% pelanggan potensial mengakses via mobile dan membutuhkan proses checkout yang cepat.","Solution":"Platform e-commerce custom dengan UX yang dioptimasi untuk konversi dan mobile-first design.","Technology":"Laravel untuk backend, Vue.js untuk frontend interaktif, Midtrans untuk payment gateway.","Result":"Penjualan online meningkat 300% dalam 6 bulan pertama, bounce rate turun 45%."}'),
('ERP Manufacturing System', 'erp-manufacturing-system', 'Enterprise', 'Sistem ERP terintegrasi untuk manajemen produksi, inventory, dan supply chain perusahaan manufaktur.', 'PHP, React, PostgreSQL, Redis', 'PT Maju Industri', 2024, 2, 1, '{"Problem":"Perusahaan manufaktur dengan 200+ karyawan kesulitan mengelola inventory, produksi, dan laporan secara manual.","Analysis":"Proses manual menyebabkan kesalahan data 15% dan keterlambatan laporan 3 hari.","Solution":"Implementasi ERP terintegrasi yang menghubungkan seluruh departemen dalam satu platform real-time.","Technology":"PHP untuk backend, React untuk dashboard interaktif, PostgreSQL untuk database, Redis untuk caching.","Result":"Efisiensi operasional meningkat 60%, waktu pelaporan berkurang dari 3 hari menjadi real-time."}'),
('HR Management System', 'hr-management-system', 'Dashboard', 'Sistem manajemen SDM lengkap: absensi, payroll, rekrutmen, dan evaluasi kinerja karyawan.', 'PHP Native, MySQL, TailwindCSS', 'CV Berkah Jaya', 2023, 3, 1, '{"Problem":"Proses HR yang manual menyebabkan kesalahan payroll dan ketidakakuratan data karyawan.","Analysis":"Rata-rata 8 jam/minggu terbuang untuk rekap absensi dan kalkulasi gaji manual.","Solution":"Sistem HR digital dengan otomasi payroll, absensi digital, dan dashboard analytics.","Technology":"PHP Native untuk performa optimal, MySQL untuk database, TailwindCSS untuk UI modern.","Result":"Akurasi payroll 100%, waktu proses HR berkurang 70%, kepuasan karyawan meningkat signifikan."}'),
('Company Profile Premium', 'company-profile-premium', 'Website', 'Website company profile dengan CMS custom, SEO optimized, dan performa tinggi.', 'PHP, TailwindCSS, AlpineJS', 'PT Solusi Terbaik', 2024, 4, 1, NULL),
('Brand Identity FMCG', 'brand-identity-fmcg', 'Branding', 'Rebranding lengkap untuk perusahaan consumer goods — logo, guidelines, packaging, dan aset digital.', 'Figma, Illustrator, After Effects', 'Brand Lokal Indonesia', 2023, 5, 1, NULL),
('WhatsApp Automation Bot', 'whatsapp-automation-bot', 'Automation', 'Bot WhatsApp cerdas untuk customer service otomatis, notifikasi order, dan follow-up pelanggan.', 'Node.js, WhatsApp API, MySQL', 'Toko Online Nusantara', 2024, 6, 1, NULL);

-- ============================================================
-- SAMPLE DATA — TESTIMONIALS
-- ============================================================
INSERT INTO `testimonials` (`client_name`, `company`, `testimonial`, `rating`, `sort_order`, `is_active`) VALUES
('Budi Santoso', 'CEO, PT Maju Bersama', 'Solvia Nova benar-benar mengubah cara kami beroperasi. Sistem ERP yang mereka bangun sangat intuitif dan tim kami langsung bisa adaptasi. Highly recommended!', 5, 1, 1),
('Rina Wijaya', 'Founder, Toko Online Nusantara', 'Website e-commerce kami sekarang jauh lebih profesional. Penjualan meningkat 40% dalam 3 bulan pertama setelah launch. Tim Solvia Nova sangat responsif dan profesional.', 5, 2, 1),
('Ahmad Fauzi', 'Marketing Director, Brand Lokal', 'Branding yang mereka rancang benar-benar merepresentasikan nilai brand kami. Proses kerja sama sangat menyenangkan dan hasilnya melebihi ekspektasi.', 5, 3, 1);

-- ============================================================
-- SAMPLE DATA — TEAM MEMBERS
-- ============================================================
INSERT INTO `team_members` (`name`, `position`, `bio`, `skills`, `sort_order`, `is_active`) VALUES
('Solvia Nova', 'Founder & CEO', 'Memimpin visi dan strategi Solvia Nova dalam membangun ekosistem digital yang berdampak. Berpengalaman lebih dari 5 tahun di industri teknologi dan digital business.', 'PHP, System Architecture, Business Strategy, Project Management', 1, 1),
('Dev Team', 'Lead Fullstack Developer', 'Membangun sistem dan aplikasi web dengan standar kode yang bersih dan performa tinggi. Spesialis dalam membangun aplikasi yang scalable.', 'Laravel, React, Vue.js, MySQL, Docker, Redis', 2, 1),
('Design Team', 'UI/UX Designer', 'Merancang pengalaman pengguna yang intuitif dan visual yang premium untuk setiap produk digital yang kami bangun.', 'Figma, Framer, TailwindCSS, Motion Design, Prototyping', 3, 1),
('Content Team', 'Content Strategist', 'Membangun narasi brand yang kuat dan strategi konten yang menggerakkan audiens. Spesialis SEO dan digital marketing.', 'Copywriting, SEO, Social Media Strategy, Analytics', 4, 1),
('Analyst Team', 'System Analyst', 'Menjembatani kebutuhan bisnis dengan solusi teknis. Memastikan setiap sistem yang dibangun benar-benar menjawab masalah nyata.', 'Business Analysis, ERD, System Design, Documentation, QA', 5, 1);
