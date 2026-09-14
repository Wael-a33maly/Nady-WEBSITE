<?php
/**
 * Hares & Niqaa - Database and Environment Configuration
 * Designed for Hostinger Shared Hosting (PHP 8.x + MySQL PDO)
 */

declare(strict_types=1);

// Prevent direct script execution if accessed strangely
defined('APP_INIT') || define('APP_INIT', true);

// Database Connection Settings
// You can edit these values directly for Hostinger or set them via environment variables.
$dbHost = getenv('DB_HOST') ?: 'localhost';
$dbPort = getenv('DB_PORT') ?: '3306';
$dbName = getenv('DB_NAME') ?: 'u123456789_haresniqaa';
$dbUser = getenv('DB_USER') ?: 'u123456789_haresadmin';
$dbPass = getenv('DB_PASS') ?: 'YourStrongDbPassword123!';
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

// Token Security Secret (Used for HMAC hashing or session validation)
$tokenSecret = getenv('TOKEN_SECRET') ?: 'hares_niqaa_secure_token_secret_key_2026_salt_xyz';
define('TOKEN_SECRET', $tokenSecret);

// CORS Settings - Allow frontend domain (adjust in production if needed)
$allowedOrigin = getenv('ALLOWED_ORIGIN') ?: '*';
define('ALLOWED_ORIGIN', $allowedOrigin);
