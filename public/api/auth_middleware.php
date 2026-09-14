<?php
/**
 * Authentication Middleware
 * Checks Bearer Token or X-Admin-Token against `admin_tokens` table
 */

declare(strict_types=1);

require_once __DIR__ . '/db.php';

function getBearerToken(): ?string {
    $headers = null;
    if (isset($_SERVER['Authorization'])) {
        $headers = trim($_SERVER['Authorization']);
    } elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $headers = trim($_SERVER['HTTP_AUTHORIZATION']);
    } elseif (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();
        // Server-side fix for bug in old Android versions
        $requestHeaders = array_combine(
            array_map('ucwords', array_keys($requestHeaders)),
            array_values($requestHeaders)
        );
        if (isset($requestHeaders['Authorization'])) {
            $headers = trim($requestHeaders['Authorization']);
        } elseif (isset($requestHeaders['X-Admin-Token'])) {
            return trim($requestHeaders['X-Admin-Token']);
        }
    }

    if (!empty($_SERVER['HTTP_X_ADMIN_TOKEN'])) {
        return trim($_SERVER['HTTP_X_ADMIN_TOKEN']);
    }

    if (!empty($headers)) {
        if (preg_match('/Bearer\s(\S+)/i', $headers, $matches)) {
            return $matches[1];
        }
    }

    return null;
}

function requireAdmin(): array {
    $token = getBearerToken();
    if (!$token) {
        sendError('غير مصرح لك بالوصول. يلزم تسجيل الدخول كمسؤول أولاً.', 401);
    }

    $pdo = getDbConnection();
    try {
        $stmt = $pdo->prepare('
            SELECT t.id as token_id, t.user_id, t.expires_at, u.username, u.email
            FROM admin_tokens t
            JOIN admin_users u ON t.user_id = u.id
            WHERE t.token = :token AND t.expires_at > NOW()
            LIMIT 1
        ');
        $stmt->execute(['token' => $token]);
        $user = $stmt->fetch();

        if (!$user) {
            sendError('انتهت صلاحية الجلسة أو أن رمز المرور غير صالح.', 401);
        }

        return $user;
    } catch (PDOException $e) {
        error_log("[Auth Error] " . $e->getMessage());
        sendError('خطأ أثناء التحقق من صلاحية الجلسة.', 500);
    }
}
