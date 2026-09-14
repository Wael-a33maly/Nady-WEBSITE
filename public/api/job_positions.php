<?php
/**
 * Job Positions CRUD Endpoint
 * POST   /api/job_positions.php
 * PUT    /api/job_positions.php?id=...
 * DELETE /api/job_positions.php?id=...
 */

declare(strict_types=1);

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth_middleware.php';

applyCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDbConnection();

if ($method === 'GET') {
    $stmt = $pdo->query('SELECT * FROM job_positions ORDER BY posted_date DESC, created_at DESC');
    $jobs = [];
    while ($row = $stmt->fetch()) {
        $jobs[] = [
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
    sendJson(['success' => true, 'jobPositions' => $jobs]);
}

requireAdmin();

if ($method === 'POST') {
    $input = getJsonInput();
    $id = !empty($input['id']) ? $input['id'] : 'job-' . time() . '-' . rand(10, 99);

    try {
        $stmt = $pdo->prepare('
            INSERT INTO job_positions (
                id, title_ar, title_en, department_ar, department_en,
                location_ar, location_en, type_ar, type_en,
                description_ar, description_en, requirements_ar, requirements_en,
                active, posted_date, created_at
            ) VALUES (
                :id, :title_ar, :title_en, :department_ar, :department_en,
                :location_ar, :location_en, :type_ar, :type_en,
                :description_ar, :description_en, :requirements_ar, :requirements_en,
                :active, :posted_date, NOW()
            )
        ');
        $stmt->execute([
            'id'              => $id,
            'title_ar'        => $input['titleAr'] ?? '',
            'title_en'        => $input['titleEn'] ?? '',
            'department_ar'   => $input['departmentAr'] ?? '',
            'department_en'   => $input['departmentEn'] ?? '',
            'location_ar'     => $input['locationAr'] ?? '',
            'location_en'     => $input['locationEn'] ?? '',
            'type_ar'         => $input['typeAr'] ?? '',
            'type_en'         => $input['typeEn'] ?? '',
            'description_ar'  => $input['descriptionAr'] ?? '',
            'description_en'  => $input['descriptionEn'] ?? '',
            'requirements_ar' => json_encode($input['requirementsAr'] ?? [], JSON_UNESCAPED_UNICODE),
            'requirements_en' => json_encode($input['requirementsEn'] ?? [], JSON_UNESCAPED_UNICODE),
            'active'          => !empty($input['active']) ? 1 : 0,
            'posted_date'     => $input['postedDate'] ?? date('Y-m-d'),
        ]);
        sendJson(['success' => true, 'id' => $id, 'message' => 'تمت إضافة الوظيفة بنجاح.']);
    } catch (PDOException $e) {
        sendError('فشل حفظ الوظيفة.', 500);
    }
}

if ($method === 'PUT') {
    $id = $_GET['id'] ?? null;
    if (!$id) sendError('معرف الوظيفة مطلوب.', 400);

    $input = getJsonInput();
    try {
        $stmt = $pdo->prepare('
            UPDATE job_positions SET
                title_ar = :title_ar,
                title_en = :title_en,
                department_ar = :department_ar,
                department_en = :department_en,
                location_ar = :location_ar,
                location_en = :location_en,
                type_ar = :type_ar,
                type_en = :type_en,
                description_ar = :description_ar,
                description_en = :description_en,
                requirements_ar = :requirements_ar,
                requirements_en = :requirements_en,
                active = :active,
                posted_date = :posted_date
            WHERE id = :id
        ');
        $stmt->execute([
            'id'              => $id,
            'title_ar'        => $input['titleAr'] ?? '',
            'title_en'        => $input['titleEn'] ?? '',
            'department_ar'   => $input['departmentAr'] ?? '',
            'department_en'   => $input['departmentEn'] ?? '',
            'location_ar'     => $input['locationAr'] ?? '',
            'location_en'     => $input['locationEn'] ?? '',
            'type_ar'         => $input['typeAr'] ?? '',
            'type_en'         => $input['typeEn'] ?? '',
            'description_ar'  => $input['descriptionAr'] ?? '',
            'description_en'  => $input['descriptionEn'] ?? '',
            'requirements_ar' => json_encode($input['requirementsAr'] ?? [], JSON_UNESCAPED_UNICODE),
            'requirements_en' => json_encode($input['requirementsEn'] ?? [], JSON_UNESCAPED_UNICODE),
            'active'          => !empty($input['active']) ? 1 : 0,
            'posted_date'     => $input['postedDate'] ?? date('Y-m-d'),
        ]);
        sendJson(['success' => true, 'message' => 'تم تحديث بيانات الوظيفة بنجاح.']);
    } catch (PDOException $e) {
        sendError('فشل تحديث الوظيفة.', 500);
    }
}

if ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) sendError('معرف الوظيفة مطلوب للحذف.', 400);

    try {
        $stmt = $pdo->prepare('DELETE FROM job_positions WHERE id = :id');
        $stmt->execute(['id' => $id]);
        sendJson(['success' => true, 'message' => 'تم حذف الوظيفة بنجاح.']);
    } catch (PDOException $e) {
        sendError('فشل حذف الوظيفة.', 500);
    }
}

sendError('طريقة غير مدعومة.', 405);
