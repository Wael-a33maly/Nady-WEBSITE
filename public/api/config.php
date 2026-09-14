<?php
/**
 * Hares & Niqaa - Database and Environment Configuration
 * Designed for Hostinger Shared Hosting (PHP 8.x + MySQL PDO)
 */

declare(strict_types=1);

// Prevent direct script execution if accessed strangely
defined('APP_INIT') || define('APP_INIT', true);

// Database Connection Settings
$dbHost = getenv('DB_HOST') ?: 'localhost';
$dbPort = getenv('DB_PORT') ?: '3306';
$dbName = getenv('DB_NAME') ?: 'u123456789_haresniqaa';
$dbUser = getenv('DB_USER') ?: 'u123456789_haresadmin';
$dbPass = getenv('DB_PASS') ?: '';

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
$geminiApiKey = getenv('GEMINI_API_KEY') ?: '';
define('GEMINI_API_KEY', $geminiApiKey);

// Token Security Secret (Generated dynamically if not set in environment)
$tokenSecret = getenv('TOKEN_SECRET');
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
$allowedOrigin = getenv('ALLOWED_ORIGIN') ?: '';
define('ALLOWED_ORIGIN', $allowedOrigin);
