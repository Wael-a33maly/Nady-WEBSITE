import fs from 'fs';
import path from 'path';
import {
  initialWhyUsFeatures,
  initialHeroSlides,
  initialSiteSettings,
  initialServices,
  initialProjects,
  initialTeam,
  initialSubsidiaryCategories,
  initialSubsidiaries,
  initialJobPositions,
  initialClientLogos,
  initialTestimonials,
  initialQuotes,
  initialInquiries,
  initialJobApplications
} from '../src/data/initialData';

function escapeSql(val: any): string {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') return String(val);
  if (typeof val === 'boolean') return val ? '1' : '0';
  if (typeof val === 'object') {
    return "'" + JSON.stringify(val).replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
      switch (char) {
        case "\0": return "\\0";
        case "\x08": return "\\b";
        case "\x09": return "\\t";
        case "\x1a": return "\\z";
        case "\n": return "\\n";
        case "\r": return "\\r";
        case "\"": case "'": case "\\": case "%":
          return "\\" + char;
        default: return char;
      }
    }) + "'";
  }
  return "'" + String(val).replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
    switch (char) {
      case "\0": return "\\0";
      case "\x08": return "\\b";
      case "\x09": return "\\t";
      case "\x1a": return "\\z";
      case "\n": return "\\n";
      case "\r": return "\\r";
      case "\"": case "'": case "\\": case "%":
        return "\\" + char;
      default: return char;
    }
  }) + "'";
}

let sql = `-- ==============================================================================
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
DROP TABLE IF EXISTS \`admin_tokens\`;
DROP TABLE IF EXISTS \`admin_users\`;
CREATE TABLE \`admin_users\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`username\` VARCHAR(50) NOT NULL UNIQUE,
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`email\` VARCHAR(100) NOT NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`admin_users\` (\`id\`, \`username\`, \`password_hash\`, \`email\`, \`created_at\`)
VALUES (1, 'admin', 'admin123', 'admin@hares-niqaa.com', NOW());

-- ------------------------------------------------------------------------------
-- 2. Admin Sessions & Auth Tokens Table
-- ------------------------------------------------------------------------------
CREATE TABLE \`admin_tokens\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`user_id\` INT NOT NULL,
  \`token\` VARCHAR(64) NOT NULL UNIQUE,
  \`expires_at\` DATETIME NOT NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX \`idx_token_lookup\` (\`token\`, \`expires_at\`),
  CONSTRAINT \`fk_tokens_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`admin_users\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 3. Website Settings Table (Single Row id = 1)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`settings\`;
CREATE TABLE \`settings\` (
  \`id\` INT PRIMARY KEY DEFAULT 1,
  \`company_name_ar\` VARCHAR(255) NOT NULL,
  \`company_name_en\` VARCHAR(255) NOT NULL,
  \`phone\` VARCHAR(50) NOT NULL,
  \`phone_secondary\` VARCHAR(50) DEFAULT NULL,
  \`email\` VARCHAR(100) NOT NULL,
  \`email_secondary\` VARCHAR(100) DEFAULT NULL,
  \`address_ar\` VARCHAR(255) NOT NULL,
  \`address_en\` VARCHAR(255) NOT NULL,
  \`working_hours_ar\` VARCHAR(255) NOT NULL,
  \`working_hours_en\` VARCHAR(255) NOT NULL,
  \`logo_url\` TEXT DEFAULT NULL,
  \`logo_text_ar\` VARCHAR(100) DEFAULT NULL,
  \`logo_text_en\` VARCHAR(100) DEFAULT NULL,
  \`slogan_ar\` VARCHAR(255) DEFAULT NULL,
  \`slogan_en\` VARCHAR(255) DEFAULT NULL,
  \`theme_preset\` VARCHAR(50) DEFAULT 'gold',
  \`primary_color_hex\` VARCHAR(20) DEFAULT '#C9A961',
  \`secondary_color_hex\` VARCHAR(20) DEFAULT '#0B1929',
  \`dark_text_color\` VARCHAR(20) DEFAULT '#F8FAFC',
  \`dark_muted_text_color\` VARCHAR(20) DEFAULT '#94A3B8',
  \`light_text_color\` VARCHAR(20) DEFAULT '#0F172A',
  \`light_muted_text_color\` VARCHAR(20) DEFAULT '#475569',
  \`hero_bg_dark\` VARCHAR(50) DEFAULT '#0B1929',
  \`about_bg_dark\` VARCHAR(50) DEFAULT '#0D1D30',
  \`services_bg_dark\` VARCHAR(50) DEFAULT '#0B1929',
  \`subsidiaries_bg_dark\` VARCHAR(50) DEFAULT '#0D1D30',
  \`projects_bg_dark\` VARCHAR(50) DEFAULT '#0B1929',
  \`why_us_bg_dark\` VARCHAR(50) DEFAULT '#0D1D30',
  \`testimonials_bg_dark\` VARCHAR(50) DEFAULT '#0B1929',
  \`quote_bg_dark\` VARCHAR(50) DEFAULT '#0D1D30',
  \`footer_bg_dark\` VARCHAR(50) DEFAULT '#07111D',
  \`hero_bg_light\` VARCHAR(50) DEFAULT '#0F172A',
  \`about_bg_light\` VARCHAR(50) DEFAULT '#FFFFFF',
  \`services_bg_light\` VARCHAR(50) DEFAULT '#F8FAFC',
  \`subsidiaries_bg_light\` VARCHAR(50) DEFAULT '#F1F5F9',
  \`projects_bg_light\` VARCHAR(50) DEFAULT '#FFFFFF',
  \`why_us_bg_light\` VARCHAR(50) DEFAULT '#F8FAFC',
  \`testimonials_bg_light\` VARCHAR(50) DEFAULT '#FFFFFF',
  \`quote_bg_light\` VARCHAR(50) DEFAULT '#F8FAFC',
  \`footer_bg_light\` VARCHAR(50) DEFAULT '#0F172A',
  \`card_bg_dark\` VARCHAR(50) DEFAULT '#112236',
  \`card_bg_light\` VARCHAR(50) DEFAULT '#FFFFFF',
  \`card_border_dark\` VARCHAR(50) DEFAULT '#1E3A5F',
  \`card_border_light\` VARCHAR(50) DEFAULT '#E2E8F0',
  \`card_radius_px\` INT DEFAULT 16,
  \`hero_badge_ar\` VARCHAR(255) DEFAULT NULL,
  \`hero_badge_en\` VARCHAR(255) DEFAULT NULL,
  \`hero_title_ar\` TEXT DEFAULT NULL,
  \`hero_title_en\` TEXT DEFAULT NULL,
  \`hero_subtitle_ar\` TEXT DEFAULT NULL,
  \`hero_subtitle_en\` TEXT DEFAULT NULL,
  \`hero_slides\` JSON DEFAULT NULL,
  \`about_title_ar\` VARCHAR(255) DEFAULT NULL,
  \`about_title_en\` VARCHAR(255) DEFAULT NULL,
  \`about_desc_ar\` TEXT DEFAULT NULL,
  \`about_desc_en\` TEXT DEFAULT NULL,
  \`about_vision_ar\` TEXT DEFAULT NULL,
  \`about_vision_en\` TEXT DEFAULT NULL,
  \`years_experience\` INT DEFAULT 15,
  \`happy_clients\` INT DEFAULT 450,
  \`completed_projects\` INT DEFAULT 1200,
  \`security_guards_count\` INT DEFAULT 850,
  \`facebook_url\` VARCHAR(255) DEFAULT NULL,
  \`twitter_url\` VARCHAR(255) DEFAULT NULL,
  \`linkedin_url\` VARCHAR(255) DEFAULT NULL,
  \`instagram_url\` VARCHAR(255) DEFAULT NULL,
  \`whatsapp_number\` VARCHAR(50) DEFAULT '966501234567',
  \`updated_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

`;

