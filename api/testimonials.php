<?php
/**
 * Testimonials CRUD Endpoint
 * POST   /api/testimonials.php
 * PUT    /api/testimonials.php?id=...
 * DELETE /api/testimonials.php?id=...
 */

declare(strict_types=1);

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth_middleware.php';

applyCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDbConnection();

if ($method === 'GET') {
    $stmt = $pdo->query('SELECT * FROM testimonials ORDER BY sort_order ASC');
    $testimonials = [];
    while ($row = $stmt->fetch()) {
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
    sendJson(['success' => true, 'testimonials' => $testimonials]);
}

requireAdmin();

if ($method === 'POST') {
    $input = getJsonInput();
    $id = !empty($input['id']) ? $input['id'] : 'tst-' . time() . '-' . rand(10, 99);

    try {
        $stmt = $pdo->prepare('
            INSERT INTO testimonials (
                id, name_ar, name_en, company_ar, company_en, role_ar, role_en,
                avatar, content_ar, content_en, rating, service_type, sort_order
            ) VALUES (
                :id, :name_ar, :name_en, :company_ar, :company_en, :role_ar, :role_en,
                :avatar, :content_ar, :content_en, :rating, :service_type, :sort_order
            )
        ');
        $stmt->execute([
            'id'           => $id,
            'name_ar'      => $input['nameAr'] ?? '',
            'name_en'      => $input['nameEn'] ?? '',
            'company_ar'   => $input['companyAr'] ?? '',
            'company_en'   => $input['companyEn'] ?? '',
            'role_ar'      => $input['roleAr'] ?? '',
            'role_en'      => $input['roleEn'] ?? '',
            'avatar'       => $input['avatar'] ?? '',
            'content_ar'   => $input['contentAr'] ?? '',
            'content_en'   => $input['contentEn'] ?? '',
            'rating'       => (int)($input['rating'] ?? 5),
            'service_type' => $input['serviceType'] ?? 'integrated',
            'sort_order'   => (int)($input['sortOrder'] ?? 0),
        ]);
        sendJson(['success' => true, 'id' => $id, 'message' => 'تمت إضافة رأي العميل بنجاح.']);
    } catch (PDOException $e) {
        sendError('فشل حفظ التقييم.', 500);
    }
}

if ($method === 'PUT') {
    $id = $_GET['id'] ?? null;
    if (!$id) sendError('معرف التقييم مطلوب.', 400);

    $input = getJsonInput();
    try {
        $stmt = $pdo->prepare('
            UPDATE testimonials SET
                name_ar = :name_ar,
                name_en = :name_en,
                company_ar = :company_ar,
                company_en = :company_en,
                role_ar = :role_ar,
                role_en = :role_en,
                avatar = :avatar,
                content_ar = :content_ar,
                content_en = :content_en,
                rating = :rating,
                service_type = :service_type
            WHERE id = :id
        ');
        $stmt->execute([
            'id'           => $id,
            'name_ar'      => $input['nameAr'] ?? '',
            'name_en'      => $input['nameEn'] ?? '',
            'company_ar'   => $input['companyAr'] ?? '',
            'company_en'   => $input['companyEn'] ?? '',
            'role_ar'      => $input['roleAr'] ?? '',
            'role_en'      => $input['roleEn'] ?? '',
            'avatar'       => $input['avatar'] ?? '',
            'content_ar'   => $input['contentAr'] ?? '',
            'content_en'   => $input['contentEn'] ?? '',
            'rating'       => (int)($input['rating'] ?? 5),
            'service_type' => $input['serviceType'] ?? 'integrated',
        ]);
        sendJson(['success' => true, 'message' => 'تم تحديث التقييم بنجاح.']);
    } catch (PDOException $e) {
        sendError('فشل تحديث التقييم.', 500);
    }
}

if ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) sendError('معرف التقييم مطلوب للحذف.', 400);

    try {
        $stmt = $pdo->prepare('DELETE FROM testimonials WHERE id = :id');
        $stmt->execute(['id' => $id]);
        sendJson(['success' => true, 'message' => 'تم حذف التقييم بنجاح.']);
    } catch (PDOException $e) {
        sendError('فشل حذف التقييم.', 500);
    }
}

sendError('طريقة غير مدعومة.', 405);
