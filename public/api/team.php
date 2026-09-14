<?php
/**
 * Team Members CRUD Endpoint
 * POST   /api/team.php
 * PUT    /api/team.php?id=...
 * DELETE /api/team.php?id=...
 */

declare(strict_types=1);

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth_middleware.php';

applyCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDbConnection();

if ($method === 'GET') {
    $stmt = $pdo->query('SELECT * FROM team ORDER BY sort_order ASC, created_at DESC');
    $team = [];
    while ($row = $stmt->fetch()) {
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
    sendJson(['success' => true, 'team' => $team]);
}

requireAdmin();

if ($method === 'POST') {
    $input = getJsonInput();
    $id = !empty($input['id']) ? $input['id'] : 'tm-' . time() . '-' . rand(10, 99);

    try {
        $stmt = $pdo->prepare('
            INSERT INTO team (
                id, name_ar, name_en, role_ar, role_en, image, bio_ar, bio_en,
                phone, email, linkedin, twitter, created_at
            ) VALUES (
                :id, :name_ar, :name_en, :role_ar, :role_en, :image, :bio_ar, :bio_en,
                :phone, :email, :linkedin, :twitter, NOW()
            )
        ');
        $stmt->execute([
            'id'       => $id,
            'name_ar'  => $input['nameAr'] ?? '',
            'name_en'  => $input['nameEn'] ?? '',
            'role_ar'  => $input['roleAr'] ?? '',
            'role_en'  => $input['roleEn'] ?? '',
            'image'    => $input['image'] ?? '',
            'bio_ar'   => $input['bioAr'] ?? '',
            'bio_en'   => $input['bioEn'] ?? '',
            'phone'    => $input['phone'] ?? null,
            'email'    => $input['email'] ?? null,
            'linkedin' => $input['linkedin'] ?? null,
            'twitter'  => $input['twitter'] ?? null,
        ]);

        sendJson(['success' => true, 'id' => $id, 'message' => 'تمت إضافة عضو الفريق بنجاح.']);
    } catch (PDOException $e) {
        error_log("[Add Team Error] " . $e->getMessage());
        sendError('فشل حفظ عضو الفريق.', 500);
    }
}

if ($method === 'PUT') {
    $id = $_GET['id'] ?? null;
    if (!$id) sendError('معرف عضو الفريق مطلوب.', 400);

    $input = getJsonInput();

    try {
        $stmt = $pdo->prepare('
            UPDATE team SET
                name_ar = :name_ar,
                name_en = :name_en,
                role_ar = :role_ar,
                role_en = :role_en,
                image = :image,
                bio_ar = :bio_ar,
                bio_en = :bio_en,
                phone = :phone,
                email = :email,
                linkedin = :linkedin,
                twitter = :twitter
            WHERE id = :id
        ');
        $stmt->execute([
            'id'       => $id,
            'name_ar'  => $input['nameAr'] ?? '',
            'name_en'  => $input['nameEn'] ?? '',
            'role_ar'  => $input['roleAr'] ?? '',
            'role_en'  => $input['roleEn'] ?? '',
            'image'    => $input['image'] ?? '',
            'bio_ar'   => $input['bioAr'] ?? '',
            'bio_en'   => $input['bioEn'] ?? '',
            'phone'    => $input['phone'] ?? null,
            'email'    => $input['email'] ?? null,
            'linkedin' => $input['linkedin'] ?? null,
            'twitter'  => $input['twitter'] ?? null,
        ]);

        sendJson(['success' => true, 'message' => 'تم تحديث بيانات عضو الفريق.']);
    } catch (PDOException $e) {
        error_log("[Update Team Error] " . $e->getMessage());
        sendError('فشل تحديث عضو الفريق.', 500);
    }
}

if ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) sendError('معرف عضو الفريق مطلوب للحذف.', 400);

    try {
        $stmt = $pdo->prepare('DELETE FROM team WHERE id = :id');
        $stmt->execute(['id' => $id]);
        sendJson(['success' => true, 'message' => 'تم حذف عضو الفريق بنجاح.']);
    } catch (PDOException $e) {
        error_log("[Delete Team Error] " . $e->getMessage());
        sendError('فشل حذف عضو الفريق.', 500);
    }
}

sendError('طريقة غير مدعومة.', 405);
