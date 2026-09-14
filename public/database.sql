-- ==============================================================================
-- Hares & Niqaa Database Schema & Initial Seed Data
-- Designed for MySQL 8.x / MariaDB on Hostinger
-- Collation: utf8mb4_unicode_ci
-- ==============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ------------------------------------------------------------------------------
-- 1. Admin Users Table
-- Default user: admin / admin123 (Supports bcrypt or auto-upgraded plain-text)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `admin_tokens`;
DROP TABLE IF EXISTS `admin_users`;
CREATE TABLE `admin_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `admin_users` (`id`, `username`, `password_hash`, `email`, `created_at`)
VALUES (1, 'admin', 'admin123', 'admin@hares-niqaa.com', NOW());

-- ------------------------------------------------------------------------------
-- 2. Admin Sessions & Auth Tokens Table
-- ------------------------------------------------------------------------------
CREATE TABLE `admin_tokens` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `token` VARCHAR(64) NOT NULL UNIQUE,
  `expires_at` DATETIME NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_token_lookup` (`token`, `expires_at`),
  CONSTRAINT `fk_tokens_user` FOREIGN KEY (`user_id`) REFERENCES `admin_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 3. Website Settings Table (Single Row id = 1)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `id` INT PRIMARY KEY DEFAULT 1,
  `company_name_ar` VARCHAR(255) NOT NULL,
  `company_name_en` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `phone_secondary` VARCHAR(50) DEFAULT NULL,
  `email` VARCHAR(100) NOT NULL,
  `email_secondary` VARCHAR(100) DEFAULT NULL,
  `address_ar` VARCHAR(255) NOT NULL,
  `address_en` VARCHAR(255) NOT NULL,
  `working_hours_ar` VARCHAR(255) NOT NULL,
  `working_hours_en` VARCHAR(255) NOT NULL,
  `logo_url` TEXT DEFAULT NULL,
  `logo_text_ar` VARCHAR(100) DEFAULT NULL,
  `logo_text_en` VARCHAR(100) DEFAULT NULL,
  `slogan_ar` VARCHAR(255) DEFAULT NULL,
  `slogan_en` VARCHAR(255) DEFAULT NULL,
  `theme_preset` VARCHAR(50) DEFAULT 'gold',
  `primary_color_hex` VARCHAR(20) DEFAULT '#C9A961',
  `secondary_color_hex` VARCHAR(20) DEFAULT '#0B1929',
  `dark_text_color` VARCHAR(20) DEFAULT '#F8FAFC',
  `dark_muted_text_color` VARCHAR(20) DEFAULT '#94A3B8',
  `light_text_color` VARCHAR(20) DEFAULT '#0F172A',
  `light_muted_text_color` VARCHAR(20) DEFAULT '#475569',
  `hero_bg_dark` VARCHAR(50) DEFAULT '#0B1929',
  `about_bg_dark` VARCHAR(50) DEFAULT '#0D1D30',
  `services_bg_dark` VARCHAR(50) DEFAULT '#0B1929',
  `subsidiaries_bg_dark` VARCHAR(50) DEFAULT '#0D1D30',
  `projects_bg_dark` VARCHAR(50) DEFAULT '#0B1929',
  `why_us_bg_dark` VARCHAR(50) DEFAULT '#0D1D30',
  `testimonials_bg_dark` VARCHAR(50) DEFAULT '#0B1929',
  `quote_bg_dark` VARCHAR(50) DEFAULT '#0D1D30',
  `footer_bg_dark` VARCHAR(50) DEFAULT '#07111D',
  `hero_bg_light` VARCHAR(50) DEFAULT '#0F172A',
  `about_bg_light` VARCHAR(50) DEFAULT '#FFFFFF',
  `services_bg_light` VARCHAR(50) DEFAULT '#F8FAFC',
  `subsidiaries_bg_light` VARCHAR(50) DEFAULT '#F1F5F9',
  `projects_bg_light` VARCHAR(50) DEFAULT '#FFFFFF',
  `why_us_bg_light` VARCHAR(50) DEFAULT '#F8FAFC',
  `testimonials_bg_light` VARCHAR(50) DEFAULT '#FFFFFF',
  `quote_bg_light` VARCHAR(50) DEFAULT '#F8FAFC',
  `footer_bg_light` VARCHAR(50) DEFAULT '#0F172A',
  `card_bg_dark` VARCHAR(50) DEFAULT '#112236',
  `card_bg_light` VARCHAR(50) DEFAULT '#FFFFFF',
  `card_border_dark` VARCHAR(50) DEFAULT '#1E3A5F',
  `card_border_light` VARCHAR(50) DEFAULT '#E2E8F0',
  `card_radius_px` INT DEFAULT 16,
  `hero_badge_ar` VARCHAR(255) DEFAULT NULL,
  `hero_badge_en` VARCHAR(255) DEFAULT NULL,
  `hero_title_ar` TEXT DEFAULT NULL,
  `hero_title_en` TEXT DEFAULT NULL,
  `hero_subtitle_ar` TEXT DEFAULT NULL,
  `hero_subtitle_en` TEXT DEFAULT NULL,
  `hero_slides` JSON DEFAULT NULL,
  `about_title_ar` VARCHAR(255) DEFAULT NULL,
  `about_title_en` VARCHAR(255) DEFAULT NULL,
  `about_desc_ar` TEXT DEFAULT NULL,
  `about_desc_en` TEXT DEFAULT NULL,
  `about_vision_ar` TEXT DEFAULT NULL,
  `about_vision_en` TEXT DEFAULT NULL,
  `years_experience` INT DEFAULT 15,
  `happy_clients` INT DEFAULT 450,
  `completed_projects` INT DEFAULT 1200,
  `security_guards_count` INT DEFAULT 850,
  `facebook_url` VARCHAR(255) DEFAULT NULL,
  `twitter_url` VARCHAR(255) DEFAULT NULL,
  `linkedin_url` VARCHAR(255) DEFAULT NULL,
  `instagram_url` VARCHAR(255) DEFAULT NULL,
  `whatsapp_number` VARCHAR(50) DEFAULT '966501234567',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `settings` (
  `id`, `company_name_ar`, `company_name_en`, `phone`, `phone_secondary`,
  `email`, `email_secondary`, `address_ar`, `address_en`, `working_hours_ar`,
  `working_hours_en`, `logo_url`, `logo_text_ar`, `logo_text_en`, `slogan_ar`,
  `slogan_en`, `theme_preset`, `primary_color_hex`, `secondary_color_hex`,
  `dark_text_color`, `dark_muted_text_color`, `light_text_color`, `light_muted_text_color`,
  `hero_bg_dark`, `about_bg_dark`, `services_bg_dark`, `subsidiaries_bg_dark`,
  `projects_bg_dark`, `why_us_bg_dark`, `testimonials_bg_dark`, `quote_bg_dark`,
  `footer_bg_dark`, `hero_bg_light`, `about_bg_light`, `services_bg_light`,
  `subsidiaries_bg_light`, `projects_bg_light`, `why_us_bg_light`, `testimonials_bg_light`,
  `quote_bg_light`, `footer_bg_light`, `card_bg_dark`, `card_bg_light`,
  `card_border_dark`, `card_border_light`, `card_radius_px`, `hero_badge_ar`,
  `hero_badge_en`, `hero_title_ar`, `hero_title_en`, `hero_subtitle_ar`,
  `hero_subtitle_en`, `hero_slides`, `about_title_ar`, `about_title_en`,
  `about_desc_ar`, `about_desc_en`, `about_vision_ar`, `about_vision_en`,
  `years_experience`, `happy_clients`, `completed_projects`, `security_guards_count`,
  `facebook_url`, `twitter_url`, `linkedin_url`, `instagram_url`, `whatsapp_number`
) VALUES (
  1,
  'شركة حارس ونقاء للخدمات الأمنية والنظافة',
  'Hares & Niqaa Security & Cleaning Co.',
  '+966 11 456 7890',
  '+966 50 123 4567',
  'info@hares-niqaa.com',
  'support@hares-niqaa.com',
  'الرياض، طريق الملك فهد، البرج المالي - الدور 18',
  'Riyadh, King Fahd Road, Financial Tower - 18th Floor',
  'غرفة العمليات: 24/7 | الإدارة: الأحد - الخميس 8 ص - 5 م',
  'Command Center: 24/7 | Admin: Sun - Thu 8AM - 5PM',
  '',
  'حارس ونقاء',
  'HARES & NIQAA',
  'أمن ونظافة متكاملة',
  'Integrated Security & Hygiene',
  'gold',
  '#C9A961',
  '#0B1929',
  '#F8FAFC',
  '#94A3B8',
  '#0F172A',
  '#475569',
  '#0B1929',
  '#0D1D30',
  '#0B1929',
  '#0D1D30',
  '#0B1929',
  '#0D1D30',
  '#0B1929',
  '#0D1D30',
  '#07111D',
  '#0F172A',
  '#FFFFFF',
  '#F8FAFC',
  '#F1F5F9',
  '#FFFFFF',
  '#F8FAFC',
  '#FFFFFF',
  '#F8FAFC',
  '#0F172A',
  '#112236',
  '#FFFFFF',
  '#1E3A5F',
  '#E2E8F0',
  16,
  'الشركة الأولى المعتمدة للحراسات الأمنية والنظافة بالمملكة',
  'ISO Certified Premier Security & Sanitation Enterprise',
  'حماية متكاملة ونظافة استثنائية لمؤسستك',
  'Integrated Protection & Exceptional Sanitation for Your Enterprise',
  'نقدم أحدث حلول الحراسة الأمنية الفاخرة والنظافة الشاملة باستخدام أحدث التكنولوجيا والكوادر المدربة وفق أعلى معايير الجودة العالمية.',
  'Delivering elite security guarding and comprehensive industrial sanitation powered by cutting-edge technology and certified professionals.',
  '[{\"id\":\"slide-1\",\"image\":\"https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=80\",\"titleAr\":\"حماية متكاملة ونظافة استثنائية لمؤسستك\",\"titleEn\":\"Integrated Protection & Exceptional Sanitation for Your Enterprise\",\"subtitleAr\":\"نقدم أحدث حلول الحراسة الأمنية الفاخرة والنظافة الشاملة باستخدام أحدث التكنولوجيا والكوادر المدربة وفق أعلى معايير الجودة العالمية.\",\"subtitleEn\":\"Delivering elite security guarding and comprehensive industrial sanitation powered by cutting-edge technology and certified professionals.\",\"badgeAr\":\"الشركة الأولى المعتمدة للحراسات الأمنية والنظافة بالمملكة\",\"badgeEn\":\"ISO Certified Premier Security & Sanitation Enterprise\"},{\"id\":\"slide-2\",\"image\":\"https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80\",\"titleAr\":\"أنظمة أمنية ذكية ورصد متقدم بالذكاء الاصطناعي\",\"titleEn\":\"AI-Powered Smart Security Systems & Advanced Monitoring\",\"subtitleAr\":\"غرف مراقبة وربط مركزي على مدار الساعة مع تحليلات الذكاء الاصطناعي لاكتشاف التهديدات وإدارة الأزمات فورياً.\",\"subtitleEn\":\"24/7 Command centers with real-time video analytics, automated threat detection, and instant dispatch systems.\",\"badgeAr\":\"تقنيات المراقبة الذكية المعززة بالذكاء الاصطناعي\",\"badgeEn\":\"Next-Gen AI Surveillance & Smart Dispatch\"},{\"id\":\"slide-3\",\"image\":\"https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80\",\"titleAr\":\"خدمات النظافة الفائقة وإدارة البيئة الفاخرة\",\"titleEn\":\"Premium Industrial Hygiene & High-Rise Sanitation\",\"subtitleAr\":\"فريق متخصص لتنظيف وتعقيم المجمعات التجارية والواجهات الزجاجية الشاهقة بأسطول حديث ومواد صديقة للبيئة.\",\"subtitleEn\":\"Certified specialists for commercial complexes and high-rise facade cleaning using eco-friendly solutions.\",\"badgeAr\":\"معايير النظافة والتعقيم الفندقي والصناعي\",\"badgeEn\":\"Eco-Friendly Industrial Sanitation Standards\"}]',
  'قوة واحدة تجمع بين الأمان والبيئة النظيفة',
  'One Unified Force for Security & Pristine Hygiene',
  'تأسست شركة حارس ونقاء لتحدث طفرة نوعية في قطاع إدارة المرافق المتميزة عبر تقديم حلول الحراسة الميدانية ونظافة الأبراج المنفذة وفق أرقى المعايير العالمية والتزام صارم بضوابط الجودة والأمان.',
  'Hares & Niqaa was established to revolutionize facility management through military-grade guard deployment and high-rise sanitation, operating under strict international ISO certifications.',
  'أن نكون الخيار الأول المعتمد لكبرى المؤسسات، الهيئات الحكومية، والشركات العالمية في منطقة الشرق الأوسط.',
  'To be the premier trusted security & facilities partner for enterprise corporations and government entities across the Middle East.',
  14,
  380,
  1250,
  850,
  'https://facebook.com',
  'https://x.com',
  'https://linkedin.com',
  'https://instagram.com',
  '966501234567'
);

-- ------------------------------------------------------------------------------
-- 4. Subsidiary Categories Table
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `subsidiary_categories`;
CREATE TABLE `subsidiary_categories` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name_ar` VARCHAR(100) NOT NULL,
  `name_en` VARCHAR(100) NOT NULL,
  `sort_order` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `subsidiary_categories` (`id`, `name_ar`, `name_en`, `sort_order`) VALUES ('all', 'جميع الشركات التابعة', 'All Group Companies', 0);
