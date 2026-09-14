<?php
/**
 * Database Connection & Global Utilities
 * Pure PDO, No external dependencies
 */

declare(strict_types=1);

require_once __DIR__ . '/config.php';

// Set global JSON header and handle CORS
function applyCorsHeaders(): void {
    $configuredOrigin = defined('ALLOWED_ORIGIN') ? trim((string)ALLOWED_ORIGIN) : '';
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if (!empty($configuredOrigin)) {
        header("Access-Control-Allow-Origin: {$configuredOrigin}");
    } elseif (!empty($origin)) {
        $parsed = parse_url($origin);
        $host = $parsed['host'] ?? '';
        $port = $parsed['port'] ?? null;
        $serverHost = $_SERVER['HTTP_HOST'] ?? '';
        $serverHostname = explode(':', $serverHost)[0];

        $isLocal = in_array($host, ['localhost', '127.0.0.1'], true) && ($port === null || in_array((int)$port, [3000, 5173, 80, 443], true));
        $isSameHost = !empty($serverHostname) && ($host === $serverHostname || str_ends_with($host, '.' . $serverHostname));

        if ($isLocal || $isSameHost) {
            header("Access-Control-Allow-Origin: {$origin}");
        } else {
            header('Access-Control-Allow-Origin: null');
        }
    } else {
        header('Access-Control-Allow-Origin: *');
    }

    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-Admin-Token');
    header('Access-Control-Max-Age: 86400');
    header('X-Content-Type-Options: nosniff');
    header('Content-Type: application/json; charset=UTF-8');

    // Handle preflight OPTIONS request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

// Global JSON Response Helper
function sendJson(mixed $data, int $statusCode = 200): void {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=UTF-8');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

// Global Error Response Helper
function sendError(string $message, int $statusCode = 400, mixed $details = null): void {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=UTF-8');
    header('X-Content-Type-Options: nosniff');
    $payload = ['success' => false, 'error' => $message];
    if ($details !== null) {
        $payload['details'] = $details;
    }
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

// Read JSON input from request body
function getJsonInput(): array {
    $raw = file_get_contents('php://input');
    if (empty($raw)) {
        return [];
    }
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        return [];
    }
    return $data;
}

// Get Client IP Address
function getClientIp(): string {
    if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) {
        return filter_var($_SERVER['HTTP_CF_CONNECTING_IP'], FILTER_VALIDATE_IP) ?: '0.0.0.0';
    }
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ipList = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
        $ip = trim($ipList[0]);
        if (filter_var($ip, FILTER_VALIDATE_IP)) {
            return $ip;
        }
    }
    return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}

// Singleton PDO instance
function getDbConnection(): PDO {
    static $pdo = null;

    if ($pdo !== null) {
        return $pdo;
    }

    $dsn = sprintf(
        'mysql:host=%s;port=%s;dbname=%s;charset=%s',
        DB_HOST,
        DB_PORT,
        DB_NAME,
        DB_CHARSET
    );

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES " . DB_CHARSET . " COLLATE " . DB_CHARSET . "_unicode_ci"
    ];

    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        error_log("[HaresNiqaa DB Error] Connection failed: " . $e->getMessage());
        sendError('Database connection failed. Please check server configuration.', 500);
    }
}

// Simple IP-based Rate Limiter (No Redis/Memcached required)
function checkRateLimit(string $action, int $maxRequests = 15, int $windowSeconds = 3600): void {
    $ip = getClientIp();
    $cacheDir = sys_get_temp_dir() . '/hn_rate_limits';
    if (!is_dir($cacheDir)) {
        @mkdir($cacheDir, 0777, true);
    }

    $rateFile = $cacheDir . '/' . md5($ip . '_' . $action) . '.json';
    $now = time();

    $data = ['count' => 0, 'first_request' => $now];
    if (file_exists($rateFile)) {
        $content = @file_get_contents($rateFile);
        if ($content) {
            $parsed = @json_decode($content, true);
            if (is_array($parsed)) {
                $data = $parsed;
            }
        }
    }

    if ($now - ($data['first_request'] ?? 0) > $windowSeconds) {
        $data = ['count' => 1, 'first_request' => $now];
    } else {
        $data['count'] = ($data['count'] ?? 0) + 1;
        if ($data['count'] > $maxRequests) {
            sendError('لقد تجاوزت الحد المسموح من الطلبات. يرجى المحاولة لاحقاً بعد قليل.', 429);
        }
    }

    @file_put_contents($rateFile, json_encode($data));
}
