<?php
/**
 * Server-Side Gemini AI Proxy
 * Reads GEMINI_API_KEY securely on the server.
 * POST /api/gemini.php
 */

declare(strict_types=1);

require_once __DIR__ . '/db.php';

applyCorsHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('طريقة الطلب غير مقبولة.', 405);
}

checkRateLimit('gemini_ai', 20, 3600);

$apiKey = defined('GEMINI_API_KEY') ? GEMINI_API_KEY : '';
if (empty($apiKey)) {
    sendError('لم يتم تهيئة مفتاح GEMINI_API_KEY على السيرفر.', 503);
}

$input = getJsonInput();
$prompt = trim($input['prompt'] ?? '');
if (empty($prompt)) {
    sendError('يرجى تقديم نص الاستعلام (prompt).', 400);
}

$systemInstruction = trim($input['systemInstruction'] ?? 'أنت مساعد ذكي لشركة حارس ونقاء للخدمات الأمنية والنظافة. أجب باللغة العربية باحترافية واختصار.');

$payload = [
    'contents' => [
        [
            'role'  => 'user',
            'parts' => [
                ['text' => $prompt]
            ]
        ]
    ],
    'systemInstruction' => [
        'parts' => [
            ['text' => $systemInstruction]
        ]
    ],
    'generationConfig' => [
        'temperature'     => 0.7,
        'maxOutputTokens' => 800,
    ]
];

$url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' . urlencode($apiKey);

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS     => json_encode($payload),
    CURLOPT_TIMEOUT        => 30,
    CURLOPT_SSL_VERIFYPEER => true,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr  = curl_error($ch);
curl_close($ch);

if ($curlErr) {
    error_log("[Gemini API Error] cURL failed: " . $curlErr);
    sendError('فشل الاتصال بخدمة الذكاء الاصطناعي.', 502);
}

$data = json_decode((string)$response, true);

if ($httpCode >= 400 || empty($data['candidates'][0]['content']['parts'][0]['text'])) {
    error_log("[Gemini API Error] HTTP {$httpCode}: " . $response);
    sendError('حدث خطأ أثناء معالجة الطلب بالذكاء الاصطناعي.', 502, $data['error']['message'] ?? null);
}

$textResponse = $data['candidates'][0]['content']['parts'][0]['text'];

sendJson([
    'success' => true,
    'text'    => $textResponse,
]);