INSERT INTO `subsidiary_categories` (`id`, `name_ar`, `name_en`, `sort_order`) VALUES ('security', 'الحراسات الأمنية الميدانية', 'Security & Guarding', 1);
INSERT INTO `subsidiary_categories` (`id`, `name_ar`, `name_en`, `sort_order`) VALUES ('cleaning', 'النظافة والتعقيم الصناعي', 'Hygiene & Sanitation', 2);
INSERT INTO `subsidiary_categories` (`id`, `name_ar`, `name_en`, `sort_order`) VALUES ('tech', 'أنظمة الذكاء الاصطناعي', 'AI & Smart Tech', 3);
INSERT INTO `subsidiary_categories` (`id`, `name_ar`, `name_en`, `sort_order`) VALUES ('crowd', 'إدارة الفعاليات والحشود', 'Crowd & Event Guarding', 4);

-- ------------------------------------------------------------------------------
-- 5. Subsidiaries Table
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `subsidiaries`;
CREATE TABLE `subsidiaries` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name_ar` VARCHAR(150) NOT NULL,
  `name_en` VARCHAR(150) NOT NULL,
  `tagline_ar` VARCHAR(255) DEFAULT NULL,
  `tagline_en` VARCHAR(255) DEFAULT NULL,
  `logo_url` TEXT DEFAULT NULL,
  `hero_image` TEXT DEFAULT NULL,
  `icon_name` VARCHAR(50) DEFAULT 'Building',
  `category` VARCHAR(50) NOT NULL,
  `description_ar` TEXT DEFAULT NULL,
  `description_en` TEXT DEFAULT NULL,
  `detailed_mission_ar` TEXT DEFAULT NULL,
  `detailed_mission_en` TEXT DEFAULT NULL,
  `services_ar` JSON DEFAULT NULL,
  `services_en` JSON DEFAULT NULL,
  `certifications_ar` JSON DEFAULT NULL,
  `certifications_en` JSON DEFAULT NULL,
  `gallery_images` JSON DEFAULT NULL,
  `clients_count` INT DEFAULT 0,
  `projects_count` INT DEFAULT 0,
  `established_year` VARCHAR(10) DEFAULT '2015',
  `email` VARCHAR(100) DEFAULT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  `website_url` VARCHAR(255) DEFAULT NULL,
  `badge_ar` VARCHAR(100) DEFAULT NULL,
  `badge_en` VARCHAR(100) DEFAULT NULL,
  `sort_order` INT DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `subsidiaries` (
    `id`, `name_ar`, `name_en`, `tagline_ar`, `tagline_en`, `logo_url`,
    `hero_image`, `icon_name`, `category`, `description_ar`, `description_en`,
    `detailed_mission_ar`, `detailed_mission_en`, `services_ar`, `services_en`,
    `certifications_ar`, `certifications_en`, `gallery_images`, `clients_count`,
    `projects_count`, `established_year`, `email`, `phone`, `website_url`,
    `badge_ar`, `badge_en`, `sort_order`, `created_at`
  ) VALUES (
    'sub-1', 'شركة درع الأمان للحراسات الأمنية', 'Shield Security Guarding Co.', 'حماية ميدانية وإدارة مخاطر متقدمة 24/7 للمنشآت الكبرى', 'Military-Grade Field Protection & Risk Management 24/7', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=80', 'ShieldCheck', 'security', 'الذراع الأمني المتخصص في حراسة الأبراج التجارية، المجمعات السكنية، والبنوك والمرافق الحيوية بكوادر أمنية مدربة أعلى تدريب مع نظام دوريات تكتيكي متطور.', 'Specialized security division guarding corporate towers, residential compounds, banks, and critical assets with trained guards and real-time command centers.',
    'توفير أعلى المستويات الأمنية وحماية الأرواح والمنشآت من خلال الدمج بين الاحترافية البشرية والتكنولوجيا الذكية وغرف المراقبة المركزية 24 ساعة.', 'Providing highest security levels protecting lives and infrastructure by combining human expertise with 24/7 central AI surveillance.', '[\"حراسة المنشآت والشركات الكبرى\",\"أنظمة المراقبة وغرفة Operations التكتيكية\",\"تأمين نقل الأموال والمقتنيات الثمينة\",\"دوريات أمنية موجهة بنظام GPS\"]', '[\"Facility & Corporate Protection\",\"CCTV Ops & Tactical Command Center\",\"Valuables & Escort Services\",\"GPS Guided Smart Mobile Patrols\"]',
    '[\"مرخصة من وزارة الداخلية - الأمن العام\",\"شهادة ISO 9001 لإدارة الجودة\",\"عضوية الجمعية الدولية لأمن المنشآت (ASIS)\"]', '[\"Ministry of Interior Licensed\",\"ISO 9001 Quality Certified\",\"ASIS International Security Member\"]', '[\"https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80\",\"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80\",\"https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80\"]', 160,
    520, '2012', 'security@hares-niqaa.com', '+966 11 456 7891', NULL,
    'شركة تابعة - أمن متقدم', 'Subsidiary - Security', 0, NOW()
  );
INSERT INTO `subsidiaries` (
    `id`, `name_ar`, `name_en`, `tagline_ar`, `tagline_en`, `logo_url`,
    `hero_image`, `icon_name`, `category`, `description_ar`, `description_en`,
    `detailed_mission_ar`, `detailed_mission_en`, `services_ar`, `services_en`,
    `certifications_ar`, `certifications_en`, `gallery_images`, `clients_count`,
    `projects_count`, `established_year`, `email`, `phone`, `website_url`,
    `badge_ar`, `badge_en`, `sort_order`, `created_at`
  ) VALUES (
    'sub-2', 'شركة الماسة الناصعة للنظافة الشاملة', 'Bright Diamond Deep Cleaning Corp', 'حلول النظافة الصناعية وتعقيم الأبراج والواجهات الشاهقة', 'Industrial Hygiene & High-Altitude Glass Facade Sanitation', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80', 'Sparkles', 'cleaning', 'متخصصون في تنظيف وجلي المستودعات الكبرى، غسيل الواجهات الزجاجية للأبراج بأسلوب Rope Access، والتعقيم الطبي المعتمد للمستشفيات.', 'Pioneers in industrial floor restoration, high-rise tower window washing via IRATA rope access, and clinical medical decontamination.',
    'الارتقاء بالمعايير البيئية والصحية في المنشآت التجارية والصناعية والمراكز الصحية عبر أحدث المعدات الميكانيكية ومواد التطهير المعتمدة.', 'Elevating environmental and hygiene benchmarks across industrial, commercial, and clinical facilities.', '[\"غسيل واجهات الأبراج الشاهقة بالسبايدر\",\"جلي وتلميع أرضيات الرخام والإيبوكسي\",\"التعقيم الطبي ومكافحة العدوى المتقدمة\",\"تنظيف وتطهير المستودعات والمصانع\"]', '[\"Skyscraper Glass Rope Access\",\"Marble & Epoxy Floor Polishing\",\"Medical Sterilization & IPM\",\"Logistics Hub & Factory Hygiene\"]',
    '[\"شهادة ISO 14001 للإدارة البيئية\",\"اعتماد المركز الوطني للرقابة على الالتزام البيئي\",\"اعتماد مجلس الجودة الصحية\"]', '[\"ISO 14001 Environmental Certified\",\"National Environmental Compliance Accredited\",\"Clinical Healthcare Hygiene Certified\"]', '[\"https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80\",\"https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=800&q=80\",\"https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80\"]', 140,
    480, '2014', 'cleaning@hares-niqaa.com', '+966 11 456 7892', NULL,
    'شركة تابعة - نظافة متخصصة', 'Subsidiary - Cleaning', 1, NOW()
  );
INSERT INTO `subsidiaries` (
    `id`, `name_ar`, `name_en`, `tagline_ar`, `tagline_en`, `logo_url`,
    `hero_image`, `icon_name`, `category`, `description_ar`, `description_en`,
    `detailed_mission_ar`, `detailed_mission_en`, `services_ar`, `services_en`,
    `certifications_ar`, `certifications_en`, `gallery_images`, `clients_count`,
    `projects_count`, `established_year`, `email`, `phone`, `website_url`,
    `badge_ar`, `badge_en`, `sort_order`, `created_at`
  ) VALUES (
    'sub-3', 'شركة الفعالية الأمنية لإدارة الحشود', 'EventGuard Expo & Crowd Management', 'تأمين المهرجانات، المعارض الدولية، والفعاليات الكبرى وحماية VIP', 'Crowd Routing & VIP Protection for Major Expos & Forums', 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80', 'Users', 'crowd', 'إدارة وتأمين الحشود الغفيرة في الفعاليات الوطنية والدولية وتوفير فرق الحماية المقربة للضيوف والشخصيات الهامة وتنظيم بوابات التفتيش.', 'High-volume crowd control, VIP escorting, and metal-detector gate security for international forums and sports exhibitions.',
    'توفير بيئة منظمة وآمنة بالكامل للفعاليات والمهرجانات الوطنية مع ضمان سلاسة الحركة والتفتيش الذكي.', 'Delivering flawless crowd dynamics and VIP protection for large-scale international conventions.', '[\"إدارة وتنظيم تدفق الحشود والمسارات\",\"توفير بوابات وأجهزة الكشف والتفتيش\",\"حماية الشخصيات الهامة (VIP Protocol)\",\"تنسيق الخطط الأمنية مع السلطات الرسمية\"]', '[\"Crowd Logistics & Access Routing\",\"Metal Detection Security Gates\",\"VIP Escort & Executive Guarding\",\"Official Authority Protocol Liaison\"]',
    '[\"اعتماد الهيئة العامة للترفيه والمؤتمرات\",\"شهادة التدريب التخصصي لإدارة الحشود (Crowd Safety)\",\"ترخيص الحماية الخاصة\"]', '[\"General Entertainment Authority Licensed\",\"Certified Crowd Safety Operations\",\"VIP Escort Licensed\"]', '[\"https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80\",\"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80\",\"https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80\"]', 85,
    250, '2016', 'events@hares-niqaa.com', '+966 11 456 7893', NULL,
    'شركة تابعة - إدارة فعاليات', 'Subsidiary - Events', 2, NOW()
  );
INSERT INTO `subsidiaries` (
    `id`, `name_ar`, `name_en`, `tagline_ar`, `tagline_en`, `logo_url`,
    `hero_image`, `icon_name`, `category`, `description_ar`, `description_en`,
    `detailed_mission_ar`, `detailed_mission_en`, `services_ar`, `services_en`,
    `certifications_ar`, `certifications_en`, `gallery_images`, `clients_count`,
    `projects_count`, `established_year`, `email`, `phone`, `website_url`,
    `badge_ar`, `badge_en`, `sort_order`, `created_at`
  ) VALUES (
    'sub-4', 'شركة الأنظمة الذكية والذكاء الاصطناعي', 'SmartSec AI Surveillance Solutions', 'دعم المنشآت بكاميرات الذكاء الاصطناعي وأنظمة الدخول الذكي', 'AI Thermal Surveillance & Automated Smart Gate Systems', 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1600&q=80', 'Camera', 'tech', 'تجهيز المنشآت بأحدث تقنيات التعرف على الوجوه، تحليل الفيديو التلقائي بالذكاء الاصطناعي، البوابات البيومترية، والتخزين السحابي الآمن.', 'Deploying facial recognition CCTV arrays, automated video analytics, biometric access control, and unified cloud monitoring centers.',
    'تمكين المنشآت الحيوية والتجارية من التحول إلى الأمان الرقمي الذكي والاستباقي من خلال خوارزميات الذكاء الاصطناعي.', 'Empowering enterprises with proactive AI surveillance algorithms and automated biometric security infrastructure.', '[\"تركيب كاميرات الذكاء الاصطناعي CCTV\",\"أنظمة بصمة الوجه والبوابات الذكية\",\"التخزين السحابي الآمن والربط الموحد\",\"تصميم وتأمين غرف التحكم المركزية\"]', '[\"AI Video Analytics & CCTV Arrays\",\"Facial Recognition & Biometrics\",\"Secure Cloud Video Command\",\"Unified Control Room Security\"]',
    '[\"اعتماد الهيئة الوطنية للأمن السيبراني\",\"ترخيص تركيب وتوصيل الأنظمة الأمنية\",\"شهادة ISO 27001 لأمن المعلومات\"]', '[\"NCSA Cybersecurity Compliant\",\"Security Systems Licensing Authority\",\"ISO 27001 Information Security Certified\"]', '[\"https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80\",\"https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80\",\"https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80\"]', 95,
    190, '2019', 'tech@hares-niqaa.com', '+966 11 456 7894', NULL,
    'شركة تابعة - أنظمة تقنية', 'Subsidiary - AI Tech', 3, NOW()
  );

-- ------------------------------------------------------------------------------
-- 6. Services Table
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `services`;
CREATE TABLE `services` (
  `id` VARCHAR(50) PRIMARY KEY,
  `title_ar` VARCHAR(150) NOT NULL,
  `title_en` VARCHAR(150) NOT NULL,
  `desc_ar` TEXT NOT NULL,
  `desc_en` TEXT NOT NULL,
  `detailed_desc_ar` TEXT DEFAULT NULL,
  `detailed_desc_en` TEXT DEFAULT NULL,
  `category` VARCHAR(50) NOT NULL,
  `icon_name` VARCHAR(50) NOT NULL,
  `features_ar` JSON DEFAULT NULL,
  `features_en` JSON DEFAULT NULL,
  `image` TEXT DEFAULT NULL,
  `popular` TINYINT(1) DEFAULT 0,
  `sort_order` INT DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `services` (
    `id`, `title_ar`, `title_en`, `desc_ar`, `desc_en`, `detailed_desc_ar`,
    `detailed_desc_en`, `category`, `icon_name`, `features_ar`, `features_en`,
    `image`, `popular`, `sort_order`, `created_at`
  ) VALUES (
    's1', 'الحراسة الأمنية الميدانية والفاخرة', 'Executive & Facility Guarding', 'تأمين المنشآت التجارية، السكنية، والدبلوماسية بحراس أمن مدربين ومجهزين بأحدث التقنيات.', 'Protecting commercial, residential, and diplomatic facilities with elite trained security personnel.', 'نوفر حراسة أمنية متكاملة تتضمن إدارة نقاط التفتيش، المراقبة على مدار الساعة، وإدارة الأزمات والطوارئ باستخدام أحدث الأجهزة الذكية وأنظمة اللاسلكي المعززة.',
    'Complete security coverage including access control, 24/7 surveillance, and emergency crisis response supported by smart devices and encrypted communications.', 'security', 'ShieldCheck', '[\"حراس مدربون على التعامل مع الطوارئ\",\"أنظمة دوريات إلكترونية ذكية\",\"تأمين المداخل والمخارج\",\"غرفة عمليات ومراقبة 24/7\"]', '[\"Emergency-trained guards\",\"Smart electronic patrol systems\",\"Access point management\",\"24/7 Ops & Monitoring Room\"]',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1000&q=80', 1, 0, NOW()
  );
INSERT INTO `services` (
    `id`, `title_ar`, `title_en`, `desc_ar`, `desc_en`, `detailed_desc_ar`,
    `detailed_desc_en`, `category`, `icon_name`, `features_ar`, `features_en`,
    `image`, `popular`, `sort_order`, `created_at`
  ) VALUES (
    's2', 'النظافة العامة والشاملة للمنشآت', 'Commercial Deep Cleaning', 'خدمات تنظيف احترافية للشركات، المجمعات التجارية، والمستشفيات بأحدث الأجهزة والمنظفات.', 'Professional sanitation for corporate buildings, shopping malls, and medical centers.', 'جدول تنظيف دروري أو يومي متكامل يتضمن جلي الأرضيات، تعقيم الأسطح، وتنظيف الأثاث والمكاتب باستعمال مواد صديقة للبيئة معتمدة عالميًا.',
    'Customized daily or scheduled deep cleaning covering floor polishing, surface disinfection, and eco-friendly chemical sanitization.', 'cleaning', 'Sparkles', '[\"منظفات صديقة للبيئة ومعتمدة\",\"جلي وتلميع جميع أنواع الرخام\",\"تعقيم هواء وأسطح بآليات الرذاذ\",\"فريق عمل متفرغ بخبرات عالية\"]', '[\"Certified eco-friendly chemicals\",\"Marble polishing & crystallization\",\"Aerosol fogging disinfection\",\"Dedicated highly-trained staff\"]',
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80', 1, 1, NOW()
  );
INSERT INTO `services` (
    `id`, `title_ar`, `title_en`, `desc_ar`, `desc_en`, `detailed_desc_ar`,
    `detailed_desc_en`, `category`, `icon_name`, `features_ar`, `features_en`,
    `image`, `popular`, `sort_order`, `created_at`
  ) VALUES (
    's3', 'أمن الفعاليات والمؤتمرات الكبرى', 'Event & Conference Security', 'تنظيم وتأمين الحشود في الفعاليات والمؤتمرات الوطنية والمعارض الدولية بكفاءة عالية.', 'Crowd management and high-level security protocols for national events and international expos.', 'خطط أمنية مدروسة لإدارة التدفق البشري، البوابات الإلكترونية للكشف عن المعادن، وتوفير فرق تدخل سريع لضمان سلامة جميع الزوار والفي آي بي.',
    'Tailored crowd routing plans, walk-through metal detectors, and rapid response units ensuring seamless safety for visitors and VIP guests.', 'security', 'Users', '[\"إدارة الحشود وتوجيه الزوار\",\"بوابات فحص ومعادن متطورة\",\"تأمين الشخصيات الهامة (VIP)\",\"تنسيق مباشر مع الجهات الرسمية\"]', '[\"Crowd management & guidance\",\"Advanced metal detection gates\",\"VIP escort & close protection\",\"Direct authority coordination\"]',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80', NULL, 2, NOW()
  );
INSERT INTO `services` (
    `id`, `title_ar`, `title_en`, `desc_ar`, `desc_en`, `detailed_desc_ar`,
    `detailed_desc_en`, `category`, `icon_name`, `features_ar`, `features_en`,
    `image`, `popular`, `sort_order`, `created_at`
  ) VALUES (
    's4', 'تنظيف الواجهات الزجاجية والمرتفعة', 'High-Rise Window & Facade Cleaning', 'غسيل وتلميع الواجهات الزجاجية والألومنيوم للأبراج والمباني الشاهقة مع اتباع أعلى معايير السلامة.', 'Window washing and aluminum facade restoration for skyscrapers following strict ISO safety rules.', 'فرق متخصصة ومصرح لها بالعمل على المرتفعات باستعمال السقالات الكهروميكانيكية ورافعات الهيدروليك ورجال السبالينغ (Rope Access).',
    'IRATA certified rope access technicians and automated cradles restoring maximum shine to exterior glass towers.', 'cleaning', 'Building2', '[\"تقنيات السبلينغ (Rope Access)\",\"معدات أمان وحماية صارمة\",\"إزالة أثر التكلسات والأتربة\",\"ضمان ناصع لجميع الارتفاعات\"]', '[\"IRATA Rope Access certified\",\"Strict personal safety gear\",\"Calcification & dust removal\",\"Crystal clear guarantee\"]',
    'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1000&q=80', NULL, 3, NOW()
  );
INSERT INTO `services` (
    `id`, `title_ar`, `title_en`, `desc_ar`, `desc_en`, `detailed_desc_ar`,
    `detailed_desc_en`, `category`, `icon_name`, `features_ar`, `features_en`,
    `image`, `popular`, `sort_order`, `created_at`
  ) VALUES (
    's5', 'تركيب وإدارة أنظمة المراقبة CCTV', 'CCTV & Surveillance Integration', 'تصميم وتنفيذ أنظمة المراقبة الذكية المزودة بالذكاء الاصطناعي والتعرف على الوجوه.', 'Designing and deploying AI-powered CCTV surveillance and facial recognition access control.', 'ربط الكاميرات بغرف عمليات مركزية مع التنبيه الفوري عند اكتشاف أي اختراق أو تحركات مشبوهة بالأشعة تحت الحمراء والرؤية الليلية.',
    'Centralized command center integration, motion detection heatmaps, thermal vision, and instant threat alert triggers.', 'security', 'Camera', '[\"تحليل الفيديو بالذكاء الاصطناعي\",\"رؤية ليلية حرارية عالية الدقة\",\"ربط سحابي وتخزين آمن\",\"صيانة دورية واستجابة فنية\"]', '[\"AI video analytics\",\"High-res thermal night vision\",\"Cloud video vault storage\",\"Preventive maintenance\"]',
    'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1000&q=80', NULL, 4, NOW()
  );
INSERT INTO `services` (
    `id`, `title_ar`, `title_en`, `desc_ar`, `desc_en`, `detailed_desc_ar`,
    `detailed_desc_en`, `category`, `icon_name`, `features_ar`, `features_en`,
    `image`, `popular`, `sort_order`, `created_at`
  ) VALUES (
    's6', 'مكافحة الآفات والرش الوقائي', 'Pest Control & Sanitization', 'قضاء تام على كافة أنواع الحشرات والقوارض بأدوية آمنة ومصرح بها من وزارة الصحة.', 'Total eradication of pests and rodents using Ministry of Health certified odorless solutions.', 'برامج مكافحة وقائية ودورية للمطاعم، المستودعات، والمجمعات السكنية مع تقارير الجودة والمتابعة المستمرة لضمان بيئة صحية.',
    'Integrated pest management (IPM) for food factories, warehouses, and compounds with regular compliance reporting.', 'cleaning', 'Bug', '[\"مبيدات بدون رائحة وآمنة\",\"ضمان كتابي على جميع الأعمال\",\"فحص شامل ومكافحة الجحور\",\"برامج متابعة دورية\"]', '[\"Odorless safe chemicals\",\"Written service guarantee\",\"Comprehensive burrow inspection\",\"Scheduled follow-up visits\"]',
    'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=1000&q=80', NULL, 5, NOW()
  );
INSERT INTO `services` (
    `id`, `title_ar`, `title_en`, `desc_ar`, `desc_en`, `detailed_desc_ar`,
    `detailed_desc_en`, `category`, `icon_name`, `features_ar`, `features_en`,
    `image`, `popular`, `sort_order`, `created_at`
  ) VALUES (
    's7', 'إدارة المرافق والأمن الشامل للمستشفيات', 'Healthcare Facilities Guard & Hygiene', 'حلول مخصصة للقطاع الطبي تشمل التعقيم الصارم وتأمين الأقسام الحساسة وغرف الطوارئ.', 'Specialized healthcare solutions covering sterile ward cleaning and emergency triage security.', 'نوفر أطقماً مدربة على بروتوكولات مكافحة العدوى والتعامل الراقي مع المرضى والمراجعين وتأمين مستودعات الأدوية والبيانات.',
    'Infection control trained personnel ensuring strict sterile conditions alongside compassionate triage security.', 'integrated', 'HeartPulse', '[\"بروتوكولات مكافحة العدوى\",\"حراسة غرف الطوارئ والأدوية\",\"تعقيم بالمستويات الطبية\",\"جاهزية عالية على مدار الساعة\"]', '[\"Infection control certified\",\"Emergency & pharmacy guards\",\"Hospital-grade sterilization\",\"24/7 medical unit readiness\"]',
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80', NULL, 6, NOW()
  );
INSERT INTO `services` (
    `id`, `title_ar`, `title_en`, `desc_ar`, `desc_en`, `detailed_desc_ar`,
    `detailed_desc_en`, `category`, `icon_name`, `features_ar`, `features_en`,
    `image`, `popular`, `sort_order`, `created_at`
  ) VALUES (
    's8', 'تنظيف المفروشات والسجاد بالبخار', 'Upholstery & Carpet Steam Cleaning', 'استعادة بريق ونظافة الأثاث المكتبي والسجاد والسجاد الفاخر بأحدث أجهزة البخار الساخن.', 'Restoring corporate furniture, carpets, and luxury drapes using superheated dry steam technology.', 'تقنية التنظيف بالبخار الجاف تزيل أقسى البقع والبكتيريا بدون إتلاف الأنسجة مع تجفيف سريع خلال أقل من ساعة.',
    'Dry steam extraction removing tough stains and allergens with deep fiber conditioning and rapid 45-minute drying.', 'cleaning', 'Wind', '[\"بخار حراري يقضي على 99.9\% من البكتيريا\",\"تجفيف سريع في وقت قياسي\",\"حماية الأنسجة والألوان\",\"روائح فواحة منعشة\"]', '[\"Thermal steam kills 99.9\% bacteria\",\"Fast drying under 1 hour\",\"Fabric color preservation\",\"Aromatic fresh scenting\"]',
    'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1000&q=80', NULL, 7, NOW()
  );

-- ------------------------------------------------------------------------------
-- 7. Projects Table
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `id` VARCHAR(50) PRIMARY KEY,
  `title_ar` VARCHAR(150) NOT NULL,
  `title_en` VARCHAR(150) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `client_ar` VARCHAR(150) DEFAULT NULL,
  `client_en` VARCHAR(150) DEFAULT NULL,
  `location_ar` VARCHAR(150) DEFAULT NULL,
  `location_en` VARCHAR(150) DEFAULT NULL,
  `date` VARCHAR(50) DEFAULT NULL,
  `image` TEXT DEFAULT NULL,
  `description_ar` TEXT DEFAULT NULL,
  `description_en` TEXT DEFAULT NULL,
  `stats_ar` VARCHAR(100) DEFAULT NULL,
  `stats_en` VARCHAR(100) DEFAULT NULL,
  `badge_ar` VARCHAR(100) DEFAULT NULL,
  `badge_en` VARCHAR(100) DEFAULT NULL,
  `subsidiary_id` VARCHAR(50) DEFAULT NULL,
  `sort_order` INT DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `projects` (
    `id`, `title_ar`, `title_en`, `category`, `client_ar`, `client_en`,
    `location_ar`, `location_en`, `date`, `image`, `description_ar`, `description_en`,
    `stats_ar`, `stats_en`, `badge_ar`, `badge_en`, `subsidiary_id`, `sort_order`, `created_at`
  ) VALUES (
    'p1', 'تأمين ونظافة مجمع المالي الدولي', 'Financial District Security & Sanitation', 'integrated', 'مركز الفعاليات المالية', 'Financial District Center',
    'الرياض، المملكة العربية السعودية', 'Riyadh, Saudi Arabia', '2025 - 2026', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80', 'عقد متكامل يغطي 4 أبراج تجارية تشمل 120 حارس أمن وفريق نظافة من 80 مختصًا مع إدارة غرفة عمليات موحدة.', 'Integrated contract covering 4 commercial towers with 120 security officers and 80 cleaning specialists.',
    '120 حارس | 80 عمالة | 100,000 م²', '120 Guards | 80 Sanitation | 100k m²', 'مشروع ضخم', 'Mega Project', NULL, 0, NOW()
  );
INSERT INTO `projects` (
    `id`, `title_ar`, `title_en`, `category`, `client_ar`, `client_en`,
    `location_ar`, `location_en`, `date`, `image`, `description_ar`, `description_en`,
    `stats_ar`, `stats_en`, `badge_ar`, `badge_en`, `subsidiary_id`, `sort_order`, `created_at`
  ) VALUES (
    'p2', 'تأمين معرض الرياض للتقنية 2025', 'Riyadh Tech Expo Security Guarding', 'security', 'هيئة المعارض والمؤتمرات', 'Expos & Conferences Authority',
    'مركز المعارض الدولي', 'International Exhibition Center', '2025', 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80', 'تأمين أكثر من 250,000 زائر على مدار 5 أيام وتنسيق دخول الشخصيات الهامة والوفود الأجنبية بحرفية عالية.', 'Securing over 250,000 visitors over 5 days with VIP protection and seamless access flow.',
    '250k زائر | 150 رجل أمن', '250k Visitors | 150 Officers', 'فعالية كبرى', 'Major Expo', NULL, 1, NOW()
  );
INSERT INTO `projects` (
    `id`, `title_ar`, `title_en`, `category`, `client_ar`, `client_en`,
    `location_ar`, `location_en`, `date`, `image`, `description_ar`, `description_en`,
    `stats_ar`, `stats_en`, `badge_ar`, `badge_en`, `subsidiary_id`, `sort_order`, `created_at`
  ) VALUES (
    'p3', 'غسيل واجهات أبراج النخيل الزجاجية', 'Palm Towers Glass Facade Cleaning', 'cleaning', 'مجموعة النخيل العقارية', 'Palm Real Estate Group',
    'جدة، الكورنيش', 'Jeddah Corniche', '2025', 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1000&q=80', 'تنظيف الواجهات الخارجية لبرجين بارتفاع 45 طابقًا باستخدام تقنيات Rope Access المتطورة وبأعلى درجات الأمان.', 'Exterior facade cleaning for two 45-story towers using advanced IRATA Rope Access methods.',
    '45 طابقًا | 35,000 م² زجاج', '45 Floors | 35k m² Glass', 'عمليات مرتفعات', 'High-Altitude', NULL, 2, NOW()
  );
INSERT INTO `projects` (
    `id`, `title_ar`, `title_en`, `category`, `client_ar`, `client_en`,
    `location_ar`, `location_en`, `date`, `image`, `description_ar`, `description_en`,
    `stats_ar`, `stats_en`, `badge_ar`, `badge_en`, `subsidiary_id`, `sort_order`, `created_at`
  ) VALUES (
    'p4', 'تشغيل أمن ونظافة مستشفى الحياة التخصصي', 'Life Hospital Security & Infection Control', 'integrated', 'شركة الحياة الطبية', 'Life Medical Co.',
    'الدمام، المنطقة الشرقية', 'Dammam, Eastern Province', '2024 - 2026', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80', 'إدارة منظومة التعقيم الطبي وتأمين أقسام الطوارئ والصيدليات المركزية وفق أرفع معايير الاعتماد الصحي.', 'Medical sterilization protocols and emergency triage security adhering to international healthcare credentials.',
    '400 سرير | تعقيم 24/7', '400 Beds | 24/7 Sterilization', 'قطاع صحي', 'Healthcare Sector', NULL, 3, NOW()
  );
INSERT INTO `projects` (
    `id`, `title_ar`, `title_en`, `category`, `client_ar`, `client_en`,
    `location_ar`, `location_en`, `date`, `image`, `description_ar`, `description_en`,
    `stats_ar`, `stats_en`, `badge_ar`, `badge_en`, `subsidiary_id`, `sort_order`, `created_at`
  ) VALUES (
    'p5', 'تأمين المجمعات السكنية الفاخرة (واحة السلام)', 'Al-Salam Gated Luxury Compound', 'security', 'شركة التطوير العقاري الحديث', 'Modern Real Estate Dev',
    'الرياض، حطين', 'Riyadh, Hittin', '2024 - المستمر', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80', 'توفير حراسة أمنية لبوابات المجمع، أنظمة كاميرات حرارية ودوريات متواصلة بمركبات كهربائية صديقة للبيئة.', 'Gate access protection, thermal AI cameras, and eco-friendly electric vehicle patrols for 200 villas.',
    '200 فيلا | دوريات ذكية', '200 Villas | Smart Patrols', 'مجمع سكني', 'Residential Compound', NULL, 4, NOW()
  );
INSERT INTO `projects` (
    `id`, `title_ar`, `title_en`, `category`, `client_ar`, `client_en`,
    `location_ar`, `location_en`, `date`, `image`, `description_ar`, `description_en`,
    `stats_ar`, `stats_en`, `badge_ar`, `badge_en`, `subsidiary_id`, `sort_order`, `created_at`
  ) VALUES (
    'p6', 'النظافة الدورية والميكانيكية للمستودعات اللوجستية', 'Mega Logistics Hub Industrial Cleaning', 'cleaning', 'شركة سلاسل الإمداد العالمية', 'Global Supply Chain Corp',
    'المنطقة الصناعية الثانية', '2nd Industrial Zone', '2025', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80', 'جلي وتنظيف أرضيات الإيبوكسي في مستودع بمساحة 80 ألف متر مربع باستخدام آلات الركوب الكهربائية العملاقة.', 'Heavy-duty ride-on scrubbing and epoxy floor restoration across an 80,000 sqm warehouse complex.',
    '80,000 م² | تنظيف جاف وآلي', '80,000 m² | Automated Scrubbing', 'لوجستي وصناعي', 'Logistics Hub', NULL, 5, NOW()
  );

-- ------------------------------------------------------------------------------
-- 8. Team Members Table
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `team`;
CREATE TABLE `team` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name_ar` VARCHAR(100) NOT NULL,
  `name_en` VARCHAR(100) NOT NULL,
  `role_ar` VARCHAR(100) NOT NULL,
  `role_en` VARCHAR(100) NOT NULL,
  `image` TEXT DEFAULT NULL,
  `bio_ar` TEXT DEFAULT NULL,
  `bio_en` TEXT DEFAULT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  `email` VARCHAR(100) DEFAULT NULL,
  `linkedin` VARCHAR(255) DEFAULT NULL,
  `twitter` VARCHAR(255) DEFAULT NULL,
  `sort_order` INT DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `team` (
    `id`, `name_ar`, `name_en`, `role_ar`, `role_en`, `image`, `bio_ar`,
    `bio_en`, `phone`, `email`, `linkedin`, `twitter`, `sort_order`, `created_at`
  ) VALUES (
    't1', 'اللواء م. عبدالمجيد السالم', 'Ret. Gen. Abdulmajeed Al-Salem', 'الرئيس التنفيذي ونائب رئيس مجلس الإدارة', 'CEO & Vice Chairman', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80', 'خبرة تزيد عن 25 عامًا في مجال التخطيط الأمني الميداني وإدارة المنشآت الحيوية في القطاعين العام والخاص.',
    'Over 25 years of leadership in strategic security planning and critical infrastructure protection.', '+966 50 111 2233', 'ceo@hares-niqaa.com', 'https://linkedin.com', NULL, 0, NOW()
  );