// Settings INSERT
sql += `INSERT INTO \`settings\` (
  \`id\`, \`company_name_ar\`, \`company_name_en\`, \`phone\`, \`phone_secondary\`,
  \`email\`, \`email_secondary\`, \`address_ar\`, \`address_en\`, \`working_hours_ar\`,
  \`working_hours_en\`, \`logo_url\`, \`logo_text_ar\`, \`logo_text_en\`, \`slogan_ar\`,
  \`slogan_en\`, \`theme_preset\`, \`primary_color_hex\`, \`secondary_color_hex\`,
  \`dark_text_color\`, \`dark_muted_text_color\`, \`light_text_color\`, \`light_muted_text_color\`,
  \`hero_bg_dark\`, \`about_bg_dark\`, \`services_bg_dark\`, \`subsidiaries_bg_dark\`,
  \`projects_bg_dark\`, \`why_us_bg_dark\`, \`testimonials_bg_dark\`, \`quote_bg_dark\`,
  \`footer_bg_dark\`, \`hero_bg_light\`, \`about_bg_light\`, \`services_bg_light\`,
  \`subsidiaries_bg_light\`, \`projects_bg_light\`, \`why_us_bg_light\`, \`testimonials_bg_light\`,
  \`quote_bg_light\`, \`footer_bg_light\`, \`card_bg_dark\`, \`card_bg_light\`,
  \`card_border_dark\`, \`card_border_light\`, \`card_radius_px\`, \`hero_badge_ar\`,
  \`hero_badge_en\`, \`hero_title_ar\`, \`hero_title_en\`, \`hero_subtitle_ar\`,
  \`hero_subtitle_en\`, \`hero_slides\`, \`about_title_ar\`, \`about_title_en\`,
  \`about_desc_ar\`, \`about_desc_en\`, \`about_vision_ar\`, \`about_vision_en\`,
  \`years_experience\`, \`happy_clients\`, \`completed_projects\`, \`security_guards_count\`,
  \`facebook_url\`, \`twitter_url\`, \`linkedin_url\`, \`instagram_url\`, \`whatsapp_number\`
) VALUES (
  1,
  ${escapeSql(initialSiteSettings.companyNameAr)},
  ${escapeSql(initialSiteSettings.companyNameEn)},
  ${escapeSql(initialSiteSettings.phone)},
  ${escapeSql(initialSiteSettings.phoneSecondary)},
  ${escapeSql(initialSiteSettings.email)},
  ${escapeSql(initialSiteSettings.emailSecondary)},
  ${escapeSql(initialSiteSettings.addressAr)},
  ${escapeSql(initialSiteSettings.addressEn)},
  ${escapeSql(initialSiteSettings.workingHoursAr)},
  ${escapeSql(initialSiteSettings.workingHoursEn)},
  ${escapeSql(initialSiteSettings.logoUrl)},
  ${escapeSql(initialSiteSettings.logoTextAr)},
  ${escapeSql(initialSiteSettings.logoTextEn)},
  ${escapeSql(initialSiteSettings.sloganAr)},
  ${escapeSql(initialSiteSettings.sloganEn)},
  ${escapeSql(initialSiteSettings.themePreset)},
  ${escapeSql(initialSiteSettings.primaryColorHex)},
  ${escapeSql(initialSiteSettings.secondaryColorHex)},
  ${escapeSql(initialSiteSettings.darkTextColor)},
  ${escapeSql(initialSiteSettings.darkMutedTextColor)},
  ${escapeSql(initialSiteSettings.lightTextColor)},
  ${escapeSql(initialSiteSettings.lightMutedTextColor)},
  ${escapeSql(initialSiteSettings.heroBgDark)},
  ${escapeSql(initialSiteSettings.aboutBgDark)},
  ${escapeSql(initialSiteSettings.servicesBgDark)},
  ${escapeSql(initialSiteSettings.subsidiariesBgDark)},
  ${escapeSql(initialSiteSettings.projectsBgDark)},
  ${escapeSql(initialSiteSettings.whyUsBgDark)},
  ${escapeSql(initialSiteSettings.testimonialsBgDark)},
  ${escapeSql(initialSiteSettings.quoteBgDark)},
  ${escapeSql(initialSiteSettings.footerBgDark)},
  ${escapeSql(initialSiteSettings.heroBgLight)},
  ${escapeSql(initialSiteSettings.aboutBgLight)},
  ${escapeSql(initialSiteSettings.servicesBgLight)},
  ${escapeSql(initialSiteSettings.subsidiariesBgLight)},
  ${escapeSql(initialSiteSettings.projectsBgLight)},
  ${escapeSql(initialSiteSettings.whyUsBgLight)},
  ${escapeSql(initialSiteSettings.testimonialsBgLight)},
  ${escapeSql(initialSiteSettings.quoteBgLight)},
  ${escapeSql(initialSiteSettings.footerBgLight)},
  ${escapeSql(initialSiteSettings.cardBgDark)},
  ${escapeSql(initialSiteSettings.cardBgLight)},
  ${escapeSql(initialSiteSettings.cardBorderDark)},
  ${escapeSql(initialSiteSettings.cardBorderLight)},
  ${escapeSql(initialSiteSettings.cardRadiusPx)},
  ${escapeSql(initialSiteSettings.heroBadgeAr)},
  ${escapeSql(initialSiteSettings.heroBadgeEn)},
  ${escapeSql(initialSiteSettings.heroTitleAr)},
  ${escapeSql(initialSiteSettings.heroTitleEn)},
  ${escapeSql(initialSiteSettings.heroSubtitleAr)},
  ${escapeSql(initialSiteSettings.heroSubtitleEn)},
  ${escapeSql(initialSiteSettings.heroSlides || initialHeroSlides)},
  ${escapeSql(initialSiteSettings.aboutTitleAr)},
  ${escapeSql(initialSiteSettings.aboutTitleEn)},
  ${escapeSql(initialSiteSettings.aboutDescAr)},
  ${escapeSql(initialSiteSettings.aboutDescEn)},
  ${escapeSql(initialSiteSettings.aboutVisionAr)},
  ${escapeSql(initialSiteSettings.aboutVisionEn)},
  ${escapeSql(initialSiteSettings.yearsExperience)},
  ${escapeSql(initialSiteSettings.happyClients)},
  ${escapeSql(initialSiteSettings.completedProjects)},
  ${escapeSql(initialSiteSettings.securityGuardsCount)},
  ${escapeSql(initialSiteSettings.facebookUrl)},
  ${escapeSql(initialSiteSettings.twitterUrl)},
  ${escapeSql(initialSiteSettings.linkedinUrl)},
  ${escapeSql(initialSiteSettings.instagramUrl)},
  '966501234567'
);\n\n`;

