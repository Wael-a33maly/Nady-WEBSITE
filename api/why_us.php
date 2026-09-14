<?php
/**
 * Why Us Features CRUD Endpoint
 * POST   /api/why_us.php
 * PUT    /api/why_us.php?id=...
 * DELETE /api/why_us.php?id=...
 */

declare(strict_types=1);

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth_middleware.php';

applyCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDbConnection();

if ($method === 'GET') {
    $stmt = $pdo->query('SELECT * FROM why_us_features ORDER BY sort_order ASC');
    $features = [];
    while ($row = $stmt->fetch()) {
        $features[] = [
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
    sendJson(['success' => true, 'whyUsFeatures' => $features]);
}

requireAdmin();

if ($method === 'POST') {
    $input = getJsonInput();
    $id = !empty($input['id']) ? $input['id'] : 'why-' . time() . '-' . rand(10, 99);

    try {
        $stmt = $pdo->prepare('
            INSERT INTO why_us_features (id, icon_name, title_ar, title_en, desc_ar, desc_en, badge_ar, badge_en, sort_order)
            VALUES (:id, :icon_name, :title_ar, :title_en, :desc_ar, :desc_en, :badge_ar, :badge_en, :sort_order)
        ');
        $stmt->execute([
            'id'         => $id,
            'icon_name'  => $input['iconName'] ?? 'Shield',
            'title_ar'   => $input['titleAr'] ?? '',
            'title_en'   => $input['titleEn'] ?? '',
            'desc_ar'    => $input['descAr'] ?? '',
            'desc_en'    => $input['descEn'] ?? '',
            'badge_ar'   => $input['badgeAr'] ?? '',
            'badge_en'   => $input['badgeEn'] ?? '',
            'sort_order' => (int)($input['sortOrder'] ?? 0),
        ]);
        sendJson(['success' => true, 'id' => $id, 'message' => 'تمت إضافة ميزة لماذا نحن بنجاح.']);
    } catch (PDOException $e) {
        sendError('فشل حفظ الميزة.', 500);
    }
}

if ($method === 'PUT') {
    $id = $_GET['id'] ?? null;
    if (!$id) sendError('معرف الميزة مطلوب.', 400);

    $input = getJsonInput();
    try {
        $stmt = $pdo->prepare('
            UPDATE why_us_features SET
                icon_name = :icon_name,
                title_ar = :title_ar,
                title_en = :title_en,
                desc_ar = :desc_ar,
                desc_en = :desc_en,
                badge_ar = :badge_ar,
                badge_en = :badge_en
            WHERE id = :id
        ');
        $stmt->execute([
            'id'        => $id,
            'icon_name' => $input['iconName'] ?? 'Shield',
            'title_ar'  => $input['titleAr'] ?? '',
            'title_en'  => $input['titleEn'] ?? '',
            'desc_ar'   => $input['descAr'] ?? '',
            'desc_en'   => $input['descEn'] ?? '',
            'badge_ar'  => $input['badgeAr'] ?? '',
            'badge_en'  => $input['badgeEn'] ?? '',
        ]);
        sendJson(['success' => true, 'message' => 'تم تحديث الميزة بنجاح.']);
    } catch (PDOException $e) {
        sendError('فشل تحديث الميزة.', 500);
    }
}

if ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) sendError('معرف الميزة مطلوب للحذف.', 400);

    try {
        $stmt = $pdo->prepare('DELETE FROM why_us_features WHERE id = :id');
        $stmt->execute(['id' => $id]);
        sendJson(['success' => true, 'message' => 'تم حذف الميزة بنجاح.']);
    } catch (PDOException $e) {
        sendError('فشل حذف الميزة.', 500);
    }
}

sendError('طريقة غير مدعومة.', 405);