INSERT INTO `team` (
    `id`, `name_ar`, `name_en`, `role_ar`, `role_en`, `image`, `bio_ar`,
    `bio_en`, `phone`, `email`, `linkedin`, `twitter`, `sort_order`, `created_at`
  ) VALUES (
    't2', 'م. سارة المهيدب', 'Eng. Sarah Al-Muhaidib', 'مديرة عمليات النظافة وتطوير الجودة', 'VP of Sanitation & Quality Control', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80', 'خبيرة معتمدة في بروتوكولات البيئة والجودة الشاملة ISO 9001 & ISO 14001 وتطوير الأساليب الصديقة للبيئة.',
    'Certified ISO lead auditor with expertise in green cleaning technologies and environmental compliance.', NULL, 'sarah@hares-niqaa.com', 'https://linkedin.com', NULL, 1, NOW()
  );
INSERT INTO `team` (
    `id`, `name_ar`, `name_en`, `role_ar`, `role_en`, `image`, `bio_ar`,
    `bio_en`, `phone`, `email`, `linkedin`, `twitter`, `sort_order`, `created_at`
  ) VALUES (
    't3', 'الكابتن طارق الشمري', 'Capt. Tarek Al-Shammari', 'مدير العمليات الأمنية وإدارة التدريب', 'Director of Security Operations', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80', 'يشرف على تدريب الحراس وصقل مهاراتهم في التعامل مع كبار الشخصيات والتدخل السريع وإدارة الحشود.',
    'Leads guard training academy, VIP close protection tactics, and emergency rapid response protocols.', NULL, 'tarek@hares-niqaa.com', 'https://linkedin.com', NULL, 2, NOW()
  );