// ------------------------------------------------------------------------------
// 4. Subsidiary Categories
// ------------------------------------------------------------------------------
sql += `-- ------------------------------------------------------------------------------
-- 4. Subsidiary Categories Table
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`subsidiary_categories\`;
CREATE TABLE \`subsidiary_categories\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`name_ar\` VARCHAR(100) NOT NULL,
  \`name_en\` VARCHAR(100) NOT NULL,
  \`sort_order\` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

for (let i = 0; i < initialSubsidiaryCategories.length; i++) {
  const cat = initialSubsidiaryCategories[i];
  sql += `INSERT INTO \`subsidiary_categories\` (\`id\`, \`name_ar\`, \`name_en\`, \`sort_order\`) VALUES (${escapeSql(cat.id)}, ${escapeSql(cat.nameAr)}, ${escapeSql(cat.nameEn)}, ${i});\n`;
}
sql += '\n';

// ------------------------------------------------------------------------------
// 5. Subsidiaries
// ------------------------------------------------------------------------------
sql += `-- ------------------------------------------------------------------------------
-- 5. Subsidiaries Table
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`subsidiaries\`;
CREATE TABLE \`subsidiaries\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`name_ar\` VARCHAR(150) NOT NULL,
  \`name_en\` VARCHAR(150) NOT NULL,
  \`tagline_ar\` VARCHAR(255) DEFAULT NULL,
  \`tagline_en\` VARCHAR(255) DEFAULT NULL,
  \`logo_url\` TEXT DEFAULT NULL,
  \`hero_image\` TEXT DEFAULT NULL,
  \`icon_name\` VARCHAR(50) DEFAULT 'Building',
  \`category\` VARCHAR(50) NOT NULL,
  \`description_ar\` TEXT DEFAULT NULL,
  \`description_en\` TEXT DEFAULT NULL,
  \`detailed_mission_ar\` TEXT DEFAULT NULL,
  \`detailed_mission_en\` TEXT DEFAULT NULL,
  \`services_ar\` JSON DEFAULT NULL,
  \`services_en\` JSON DEFAULT NULL,
  \`certifications_ar\` JSON DEFAULT NULL,
  \`certifications_en\` JSON DEFAULT NULL,
  \`gallery_images\` JSON DEFAULT NULL,
  \`clients_count\` INT DEFAULT 0,
  \`projects_count\` INT DEFAULT 0,
  \`established_year\` VARCHAR(10) DEFAULT '2015',
  \`email\` VARCHAR(100) DEFAULT NULL,
  \`phone\` VARCHAR(50) DEFAULT NULL,
  \`website_url\` VARCHAR(255) DEFAULT NULL,
  \`badge_ar\` VARCHAR(100) DEFAULT NULL,
  \`badge_en\` VARCHAR(100) DEFAULT NULL,
  \`sort_order\` INT DEFAULT 0,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

for (let i = 0; i < initialSubsidiaries.length; i++) {
  const s = initialSubsidiaries[i];
  sql += `INSERT INTO \`subsidiaries\` (
    \`id\`, \`name_ar\`, \`name_en\`, \`tagline_ar\`, \`tagline_en\`, \`logo_url\`,
    \`hero_image\`, \`icon_name\`, \`category\`, \`description_ar\`, \`description_en\`,
    \`detailed_mission_ar\`, \`detailed_mission_en\`, \`services_ar\`, \`services_en\`,
    \`certifications_ar\`, \`certifications_en\`, \`gallery_images\`, \`clients_count\`,
    \`projects_count\`, \`established_year\`, \`email\`, \`phone\`, \`website_url\`,
    \`badge_ar\`, \`badge_en\`, \`sort_order\`, \`created_at\`
  ) VALUES (
    ${escapeSql(s.id)}, ${escapeSql(s.nameAr)}, ${escapeSql(s.nameEn)}, ${escapeSql(s.taglineAr)}, ${escapeSql(s.taglineEn)}, ${escapeSql(s.logoUrl)},
    ${escapeSql(s.heroImage)}, ${escapeSql(s.iconName)}, ${escapeSql(s.category)}, ${escapeSql(s.descriptionAr)}, ${escapeSql(s.descriptionEn)},
    ${escapeSql(s.detailedMissionAr)}, ${escapeSql(s.detailedMissionEn)}, ${escapeSql(s.servicesAr)}, ${escapeSql(s.servicesEn)},
    ${escapeSql(s.certificationsAr)}, ${escapeSql(s.certificationsEn)}, ${escapeSql(s.galleryImages)}, ${escapeSql(s.clientsCount)},
    ${escapeSql(s.projectsCount)}, ${escapeSql(s.establishedYear)}, ${escapeSql(s.email)}, ${escapeSql(s.phone)}, ${escapeSql(s.websiteUrl)},
    ${escapeSql(s.badgeAr)}, ${escapeSql(s.badgeEn)}, ${i}, NOW()
  );\n`;
}
sql += '\n';

