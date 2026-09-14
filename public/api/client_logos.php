<?php
/**
 * Client Logos CRUD Endpoint
 * POST   /api/client_logos.php
 * PUT    /api/client_logos.php?id=...
 * DELETE /api/client_logos.php?id=...
 */

declare(strict_types=1);

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth_middleware.php';

applyCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDbConnection();

if ($method === 'GET') {
    $stmt = $pdo->query('SELECT * FROM client_logos ORDER BY sort_order ASC');
    $logos = [];
    while ($row = $stmt->fetch()) {
        $logos[] = [
            'id'       => $row['id'],
            'name'     => $row['name'],
            'logoUrl'  => $row['logo_url'],
            'category' => $row['category'],
        ];
    }
    sendJson(['success' => true, 'clientLogos' => $logos]);
}

requireAdmin();

if ($method === 'POST') {
    $input = getJsonInput();
    $id = !empty($input['id']) ? $input['id'] : 'logo-' . time() . '-' . rand(10, 99);

    try {
        $stmt = $pdo->prepare('
            INSERT INTO client_logos (id, name, logo_url, category, sort_order)
            VALUES (:id, :name, :logo_url, :category, :sort_order)
        ');
        $stmt->execute([
            'id'         => $id,
            'name'       => $input['name'] ?? '',
            'logo_url'   => $input['logoUrl'] ?? '',
            'category'   => $input['category'] ?? 'finance',
            'sort_order' => (int)($input['sortOrder'] ?? 0),
        ]);
        sendJson(['success' => true, 'id' => $id, 'message' => 'تمت إضافة الشعار بنجاح.']);
    } catch (PDOException $e) {
        sendError('فشل حفظ الشعار.', 500);
    }
}

if ($method === 'PUT') {
    $id = $_GET['id'] ?? null;
    if (!$id) sendError('معرف الشعار مطلوب.', 400);

    $input = getJsonInput();
    try {
        $stmt = $pdo->prepare('
            UPDATE client_logos SET
                name = :name,
                logo_url = :logo_url,
                category = :category
            WHERE id = :id
        ');
        $stmt->execute([
            'id'       => $id,
            'name'     => $input['name'] ?? '',
            'logo_url' => $input['logoUrl'] ?? '',
            'category' => $input['category'] ?? 'finance',
        ]);
        sendJson(['success' => true, 'message' => 'تم تحديث بيانات الشعار بنجاح.']);
    } catch (PDOException $e) {
        sendError('فشل تحديث الشعار.', 500);
    }
}

if ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) sendError('معرف الشعار مطلوب للحذف.', 400);

    try {
        $stmt = $pdo->prepare('DELETE FROM client_logos WHERE id = :id');
        $stmt->execute(['id' => $id]);
        sendJson(['success' => true, 'message' => 'تم حذف الشعار بنجاح.']);
    } catch (PDOException $e) {
        sendError('فشل حذف الشعار.', 500);
    }
}

sendError('طريقة غير مدعومة.', 405);
