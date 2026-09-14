<?php
/**
 * Hares & Niqaa - Database and Environment Configuration
 * Designed for Hostinger Shared Hosting (PHP 8.x + MySQL PDO)
 */

declare(strict_types=1);

// Prevent direct script execution if accessed strangely
defined('APP_INIT') || define('APP_INIT', true);

// ------------------------------------------------------------------------------
// Load environment variables from api/.env file if present
// ------------------------------------------------------------------------------
$envFile = __DIR__ . DIRECTORY_SEPARATOR . '.env';
$envVars = [];
if (file_exists($envFile) && is_readable($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($lines !== false) {
        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '' || str_starts_with($line, '#')) {
                continue;
            }
            $parts = explode('=', $line, 2);
            if (count($parts) === 2) {
                $k = trim($parts[0]);
                $v = trim($parts[1]);
                if ((str_starts_with($v, '"') && str_ends_with($v, '"')) ||
                    (str_starts_with($v, "'") && str_ends_with($v, "'"))) {
                    $v = substr($v, 1, -1);
                }
                $envVars[$k] = $v;
            }
        }
    }
}

// Database Connection Settings (Priority: api/.env -> getenv() -> Default)
$dbHost = $envVars['DB_HOST'] ?? (getenv('DB_HOST') ?: 'localhost');
$dbPort = $envVars['DB_PORT'] ?? (getenv('DB_PORT') ?: '3306');
$dbName = $envVars['DB_NAME'] ?? (getenv('DB_NAME') ?: 'u123456789_haresniqaa');
$dbUser = $envVars['DB_USER'] ?? (getenv('DB_USER') ?: 'u123456789_haresadmin');
$dbPass = $envVars['DB_PASS'] ?? (getenv('DB_PASS') ?: '');

// Security check: warn if DB_PASS is empty or using placeholder default
if (empty($dbPass) || $dbPass === 'YourStrongDbPassword123!') {
    error_log('[SECURITY WARNING] DB_PASS is unconfigured or using the default placeholder in api/config.php. Please set a strong database password.');
}

$dbCharset = 'utf8mb4';

define('DB_HOST', $dbHost);
define('DB_PORT', $dbPort);
define('DB_NAME', $dbName);
define('DB_USER', $dbUser);
define('DB_PASS', $dbPass);
define('DB_CHARSET', $dbCharset);

// Gemini API Key (Kept safe on server side - never sent to client)
$geminiApiKey = $envVars['GEMINI_API_KEY'] ?? (getenv('GEMINI_API_KEY') ?: '');
define('GEMINI_API_KEY', $geminiApiKey);

// Token Security Secret (Generated dynamically if not set in environment)
$tokenSecret = $envVars['TOKEN_SECRET'] ?? getenv('TOKEN_SECRET');
if (empty($tokenSecret)) {
    $secretFile = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'hn_token_secret.bin';
    if (file_exists($secretFile) && is_readable($secretFile)) {
        $tokenSecret = trim((string)@file_get_contents($secretFile));
    }
    if (empty($tokenSecret)) {
        try {
            $tokenSecret = bin2hex(random_bytes(32));
        } catch (\Throwable $e) {
            $tokenSecret = hash('sha256', uniqid('hn_sec_', true));
        }
        @file_put_contents($secretFile, $tokenSecret);
        error_log('[SECURITY NOTICE] TOKEN_SECRET was not found in environment. A secure runtime token secret was generated.');
    }
}
define('TOKEN_SECRET', $tokenSecret);

// CORS Settings - Allow frontend domain (adjust in production if needed)
$allowedOrigin = $envVars['ALLOWED_ORIGIN'] ?? (getenv('ALLOWED_ORIGIN') ?: '');
define('ALLOWED_ORIGIN', $allowedOrigin);