// ------------------------------------------------------------------------------
// 6. Services Table
// ------------------------------------------------------------------------------
sql += `-- ------------------------------------------------------------------------------
-- 6. Services Table
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`services\`;
CREATE TABLE \`services\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`title_ar\` VARCHAR(150) NOT NULL,
  \`title_en\` VARCHAR(150) NOT NULL,
  \`desc_ar\` TEXT NOT NULL,
  \`desc_en\` TEXT NOT NULL,
  \`detailed_desc_ar\` TEXT DEFAULT NULL,
  \`detailed_desc_en\` TEXT DEFAULT NULL,
  \`category\` VARCHAR(50) NOT NULL,
  \`icon_name\` VARCHAR(50) NOT NULL,
  \`features_ar\` JSON DEFAULT NULL,
  \`features_en\` JSON DEFAULT NULL,
  \`image\` TEXT DEFAULT NULL,
  \`popular\` TINYINT(1) DEFAULT 0,
  \`sort_order\` INT DEFAULT 0,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

for (let i = 0; i < initialServices.length; i++) {
  const s = initialServices[i];
  sql += `INSERT INTO \`services\` (
    \`id\`, \`title_ar\`, \`title_en\`, \`desc_ar\`, \`desc_en\`, \`detailed_desc_ar\`,
    \`detailed_desc_en\`, \`category\`, \`icon_name\`, \`features_ar\`, \`features_en\`,
    \`image\`, \`popular\`, \`sort_order\`, \`created_at\`
  ) VALUES (
    ${escapeSql(s.id)}, ${escapeSql(s.titleAr)}, ${escapeSql(s.titleEn)}, ${escapeSql(s.descAr)}, ${escapeSql(s.descEn)}, ${escapeSql(s.detailedDescAr)},
    ${escapeSql(s.detailedDescEn)}, ${escapeSql(s.category)}, ${escapeSql(s.iconName)}, ${escapeSql(s.featuresAr)}, ${escapeSql(s.featuresEn)},
    ${escapeSql(s.image)}, ${escapeSql(s.popular)}, ${i}, NOW()
  );\n`;
}
sql += '\n';

