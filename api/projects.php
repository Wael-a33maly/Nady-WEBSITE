<?php
/**
 * Projects CRUD Endpoint
 * POST   /api/projects.php
 * PUT    /api/projects.php?id=...
 * DELETE /api/projects.php?id=...
 */

declare(strict_types=1);

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth_middleware.php';

applyCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDbConnection();

if ($method === 'GET') {
    $stmt = $pdo->query('SELECT * FROM projects ORDER BY sort_order ASC, created_at DESC');
    $projects = [];
    while ($row = $stmt->fetch()) {
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
    sendJson(['success' => true, 'projects' => $projects]);
}

requireAdmin();

if ($method === 'POST') {
    $input = getJsonInput();
    $id = !empty($input['id']) ? $input['id'] : 'proj-' . time() . '-' . rand(10, 99);

    try {
        $stmt = $pdo->prepare('
            INSERT INTO projects (
                id, title_ar, title_en, category, client_ar, client_en,
                location_ar, location_en, date, image, description_ar, description_en,
                stats_ar, stats_en, badge_ar, badge_en, subsidiary_id, created_at
            ) VALUES (
                :id, :title_ar, :title_en, :category, :client_ar, :client_en,
                :location_ar, :location_en, :date, :image, :description_ar, :description_en,
                :stats_ar, :stats_en, :badge_ar, :badge_en, :subsidiary_id, NOW()
            )
        ');
        $stmt->execute([
            'id'             => $id,
            'title_ar'       => $input['titleAr'] ?? '',
            'title_en'       => $input['titleEn'] ?? '',
            'category'       => $input['category'] ?? 'integrated',
            'client_ar'      => $input['clientAr'] ?? '',
            'client_en'      => $input['clientEn'] ?? '',
            'location_ar'    => $input['locationAr'] ?? '',
            'location_en'    => $input['locationEn'] ?? '',
            'date'           => $input['date'] ?? '',
            'image'          => $input['image'] ?? '',
            'description_ar' => $input['descriptionAr'] ?? '',
            'description_en' => $input['descriptionEn'] ?? '',
            'stats_ar'       => $input['statsAr'] ?? '',
            'stats_en'       => $input['statsEn'] ?? '',
            'badge_ar'       => $input['badgeAr'] ?? '',
            'badge_en'       => $input['badgeEn'] ?? '',
            'subsidiary_id'  => $input['subsidiaryId'] ?? null,
        ]);

        sendJson(['success' => true, 'id' => $id, 'message' => 'تمت إضافة المشروع بنجاح.']);
    } catch (PDOException $e) {
        error_log("[Add Project Error] " . $e->getMessage());
        sendError('فشل حفظ المشروع.', 500);
    }
}

if ($method === 'PUT') {
    $id = $_GET['id'] ?? null;
    if (!$id) sendError('معرف المشروع مطلوب.', 400);

    $input = getJsonInput();

    try {
        $stmt = $pdo->prepare('
            UPDATE projects SET
                title_ar = :title_ar,
                title_en = :title_en,
                category = :category,
                client_ar = :client_ar,
                client_en = :client_en,
                location_ar = :location_ar,
                location_en = :location_en,
                date = :date,
                image = :image,
                description_ar = :description_ar,
                description_en = :description_en,
                stats_ar = :stats_ar,
                stats_en = :stats_en,
                badge_ar = :badge_ar,
                badge_en = :badge_en,
                subsidiary_id = :subsidiary_id
            WHERE id = :id
        ');
        $stmt->execute([
            'id'             => $id,
            'title_ar'       => $input['titleAr'] ?? '',
            'title_en'       => $input['titleEn'] ?? '',
            'category'       => $input['category'] ?? 'integrated',
            'client_ar'      => $input['clientAr'] ?? '',
            'client_en'      => $input['clientEn'] ?? '',
            'location_ar'    => $input['locationAr'] ?? '',
            'location_en'    => $input['locationEn'] ?? '',
            'date'           => $input['date'] ?? '',
            'image'          => $input['image'] ?? '',
            'description_ar' => $input['descriptionAr'] ?? '',
            'description_en' => $input['descriptionEn'] ?? '',
            'stats_ar'       => $input['statsAr'] ?? '',
            'stats_en'       => $input['statsEn'] ?? '',
            'badge_ar'       => $input['badgeAr'] ?? '',
            'badge_en'       => $input['badgeEn'] ?? '',
            'subsidiary_id'  => $input['subsidiaryId'] ?? null,
        ]);

        sendJson(['success' => true, 'message' => 'تم تحديث المشروع بنجاح.']);
    } catch (PDOException $e) {
        error_log("[Update Project Error] " . $e->getMessage());
        sendError('فشل تحديث المشروع.', 500);
    }
}

if ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) sendError('معرف المشروع مطلوب للحذف.', 400);

    try {
        $stmt = $pdo->prepare('DELETE FROM projects WHERE id = :id');
        $stmt->execute(['id' => $id]);
        sendJson(['success' => true, 'message' => 'تم حذف المشروع بنجاح.']);
    } catch (PDOException $e) {
        error_log("[Delete Project Error] " . $e->getMessage());
        sendError('فشل حذف المشروع.', 500);
    }
}

sendError('طريقة غير مدعومة.', 405);
