<?php
/**
 * Admin Authentication Endpoint
 * POST /api/auth.php?action=login
 * POST /api/auth.php?action=check
 * POST /api/auth.php?action=logout
 * POST /api/auth.php?action=change_password
 */

declare(strict_types=1);

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth_middleware.php';

applyCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? 'login';

if ($method !== 'POST') {
    sendError('طريقة الطلب غير مقبولة.', 405);
}

$pdo = getDbConnection();
$input = getJsonInput();

// 1. LOGIN
if ($action === 'login') {
    checkRateLimit('admin_login', 10, 900); // 10 attempts per 15 minutes

    $username = trim($input['username'] ?? 'admin');
    $password = (string)($input['password'] ?? '');

    if (empty($password)) {
        sendError('يرجى إدخال كلمة المرور.', 400);
    }

    try {
        // Find admin by username, or allow match on password if single admin exists
        $stmt = $pdo->prepare('SELECT id, username, password_hash, email FROM admin_users WHERE username = :username LIMIT 1');
        $stmt->execute(['username' => $username]);
        $user = $stmt->fetch();

        // If not found by specific username but standard admin exists
        if (!$user) {
            $stmt = $pdo->query('SELECT id, username, password_hash, email FROM admin_users ORDER BY id ASC LIMIT 1');
            $user = $stmt->fetch();
        }

        $pwdMatches = false;
        if ($user) {
            if (password_verify($password, $user['password_hash'])) {
                $pwdMatches = true;
            } elseif ($password === $user['password_hash']) {
                // Auto-upgrade initial/plain-text password to bcrypt
                $pwdMatches = true;
                $upgradedHash = password_hash($password, PASSWORD_BCRYPT);
                $upStmt = $pdo->prepare('UPDATE admin_users SET password_hash = :hash WHERE id = :id');
                $upStmt->execute(['hash' => $upgradedHash, 'id' => $user['id']]);
            }
        }

        if (!$user || !$pwdMatches) {
            sendError('بيانات الدخول غير صحيحة. يرجى التأكد من كلمة المرور.', 401);
        }

        // Generate cryptographically secure token
        $token = bin2hex(random_bytes(32));
        $expiresAt = date('Y-m-d H:i:s', strtotime('+7 days'));

        $insertStmt = $pdo->prepare('
            INSERT INTO admin_tokens (user_id, token, expires_at, created_at)
            VALUES (:user_id, :token, :expires_at, NOW())
        ');
        $insertStmt->execute([
            'user_id'    => $user['id'],
            'token'      => $token,
            'expires_at' => $expiresAt,
        ]);

        sendJson([
            'success'   => true,
            'message'   => 'تم تسجيل الدخول بنجاح.',
            'token'     => $token,
            'expiresAt' => $expiresAt,
            'user'      => [
                'id'       => $user['id'],
                'username' => $user['username'],
                'email'    => $user['email'],
            ],
        ]);
    } catch (PDOException $e) {
        error_log("[Auth Login Error] " . $e->getMessage());
        sendError('حدث خطأ في النظام أثناء تسجيل الدخول.', 500);
    }
}

// 2. CHECK TOKEN STATUS
if ($action === 'check') {
    $user = requireAdmin();
    sendJson([
        'success' => true,
        'valid'   => true,
        'user'    => [
            'username' => $user['username'],
            'email'    => $user['email'],
        ],
    ]);
}

// 3. LOGOUT
if ($action === 'logout') {
    $token = getBearerToken();
    if ($token) {
        try {
            $stmt = $pdo->prepare('DELETE FROM admin_tokens WHERE token = :token');
            $stmt->execute(['token' => $token]);
        } catch (PDOException $e) {
            // Ignore
        }
    }
    sendJson([
        'success' => true,
        'message' => 'تم تسجيل الخروج بنجاح.',
    ]);
}

// 4. CHANGE PASSWORD
if ($action === 'change_password') {
    $user = requireAdmin();
    $currentPassword = (string)($input['currentPassword'] ?? '');
    $newPassword = (string)($input['newPassword'] ?? '');

    if (strlen($newPassword) < 6) {
        sendError('يجب أن تكون كلمة المرور الجديدة مكونة من 6 أحرف على الأقل.', 400);
    }

    try {
        $stmt = $pdo->prepare('SELECT password_hash FROM admin_users WHERE id = :id LIMIT 1');
        $stmt->execute(['id' => $user['user_id']]);
        $row = $stmt->fetch();

        if (!$row || !password_verify($currentPassword, $row['password_hash'])) {
            sendError('كلمة المرور الحالية غير صحيحة.', 400);
        }

        $newHash = password_hash($newPassword, PASSWORD_BCRYPT);
        $updateStmt = $pdo->prepare('UPDATE admin_users SET password_hash = :hash WHERE id = :id');
        $updateStmt->execute(['hash' => $newHash, 'id' => $user['user_id']]);

        // Invalidate all tokens for this user except current
        $currentToken = getBearerToken();
        $delTokens = $pdo->prepare('DELETE FROM admin_tokens WHERE user_id = :user_id AND token != :curr');
        $delTokens->execute(['user_id' => $user['user_id'], 'curr' => $currentToken]);

        sendJson([
            'success' => true,
            'message' => 'تم تغيير كلمة المرور بنجاح.',
        ]);
    } catch (PDOException $e) {
        error_log("[Change Pass Error] " . $e->getMessage());
        sendError('فشل تغيير كلمة المرور.', 500);
    }
}

sendError('إجراء غير مدعوم.', 400);