// ------------------------------------------------------------------------------
// 7. Projects Table
// ------------------------------------------------------------------------------
sql += `-- ------------------------------------------------------------------------------
-- 7. Projects Table
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`projects\`;
CREATE TABLE \`projects\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`title_ar\` VARCHAR(150) NOT NULL,
  \`title_en\` VARCHAR(150) NOT NULL,
  \`category\` VARCHAR(50) NOT NULL,
  \`client_ar\` VARCHAR(150) DEFAULT NULL,
  \`client_en\` VARCHAR(150) DEFAULT NULL,
  \`location_ar\` VARCHAR(150) DEFAULT NULL,
  \`location_en\` VARCHAR(150) DEFAULT NULL,
  \`date\` VARCHAR(50) DEFAULT NULL,
  \`image\` TEXT DEFAULT NULL,
  \`description_ar\` TEXT DEFAULT NULL,
  \`description_en\` TEXT DEFAULT NULL,
  \`stats_ar\` VARCHAR(100) DEFAULT NULL,
  \`stats_en\` VARCHAR(100) DEFAULT NULL,
  \`badge_ar\` VARCHAR(100) DEFAULT NULL,
  \`badge_en\` VARCHAR(100) DEFAULT NULL,
  \`subsidiary_id\` VARCHAR(50) DEFAULT NULL,
  \`sort_order\` INT DEFAULT 0,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

for (let i = 0; i < initialProjects.length; i++) {
  const p = initialProjects[i];
  sql += `INSERT INTO \`projects\` (
    \`id\`, \`title_ar\`, \`title_en\`, \`category\`, \`client_ar\`, \`client_en\`,
    \`location_ar\`, \`location_en\`, \`date\`, \`image\`, \`description_ar\`, \`description_en\`,
    \`stats_ar\`, \`stats_en\`, \`badge_ar\`, \`badge_en\`, \`subsidiary_id\`, \`sort_order\`, \`created_at\`
  ) VALUES (
    ${escapeSql(p.id)}, ${escapeSql(p.titleAr)}, ${escapeSql(p.titleEn)}, ${escapeSql(p.category)}, ${escapeSql(p.clientAr)}, ${escapeSql(p.clientEn)},
    ${escapeSql(p.locationAr)}, ${escapeSql(p.locationEn)}, ${escapeSql(p.date)}, ${escapeSql(p.image)}, ${escapeSql(p.descriptionAr)}, ${escapeSql(p.descriptionEn)},
    ${escapeSql(p.statsAr)}, ${escapeSql(p.statsEn)}, ${escapeSql(p.badgeAr)}, ${escapeSql(p.badgeEn)}, ${escapeSql(p.subsidiaryId)}, ${i}, NOW()
  );\n`;
}
sql += '\n';

