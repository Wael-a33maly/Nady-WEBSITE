<?php
/**
 * Subsidiaries CRUD Endpoint
 * POST   /api/subsidiaries.php
 * PUT    /api/subsidiaries.php?id=...
 * DELETE /api/subsidiaries.php?id=...
 */

declare(strict_types=1);

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth_middleware.php';

applyCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDbConnection();

if ($method === 'GET') {
    $stmt = $pdo->query('SELECT * FROM subsidiaries ORDER BY sort_order ASC, created_at DESC');
    $subs = [];
    while ($row = $stmt->fetch()) {
        $subs[] = [
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
    sendJson(['success' => true, 'subsidiaries' => $subs]);
}

requireAdmin();

if ($method === 'POST') {
    $input = getJsonInput();
    $id = !empty($input['id']) ? $input['id'] : 'sub-' . time() . '-' . rand(10, 99);

    try {
        $stmt = $pdo->prepare('
            INSERT INTO subsidiaries (
                id, name_ar, name_en, tagline_ar, tagline_en, logo_url, hero_image,
                icon_name, category, description_ar, description_en, detailed_mission_ar, detailed_mission_en,
                services_ar, services_en, certifications_ar, certifications_en, gallery_images,
                clients_count, projects_count, established_year, email, phone, website_url, badge_ar, badge_en, created_at
            ) VALUES (
                :id, :name_ar, :name_en, :tagline_ar, :tagline_en, :logo_url, :hero_image,
                :icon_name, :category, :description_ar, :description_en, :detailed_mission_ar, :detailed_mission_en,
                :services_ar, :services_en, :certifications_ar, :certifications_en, :gallery_images,
                :clients_count, :projects_count, :established_year, :email, :phone, :website_url, :badge_ar, :badge_en, NOW()
            )
        ');
        $stmt->execute([
            'id'                  => $id,
            'name_ar'             => $input['nameAr'] ?? '',
            'name_en'             => $input['nameEn'] ?? '',
            'tagline_ar'          => $input['taglineAr'] ?? '',
            'tagline_en'          => $input['taglineEn'] ?? '',
            'logo_url'            => $input['logoUrl'] ?? '',
            'hero_image'          => $input['heroImage'] ?? null,
            'icon_name'           => $input['iconName'] ?? 'Building',
            'category'            => $input['category'] ?? 'security',
            'description_ar'      => $input['descriptionAr'] ?? '',
            'description_en'      => $input['descriptionEn'] ?? '',
            'detailed_mission_ar' => $input['detailedMissionAr'] ?? null,
            'detailed_mission_en' => $input['detailedMissionEn'] ?? null,
            'services_ar'         => json_encode($input['servicesAr'] ?? [], JSON_UNESCAPED_UNICODE),
            'services_en'         => json_encode($input['servicesEn'] ?? [], JSON_UNESCAPED_UNICODE),
            'certifications_ar'   => json_encode($input['certificationsAr'] ?? [], JSON_UNESCAPED_UNICODE),
            'certifications_en'   => json_encode($input['certificationsEn'] ?? [], JSON_UNESCAPED_UNICODE),
            'gallery_images'      => json_encode($input['galleryImages'] ?? [], JSON_UNESCAPED_UNICODE),
            'clients_count'       => (int)($input['clientsCount'] ?? 0),
            'projects_count'      => (int)($input['projectsCount'] ?? 0),
            'established_year'    => (string)($input['establishedYear'] ?? '2015'),
            'email'               => $input['email'] ?? null,
            'phone'               => $input['phone'] ?? null,
            'website_url'         => $input['websiteUrl'] ?? null,
            'badge_ar'            => $input['badgeAr'] ?? null,
            'badge_en'            => $input['badgeEn'] ?? null,
        ]);

        sendJson(['success' => true, 'id' => $id, 'message' => 'تمت إضافة الشركة التابعة بنجاح.']);
    } catch (PDOException $e) {
        error_log("[Add Subsidiary Error] " . $e->getMessage());
        sendError('فشل حفظ الشركة التابعة.', 500);
    }
}

if ($method === 'PUT') {
    $id = $_GET['id'] ?? null;
    if (!$id) sendError('معرف الشركة مطلوب.', 400);

    $input = getJsonInput();

    try {
        $stmt = $pdo->prepare('
            UPDATE subsidiaries SET
                name_ar = :name_ar,
                name_en = :name_en,
                tagline_ar = :tagline_ar,
                tagline_en = :tagline_en,
                logo_url = :logo_url,
                hero_image = :hero_image,
                icon_name = :icon_name,
                category = :category,
                description_ar = :description_ar,
                description_en = :description_en,
                detailed_mission_ar = :detailed_mission_ar,
                detailed_mission_en = :detailed_mission_en,
                services_ar = :services_ar,
                services_en = :services_en,
                certifications_ar = :certifications_ar,
                certifications_en = :certifications_en,
                gallery_images = :gallery_images,
                clients_count = :clients_count,
                projects_count = :projects_count,
                established_year = :established_year,
                email = :email,
                phone = :phone,
                website_url = :website_url,
                badge_ar = :badge_ar,
                badge_en = :badge_en
            WHERE id = :id
        ');
        $stmt->execute([
            'id'                  => $id,
            'name_ar'             => $input['nameAr'] ?? '',
            'name_en'             => $input['nameEn'] ?? '',
            'tagline_ar'          => $input['taglineAr'] ?? '',
            'tagline_en'          => $input['taglineEn'] ?? '',
            'logo_url'            => $input['logoUrl'] ?? '',
            'hero_image'          => $input['heroImage'] ?? null,
            'icon_name'           => $input['iconName'] ?? 'Building',
            'category'            => $input['category'] ?? 'security',
            'description_ar'      => $input['descriptionAr'] ?? '',
            'description_en'      => $input['descriptionEn'] ?? '',
            'detailed_mission_ar' => $input['detailedMissionAr'] ?? null,
            'detailed_mission_en' => $input['detailedMissionEn'] ?? null,
            'services_ar'         => json_encode($input['servicesAr'] ?? [], JSON_UNESCAPED_UNICODE),
            'services_en'         => json_encode($input['servicesEn'] ?? [], JSON_UNESCAPED_UNICODE),
            'certifications_ar'   => json_encode($input['certificationsAr'] ?? [], JSON_UNESCAPED_UNICODE),
            'certifications_en'   => json_encode($input['certificationsEn'] ?? [], JSON_UNESCAPED_UNICODE),
            'gallery_images'      => json_encode($input['galleryImages'] ?? [], JSON_UNESCAPED_UNICODE),
            'clients_count'       => (int)($input['clientsCount'] ?? 0),
            'projects_count'      => (int)($input['projectsCount'] ?? 0),
            'established_year'    => (string)($input['establishedYear'] ?? '2015'),
            'email'               => $input['email'] ?? null,
            'phone'               => $input['phone'] ?? null,
            'website_url'         => $input['websiteUrl'] ?? null,
            'badge_ar'            => $input['badgeAr'] ?? null,
            'badge_en'            => $input['badgeEn'] ?? null,
        ]);

        sendJson(['success' => true, 'message' => 'تم تحديث الشركة التابعة بنجاح.']);
    } catch (PDOException $e) {
        error_log("[Update Subsidiary Error] " . $e->getMessage());
        sendError('فشل تحديث الشركة التابعة.', 500);
    }
}

if ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) sendError('معرف الشركة مطلوب للحذف.', 400);

    try {
        $stmt = $pdo->prepare('DELETE FROM subsidiaries WHERE id = :id');
        $stmt->execute(['id' => $id]);
        sendJson(['success' => true, 'message' => 'تم حذف الشركة التابعة بنجاح.']);
    } catch (PDOException $e) {
        error_log("[Delete Subsidiary Error] " . $e->getMessage());
        sendError('فشل حذف الشركة التابعة.', 500);
    }
}

sendError('طريقة غير مدعومة.', 405);
