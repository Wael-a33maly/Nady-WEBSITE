<?php
/**
 * Inquiries / Contact Messages Endpoint
 * POST   /api/inquiries.php (Public submission with strict validation & rate limiting)
 * GET    /api/inquiries.php (Admin only: fetch all)
 * PUT    /api/inquiries.php?id=... (Admin only: update status)
 * DELETE /api/inquiries.php?id=... (Admin only: delete)
 */

declare(strict_types=1);

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth_middleware.php';

applyCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDbConnection();

// PUBLIC: Submit Contact Message
if ($method === 'POST') {
    // Strict rate limit: 5 submissions per 10 minutes (600 seconds)
    checkRateLimit('submit_inquiry', 5, 600);

    $input = getJsonInput();

    $name    = mb_substr(trim($input['name'] ?? ''), 0, 100);
    $phone   = mb_substr(trim($input['phone'] ?? ''), 0, 30);
    $email   = mb_substr(trim($input['email'] ?? ''), 0, 100);
    $subject = mb_substr(trim($input['subject'] ?? 'استفسار عام'), 0, 150);
    $message = mb_substr(trim($input['message'] ?? ''), 0, 2000);

    if (empty($name) || empty($phone) || empty($message)) {
        sendError('يرجى كتابة الاسم، ورقم الهاتف، والرسالة.', 400);
    }

    if (mb_strlen($name) < 2) {
        sendError('الاسم يجب أن يحتوي على حرفين على الأقل.', 400);
    }

    if (!preg_match('/^[+0-9\s\-()]{7,30}$/', $phone)) {
        sendError('يرجى إدخال رقم هاتف صحيح.', 400);
    }

    if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendError('يرجى إدخال بريد إلكتروني صحيح.', 400);
    }

    if (mb_strlen($message) < 5) {
        sendError('نص الرسالة قصير جداً.', 400);
    }

    $id = 'inq-' . time() . '-' . rand(100, 999);
    $ip = getClientIp();

    try {
        $stmt = $pdo->prepare('
            INSERT INTO inquiries (id, name, phone, email, subject, message, status, ip_address, created_at)
            VALUES (:id, :name, :phone, :email, :subject, :message, :status, :ip_address, NOW())
        ');

        $stmt->execute([
            'id'         => $id,
            'name'       => $name,
            'phone'      => $phone,
            'email'      => $email,
            'subject'    => $subject,
            'message'    => $message,
            'status'     => 'unread',
            'ip_address' => $ip,
        ]);

        $newInquiry = [
            'id'        => $id,
            'name'      => $name,
            'phone'     => $phone,
            'email'     => $email,
            'subject'   => $subject,
            'message'   => $message,
            'status'    => 'unread',
            'createdAt' => date('Y-m-d H:i'),
        ];

        sendJson([
            'success' => true,
            'message' => 'شكراً لتواصلك معنا. تم استلام رسالتك بنجاح وسنقوم بالرد عليك في أقرب وقت.',
            'inquiry' => $newInquiry,
        ], 201);
    } catch (PDOException $e) {
        error_log("[Submit Inquiry Error] " . $e->getMessage());
        sendError('تعذر إرسال رسالتك حالياً. يرجى المحاولة لاحقاً.', 500);
    }
}

// ADMIN ONLY: View, Update, Delete
requireAdmin();

if ($method === 'GET') {
    try {
        $stmt = $pdo->query('SELECT * FROM inquiries ORDER BY created_at DESC');
        $inquiries = [];
        while ($row = $stmt->fetch()) {
            $inquiries[] = [
                'id'        => $row['id'],
                'name'      => $row['name'],
                'phone'     => $row['phone'],
                'email'     => $row['email'],
                'subject'   => $row['subject'],
                'message'   => $row['message'],
                'status'    => $row['status'],
                'createdAt' => substr($row['created_at'], 0, 16),
            ];
        }
        sendJson(['success' => true, 'inquiries' => $inquiries]);
    } catch (PDOException $e) {
        error_log("[Get Inquiries Error] " . $e->getMessage());
        sendError('فشل جلب رسائل التواصل.', 500);
    }
}

if ($method === 'PUT') {
    $id = $_GET['id'] ?? null;
    $input = getJsonInput();
    $status = $input['status'] ?? null;

    if (!$id || !$status) {
        sendError('معرف الرسالة والحالة مطلوبان.', 400);
    }

    try {
        $stmt = $pdo->prepare('UPDATE inquiries SET status = :status WHERE id = :id');
        $stmt->execute(['status' => $status, 'id' => $id]);
        sendJson(['success' => true, 'message' => 'تم تحديث حالة الرسالة.']);
    } catch (PDOException $e) {
        error_log("[Update Inquiry Error] " . $e->getMessage());
        sendError('فشل تحديث الرسالة.', 500);
    }
}

if ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) {
        sendError('معرف الرسالة مطلوب للحذف.', 400);
    }

    try {
        $stmt = $pdo->prepare('DELETE FROM inquiries WHERE id = :id');
        $stmt->execute(['id' => $id]);
        sendJson(['success' => true, 'message' => 'تم حذف الرسالة بنجاح.']);
    } catch (PDOException $e) {
        error_log("[Delete Inquiry Error] " . $e->getMessage());
        sendError('فشل حذف الرسالة.', 500);
    }
}

sendError('طريقة الطلب غير مدعومة.', 405);