// ------------------------------------------------------------------------------
// 8. Team Members Table
// ------------------------------------------------------------------------------
sql += `-- ------------------------------------------------------------------------------
-- 8. Team Members Table
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`team\`;
CREATE TABLE \`team\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`name_ar\` VARCHAR(100) NOT NULL,
  \`name_en\` VARCHAR(100) NOT NULL,
  \`role_ar\` VARCHAR(100) NOT NULL,
  \`role_en\` VARCHAR(100) NOT NULL,
  \`image\` TEXT DEFAULT NULL,
  \`bio_ar\` TEXT DEFAULT NULL,
  \`bio_en\` TEXT DEFAULT NULL,
  \`phone\` VARCHAR(50) DEFAULT NULL,
  \`email\` VARCHAR(100) DEFAULT NULL,
  \`linkedin\` VARCHAR(255) DEFAULT NULL,
  \`twitter\` VARCHAR(255) DEFAULT NULL,
  \`sort_order\` INT DEFAULT 0,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

for (let i = 0; i < initialTeam.length; i++) {
  const t = initialTeam[i];
  sql += `INSERT INTO \`team\` (
    \`id\`, \`name_ar\`, \`name_en\`, \`role_ar\`, \`role_en\`, \`image\`, \`bio_ar\`,
    \`bio_en\`, \`phone\`, \`email\`, \`linkedin\`, \`twitter\`, \`sort_order\`, \`created_at\`
  ) VALUES (
    ${escapeSql(t.id)}, ${escapeSql(t.nameAr)}, ${escapeSql(t.nameEn)}, ${escapeSql(t.roleAr)}, ${escapeSql(t.roleEn)}, ${escapeSql(t.image)}, ${escapeSql(t.bioAr)},
    ${escapeSql(t.bioEn)}, ${escapeSql(t.phone)}, ${escapeSql(t.email)}, ${escapeSql(t.linkedin)}, ${escapeSql(t.twitter)}, ${i}, NOW()
  );\n`;
}
sql += '\n';

// ------------------------------------------------------------------------------
// 9. Why Us Features
// ------------------------------------------------------------------------------
sql += `-- ------------------------------------------------------------------------------
-- 9. Why Us Features Table
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`why_us_features\`;
CREATE TABLE \`why_us_features\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`icon_name\` VARCHAR(50) NOT NULL,
  \`title_ar\` VARCHAR(150) NOT NULL,
  \`title_en\` VARCHAR(150) NOT NULL,
  \`desc_ar\` TEXT NOT NULL,
  \`desc_en\` TEXT NOT NULL,
  \`badge_ar\` VARCHAR(100) DEFAULT NULL,
  \`badge_en\` VARCHAR(100) DEFAULT NULL,
  \`sort_order\` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

for (let i = 0; i < initialWhyUsFeatures.length; i++) {
  const w = initialWhyUsFeatures[i];
  sql += `INSERT INTO \`why_us_features\` (\`id\`, \`icon_name\`, \`title_ar\`, \`title_en\`, \`desc_ar\`, \`desc_en\`, \`badge_ar\`, \`badge_en\`, \`sort_order\`)
VALUES (${escapeSql(w.id)}, ${escapeSql(w.iconName)}, ${escapeSql(w.titleAr)}, ${escapeSql(w.titleEn)}, ${escapeSql(w.descAr)}, ${escapeSql(w.descEn)}, ${escapeSql(w.badgeAr)}, ${escapeSql(w.badgeEn)}, ${i});\n`;
}
sql += '\n';

// ------------------------------------------------------------------------------
// 10. Job Positions
// ------------------------------------------------------------------------------
sql += `-- ------------------------------------------------------------------------------
-- 10. Job Positions Table
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`job_positions\`;
CREATE TABLE \`job_positions\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`title_ar\` VARCHAR(150) NOT NULL,
  \`title_en\` VARCHAR(150) NOT NULL,
  \`department_ar\` VARCHAR(100) NOT NULL,
  \`department_en\` VARCHAR(100) NOT NULL,
  \`location_ar\` VARCHAR(100) NOT NULL,
  \`location_en\` VARCHAR(100) NOT NULL,
  \`type_ar\` VARCHAR(50) NOT NULL,
  \`type_en\` VARCHAR(50) NOT NULL,
  \`description_ar\` TEXT NOT NULL,
  \`description_en\` TEXT NOT NULL,
  \`requirements_ar\` JSON DEFAULT NULL,
  \`requirements_en\` JSON DEFAULT NULL,
  \`active\` TINYINT(1) DEFAULT 1,
  \`posted_date\` VARCHAR(50) DEFAULT NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

for (let i = 0; i < initialJobPositions.length; i++) {
  const j = initialJobPositions[i];
  sql += `INSERT INTO \`job_positions\` (
    \`id\`, \`title_ar\`, \`title_en\`, \`department_ar\`, \`department_en\`,
    \`location_ar\`, \`location_en\`, \`type_ar\`, \`type_en\`, \`description_ar\`,
    \`description_en\`, \`requirements_ar\`, \`requirements_en\`, \`active\`, \`posted_date\`, \`created_at\`
  ) VALUES (
    ${escapeSql(j.id)}, ${escapeSql(j.titleAr)}, ${escapeSql(j.titleEn)}, ${escapeSql(j.departmentAr)}, ${escapeSql(j.departmentEn)},
    ${escapeSql(j.locationAr)}, ${escapeSql(j.locationEn)}, ${escapeSql(j.typeAr)}, ${escapeSql(j.typeEn)}, ${escapeSql(j.descriptionAr)},
    ${escapeSql(j.descriptionEn)}, ${escapeSql(j.requirementsAr)}, ${escapeSql(j.requirementsEn)}, ${escapeSql(j.active)}, ${escapeSql(j.postedDate)}, NOW()
  );\n`;
}
sql += '\n';

