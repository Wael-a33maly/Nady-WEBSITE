<?php
/**
 * Site Settings Endpoint
 * GET /api/settings.php
 * PUT /api/settings.php (Admin only)
 */

declare(strict_types=1);

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth_middleware.php';

applyCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDbConnection();

if ($method === 'GET') {
    $stmt = $pdo->query('SELECT * FROM settings WHERE id = 1 LIMIT 1');
    $row = $stmt->fetch() ?: [];
    sendJson(['success' => true, 'settings' => $row]);
}

if ($method === 'PUT' || $method === 'POST') {
    requireAdmin();
    $input = getJsonInput();

    // Prepare fields mapping from frontend camelCase to DB snake_case
    $fields = [
        'company_name_ar'        => $input['companyNameAr'] ?? null,
        'company_name_en'        => $input['companyNameEn'] ?? null,
        'phone'                  => $input['phone'] ?? null,
        'phone_secondary'        => $input['phoneSecondary'] ?? null,
        'email'                  => $input['email'] ?? null,
        'email_secondary'        => $input['emailSecondary'] ?? null,
        'address_ar'             => $input['addressAr'] ?? null,
        'address_en'             => $input['addressEn'] ?? null,
        'working_hours_ar'       => $input['workingHoursAr'] ?? null,
        'working_hours_en'       => $input['workingHoursEn'] ?? null,
        'logo_url'               => $input['logoUrl'] ?? null,
        'logo_text_ar'           => $input['logoTextAr'] ?? null,
        'logo_text_en'           => $input['logoTextEn'] ?? null,
        'slogan_ar'              => $input['sloganAr'] ?? null,
        'slogan_en'              => $input['sloganEn'] ?? null,
        'theme_preset'           => $input['themePreset'] ?? null,
        'primary_color_hex'      => $input['primaryColorHex'] ?? null,
        'secondary_color_hex'    => $input['secondaryColorHex'] ?? null,
        'dark_text_color'        => $input['darkTextColor'] ?? null,
        'dark_muted_text_color'  => $input['darkMutedTextColor'] ?? null,
        'light_text_color'       => $input['lightTextColor'] ?? null,
        'light_muted_text_color' => $input['lightMutedTextColor'] ?? null,
        'hero_bg_dark'           => $input['heroBgDark'] ?? null,
        'about_bg_dark'          => $input['aboutBgDark'] ?? null,
        'services_bg_dark'       => $input['servicesBgDark'] ?? null,
        'subsidiaries_bg_dark'   => $input['subsidiariesBgDark'] ?? null,
        'projects_bg_dark'       => $input['projectsBgDark'] ?? null,
        'why_us_bg_dark'         => $input['whyUsBgDark'] ?? null,
        'testimonials_bg_dark'   => $input['testimonialsBgDark'] ?? null,
        'quote_bg_dark'          => $input['quoteBgDark'] ?? null,
        'footer_bg_dark'         => $input['footerBgDark'] ?? null,
        'hero_bg_light'          => $input['heroBgLight'] ?? null,
        'about_bg_light'         => $input['aboutBgLight'] ?? null,
        'services_bg_light'      => $input['servicesBgLight'] ?? null,
        'subsidiaries_bg_light'  => $input['subsidiariesBgLight'] ?? null,
        'projects_bg_light'      => $input['projectsBgLight'] ?? null,
        'why_us_bg_light'        => $input['whyUsBgLight'] ?? null,
        'testimonials_bg_light'  => $input['testimonialsBgLight'] ?? null,
        'quote_bg_light'         => $input['quoteBgLight'] ?? null,
        'footer_bg_light'        => $input['footerBgLight'] ?? null,
        'card_bg_dark'           => $input['cardBgDark'] ?? null,
        'card_bg_light'          => $input['cardBgLight'] ?? null,
        'card_border_dark'       => $input['cardBorderDark'] ?? null,
        'card_border_light'      => $input['cardBorderLight'] ?? null,
        'card_radius_px'         => isset($input['cardRadiusPx']) ? (int)$input['cardRadiusPx'] : null,
        'hero_badge_ar'          => $input['heroBadgeAr'] ?? null,
        'hero_badge_en'          => $input['heroBadgeEn'] ?? null,
        'hero_title_ar'          => $input['heroTitleAr'] ?? null,
        'hero_title_en'          => $input['heroTitleEn'] ?? null,
        'hero_subtitle_ar'       => $input['heroSubtitleAr'] ?? null,
        'hero_subtitle_en'       => $input['heroSubtitleEn'] ?? null,
        'about_title_ar'         => $input['aboutTitleAr'] ?? null,
        'about_title_en'         => $input['aboutTitleEn'] ?? null,
        'about_desc_ar'          => $input['aboutDescAr'] ?? null,
        'about_desc_en'          => $input['aboutDescEn'] ?? null,
        'about_vision_ar'        => $input['aboutVisionAr'] ?? null,
        'about_vision_en'        => $input['aboutVisionEn'] ?? null,
        'years_experience'       => isset($input['yearsExperience']) ? (int)$input['yearsExperience'] : null,
        'happy_clients'          => isset($input['happyClients']) ? (int)$input['happyClients'] : null,
        'completed_projects'     => isset($input['completedProjects']) ? (int)$input['completedProjects'] : null,
        'security_guards_count'  => isset($input['securityGuardsCount']) ? (int)$input['securityGuardsCount'] : null,
        'facebook_url'           => $input['facebookUrl'] ?? null,
        'twitter_url'            => $input['twitterUrl'] ?? null,
        'linkedin_url'           => $input['linkedinUrl'] ?? null,
        'instagram_url'          => $input['instagramUrl'] ?? null,
        'whatsapp_number'        => $input['whatsappNumber'] ?? null,
    ];

    if (isset($input['heroSlides']) && is_array($input['heroSlides'])) {
        $fields['hero_slides'] = json_encode($input['heroSlides'], JSON_UNESCAPED_UNICODE);
    }

    // Build dynamic UPDATE statement only for provided non-null keys
    $setParts = [];
    $params = [];
    foreach ($fields as $col => $val) {
        if ($val !== null) {
            $setParts[] = "{$col} = :{$col}";
            $params[$col] = $val;
        }
    }

    if (empty($setParts)) {
        sendJson(['success' => true, 'message' => 'لم يتم إرسال أي تعديلات.']);
    }

    try {
        $sql = 'UPDATE settings SET ' . implode(', ', $setParts) . ' WHERE id = 1';
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        sendJson(['success' => true, 'message' => 'تم حفظ إعدادات الموقع بنجاح.']);
    } catch (PDOException $e) {
        error_log("[Update Settings Error] " . $e->getMessage());
        sendError('فشل حفظ إعدادات الموقع.', 500);
    }
}

sendError('طريقة الطلب غير مدعومة.', 405);
