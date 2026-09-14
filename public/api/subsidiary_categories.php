<?php
/**
 * Subsidiary Categories CRUD Endpoint
 * POST   /api/subsidiary_categories.php
 * PUT    /api/subsidiary_categories.php?id=...
 * DELETE /api/subsidiary_categories.php?id=...
 */

declare(strict_types=1);

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth_middleware.php';

applyCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDbConnection();

if ($method === 'GET') {
    $stmt = $pdo->query('SELECT * FROM subsidiary_categories ORDER BY sort_order ASC');
    $cats = [];
    while ($row = $stmt->fetch()) {
        $cats[] = [
            'id'     => $row['id'],
            'nameAr' => $row['name_ar'],
            'nameEn' => $row['name_en'],
        ];
    }
    sendJson(['success' => true, 'subsidiaryCategories' => $cats]);
}

requireAdmin();

if ($method === 'POST') {
    $input = getJsonInput();
    $id = !empty($input['id']) ? $input['id'] : 'cat-' . time() . '-' . rand(10, 99);

    try {
        $stmt = $pdo->prepare('
            INSERT INTO subsidiary_categories (id, name_ar, name_en, sort_order)
            VALUES (:id, :name_ar, :name_en, :sort_order)
        ');
        $stmt->execute([
            'id'         => $id,
            'name_ar'    => $input['nameAr'] ?? '',
            'name_en'    => $input['nameEn'] ?? '',
            'sort_order' => (int)($input['sortOrder'] ?? 0),
        ]);
        sendJson(['success' => true, 'id' => $id, 'message' => 'تمت إضافة التصنيف بنجاح.']);
    } catch (PDOException $e) {
        sendError('فشل حفظ التصنيف.', 500);
    }
}

if ($method === 'PUT') {
    $id = $_GET['id'] ?? null;
    if (!$id) sendError('معرف التصنيف مطلوب.', 400);

    $input = getJsonInput();
    try {
        $stmt = $pdo->prepare('
            UPDATE subsidiary_categories SET
                name_ar = :name_ar,
                name_en = :name_en
            WHERE id = :id
        ');
        $stmt->execute([
            'id'      => $id,
            'name_ar' => $input['nameAr'] ?? '',
            'name_en' => $input['nameEn'] ?? '',
        ]);
        sendJson(['success' => true, 'message' => 'تم تحديث التصنيف بنجاح.']);
    } catch (PDOException $e) {
        sendError('فشل تحديث التصنيف.', 500);
    }
}

if ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) sendError('معرف التصنيف مطلوب للحذف.', 400);

    try {
        $stmt = $pdo->prepare('DELETE FROM subsidiary_categories WHERE id = :id');
        $stmt->execute(['id' => $id]);
        sendJson(['success' => true, 'message' => 'تم حذف التصنيف بنجاح.']);
    } catch (PDOException $e) {
        sendError('فشل حذف التصنيف.', 500);
    }
}

sendError('طريقة غير مدعومة.', 405);
