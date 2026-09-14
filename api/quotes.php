<?php
/**
 * Quote Requests Endpoint
 * POST   /api/quotes.php (Public submission with strict validation & rate limiting)
 * GET    /api/quotes.php (Admin only: fetch all)
 * PUT    /api/quotes.php?id=... (Admin only: update status)
 * DELETE /api/quotes.php?id=... (Admin only: delete)
 */

declare(strict_types=1);

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth_middleware.php';

applyCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDbConnection();

// PUBLIC: Submit Quote Request
if ($method === 'POST') {
    // Strict rate limit: 5 submissions per 10 minutes (600 seconds)
    checkRateLimit('submit_quote', 5, 600);

    $input = getJsonInput();

    $contactName     = mb_substr(trim($input['contactName'] ?? ''), 0, 100);
    $phone           = mb_substr(trim($input['phone'] ?? ''), 0, 30);
    $email           = mb_substr(trim($input['email'] ?? ''), 0, 100);
    $companyName     = mb_substr(trim($input['companyName'] ?? ''), 0, 150);
    $serviceCategory = mb_substr(trim($input['serviceCategory'] ?? 'security'), 0, 100);
    $serviceName     = mb_substr(trim($input['serviceName'] ?? ''), 0, 100);
    $propertyArea    = mb_substr(trim($input['propertyArea'] ?? ''), 0, 100);
    $headcountNeeded = mb_substr(trim($input['headcountNeeded'] ?? ''), 0, 100);
    $location        = mb_substr(trim($input['location'] ?? ''), 0, 150);
    $contractDuration= mb_substr(trim($input['contractDuration'] ?? ''), 0, 100);
    $notes           = mb_substr(trim($input['notes'] ?? ''), 0, 2000);

    // Validation
    if (empty($contactName) || empty($phone)) {
        sendError('يرجى ملء الاسم ورقم الهاتف على الأقل.', 400);
    }

    if (mb_strlen($contactName) < 2) {
        sendError('الاسم يجب أن يحتوي على حرفين على الأقل.', 400);
    }

    if (!preg_match('/^[+0-9\s\-()]{7,30}$/', $phone)) {
        sendError('يرجى إدخال رقم هاتف صحيح.', 400);
    }

    if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendError('يرجى إدخال بريد إلكتروني صحيح.', 400);
    }

    $id = 'quote-' . time() . '-' . rand(100, 999);
    $ip = getClientIp();

    try {
        $stmt = $pdo->prepare('
            INSERT INTO quotes (
                id, contact_name, company_name, phone, email,
                service_category, service_name, property_area,
                headcount_needed, location, contract_duration, notes,
                status, ip_address, created_at
            ) VALUES (
                :id, :contact_name, :company_name, :phone, :email,
                :service_category, :service_name, :property_area,
                :headcount_needed, :location, :contract_duration, :notes,
                :status, :ip_address, NOW()
            )
        ');

        $stmt->execute([
            'id'                => $id,
            'contact_name'      => $contactName,
            'company_name'      => $companyName,
            'phone'             => $phone,
            'email'             => $email,
            'service_category'  => $serviceCategory,
            'service_name'      => $serviceName,
            'property_area'     => $propertyArea,
            'headcount_needed'  => $headcountNeeded,
            'location'          => $location,
            'contract_duration' => $contractDuration,
            'notes'             => $notes,
            'status'            => 'new',
            'ip_address'        => $ip,
        ]);

        $newQuote = [
            'id'               => $id,
            'contactName'      => $contactName,
            'companyName'      => $companyName,
            'phone'            => $phone,
            'email'            => $email,
            'serviceCategory'  => $serviceCategory,
            'serviceName'      => $serviceName,
            'propertyArea'     => $propertyArea,
            'headcountNeeded'  => $headcountNeeded,
            'location'         => $location,
            'contractDuration' => $contractDuration,
            'notes'            => $notes,
            'status'           => 'new',
            'createdAt'        => date('Y-m-d H:i'),
        ];

        sendJson([
            'success' => true,
            'message' => 'تم استلام طلب عرض السعر بنجاح وسيقوم فريقنا بالتواصل معكم في أقرب وقت.',
            'quote'   => $newQuote,
        ], 201);
    } catch (PDOException $e) {
        error_log("[Submit Quote Error] " . $e->getMessage());
        sendError('تعذر حفظ طلب عرض السعر. يرجى المحاولة لاحقاً.', 500);
    }
}

// ADMIN ONLY: View, Update, Delete
requireAdmin();

if ($method === 'GET') {
    try {
        $stmt = $pdo->query('SELECT * FROM quotes ORDER BY created_at DESC');
        $quotes = [];
        while ($row = $stmt->fetch()) {
            $quotes[] = [
                'id'               => $row['id'],
                'contactName'      => $row['contact_name'],
                'companyName'      => $row['company_name'] ?? '',
                'phone'            => $row['phone'],
                'email'            => $row['email'] ?? '',
                'serviceCategory'  => $row['service_category'],
                'serviceName'      => $row['service_name'] ?? '',
                'propertyArea'     => $row['property_area'] ?? '',
                'headcountNeeded'  => $row['headcount_needed'] ?? '',
                'location'         => $row['location'] ?? '',
                'contractDuration' => $row['contract_duration'] ?? '',
                'notes'            => $row['notes'] ?? '',
                'status'           => $row['status'],
                'createdAt'        => substr($row['created_at'], 0, 16),
            ];
        }
        sendJson(['success' => true, 'quotes' => $quotes]);
    } catch (PDOException $e) {
        error_log("[Get Quotes Error] " . $e->getMessage());
        sendError('فشل جلب طلبات عروض الأسعار.', 500);
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
        $stmt = $pdo->prepare('UPDATE quotes SET status = :status WHERE id = :id');
        $stmt->execute(['status' => $status, 'id' => $id]);
        sendJson(['success' => true, 'message' => 'تم تحديث حالة طلب عرض السعر.']);
    } catch (PDOException $e) {
        error_log("[Update Quote Error] " . $e->getMessage());
        sendError('فشل تحديث طلب عرض السعر.', 500);
    }
}

if ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) {
        sendError('معرف الطلب مطلوب للحذف.', 400);
    }

    try {
        $stmt = $pdo->prepare('DELETE FROM quotes WHERE id = :id');
        $stmt->execute(['id' => $id]);
        sendJson(['success' => true, 'message' => 'تم حذف طلب عرض السعر بنجاح.']);
    } catch (PDOException $e) {
        error_log("[Delete Quote Error] " . $e->getMessage());
        sendError('فشل حذف طلب عرض السعر.', 500);
    }
}

sendError('طريقة الطلب غير مدعومة.', 405);