INSERT INTO `team` (
    `id`, `name_ar`, `name_en`, `role_ar`, `role_en`, `image`, `bio_ar`,
    `bio_en`, `phone`, `email`, `linkedin`, `twitter`, `sort_order`, `created_at`
  ) VALUES (
    't4', 'د. خالد العمري', 'Dr. Khaled Al-Omari', 'مستشار التقنية وأنظمة CCTV الذكية', 'Chief Technology & Systems Officer', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80', 'متخصص في دمج الذكاء الاصطناعي مع أنظمة المراقبة وغرف التحكم المباشر وتتبع الكاميرات الذكية.',
    'Specializes in AI surveillance integration, video telemetry, and central monitoring command units.', NULL, 'khaled@hares-niqaa.com', 'https://linkedin.com', NULL, 3, NOW()
  );

-- ------------------------------------------------------------------------------
-- 9. Why Us Features Table
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `why_us_features`;
CREATE TABLE `why_us_features` (
  `id` VARCHAR(50) PRIMARY KEY,
  `icon_name` VARCHAR(50) NOT NULL,
  `title_ar` VARCHAR(150) NOT NULL,
  `title_en` VARCHAR(150) NOT NULL,
  `desc_ar` TEXT NOT NULL,
  `desc_en` TEXT NOT NULL,
  `badge_ar` VARCHAR(100) DEFAULT NULL,
  `badge_en` VARCHAR(100) DEFAULT NULL,
  `sort_order` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `why_us_features` (`id`, `icon_name`, `title_ar`, `title_en`, `desc_ar`, `desc_en`, `badge_ar`, `badge_en`, `sort_order`)
VALUES ('why-1', 'ShieldAlert', 'كوادر أمنية مدربة وموثوقة', 'Certified & Vetted Guarding Staff', 'تخضع جميع كوادرنا لأدق الفحوصات الأمنية وبرامج التدريب المكثف على التعامل مع الأزمات وإدارة الحشود والفي آي بي.', 'All guards undergo rigorous security background checks and intensive crisis response and VIP handling training.', 'أمان موثوق', 'Trusted Security', 0);
INSERT INTO `why_us_features` (`id`, `icon_name`, `title_ar`, `title_en`, `desc_ar`, `desc_en`, `badge_ar`, `badge_en`, `sort_order`)
VALUES ('why-2', 'Award', 'جودة معتمدة وشهادات ISO', 'ISO 9001 & 14001 Certified Quality', 'نلتزم بأعلى مقاييس الإدارة البيئية والسلامة المهنية وتطبيق بروتوكولات جودة معتمدة عالميًا في جميع المواقع.', 'Strict adherence to ISO environmental and occupational safety frameworks across all managed facilities.', 'معايير عالمية', 'Global Standards', 1);
INSERT INTO `why_us_features` (`id`, `icon_name`, `title_ar`, `title_en`, `desc_ar`, `desc_en`, `badge_ar`, `badge_en`, `sort_order`)
VALUES ('why-3', 'Cpu', 'تكنولوجيا المراقبة والتحكم الذكي', 'Smart AI Telemetry & Monitoring', 'استخدام أحدث الكاميرات الحرارية، التحليل الذكي للسيناريوهات، وأنظمة الدوريات الإلكترونية GPS المستمرة.', 'Integrating thermal cameras, AI behavioral alerts, and real-time GPS patrol tracking technology.', 'تقنية حديثة', 'AI Powered', 2);
INSERT INTO `why_us_features` (`id`, `icon_name`, `title_ar`, `title_en`, `desc_ar`, `desc_en`, `badge_ar`, `badge_en`, `sort_order`)
VALUES ('why-4', 'Clock', 'استجابة سريعة وغرفة عمليات 24/7', '24/7 Command Center & Rapid Response', 'غرفة تحكم مركزية تعمل على مدار الساعة لضمان المتابعة اللحظية والاستجابة الفورية لأي بلاغ أو طارئ.', 'Continuous 24/7 command operations dispatching rapid response field units within minutes.', 'سرعة وكفاءة', 'Instant Action', 3);

-- ------------------------------------------------------------------------------
-- 10. Job Positions Table
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `job_positions`;
CREATE TABLE `job_positions` (
  `id` VARCHAR(50) PRIMARY KEY,
  `title_ar` VARCHAR(150) NOT NULL,
  `title_en` VARCHAR(150) NOT NULL,
  `department_ar` VARCHAR(100) NOT NULL,
  `department_en` VARCHAR(100) NOT NULL,
  `location_ar` VARCHAR(100) NOT NULL,
  `location_en` VARCHAR(100) NOT NULL,
  `type_ar` VARCHAR(50) NOT NULL,
  `type_en` VARCHAR(50) NOT NULL,
  `description_ar` TEXT NOT NULL,
  `description_en` TEXT NOT NULL,
  `requirements_ar` JSON DEFAULT NULL,
  `requirements_en` JSON DEFAULT NULL,
  `active` TINYINT(1) DEFAULT 1,
  `posted_date` VARCHAR(50) DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `job_positions` (
    `id`, `title_ar`, `title_en`, `department_ar`, `department_en`,
    `location_ar`, `location_en`, `type_ar`, `type_en`, `description_ar`,
    `description_en`, `requirements_ar`, `requirements_en`, `active`, `posted_date`, `created_at`
  ) VALUES (
    'job-1', 'مشرف أمن وحراسات ميدانية', 'Field Security Supervisor', 'قطاع الحراسات الأمنية', 'Security Operations',
    'الرياض - المجمع المالي', 'Riyadh - Financial District', 'دوام كامل', 'Full Time', 'الإشراف المباشر على أفراد الحراسة الأمنية في المواقع الحيوية، متابعة سجلات الحضور والانصراف، والتأكد من تطبيق أعلى معايير السلامة والأمن.',
    'Supervise security guard teams across major sites, ensure compliance with safety protocols, and manage incident logs.', '[\"خبرة لا تقل عن 3 سنوات في مجال الحراسات الأمنية\",\"إجادة استخدام أنظمة الاتصال والغرف الأمنية\",\"لياقة بدنية وحسن السلوك والسيرة\"]', '[\"Minimum 3 years experience in security supervision\",\"Proficiency in communication systems and security rooms\",\"Physical fitness and clean background check\"]', 1, '2026-09-01', NOW()
  );
INSERT INTO `job_positions` (
    `id`, `title_ar`, `title_en`, `department_ar`, `department_en`,
    `location_ar`, `location_en`, `type_ar`, `type_en`, `description_ar`,
    `description_en`, `requirements_ar`, `requirements_en`, `active`, `posted_date`, `created_at`
  ) VALUES (
    'job-2', 'مهندس أنظمة أمنية وكاميرات ذكية (CCTV)', 'Smart CCTV & Security Systems Engineer', 'قطاع الذكاء الاصطناعي والتكنولوجيا', 'AI & Systems Division',
    'جدة - الفرع الرئيسي', 'Jeddah - Main Branch', 'دوام كامل', 'Full Time', 'تركيب وصيانة أنظمة المراقبة المرئية وأنظمة الإنذار المبكر والتحكم بالدخول الإلكتروني واستخدام الذكاء الاصطناعي لرصد التهديدات.',
    'Install and maintain CCTV systems, access controls, and integrated AI analytics software.', '[\"بكالوريوس هندسة اتصالات أو حاسب آلي\",\"خبرة في ربط الكاميرات المتقدمة وبرمجتها\",\"شهادات معتمدة في أنظمة السلامة والأمن\"]', '[\"Bachelor degree in Telecom or Computer Engineering\",\"Proven experience in IP CCTV deployment\",\"Industry certified credentials\"]', 1, '2026-09-05', NOW()
  );
INSERT INTO `job_positions` (
    `id`, `title_ar`, `title_en`, `department_ar`, `department_en`,
    `location_ar`, `location_en`, `type_ar`, `type_en`, `description_ar`,
    `description_en`, `requirements_ar`, `requirements_en`, `active`, `posted_date`, `created_at`
  ) VALUES (
    'job-3', 'مشرف جودة ونظافة واجهات الأبراج', 'High-Rise Facade Cleaning Inspector', 'قطاع النظافة والبيئة', 'Environmental & Sanitation',
    'الرياض - الأبراج التجارية', 'Riyadh - Commercial Towers', 'دوام كامل', 'Full Time', 'إدارة أطقم تنظيف الواجهات الزجاجية الشاهقة والتأكد من توفر جميع اشتراطات السلامة والرفع الهيدروليكي قبل بدء العمل.',
    'Manage high-rise glass washing teams and rigorously verify safety rigging and harness certifications.', '[\"شهادة السلامة المهنية معتمدة\",\"خبرة سابقة في التعامل مع معدات التنظيف الصناعية\",\"قدرة عالية على القيادة والتوجيه الميداني\"]', '[\"Certified Occupational Safety Specialist\",\"Prior high-rise cleaning machinery experience\",\"Strong field leadership skills\"]', 1, '2026-09-10', NOW()
  );

-- ------------------------------------------------------------------------------
-- 11. Client Logos Table
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `client_logos`;
CREATE TABLE `client_logos` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `logo_url` TEXT NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `sort_order` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `client_logos` (`id`, `name`, `logo_url`, `category`, `sort_order`)
VALUES ('c1', 'Aramco Partners', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80', 'Energy', 0);
INSERT INTO `client_logos` (`id`, `name`, `logo_url`, `category`, `sort_order`)
VALUES ('c2', 'Riyadh Bank', 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80', 'Banking', 1);
INSERT INTO `client_logos` (`id`, `name`, `logo_url`, `category`, `sort_order`)
VALUES ('c3', 'SABIC Tower', 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=200&q=80', 'Industrial', 2);
INSERT INTO `client_logos` (`id`, `name`, `logo_url`, `category`, `sort_order`)
VALUES ('c4', 'Kingdom Holding', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80', 'Real Estate', 3);
INSERT INTO `client_logos` (`id`, `name`, `logo_url`, `category`, `sort_order`)
VALUES ('c5', 'STC Solutions', 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=80', 'Telecom', 4);
INSERT INTO `client_logos` (`id`, `name`, `logo_url`, `category`, `sort_order`)
VALUES ('c6', 'Dr. Sulaiman Al Habib', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=200&q=80', 'Healthcare', 5);

-- ------------------------------------------------------------------------------
-- 12. Testimonials Table
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `testimonials`;
CREATE TABLE `testimonials` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name_ar` VARCHAR(100) NOT NULL,
  `name_en` VARCHAR(100) NOT NULL,
  `company_ar` VARCHAR(100) NOT NULL,
  `company_en` VARCHAR(100) NOT NULL,
  `role_ar` VARCHAR(100) NOT NULL,
  `role_en` VARCHAR(100) NOT NULL,
  `avatar` TEXT DEFAULT NULL,
  `content_ar` TEXT NOT NULL,
  `content_en` TEXT NOT NULL,
  `rating` INT DEFAULT 5,
  `service_type` VARCHAR(50) NOT NULL,
  `sort_order` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `testimonials` (
    `id`, `name_ar`, `name_en`, `company_ar`, `company_en`, `role_ar`, `role_en`,
    `avatar`, `content_ar`, `content_en`, `rating`, `service_type`, `sort_order`
  ) VALUES (
    'tm1', 'سعود بن عبدالعزيز المقرن', 'Saud Al-Muqrin', 'مجموعة المجمعات الاستثمارية', 'Investment Complexes Group', 'المدير العام للمرافق', 'General Director of Facilities',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80', 'تتعامل معنا شركة حارس ونقاء منذ 3 سنوات في تأمين ونظافة مجمعاتنا التجاري. انضباط الحراس واحترافية فريق النظافة يفوق التوقعات دائماً.', 'Hares & Niqaa has managed our security and cleaning for 3 years. The discipline of officers and hygiene quality are outstanding.', 5, 'integrated', 0
  );
INSERT INTO `testimonials` (
    `id`, `name_ar`, `name_en`, `company_ar`, `company_en`, `role_ar`, `role_en`,
    `avatar`, `content_ar`, `content_en`, `rating`, `service_type`, `sort_order`
  ) VALUES (
    'tm2', 'م. نورة الحارثي', 'Eng. Noura Al-Harthi', 'مستشفى السلام التخصصي', 'Al-Salam Specialist Hospital', 'مديرة السلامة والبيئة', 'Head of Safety & Environment',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', 'المستوى الصحي والتعقيم المطبق في أجنحة المستشفى أظهر كفاءة عالية جدًا. الالتزام بالمعايير الطبية محل تقدير إدارتنا العلياء.', 'The sterilization and health standards applied in hospital wings showed exceptional efficiency. Truly commendable.', 5, 'cleaning', 1
  );
INSERT INTO `testimonials` (
    `id`, `name_ar`, `name_en`, `company_ar`, `company_en`, `role_ar`, `role_en`,
    `avatar`, `content_ar`, `content_en`, `rating`, `service_type`, `sort_order`
  ) VALUES (
    'tm3', 'فهد العتيبي', 'Fahad Al-Otaibi', 'شركة المعارض الدولية', 'International Expo Company', 'رئيس لجنة التنظيم والأمن', 'Head of Event Security',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80', 'إدارة الحشود وتنظيم دخول أكثر من 100 ألف زائر في منتدياتنا تم بسلاسة وهدوء تدمين عليه جهودكم. شكراً لحارس ونقاء.', 'Managing crowds over 100,000 visitors went seamlessly and calmly. Thank you Hares & Niqaa for true professionalism.', 5, 'security', 2
  );

-- ------------------------------------------------------------------------------
-- 13. Quotes Table
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `quotes`;
CREATE TABLE `quotes` (
  `id` VARCHAR(50) PRIMARY KEY,
  `service_category` VARCHAR(50) NOT NULL,
  `service_name` VARCHAR(150) NOT NULL,
  `property_area` VARCHAR(50) DEFAULT NULL,
  `headcount_needed` VARCHAR(50) DEFAULT NULL,
  `location` VARCHAR(150) DEFAULT NULL,
  `contract_duration` VARCHAR(50) DEFAULT NULL,
  `company_name` VARCHAR(150) DEFAULT NULL,
  `contact_name` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `status` ENUM('new', 'processing', 'completed') DEFAULT 'new',
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_quotes_status` (`status`),
  INDEX `idx_quotes_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `quotes` (
    `id`, `service_category`, `service_name`, `property_area`, `headcount_needed`,
    `location`, `contract_duration`, `company_name`, `contact_name`, `phone`,
    `email`, `notes`, `status`, `created_at`
  ) VALUES (
    'q-101', 'integrated', 'الحراسة الأمنية الفاخرة والنظافة الشاملة', '12,000 م²', '15 حارس + 12 عمالة نظافة',
    'الرياض - طريق الملك عبدالله', 'عقد سنوي (12 شهرًا)', 'مؤسسة أبعاد للتطوير العمراني', 'م. أحمد السفياني', '+966 55 888 9911',
    'a.sufyani@abaad.com', 'نحتاج البدء خلال الشهر القادم مع تجهيز غرفة مراقبة CCTV.', 'new', NOW()
  );
INSERT INTO `quotes` (
    `id`, `service_category`, `service_name`, `property_area`, `headcount_needed`,
    `location`, `contract_duration`, `company_name`, `contact_name`, `phone`,
    `email`, `notes`, `status`, `created_at`
  ) VALUES (
    'q-102', 'security', 'أمن الفعاليات والمؤتمرات الكبرى', 'مركز الفعاليات 5,000 م²', '30 حارس + بوابات إلكترونية',
    'جدة - فندق المكسيم', 'مؤقت (4 أيام)', 'شركة القمة الدولية للمعارض', 'أستاذة لمى الشريف', '+966 54 333 2211',
    'lama@alqumma-events.com', 'مؤتمر خاص بحضور رؤساء شركات تنفذية.', 'processing', NOW()
  );

-- ------------------------------------------------------------------------------
-- 14. Contact Inquiries Table
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `inquiries`;
CREATE TABLE `inquiries` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) DEFAULT NULL,
  `subject` VARCHAR(150) DEFAULT NULL,
  `message` TEXT NOT NULL,
  `status` ENUM('unread', 'read', 'replied') DEFAULT 'unread',
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_inquiries_status` (`status`),
  INDEX `idx_inquiries_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `inquiries` (`id`, `name`, `phone`, `email`, `subject`, `message`, `status`, `created_at`)
VALUES ('inq-201', 'سليمان الفايز', '+966 50 999 8877', 'sulaiman@alfayez.sa', 'استفسار عن تنظيف الواجهات الزجاجية لبرج تجاري', 'السلام عليكم، نود الاستفسار عن كلفة غسيل واجهة برج مكون من 18 دور في مدينة الرياض وما هي أجهزة السلامة المستخدمة؟', 'unread', NOW());
INSERT INTO `inquiries` (`id`, `name`, `phone`, `email`, `subject`, `message`, `status`, `created_at`)
VALUES ('inq-202', 'م. راشد الدوسري', '+966 56 123 7890', 'r.dosari@dammamtech.com', 'طلب اجتماع مع فريق المبيعات', 'نود ترتيب موعد لبحث التعاقد السنوي لحراسة ونظافة مجمع مكاتب في الدمام.', 'read', NOW());

-- ------------------------------------------------------------------------------
-- 15. Job Applications Table
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `job_applications`;
CREATE TABLE `job_applications` (
  `id` VARCHAR(50) PRIMARY KEY,
  `job_position_id` VARCHAR(50) DEFAULT NULL,
  `job_title` VARCHAR(150) NOT NULL,
  `applicant_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `experience_years` VARCHAR(50) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `cv_file_name` VARCHAR(255) DEFAULT NULL,
  `cv_file_data` LONGTEXT DEFAULT NULL,
  `status` ENUM('new', 'reviewed', 'shortlisted', 'rejected') DEFAULT 'new',
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `applied_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_job_apps_status` (`status`),
  INDEX `idx_job_apps_applied` (`applied_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `job_applications` (
    `id`, `job_position_id`, `job_title`, `applicant_name`, `email`, `phone`,
    `experience_years`, `notes`, `cv_file_name`, `cv_file_data`, `status`, `applied_at`
  ) VALUES (
    'app-1', 'job-1', 'مشرف أمن وحراسات ميدانية', 'عبدالمجيد بن ناصر العتيبي', 'abdulmajeed.otb@gmail.com', '+966 55 111 2233',
    '4 سنوات', 'عملت سابقاً كمشرف أمن في مجمع تجاري كبير بمدينة الرياض وأحمل شهادة دورات أمنية معتمدة.', 'Abdulmajeed_CV_2026.pdf', 'data:application/pdf;base64,JVBERi0xLjQKJ...', 'new', NOW()
  );
INSERT INTO `job_applications` (
    `id`, `job_position_id`, `job_title`, `applicant_name`, `email`, `phone`,
    `experience_years`, `notes`, `cv_file_name`, `cv_file_data`, `status`, `applied_at`
  ) VALUES (
    'app-2', 'job-2', 'مهندس أنظمة أمنية وكاميرات ذكية (CCTV)', 'م. خالد خليل الزهراني', 'khalid.zahrani@techmail.sa', '+966 50 444 5566',
    '5 سنوات', 'حاصل على بكالوريوس هندسة اتصالات ومعتمد في تكامل كاميرات Dahua و Hikvision والذكاء الاصطناعي.', 'Eng_Khalid_Resume.pdf', 'data:application/pdf;base64,JVBERi0xLjQKJ...', 'interview', NOW()
  );

SET FOREIGN_KEY_CHECKS = 1;
