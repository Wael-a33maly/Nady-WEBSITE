<?php
/**
 * Unified Public & Admin Content Loader
 * GET /api/content.php
 * Returns all website content in a single fast, optimized payload
 */

declare(strict_types=1);

require_once __DIR__ . '/db.php';

applyCorsHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError('طريقة الطلب غير مقبولة.', 405);
}

$pdo = getDbConnection();

try {
    // 1. Settings
    $settingsStmt = $pdo->query('SELECT * FROM settings WHERE id = 1 LIMIT 1');
    $rawSettings = $settingsStmt->fetch() ?: [];

    // Map database snake_case to frontend camelCase SiteSettings
    $settings = [
        'companyNameAr'       => $rawSettings['company_name_ar'] ?? 'شركة حارس ونقاء للخدمات الأمنية والنظافة',
        'companyNameEn'       => $rawSettings['company_name_en'] ?? 'Hares & Niqaa Security & Cleaning Co.',
        'phone'               => $rawSettings['phone'] ?? '+966 11 456 7890',
        'phoneSecondary'      => $rawSettings['phone_secondary'] ?? '+966 50 123 4567',
        'email'               => $rawSettings['email'] ?? 'info@hares-niqaa.com',
        'emailSecondary'      => $rawSettings['email_secondary'] ?? 'support@hares-niqaa.com',
        'addressAr'           => $rawSettings['address_ar'] ?? 'الرياض، طريق الملك فهد، البرج المالي - الدور 18',
        'addressEn'           => $rawSettings['address_en'] ?? 'Riyadh, King Fahd Road, Financial Tower - 18th Floor',
        'workingHoursAr'      => $rawSettings['working_hours_ar'] ?? 'غرفة العمليات: 24/7 | الإدارة: الأحد - الخميس 8 ص - 5 م',
        'workingHoursEn'      => $rawSettings['working_hours_en'] ?? 'Command Center: 24/7 | Admin: Sun - Thu 8AM - 5PM',
        'logoUrl'             => $rawSettings['logo_url'] ?? '',
        'logoTextAr'          => $rawSettings['logo_text_ar'] ?? 'حارس ونقاء',
        'logoTextEn'          => $rawSettings['logo_text_en'] ?? 'HARES & NIQAA',
        'sloganAr'            => $rawSettings['slogan_ar'] ?? 'أمن ونظافة متكاملة',
        'sloganEn'            => $rawSettings['slogan_en'] ?? 'Integrated Security & Hygiene',
        
        // Theme & Colors
        'themePreset'         => $rawSettings['theme_preset'] ?? 'gold',
        'primaryColorHex'     => $rawSettings['primary_color_hex'] ?? '#C9A961',
        'secondaryColorHex'   => $rawSettings['secondary_color_hex'] ?? '#0B1929',
        
        // Typography & Colors
        'darkTextColor'       => $rawSettings['dark_text_color'] ?? '#F8FAFC',
        'darkMutedTextColor'  => $rawSettings['dark_muted_text_color'] ?? '#94A3B8',
        'lightTextColor'      => $rawSettings['light_text_color'] ?? '#0F172A',
        'lightMutedTextColor' => $rawSettings['light_muted_text_color'] ?? '#475569',
        
        // Backgrounds Dark
        'heroBgDark'          => $rawSettings['hero_bg_dark'] ?? '#0B1929',
        'aboutBgDark'         => $rawSettings['about_bg_dark'] ?? '#0D1D30',
        'servicesBgDark'      => $rawSettings['services_bg_dark'] ?? '#0B1929',
        'subsidiariesBgDark'  => $rawSettings['subsidiaries_bg_dark'] ?? '#0D1D30',
        'projectsBgDark'      => $rawSettings['projects_bg_dark'] ?? '#0B1929',
        'whyUsBgDark'         => $rawSettings['why_us_bg_dark'] ?? '#0D1D30',
        'testimonialsBgDark'  => $rawSettings['testimonials_bg_dark'] ?? '#0B1929',
        'quoteBgDark'         => $rawSettings['quote_bg_dark'] ?? '#0D1D30',
        'footerBgDark'        => $rawSettings['footer_bg_dark'] ?? '#07111D',

        // Backgrounds Light
        'heroBgLight'         => $rawSettings['hero_bg_light'] ?? '#0F172A',
        'aboutBgLight'        => $rawSettings['about_bg_light'] ?? '#FFFFFF',
        'servicesBgLight'     => $rawSettings['services_bg_light'] ?? '#F8FAFC',
        'subsidiariesBgLight' => $rawSettings['subsidiaries_bg_light'] ?? '#F1F5F9',
        'projectsBgLight'     => $rawSettings['projects_bg_light'] ?? '#FFFFFF',
        'whyUsBgLight'        => $rawSettings['why_us_bg_light'] ?? '#F8FAFC',
        'testimonialsBgLight' => $rawSettings['testimonials_bg_light'] ?? '#FFFFFF',
        'quoteBgLight'        => $rawSettings['quote_bg_light'] ?? '#F8FAFC',
        'footerBgLight'       => $rawSettings['footer_bg_light'] ?? '#0F172A',

        // Cards & Containers
        'cardBgDark'          => $rawSettings['card_bg_dark'] ?? '#112236',
        'cardBgLight'         => $rawSettings['card_bg_light'] ?? '#FFFFFF',
        'cardBorderDark'      => $rawSettings['card_border_dark'] ?? '#1E3A5F',
        'cardBorderLight'     => $rawSettings['card_border_light'] ?? '#E2E8F0',
        'cardRadiusPx'        => isset($rawSettings['card_radius_px']) ? (int)$rawSettings['card_radius_px'] : 16,

        // Hero
        'heroBadgeAr'         => $rawSettings['hero_badge_ar'] ?? '',
        'heroBadgeEn'         => $rawSettings['hero_badge_en'] ?? '',
        'heroTitleAr'         => $rawSettings['hero_title_ar'] ?? '',
        'heroTitleEn'         => $rawSettings['hero_title_en'] ?? '',
        'heroSubtitleAr'      => $rawSettings['hero_subtitle_ar'] ?? '',
        'heroSubtitleEn'      => $rawSettings['hero_subtitle_en'] ?? '',
        'heroSlides'          => !empty($rawSettings['hero_slides']) ? json_decode($rawSettings['hero_slides'], true) : [],

        // About
        'aboutTitleAr'        => $rawSettings['about_title_ar'] ?? '',
        'aboutTitleEn'        => $rawSettings['about_title_en'] ?? '',
        'aboutDescAr'         => $rawSettings['about_desc_ar'] ?? '',
        'aboutDescEn'         => $rawSettings['about_desc_en'] ?? '',
        'aboutVisionAr'       => $rawSettings['about_vision_ar'] ?? '',
        'aboutVisionEn'       => $rawSettings['about_vision_en'] ?? '',

        // Stats
        'yearsExperience'     => isset($rawSettings['years_experience']) ? (int)$rawSettings['years_experience'] : 15,
        'happyClients'        => isset($rawSettings['happy_clients']) ? (int)$rawSettings['happy_clients'] : 450,
        'completedProjects'   => isset($rawSettings['completed_projects']) ? (int)$rawSettings['completed_projects'] : 1200,
        'securityGuardsCount' => isset($rawSettings['security_guards_count']) ? (int)$rawSettings['security_guards_count'] : 850,

        // Social
        'facebookUrl'         => $rawSettings['facebook_url'] ?? '',
        'twitterUrl'          => $rawSettings['twitter_url'] ?? '',
        'linkedinUrl'         => $rawSettings['linkedin_url'] ?? '',
        'instagramUrl'        => $rawSettings['instagram_url'] ?? '',
        'whatsappNumber'      => $rawSettings['whatsapp_number'] ?? '966555555555',
    ];

    // 2. Services
    $servicesStmt = $pdo->query('SELECT * FROM services ORDER BY sort_order ASC, created_at DESC');
    $services = [];
    while ($row = $servicesStmt->fetch()) {
        $services[] = [
            'id'             => $row['id'],
            'titleAr'        => $row['title_ar'],
            'titleEn'        => $row['title_en'],
            'descAr'         => $row['desc_ar'],
            'descEn'         => $row['desc_en'],
            'detailedDescAr' => $row['detailed_desc_ar'] ?? '',
            'detailedDescEn' => $row['detailed_desc_en'] ?? '',
            'category'       => $row['category'],
            'iconName'       => $row['icon_name'],
            'featuresAr'     => !empty($row['features_ar']) ? json_decode($row['features_ar'], true) : [],
            'featuresEn'     => !empty($row['features_en']) ? json_decode($row['features_en'], true) : [],
            'image'          => $row['image'] ?? '',
            'popular'        => (bool)($row['popular'] ?? 0),
        ];
    }

    // 3. Projects
    $projectsStmt = $pdo->query('SELECT * FROM projects ORDER BY sort_order ASC, created_at DESC');
    $projects = [];
    while ($row = $projectsStmt->fetch()) {
        $projects[] = [
            'id'            => $row['id'],
            'titleAr'       => $row['title_ar'],
            'titleEn'       => $row['title_en'],
            'category'      => $row['category'],
            'clientAr'      => $row['client_ar'] ?? '',
            'clientEn'      => $row['client_en'] ?? '',
            'locationAr'    => $row['location_ar'] ?? '',
            'locationEn'    => $row['location_en'] ?? '',
            'date'          => $row['date'] ?? '',
            'image'         => $row['image'] ?? '',
            'descriptionAr' => $row['description_ar'] ?? '',
            'descriptionEn' => $row['description_en'] ?? '',
            'statsAr'       => $row['stats_ar'] ?? '',
            'statsEn'       => $row['stats_en'] ?? '',
            'badgeAr'       => $row['badge_ar'] ?? '',
            'badgeEn'       => $row['badge_en'] ?? '',
            'subsidiaryId'  => $row['subsidiary_id'] ?? null,
        ];
    }

    // 4. Team
    $teamStmt = $pdo->query('SELECT * FROM team ORDER BY sort_order ASC, created_at DESC');
    $team = [];
    while ($row = $teamStmt->fetch()) {
        $team[] = [
            'id'       => $row['id'],
            'nameAr'   => $row['name_ar'],
            'nameEn'   => $row['name_en'],
            'roleAr'   => $row['role_ar'],
            'roleEn'   => $row['role_en'],
            'image'    => $row['image'] ?? '',
            'bioAr'    => $row['bio_ar'] ?? '',
            'bioEn'    => $row['bio_en'] ?? '',
            'phone'    => $row['phone'] ?? null,
            'email'    => $row['email'] ?? null,
            'linkedin' => $row['linkedin'] ?? null,
            'twitter'  => $row['twitter'] ?? null,
        ];
    }

    // 5. Subsidiaries
    $subsStmt = $pdo->query('SELECT * FROM subsidiaries ORDER BY sort_order ASC, created_at DESC');
    $subsidiaries = [];
    while ($row = $subsStmt->fetch()) {
        $subsidiaries[] = [
            'id'                => $row['id'],
            'nameAr'            => $row['name_ar'],
            'nameEn'            => $row['name_en'],
            'taglineAr'         => $row['tagline_ar'] ?? '',
            'taglineEn'         => $row['tagline_en'] ?? '',
            'logoUrl'           => $row['logo_url'] ?? '',
            'heroImage'         => $row['hero_image'] ?? null,
            'iconName'          => $row['icon_name'] ?? 'Building',
            'category'          => $row['category'],
            'descriptionAr'     => $row['description_ar'] ?? '',
            'descriptionEn'     => $row['description_en'] ?? '',
            'detailedMissionAr' => $row['detailed_mission_ar'] ?? null,
            'detailedMissionEn' => $row['detailed_mission_en'] ?? null,
            'servicesAr'        => !empty($row['services_ar']) ? json_decode($row['services_ar'], true) : [],
            'servicesEn'        => !empty($row['services_en']) ? json_decode($row['services_en'], true) : [],
            'certificationsAr'  => !empty($row['certifications_ar']) ? json_decode($row['certifications_ar'], true) : [],
            'certificationsEn'  => !empty($row['certifications_en']) ? json_decode($row['certifications_en'], true) : [],
            'galleryImages'     => !empty($row['gallery_images']) ? json_decode($row['gallery_images'], true) : [],
            'clientsCount'      => (int)($row['clients_count'] ?? 0),
            'projectsCount'     => (int)($row['projects_count'] ?? 0),
            'establishedYear'   => (string)($row['established_year'] ?? '2015'),
            'email'             => $row['email'] ?? null,
            'phone'             => $row['phone'] ?? null,
            'websiteUrl'        => $row['website_url'] ?? null,
            'badgeAr'           => $row['badge_ar'] ?? null,
            'badgeEn'           => $row['badge_en'] ?? null,
        ];
    }

    // 6. Subsidiary Categories
    $catStmt = $pdo->query('SELECT * FROM subsidiary_categories ORDER BY sort_order ASC');
    $subsidiaryCategories = [];
    while ($row = $catStmt->fetch()) {
        $subsidiaryCategories[] = [
            'id'     => $row['id'],
            'nameAr' => $row['name_ar'],
            'nameEn' => $row['name_en'],
        ];
    }

    // 7. Why Us Features
    $whyStmt = $pdo->query('SELECT * FROM why_us_features ORDER BY sort_order ASC');
    $whyUsFeatures = [];
    while ($row = $whyStmt->fetch()) {
        $whyUsFeatures[] = [
            'id'       => $row['id'],
            'iconName' => $row['icon_name'],
            'titleAr'  => $row['title_ar'],
            'titleEn'  => $row['title_en'],
            'descAr'   => $row['desc_ar'],
            'descEn'   => $row['desc_en'],
            'badgeAr'  => $row['badge_ar'],
            'badgeEn'  => $row['badge_en'],
        ];
    }

    // 8. Job Positions
    $jobStmt = $pdo->query('SELECT * FROM job_positions ORDER BY posted_date DESC, created_at DESC');
    $jobPositions = [];
    while ($row = $jobStmt->fetch()) {
        $jobPositions[] = [
            'id'             => $row['id'],
            'titleAr'        => $row['title_ar'],
            'titleEn'        => $row['title_en'],
            'departmentAr'   => $row['department_ar'],
            'departmentEn'   => $row['department_en'],
            'locationAr'     => $row['location_ar'],
            'locationEn'     => $row['location_en'],
            'typeAr'         => $row['type_ar'],
            'typeEn'         => $row['type_en'],
            'descriptionAr'  => $row['description_ar'],
            'descriptionEn'  => $row['description_en'],
            'requirementsAr' => !empty($row['requirements_ar']) ? json_decode($row['requirements_ar'], true) : [],
            'requirementsEn' => !empty($row['requirements_en']) ? json_decode($row['requirements_en'], true) : [],
            'active'         => (bool)($row['active'] ?? 1),
            'postedDate'     => $row['posted_date'],
        ];
    }

    // 9. Client Logos
    $logoStmt = $pdo->query('SELECT * FROM client_logos ORDER BY sort_order ASC');
    $clientLogos = [];
    while ($row = $logoStmt->fetch()) {
        $clientLogos[] = [
            'id'       => $row['id'],
            'name'     => $row['name'],
            'logoUrl'  => $row['logo_url'],
            'category' => $row['category'],
        ];
    }

    // 10. Testimonials
    $testStmt = $pdo->query('SELECT * FROM testimonials ORDER BY sort_order ASC');
    $testimonials = [];
    while ($row = $testStmt->fetch()) {
        $testimonials[] = [
            'id'          => $row['id'],
            'nameAr'      => $row['name_ar'],
            'nameEn'      => $row['name_en'],
            'companyAr'   => $row['company_ar'],
            'companyEn'   => $row['company_en'],
            'roleAr'      => $row['role_ar'],
            'roleEn'      => $row['role_en'],
            'avatar'      => $row['avatar'],
            'contentAr'   => $row['content_ar'],
            'contentEn'   => $row['content_en'],
            'rating'      => (int)($row['rating'] ?? 5),
            'serviceType' => $row['service_type'],
        ];
    }

    sendJson([
        'success'              => true,
        'settings'             => $settings,
        'services'             => $services,
        'projects'             => $projects,
        'team'                 => $team,
        'subsidiaries'         => $subsidiaries,
        'subsidiaryCategories' => $subsidiaryCategories,
        'whyUsFeatures'        => $whyUsFeatures,
        'jobPositions'         => $jobPositions,
        'clientLogos'          => $clientLogos,
        'testimonials'         => $testimonials,
    ]);
} catch (PDOException $e) {
    error_log("[Content API Error] " . $e->getMessage());
    sendError('فشل جلب محتوى الموقع من قاعدة البيانات.', 500, $e->getMessage());
}