// ------------------------------------------------------------------------------
// 11. Client Logos
// ------------------------------------------------------------------------------
sql += `-- ------------------------------------------------------------------------------
-- 11. Client Logos Table
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`client_logos\`;
CREATE TABLE \`client_logos\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`name\` VARCHAR(100) NOT NULL,
  \`logo_url\` TEXT NOT NULL,
  \`category\` VARCHAR(50) NOT NULL,
  \`sort_order\` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

for (let i = 0; i < initialClientLogos.length; i++) {
  const l = initialClientLogos[i];
  sql += `INSERT INTO \`client_logos\` (\`id\`, \`name\`, \`logo_url\`, \`category\`, \`sort_order\`)
VALUES (${escapeSql(l.id)}, ${escapeSql(l.name)}, ${escapeSql(l.logoUrl)}, ${escapeSql(l.category)}, ${i});\n`;
}
sql += '\n';

// ------------------------------------------------------------------------------
// 12. Testimonials
// ------------------------------------------------------------------------------
sql += `-- ------------------------------------------------------------------------------
-- 12. Testimonials Table
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`testimonials\`;
CREATE TABLE \`testimonials\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`name_ar\` VARCHAR(100) NOT NULL,
  \`name_en\` VARCHAR(100) NOT NULL,
  \`company_ar\` VARCHAR(100) NOT NULL,
  \`company_en\` VARCHAR(100) NOT NULL,
  \`role_ar\` VARCHAR(100) NOT NULL,
  \`role_en\` VARCHAR(100) NOT NULL,
  \`avatar\` TEXT DEFAULT NULL,
  \`content_ar\` TEXT NOT NULL,
  \`content_en\` TEXT NOT NULL,
  \`rating\` INT DEFAULT 5,
  \`service_type\` VARCHAR(50) NOT NULL,
  \`sort_order\` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

for (let i = 0; i < initialTestimonials.length; i++) {
  const t = initialTestimonials[i];
  sql += `INSERT INTO \`testimonials\` (
    \`id\`, \`name_ar\`, \`name_en\`, \`company_ar\`, \`company_en\`, \`role_ar\`, \`role_en\`,
    \`avatar\`, \`content_ar\`, \`content_en\`, \`rating\`, \`service_type\`, \`sort_order\`
  ) VALUES (
    ${escapeSql(t.id)}, ${escapeSql(t.nameAr)}, ${escapeSql(t.nameEn)}, ${escapeSql(t.companyAr)}, ${escapeSql(t.companyEn)}, ${escapeSql(t.roleAr)}, ${escapeSql(t.roleEn)},
    ${escapeSql(t.avatar)}, ${escapeSql(t.contentAr)}, ${escapeSql(t.contentEn)}, ${escapeSql(t.rating)}, ${escapeSql(t.serviceType)}, ${i}
  );\n`;
}
sql += '\n';

// ------------------------------------------------------------------------------
// 13. Quotes Table (Submissions)
// ------------------------------------------------------------------------------
sql += `-- ------------------------------------------------------------------------------
-- 13. Quotes Table
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`quotes\`;
CREATE TABLE \`quotes\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`service_category\` VARCHAR(50) NOT NULL,
  \`service_name\` VARCHAR(150) NOT NULL,
  \`property_area\` VARCHAR(50) DEFAULT NULL,
  \`headcount_needed\` VARCHAR(50) DEFAULT NULL,
  \`location\` VARCHAR(150) DEFAULT NULL,
  \`contract_duration\` VARCHAR(50) DEFAULT NULL,
  \`company_name\` VARCHAR(150) DEFAULT NULL,
  \`contact_name\` VARCHAR(100) NOT NULL,
  \`phone\` VARCHAR(50) NOT NULL,
  \`email\` VARCHAR(100) DEFAULT NULL,
  \`notes\` TEXT DEFAULT NULL,
  \`status\` ENUM('new', 'processing', 'completed') DEFAULT 'new',
  \`ip_address\` VARCHAR(45) DEFAULT NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX \`idx_quotes_status\` (\`status\`),
  INDEX \`idx_quotes_created\` (\`created_at\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

for (const q of initialQuotes) {
  sql += `INSERT INTO \`quotes\` (
    \`id\`, \`service_category\`, \`service_name\`, \`property_area\`, \`headcount_needed\`,
    \`location\`, \`contract_duration\`, \`company_name\`, \`contact_name\`, \`phone\`,
    \`email\`, \`notes\`, \`status\`, \`created_at\`
  ) VALUES (
    ${escapeSql(q.id)}, ${escapeSql(q.serviceCategory)}, ${escapeSql(q.serviceName)}, ${escapeSql(q.propertyArea)}, ${escapeSql(q.headcountNeeded)},
    ${escapeSql(q.location)}, ${escapeSql(q.contractDuration)}, ${escapeSql(q.companyName)}, ${escapeSql(q.contactName)}, ${escapeSql(q.phone)},
    ${escapeSql(q.email)}, ${escapeSql(q.notes)}, ${escapeSql(q.status)}, NOW()
  );\n`;
}
sql += '\n';

