<?php
/**
 * Quotes Endpoint
 * POST   /api/quotes.php (Public submission)
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
    checkRateLimit('submit_quote', 10, 3600);

    $input = getJsonInput();

    $contactName = trim($input['contactName'] ?? '');
    $phone = trim($input['phone'] ?? '');
    $email = trim($input['email'] ?? '');
    $serviceCategory = trim($input['serviceCategory'] ?? 'integrated');
    $serviceName = trim($input['serviceName'] ?? 'خدمة شاملة');
    $propertyArea = trim($input['propertyArea'] ?? '');
    $headcountNeeded = trim($input['headcountNeeded'] ?? '');
    $location = trim($input['location'] ?? '');
    $contractDuration = trim($input['contractDuration'] ?? '');
    $companyName = trim($input['companyName'] ?? '');
    $notes = trim($input['notes'] ?? '');

    if (empty($contactName) || empty($phone)) {
        sendError('يرجى ملء الاسم ورقم الهاتف على الأقل.', 400);
    }

    $id = 'q-' . time() . '-' . rand(100, 999);
    $ip = getClientIp();

    try {
        $stmt = $pdo->prepare('
            INSERT INTO quotes (
                id, service_category, service_name, property_area, headcount_needed,
                location, contract_duration, company_name, contact_name, phone,
                email, notes, status, ip_address, created_at
            ) VALUES (
                :id, :service_category, :service_name, :property_area, :headcount_needed,
                :location, :contract_duration, :company_name, :contact_name, :phone,
                :email, :notes, :status, :ip_address, NOW()
            )
        ');

        $stmt->execute([
            'id'                => $id,
            'service_category'  => $serviceCategory,
            'service_name'      => $serviceName,
            'property_area'     => $propertyArea,
            'headcount_needed'  => $headcountNeeded,
            'location'          => $location,
            'contract_duration' => $contractDuration,
            'company_name'      => $companyName,
            'contact_name'      => $contactName,
            'phone'             => $phone,
            'email'             => $email,
            'notes'             => $notes,
            'status'            => 'new',
            'ip_address'        => $ip,
        ]);

        $newQuote = [
            'id'               => $id,
            'serviceCategory'  => $serviceCategory,
            'serviceName'      => $serviceName,
            'propertyArea'     => $propertyArea,
            'headcountNeeded'  => $headcountNeeded,
            'location'         => $location,
            'contractDuration' => $contractDuration,
            'companyName'      => $companyName,
            'contactName'      => $contactName,
            'phone'            => $phone,
            'email'            => $email,
            'notes'            => $notes,
            'status'           => 'new',
            'createdAt'        => date('Y-m-d H:i'),
        ];

        sendJson([
            'success' => true,
            'message' => 'تم إرسال طلب عرض السعر بنجاح، سيتواصل معك فريقنا قريباً.',
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
                'serviceCategory'  => $row['service_category'],
                'serviceName'      => $row['service_name'],
                'propertyArea'     => $row['property_area'] ?? '',
                'headcountNeeded'  => $row['headcount_needed'] ?? '',
                'location'         => $row['location'] ?? '',
                'contractDuration' => $row['contract_duration'] ?? '',
                'companyName'      => $row['company_name'] ?? '',
                'contactName'      => $row['contact_name'],
                'phone'            => $row['phone'],
                'email'            => $row['email'] ?? '',
                'notes'            => $row['notes'] ?? '',
                'status'           => $row['status'],
                'createdAt'        => substr($row['created_at'], 0, 16),
            ];
        }
        sendJson(['success' => true, 'quotes' => $quotes]);
    } catch (PDOException $e) {
        error_log("[Get Quotes Error] " . $e->getMessage());
        sendError('فشل جلب طلبات الأسعار.', 500);
    }
}

if ($method === 'PUT') {
    $id = $_GET['id'] ?? null;
    $input = getJsonInput();
    $status = $input['status'] ?? null;

    if (!$id || !$status) {
        sendError('معرف الطلب والحالة الجديدة مطلوبان.', 400);
    }

    try {
        $stmt = $pdo->prepare('UPDATE quotes SET status = :status WHERE id = :id');
        $stmt->execute(['status' => $status, 'id' => $id]);
        sendJson(['success' => true, 'message' => 'تم تحديث حالة الطلب بنجاح.']);
    } catch (PDOException $e) {
        error_log("[Update Quote Error] " . $e->getMessage());
        sendError('فشل تحديث الطلب.', 500);
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
        sendJson(['success' => true, 'message' => 'تم حذف الطلب بنجاح.']);
    } catch (PDOException $e) {
        error_log("[Delete Quote Error] " . $e->getMessage());
        sendError('فشل حذف الطلب.', 500);
    }
}

sendError('طريقة الطلب غير مدعومة.', 405);
