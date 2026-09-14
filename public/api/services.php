<?php
/**
 * Services CRUD Endpoint (Admin Only for mutations)
 * POST   /api/services.php
 * PUT    /api/services.php?id=...
 * DELETE /api/services.php?id=...
 */

declare(strict_types=1);

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth_middleware.php';

applyCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDbConnection();

// GET
if ($method === 'GET') {
    $stmt = $pdo->query('SELECT * FROM services ORDER BY sort_order ASC, created_at DESC');
    $services = [];
    while ($row = $stmt->fetch()) {
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
    sendJson(['success' => true, 'services' => $services]);
}

// Mutations require admin
requireAdmin();

if ($method === 'POST') {
    $input = getJsonInput();
    $id = !empty($input['id']) ? $input['id'] : 'srv-' . time() . '-' . rand(10, 99);

    try {
        $stmt = $pdo->prepare('
            INSERT INTO services (
                id, title_ar, title_en, desc_ar, desc_en, detailed_desc_ar, detailed_desc_en,
                category, icon_name, features_ar, features_en, image, popular, created_at
            ) VALUES (
                :id, :title_ar, :title_en, :desc_ar, :desc_en, :detailed_desc_ar, :detailed_desc_en,
                :category, :icon_name, :features_ar, :features_en, :image, :popular, NOW()
            )
        ');
        $stmt->execute([
            'id'               => $id,
            'title_ar'         => $input['titleAr'] ?? '',
            'title_en'         => $input['titleEn'] ?? '',
            'desc_ar'          => $input['descAr'] ?? '',
            'desc_en'          => $input['descEn'] ?? '',
            'detailed_desc_ar' => $input['detailedDescAr'] ?? '',
            'detailed_desc_en' => $input['detailedDescEn'] ?? '',
            'category'         => $input['category'] ?? 'integrated',
            'icon_name'        => $input['iconName'] ?? 'Shield',
            'features_ar'      => json_encode($input['featuresAr'] ?? [], JSON_UNESCAPED_UNICODE),
            'features_en'      => json_encode($input['featuresEn'] ?? [], JSON_UNESCAPED_UNICODE),
            'image'            => $input['image'] ?? '',
            'popular'          => !empty($input['popular']) ? 1 : 0,
        ]);

        sendJson(['success' => true, 'id' => $id, 'message' => 'تمت إضافة الخدمة بنجاح.']);
    } catch (PDOException $e) {
        error_log("[Add Service Error] " . $e->getMessage());
        sendError('فشل حفظ الخدمة.', 500);
    }
}

if ($method === 'PUT') {
    $id = $_GET['id'] ?? null;
    if (!$id) sendError('معرف الخدمة مطلوب.', 400);

    $input = getJsonInput();

    try {
        $stmt = $pdo->prepare('
            UPDATE services SET
                title_ar = :title_ar,
                title_en = :title_en,
                desc_ar = :desc_ar,
                desc_en = :desc_en,
                detailed_desc_ar = :detailed_desc_ar,
                detailed_desc_en = :detailed_desc_en,
                category = :category,
                icon_name = :icon_name,
                features_ar = :features_ar,
                features_en = :features_en,
                image = :image,
                popular = :popular
            WHERE id = :id
        ');
        $stmt->execute([
            'id'               => $id,
            'title_ar'         => $input['titleAr'] ?? '',
            'title_en'         => $input['titleEn'] ?? '',
            'desc_ar'          => $input['descAr'] ?? '',
            'desc_en'          => $input['descEn'] ?? '',
            'detailed_desc_ar' => $input['detailedDescAr'] ?? '',
            'detailed_desc_en' => $input['detailedDescEn'] ?? '',
            'category'         => $input['category'] ?? 'integrated',
            'icon_name'        => $input['iconName'] ?? 'Shield',
            'features_ar'      => json_encode($input['featuresAr'] ?? [], JSON_UNESCAPED_UNICODE),
            'features_en'      => json_encode($input['featuresEn'] ?? [], JSON_UNESCAPED_UNICODE),
            'image'            => $input['image'] ?? '',
            'popular'          => !empty($input['popular']) ? 1 : 0,
        ]);

        sendJson(['success' => true, 'message' => 'تم تحديث الخدمة بنجاح.']);
    } catch (PDOException $e) {
        error_log("[Update Service Error] " . $e->getMessage());
        sendError('فشل تحديث الخدمة.', 500);
    }
}

if ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) sendError('معرف الخدمة مطلوب للحذف.', 400);

    try {
        $stmt = $pdo->prepare('DELETE FROM services WHERE id = :id');
        $stmt->execute(['id' => $id]);
        sendJson(['success' => true, 'message' => 'تم حذف الخدمة بنجاح.']);
    } catch (PDOException $e) {
        error_log("[Delete Service Error] " . $e->getMessage());
        sendError('فشل حذف الخدمة.', 500);
    }
}

sendError('طريقة غير مدعومة.', 405);