// ------------------------------------------------------------------------------
// 14. Contact Inquiries Table
// ------------------------------------------------------------------------------
sql += `-- ------------------------------------------------------------------------------
-- 14. Contact Inquiries Table
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`inquiries\`;
CREATE TABLE \`inquiries\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`name\` VARCHAR(100) NOT NULL,
  \`phone\` VARCHAR(50) NOT NULL,
  \`email\` VARCHAR(100) DEFAULT NULL,
  \`subject\` VARCHAR(150) DEFAULT NULL,
  \`message\` TEXT NOT NULL,
  \`status\` ENUM('unread', 'read', 'replied') DEFAULT 'unread',
  \`ip_address\` VARCHAR(45) DEFAULT NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX \`idx_inquiries_status\` (\`status\`),
  INDEX \`idx_inquiries_created\` (\`created_at\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

for (const inq of initialInquiries) {
  sql += `INSERT INTO \`inquiries\` (\`id\`, \`name\`, \`phone\`, \`email\`, \`subject\`, \`message\`, \`status\`, \`created_at\`)
VALUES (${escapeSql(inq.id)}, ${escapeSql(inq.name)}, ${escapeSql(inq.phone)}, ${escapeSql(inq.email)}, ${escapeSql(inq.subject)}, ${escapeSql(inq.message)}, ${escapeSql(inq.status)}, NOW());\n`;
}
sql += '\n';

// ------------------------------------------------------------------------------
// 15. Job Applications Table
// ------------------------------------------------------------------------------
sql += `-- ------------------------------------------------------------------------------
-- 15. Job Applications Table
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`job_applications\`;
CREATE TABLE \`job_applications\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`job_position_id\` VARCHAR(50) DEFAULT NULL,
  \`job_title\` VARCHAR(150) NOT NULL,
  \`applicant_name\` VARCHAR(100) NOT NULL,
  \`email\` VARCHAR(100) NOT NULL,
  \`phone\` VARCHAR(50) NOT NULL,
  \`experience_years\` VARCHAR(50) DEFAULT NULL,
  \`notes\` TEXT DEFAULT NULL,
  \`cv_file_name\` VARCHAR(255) DEFAULT NULL,
  \`cv_file_data\` LONGTEXT DEFAULT NULL,
  \`status\` ENUM('new', 'reviewed', 'shortlisted', 'rejected') DEFAULT 'new',
  \`ip_address\` VARCHAR(45) DEFAULT NULL,
  \`applied_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX \`idx_job_apps_status\` (\`status\`),
  INDEX \`idx_job_apps_applied\` (\`applied_at\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

for (const app of initialJobApplications) {
  sql += `INSERT INTO \`job_applications\` (
    \`id\`, \`job_position_id\`, \`job_title\`, \`applicant_name\`, \`email\`, \`phone\`,
    \`experience_years\`, \`notes\`, \`cv_file_name\`, \`cv_file_data\`, \`status\`, \`applied_at\`
  ) VALUES (
    ${escapeSql(app.id)}, ${escapeSql(app.jobPositionId)}, ${escapeSql(app.jobTitle)}, ${escapeSql(app.applicantName)}, ${escapeSql(app.email)}, ${escapeSql(app.phone)},
    ${escapeSql(app.experienceYears)}, ${escapeSql(app.notes)}, ${escapeSql(app.cvFileName)}, ${escapeSql(app.cvFileData)}, ${escapeSql(app.status)}, NOW()
  );\n`;
}
sql += '\n';

sql += `SET FOREIGN_KEY_CHECKS = 1;\n`;

fs.writeFileSync(path.resolve(process.cwd(), 'database.sql'), sql, 'utf8');
fs.writeFileSync(path.resolve(process.cwd(), 'public/database.sql'), sql, 'utf8');
console.log('Successfully generated database.sql and public/database.sql!');
