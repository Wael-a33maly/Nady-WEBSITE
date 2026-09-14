<?php
/**
 * Job Applications Endpoint
 * POST   /api/job_applications.php (Public submission with strict validation & rate limiting)
 * GET    /api/job_applications.php (Admin only: fetch all)
 * PUT    /api/job_applications.php?id=... (Admin only: update status)
 * DELETE /api/job_applications.php?id=... (Admin only: delete)
 */

declare(strict_types=1);

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth_middleware.php';

applyCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDbConnection();

// PUBLIC: Submit Job Application
if ($method === 'POST') {
    // Strict rate limit: 5 submissions per 10 minutes (600 seconds)
    checkRateLimit('submit_job_application', 5, 600);

    $input = getJsonInput();

    $applicantName   = mb_substr(trim($input['applicantName'] ?? ''), 0, 100);
    $email           = mb_substr(trim($input['email'] ?? ''), 0, 100);
    $phone           = mb_substr(trim($input['phone'] ?? ''), 0, 30);
    $jobTitle        = mb_substr(trim($input['jobTitle'] ?? 'طلب توظيف عام'), 0, 100);
    $jobPositionId   = mb_substr(trim($input['jobPositionId'] ?? ''), 0, 50);
    $experienceYears = mb_substr(trim($input['experienceYears'] ?? '0'), 0, 50);
    $notes           = mb_substr(trim($input['notes'] ?? ''), 0, 2000);
    $cvFileName      = mb_substr(trim($input['cvFileName'] ?? ''), 0, 200);
    $cvFileData      = $input['cvFileData'] ?? '';

    // Validation
    if (empty($applicantName) || empty($phone) || empty($email)) {
        sendError('يرجى ملء الاسم الكامل، البريد الإلكتروني، ورقم الجوال.', 400);
    }

    if (mb_strlen($applicantName) < 2) {
        sendError('الاسم الكامل يجب أن يتكون من حرفين على الأقل.', 400);
    }

    if (!preg_match('/^[+0-9\s\-()]{7,30}$/', $phone)) {
        sendError('يرجى إدخال رقم جوال صحيح.', 400);
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendError('يرجى إدخال عنوان بريد إلكتروني صحيح.', 400);
    }

    // CV File Validation: Allowed extensions and max 2MB
    if (!empty($cvFileName)) {
        $ext = strtolower(pathinfo($cvFileName, PATHINFO_EXTENSION));
        $allowedExts = ['pdf', 'doc', 'docx'];
        if (!in_array($ext, $allowedExts, true)) {
            sendError('صيغة ملف السيرة الذاتية غير مسموحة. الصيغ المدعومة هي PDF و DOC و DOCX فقط.', 400);
        }
    }

    if (!empty($cvFileData)) {
        $payload = (string)$cvFileData;
        if (str_contains($payload, ';base64,')) {
            $parts = explode(';base64,', $payload);
            $decoded = base64_decode($parts[1] ?? '', true);
            if ($decoded === false) {
                sendError('بيانات ملف السيرة الذاتية غير صالحة.', 400);
            }
            $fileSizeBytes = strlen($decoded);
        } else {
            $fileSizeBytes = strlen($payload);
        }

        // Max 2MB (2,097,152 bytes)
        if ($fileSizeBytes > 2 * 1024 * 1024) {
            sendError('حجم ملف السيرة الذاتية يتجاوز الحد الأقصى المسموح به (2 ميجابايت).', 400);
        }
    }

    $id = 'app-' . time() . '-' . rand(100, 999);
    $ip = getClientIp();

    try {
        $stmt = $pdo->prepare('
            INSERT INTO job_applications (
                id, job_position_id, job_title, applicant_name, email, phone,
                experience_years, notes, cv_file_name, cv_file_data, status, ip_address, applied_at
            ) VALUES (
                :id, :job_position_id, :job_title, :applicant_name, :email, :phone,
                :experience_years, :notes, :cv_file_name, :cv_file_data, :status, :ip_address, NOW()
            )
        ');

        $stmt->execute([
            'id'               => $id,
            'job_position_id'  => !empty($jobPositionId) ? $jobPositionId : null,
            'job_title'        => $jobTitle,
            'applicant_name'   => $applicantName,
            'email'            => $email,
            'phone'            => $phone,
            'experience_years' => $experienceYears,
            'notes'            => $notes,
            'cv_file_name'     => $cvFileName,
            'cv_file_data'     => $cvFileData,
            'status'           => 'new',
            'ip_address'       => $ip,
        ]);

        $newApp = [
            'id'              => $id,
            'jobPositionId'   => $jobPositionId,
            'jobTitle'        => $jobTitle,
            'applicantName'   => $applicantName,
            'email'           => $email,
            'phone'           => $phone,
            'experienceYears' => $experienceYears,
            'notes'           => $notes,
            'cvFileName'      => $cvFileName,
            'status'          => 'new',
            'appliedAt'       => date('Y-m-d H:i'),
        ];

        sendJson([
            'success'     => true,
            'message'     => 'تم إرسال طلب التوظيف بنجاح. ستتم مراجعة طلبك من قبل قسم الموارد البشرية.',
            'application' => $newApp,
        ], 201);
    } catch (PDOException $e) {
        error_log("[Submit Job App Error] " . $e->getMessage());
        sendError('تعذر حفظ طلب التوظيف. يرجى المحاولة لاحقاً.', 500);
    }
}

// ADMIN ONLY: View, Update, Delete
requireAdmin();

if ($method === 'GET') {
    try {
        $stmt = $pdo->query('SELECT * FROM job_applications ORDER BY applied_at DESC');
        $apps = [];
        while ($row = $stmt->fetch()) {
            $apps[] = [
                'id'              => $row['id'],
                'jobPositionId'   => $row['job_position_id'] ?? null,
                'jobTitle'        => $row['job_title'],
                'applicantName'   => $row['applicant_name'],
                'email'           => $row['email'],
                'phone'           => $row['phone'],
                'experienceYears' => $row['experience_years'] ?? '',
                'notes'           => $row['notes'] ?? '',
                'cvFileName'      => $row['cv_file_name'] ?? '',
                'cvFileData'      => $row['cv_file_data'] ?? '',
                'status'          => $row['status'],
                'appliedAt'       => substr($row['applied_at'], 0, 16),
            ];
        }
        sendJson(['success' => true, 'jobApplications' => $apps]);
    } catch (PDOException $e) {
        error_log("[Get Job Apps Error] " . $e->getMessage());
        sendError('فشل جلب طلبات التوظيف.', 500);
    }
}

if ($method === 'PUT') {
    $id = $_GET['id'] ?? null;
    $input = getJsonInput();
    $status = $input['status'] ?? null;

    if (!$id || !$status) {
        sendError('معرف الطلب والحالة مطلوبان.', 400);
    }

    try {
        $stmt = $pdo->prepare('UPDATE job_applications SET status = :status WHERE id = :id');
        $stmt->execute(['status' => $status, 'id' => $id]);
        sendJson(['success' => true, 'message' => 'تم تحديث حالة طلب التوظيف بنجاح.']);
    } catch (PDOException $e) {
        error_log("[Update Job App Error] " . $e->getMessage());
        sendError('فشل تحديث طلب التوظيف.', 500);
    }
}

if ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) {
        sendError('معرف الطلب مطلوب للحذف.', 400);
    }

    try {
        $stmt = $pdo->prepare('DELETE FROM job_applications WHERE id = :id');
        $stmt->execute(['id' => $id]);
        sendJson(['success' => true, 'message' => 'تم حذف طلب التوظيف بنجاح.']);
    } catch (PDOException $e) {
        error_log("[Delete Job App Error] " . $e->getMessage());
        sendError('فشل حذف طلب التوظيف.', 500);
    }
}

sendError('طريقة الطلب غير مدعومة.', 405);
