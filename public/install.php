<?php
/**
 * Hares & Niqaa - Web Installation Wizard
 * معالج التثبيت الذكي لموقع وخدمات "حارس ونقاء"
 * 
 * مصمم للعمل بكفاءة وأمان تام على استضافة Hostinger المشتركة
 * PHP 8.x + MySQL PDO
 */

declare(strict_types=1);

// Prevent browser caching during installation
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Content-Type: text/html; charset=UTF-8');

// Locate API directory and required files
$apiDir = __DIR__ . '/api';
if (!is_dir($apiDir) && is_dir(__DIR__ . '/public/api')) {
    $apiDir = __DIR__ . '/public/api';
}

$lockFile = $apiDir . '/install.lock';
$envFile = $apiDir . '/.env';

// Determine database.sql path
$possibleSqlPaths = [
    __DIR__ . '/database.sql',
    __DIR__ . '/public/database.sql',
    dirname(__DIR__) . '/database.sql'
];
$sqlFile = null;
foreach ($possibleSqlPaths as $p) {
    if (file_exists($p) && is_readable($p)) {
        $sqlFile = $p;
        break;
    }
}

// ------------------------------------------------------------------------------
// Helper: Render Page Shell
// ------------------------------------------------------------------------------
function renderInstallerPage(string $title, string $content): void {
    ?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($title) ?> | حارس ونقاء</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-deep: #070F1A;
            --bg-card: #112236;
            --border-card: #1E3A5F;
            --gold-primary: #C9A961;
            --gold-light: #DFBE74;
            --gold-dark: #B08D43;
            --text-main: #FFFFFF;
            --text-muted: #94A3B8;
            --error-red: #EF4444;
            --success-green: #10B981;
        }
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Tajawal', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        body {
            background: radial-gradient(circle at 50% 10%, #152B47 0%, var(--bg-deep) 100%);
            color: var(--text-main);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px 16px;
            direction: rtl;
        }
        .container {
            width: 100%;
            max-width: 680px;
        }
        .card {
            background-color: var(--bg-card);
            border: 1px solid var(--border-card);
            border-radius: 24px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            padding: 36px 32px;
            position: relative;
            overflow: hidden;
        }
        @media (max-width: 640px) {
            .card {
                padding: 24px 20px;
                border-radius: 20px;
            }
        }
        .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--gold-dark), var(--gold-primary), var(--gold-light));
        }
        .header {
            text-align: center;
            margin-bottom: 28px;
        }
        .brand-badge {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: rgba(201, 169, 97, 0.1);
            border: 1px solid rgba(201, 169, 97, 0.25);
            padding: 8px 16px;
            border-radius: 9999px;
            color: var(--gold-primary);
            font-weight: 700;
            font-size: 14px;
            margin-bottom: 12px;
        }
        .title {
            font-size: 26px;
            font-weight: 800;
            color: var(--text-main);
            margin-bottom: 8px;
        }
        .subtitle {
            font-size: 14px;
            color: var(--text-muted);
            line-height: 1.6;
        }
        .section-title {
            font-size: 16px;
            font-weight: 700;
            color: var(--gold-light);
            margin: 24px 0 14px 0;
            display: flex;
            align-items: center;
            gap: 8px;
            border-bottom: 1px solid var(--border-card);
            padding-bottom: 8px;
        }
        .grid-2 {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
        }
        @media (max-width: 600px) {
            .grid-2 {
                grid-template-columns: 1fr;
            }
        }
        .form-group {
            margin-bottom: 16px;
        }
        .form-group label {
            display: block;
            font-size: 13px;
            font-weight: 600;
            color: var(--text-muted);
            margin-bottom: 6px;
        }
        .form-control {
            width: 100%;
            background-color: #0B1929;
            border: 1px solid var(--border-card);
            border-radius: 12px;
            padding: 12px 14px;
            font-size: 14px;
            color: var(--text-main);
            outline: none;
            transition: border-color 0.2s, box-shadow 0.2s;
            direction: ltr;
            text-align: right;
        }
        .form-control.ltr-input {
            text-align: left;
        }
        .form-control:focus {
            border-color: var(--gold-primary);
            box-shadow: 0 0 0 3px rgba(201, 169, 97, 0.15);
        }
        .field-hint {
            font-size: 11px;
            color: var(--text-muted);
            margin-top: 4px;
            display: block;
        }
        .alert {
            padding: 14px 16px;
            border-radius: 12px;
            font-size: 13px;
            line-height: 1.6;
            margin-bottom: 20px;
            display: flex;
            align-items: flex-start;
            gap: 12px;
        }
        .alert-error {
            background-color: rgba(239, 68, 68, 0.12);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: #FCA5A5;
        }
        .alert-warning {
            background-color: rgba(245, 158, 11, 0.12);
            border: 1px solid rgba(245, 158, 11, 0.3);
            color: #FCD34D;
        }
        .alert-success {
            background-color: rgba(16, 185, 129, 0.12);
            border: 1px solid rgba(16, 185, 129, 0.3);
            color: #6EE7B7;
        }
        .requirements-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 20px;
        }
        .requirement-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 14px;
            background: #0B1929;
            border: 1px solid var(--border-card);
            border-radius: 12px;
            font-size: 13px;
        }
        .badge-pass {
            background: rgba(16, 185, 129, 0.2);
            color: #34D399;
            padding: 4px 10px;
            border-radius: 6px;
            font-weight: 700;
            font-size: 12px;
        }
        .badge-fail {
            background: rgba(239, 68, 68, 0.2);
            color: #F87171;
            padding: 4px 10px;
            border-radius: 6px;
            font-weight: 700;
            font-size: 12px;
        }
        .btn-primary {
            width: 100%;
            background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold-primary) 50%, var(--gold-dark) 100%);
            color: #070F1A;
            border: none;
            border-radius: 14px;
            padding: 14px 20px;
            font-size: 15px;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            box-shadow: 0 4px 14px rgba(201, 169, 97, 0.3);
            margin-top: 24px;
            text-decoration: none;
        }
        .btn-primary:hover {
            filter: brightness(1.1);
            transform: translateY(-1px);
        }
        .btn-primary:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }
        .btn-secondary {
            background: #0B1929;
            border: 1px solid var(--border-card);
            color: var(--text-main);
            border-radius: 14px;
            padding: 12px 20px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.2s;
        }
        .btn-secondary:hover {
            border-color: var(--gold-primary);
        }
        .summary-table {
            width: 100%;
            border-collapse: collapse;
            margin: 16px 0;
            font-size: 13px;
        }
        .summary-table td {
            padding: 10px 12px;
            border-bottom: 1px solid var(--border-card);
        }
        .summary-table td:first-child {
            color: var(--text-muted);
            font-weight: 600;
            width: 40%;
        }
        .summary-table td:last-child {
            color: var(--text-main);
            font-family: monospace;
            direction: ltr;
            text-align: left;
        }
        .danger-box {
            border: 1px solid rgba(239, 68, 68, 0.4);
            background: rgba(239, 68, 68, 0.08);
            border-radius: 14px;
            padding: 16px;
            margin-top: 20px;
        }
        .danger-box h4 {
            color: #F87171;
            font-size: 14px;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .danger-box p {
            font-size: 12px;
            color: #FECACA;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <?= $content ?>
        </div>
    </div>
</body>
</html>
    <?php
}

// ------------------------------------------------------------------------------
// Step 0: Check install.lock
// ------------------------------------------------------------------------------
if (file_exists($lockFile)) {
    $lockTime = @file_get_contents($lockFile);
    $content = '
    <div class="header">
        <div class="brand-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            حارس ونقاء — الأمان والحماية
        </div>
        <h1 class="title">المعالج مقفل لأسباب أمنية</h1>
        <p class="subtitle">تم تثبيت هذا الموقع بنجاح وقفل معالج التثبيت لمنع أي عبث خارجي.</p>
    </div>
    <div class="alert alert-warning">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <div>
            <strong>النظام محمي بملف القفل:</strong><br>
            المعالج مقفل حالياً عبر الملف <code>api/install.lock</code>.<br>
            إذا كنت بحاجة ماسة لإعادة التثبيت، يجب عليك الدخول إلى مدير الملفات (File Manager) وحذف الملف <code>api/install.lock</code> يدوياً أولاً.
        </div>
    </div>
    <div style="display:flex; gap:12px; margin-top:24px;">
        <a href="./admin" class="btn-primary" style="margin-top:0;">الانتقال للوحة التحكم</a>
        <a href="./" class="btn-secondary">زيارة الموقع</a>
    </div>';
    renderInstallerPage('المعالج مقفل', $content);
    exit;
}

// ------------------------------------------------------------------------------
// System Requirements Check
// ------------------------------------------------------------------------------
$phpVersionOk = version_compare(PHP_VERSION, '8.0.0', '>=');
$pdoOk = extension_loaded('pdo');
$pdoMysqlOk = extension_loaded('pdo_mysql');
$apiWritable = is_dir($apiDir) && is_writable($apiDir);
$allReqsOk = $phpVersionOk && $pdoOk && $pdoMysqlOk && $apiWritable;

// Check if already installed (.env exists)
$alreadyInstalled = file_exists($envFile);

// ------------------------------------------------------------------------------
// Helper: SQL Statement Splitter
// ------------------------------------------------------------------------------
function splitSqlStatements(string $sql): array {
    $statements = [];
    $buffer = '';
    $inSingleQuote = false;
    $inDoubleQuote = false;
    $len = strlen($sql);

    for ($i = 0; $i < $len; $i++) {
        $char = $sql[$i];
        $next = $i + 1 < $len ? $sql[$i + 1] : '';

        // Comments outside quotes
        if (!$inSingleQuote && !$inDoubleQuote) {
            if ($char === '-' && $next === '-') {
                $pos = strpos($sql, "\n", $i);
                $i = ($pos === false) ? $len : $pos;
                continue;
            }
            if ($char === '#') {
                $pos = strpos($sql, "\n", $i);
                $i = ($pos === false) ? $len : $pos;
                continue;
            }
            if ($char === '/' && $next === '*') {
                $pos = strpos($sql, "*/", $i);
                $i = ($pos === false) ? $len : $pos + 1;
                continue;
            }
        }

        // Quotes & Escapes
        if ($char === "'" && !$inDoubleQuote) {
            $escaped = false;
            $k = $i - 1;
            while ($k >= 0 && $sql[$k] === '\\') {
                $escaped = !$escaped;
                $k--;
            }
            if (!$escaped) {
                $inSingleQuote = !$inSingleQuote;
            }
        } elseif ($char === '"' && !$inSingleQuote) {
            $escaped = false;
            $k = $i - 1;
            while ($k >= 0 && $sql[$k] === '\\') {
                $escaped = !$escaped;
                $k--;
            }
            if (!$escaped) {
                $inDoubleQuote = !$inDoubleQuote;
            }
        }

        if ($char === ';' && !$inSingleQuote && !$inDoubleQuote) {
            $stmt = trim($buffer);
            if (!empty($stmt)) {
                $statements[] = $stmt;
            }
            $buffer = '';
        } else {
            $buffer .= $char;
        }
    }

    $stmt = trim($buffer);
    if (!empty($stmt)) {
        $statements[] = $stmt;
    }

    return $statements;
}

// ------------------------------------------------------------------------------
// Handle POST Installation Action
// ------------------------------------------------------------------------------
$errorMessage = null;
$successData = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'install') {
    if (!$allReqsOk) {
        $errorMessage = 'لا يمكن المتابعة: بيئة الخادم لا تستوفي المتطلبات البرمجية الأساسية.';
    } else {
        $dbHost = trim($_POST['db_host'] ?? 'localhost');
        $dbName = trim($_POST['db_name'] ?? '');
        $dbUser = trim($_POST['db_user'] ?? '');
        $dbPass = $_POST['db_pass'] ?? '';
        $adminUser = trim($_POST['admin_user'] ?? 'admin');
        $adminPass = trim($_POST['admin_pass'] ?? '');
        $adminPassConfirm = trim($_POST['admin_pass_confirm'] ?? '');
        $geminiKey = trim($_POST['gemini_api_key'] ?? '');
        $reinstallConfirm = trim($_POST['reinstall_confirm'] ?? '');

        // Validation 1: Reinstallation confirmation
        if ($alreadyInstalled && $reinstallConfirm !== 'REINSTALL') {
            $errorMessage = 'تم العثور على تثبيت مسبق. للمتابعة وإعادة التثبيت مع مسح البيانات، يجب كتابة كلمة REINSTALL بدقة في الحقل المخصص.';
        }
        // Validation 2: Required fields
        elseif (empty($dbHost) || empty($dbName) || empty($dbUser) || empty($adminUser) || empty($adminPass)) {
            $errorMessage = 'يرجى ملء جميع الحقول المطلوبة (بيانات قاعدة البيانات واسم مستخدم وكلمة مرور الأدمن).';
        }
        // Validation 3: Password policy
        elseif (strlen($adminPass) < 8 || !preg_match('/[a-zA-Z]/', $adminPass) || !preg_match('/\d/', $adminPass)) {
            $errorMessage = 'يجب ألا تقل كلمة مرور المدير عن 8 خانات وتحتوي على أرقام وحروف إنجليزية.';
        }
        // Validation 4: Password confirmation
        elseif ($adminPass !== $adminPassConfirm) {
            $errorMessage = 'كلمة مرور المدير وتأكيدها غير متطابقين.';
        }
        // Validation 5: SQL file existence
        elseif (!$sqlFile || !file_exists($sqlFile)) {
            $errorMessage = 'تعذر العثور على ملف مخطط قاعدة البيانات (database.sql). يرجى التأكد من رفعه في المجلد الرئيسي.';
        } else {
            // Step A: Test PDO Connection
            try {
                $dsn = "mysql:host={$dbHost};dbname={$dbName};charset=utf8mb4";
                $pdo = new PDO($dsn, $dbUser, $dbPass, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                ]);
            } catch (PDOException $e) {
                $rawMsg = $e->getMessage();
                $helpMsg = 'تعذر الاتصال بقاعدة البيانات. الأسباب الشائعة في Hostinger hPanel:<br>'
                    . '1. اسم قاعدة البيانات أو اسم المستخدم غير مطابق لما تم إنشاؤه في hPanel (غالباً يبدأ ببادئة مثل u123456789_).<br>'
                    . '2. لم يتم تعيين المستخدم إلى قاعدة البيانات أو لم تُمنح له كامل الصلاحيات (All Privileges).<br>'
                    . '3. كلمة المرور تحتوي على خطأ كتابي.<br>'
                    . '<strong>تفاصيل الخطأ:</strong> ' . htmlspecialchars($rawMsg);
                $errorMessage = $helpMsg;
            }

            // Step B: Import database.sql
            if (!$errorMessage && isset($pdo)) {
                try {
                    $sqlContent = file_get_contents($sqlFile);
                    if ($sqlContent === false || empty(trim($sqlContent))) {
                        throw new Exception('ملف database.sql فارغ أو لا يمكن قراءته.');
                    }

                    $statements = splitSqlStatements($sqlContent);
                    $pdo->exec("SET FOREIGN_KEY_CHECKS = 0;");
                    foreach ($statements as $stmt) {
                        $trimmed = trim($stmt);
                        if (!empty($trimmed)) {
                            $pdo->exec($trimmed);
                        }
                    }
                    $pdo->exec("SET FOREIGN_KEY_CHECKS = 1;");

                    // Step C: Set/Update Admin Account
                    $adminHash = password_hash($adminPass, PASSWORD_BCRYPT);
                    $checkAdmin = $pdo->prepare("SELECT id FROM admin_users WHERE username = :u LIMIT 1");
                    $checkAdmin->execute([':u' => $adminUser]);
                    if ($checkAdmin->fetch()) {
                        $upd = $pdo->prepare("UPDATE admin_users SET password_hash = :p WHERE username = :u");
                        $upd->execute([':p' => $adminHash, ':u' => $adminUser]);
                    } else {
                        $ins = $pdo->prepare("INSERT INTO admin_users (username, password_hash, email, created_at) VALUES (:u, :p, :email, NOW())");
                        $ins->execute([':u' => $adminUser, ':p' => $adminHash, ':email' => 'admin@hares-niqaa.com']);
                    }

                    // Count created tables
                    $tablesStmt = $pdo->query("SHOW TABLES");
                    $tables = $tablesStmt->fetchAll(PDO::FETCH_COLUMN);
                    $tableCount = count($tables);

                    // Step D: Generate TOKEN_SECRET and write api/.env
                    $tokenSecret = bin2hex(random_bytes(32));
                    $envLines = [
                        '# ==============================================================================',
                        '# Hares & Niqaa - Auto-generated Environment Configuration',
                        '# Generated on: ' . date('Y-m-d H:i:s T'),
                        '# ==============================================================================',
                        'DB_HOST=' . $dbHost,
                        'DB_PORT=3306',
                        'DB_NAME=' . $dbName,
                        'DB_USER=' . $dbUser,
                        'DB_PASS=' . $dbPass,
                        'TOKEN_SECRET=' . $tokenSecret,
                        'GEMINI_API_KEY=' . $geminiKey,
                        'ALLOWED_ORIGIN=',
                    ];
                    $envContent = implode("\n", $envLines) . "\n";
                    $writtenEnv = @file_put_contents($envFile, $envContent);
                    if ($writtenEnv === false) {
                        throw new Exception('تعذر كتابة ملف التكوين api/.env. يرجى التحقق من صلاحيات الكتابة للمجلد api (يجب أن تكون 755 أو 777).');
                    }

                    // Step E: Create api/install.lock
                    $lockData = "INSTALLED_AT=" . date('Y-m-d H:i:s') . "\nTABLES_COUNT=" . $tableCount . "\n";
                    @file_put_contents($lockFile, $lockData);

                    $successData = [
                        'dbName' => $dbName,
                        'dbHost' => $dbHost,
                        'dbUser' => $dbUser,
                        'tableCount' => $tableCount,
                        'adminUser' => $adminUser,
                    ];
                } catch (Throwable $ex) {
                    $errorMessage = 'حدث خطأ أثناء تنفيذ عملية التثبيت: ' . htmlspecialchars($ex->getMessage());
                }
            }
        }
    }
}

// ------------------------------------------------------------------------------
// View: Success Screen
// ------------------------------------------------------------------------------
if ($successData !== null) {
    $content = '
    <div class="header">
        <div style="width: 64px; height: 64px; margin: 0 auto 16px auto; background: rgba(16, 185, 129, 0.15); border: 2px solid #10B981; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #10B981;">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div class="brand-badge" style="color: #34D399; border-color: rgba(16, 185, 129, 0.3); background: rgba(16, 185, 129, 0.1);">
            تم التثبيت بنجاح تام!
        </div>
        <h1 class="title">مرحباً بك في موقع "حارس ونقاء"</h1>
        <p class="subtitle">تم تهيئة قاعدة البيانات وإنشاء الحساب الإداري وتوليد مفاتيح التشفير بنجاح.</p>
    </div>

    <div class="section-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        ملخص التثبيت
    </div>

    <table class="summary-table">
        <tr>
            <td>خادم قاعدة البيانات:</td>
            <td>' . htmlspecialchars($successData['dbHost']) . '</td>
        </tr>
        <tr>
            <td>اسم قاعدة البيانات:</td>
            <td>' . htmlspecialchars($successData['dbName']) . '</td>
        </tr>
        <tr>
            <td>مستخدم قاعدة البيانات:</td>
            <td>' . htmlspecialchars($successData['dbUser']) . '</td>
        </tr>
        <tr>
            <td>كلمة مرور قاعدة البيانات:</td>
            <td>••••••••</td>
        </tr>
        <tr>
            <td>عدد الجداول المستوردة:</td>
            <td style="color:#34D399; font-weight:700;">' . $successData['tableCount'] . ' جدول</td>
        </tr>
        <tr>
            <td>اسم مستخدم المدير:</td>
            <td>' . htmlspecialchars($successData['adminUser']) . '</td>
        </tr>
        <tr>
            <td>كلمة مرور المدير:</td>
            <td>••••••••</td>
        </tr>
        <tr>
            <td>توكن التشفير (TOKEN_SECRET):</td>
            <td style="color:#C9A961;">تم التوليد بنجاح ومشفر</td>
        </tr>
    </table>

    <div class="danger-box">
        <h4>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            تنبيه أمني هام جداً
        </h4>
        <p>
            تم قفل المعالج تلقائياً بإنشاء ملف <code>api/install.lock</code>. ولأقصى درجات الأمان وحماية بياناتك: 
            <strong>يرجى حذف ملف <code>install.php</code> الآن عبر File Manager</strong> في لوحة استضافة Hostinger.
        </p>
    </div>

    <div style="display:flex; flex-direction:column; gap:12px; margin-top:24px;">
        <a href="./admin" class="btn-primary" style="margin-top:0;">الدخول إلى لوحة التحكم (/admin)</a>
        <a href="./" class="btn-secondary">زيارة الواجهة الرئيسية للموقع</a>
    </div>';

    renderInstallerPage('اكتمل التثبيت بنجاح', $content);
    exit;
}

// ------------------------------------------------------------------------------
// View: Installation Form
// ------------------------------------------------------------------------------
ob_start();
?>

<div class="header">
    <div class="brand-badge">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        حارس ونقاء — معالج التثبيت الذكي
    </div>
    <h1 class="title">تهيئة الموقع وقاعدة البيانات</h1>
    <p class="subtitle">قم بإدخال بيانات الاتصال التي أنشأتها في Hostinger hPanel لتهيئة الموقع تلقائياً.</p>
</div>

<?php if ($errorMessage): ?>
    <div class="alert alert-error">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <div><?= $errorMessage ?></div>
    </div>
<?php endif; ?>

<!-- System Requirements Checklist -->
<div class="section-title">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
    فحص متطلبات بيئة الاستضافة
</div>

<ul class="requirements-list">
    <li class="requirement-item">
        <span>إصدار PHP (المطلوب 8.0 فما فوق — الحالي: <?= PHP_VERSION ?>)</span>
        <span class="<?= $phpVersionOk ? 'badge-pass' : 'badge-fail' ?>"><?= $phpVersionOk ? 'مستوفى ✓' : 'غير مدعوم ✗' ?></span>
    </li>
    <li class="requirement-item">
        <span>امتداد PDO الأساسي</span>
        <span class="<?= $pdoOk ? 'badge-pass' : 'badge-fail' ?>"><?= $pdoOk ? 'مفعل ✓' : 'غير متوفر ✗' ?></span>
    </li>
    <li class="requirement-item">
        <span>امتداد PDO MySQL للاتصال بقاعدة البيانات</span>
        <span class="<?= $pdoMysqlOk ? 'badge-pass' : 'badge-fail' ?>"><?= $pdoMysqlOk ? 'مفعل ✓' : 'غير متوفر ✗' ?></span>
    </li>
    <li class="requirement-item">
        <span>صلاحية الكتابة لمجلد API (لحفظ ملف التكوين .env)</span>
        <span class="<?= $apiWritable ? 'badge-pass' : 'badge-fail' ?>"><?= $apiWritable ? 'صالح للكتابة ✓' : 'غير قابل للكتابة ✗' ?></span>
    </li>
</ul>

<?php if (!$allReqsOk): ?>
    <div class="alert alert-error">
        يرجى التأكد من اختيار إصدار PHP 8.1 أو 8.2 وتفعيل امتدادات PDO و PDO_MYSQL عبر قائمة <strong>PHP Configuration</strong> في Hostinger hPanel.
    </div>
<?php endif; ?>

<?php if ($alreadyInstalled): ?>
    <div class="alert alert-warning">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        <div>
            <strong>تنبيه: التطبيق مثبت مسبقاً!</strong><br>
            تم العثور على ملف <code>api/.env</code>. إذا كنت ترغب في إعادة التثبيت ومسح البيانات القديمة، يجب تأكيد ذلك بكتابة <code>REINSTALL</code> في الحقل المخصص أدناه.
        </div>
    </div>
<?php endif; ?>

<form method="POST" id="installForm" onsubmit="return validateInstallForm()">
    <input type="hidden" name="action" value="install">

    <!-- Database Settings -->
    <div class="section-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
        بيانات قاعدة البيانات (MySQL)
    </div>

    <div class="grid-2">
        <div class="form-group">
            <label>خادم قاعدة البيانات (DB Host)</label>
            <input type="text" name="db_host" class="form-control ltr-input" value="<?= htmlspecialchars($_POST['db_host'] ?? 'localhost') ?>" required>
            <span class="field-hint">غالباً ما يكون <code>localhost</code> في استضافة Hostinger</span>
        </div>
        <div class="form-group">
            <label>اسم قاعدة البيانات (DB Name)</label>
            <input type="text" name="db_name" class="form-control ltr-input" placeholder="u123456789_hares" value="<?= htmlspecialchars($_POST['db_name'] ?? '') ?>" required>
            <span class="field-hint">كما يظهر تماماً في hPanel</span>
        </div>
    </div>

    <div class="grid-2">
        <div class="form-group">
            <label>اسم مستخدم قاعدة البيانات (DB User)</label>
            <input type="text" name="db_user" class="form-control ltr-input" placeholder="u123456789_admin" value="<?= htmlspecialchars($_POST['db_user'] ?? '') ?>" required>
        </div>
        <div class="form-group">
            <label>كلمة مرور قاعدة البيانات (DB Password)</label>
            <input type="password" name="db_pass" class="form-control ltr-input" placeholder="••••••••" required>
        </div>
    </div>

    <!-- Admin Account Settings -->
    <div class="section-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        حساب مشرف لوحة التحكم (Admin)
    </div>

    <div class="form-group">
        <label>اسم مستخدم المشرف</label>
        <input type="text" name="admin_user" class="form-control ltr-input" value="<?= htmlspecialchars($_POST['admin_user'] ?? 'admin') ?>" required>
    </div>

    <div class="grid-2">
        <div class="form-group">
            <label>كلمة مرور المشرف الجديدة</label>
            <input type="password" id="admin_pass" name="admin_pass" class="form-control ltr-input" placeholder="••••••••" required>
            <span class="field-hint">8 خانات على الأقل تتضمن أرقاماً وحروفاً</span>
        </div>
        <div class="form-group">
            <label>تأكيد كلمة المرور</label>
            <input type="password" id="admin_pass_confirm" name="admin_pass_confirm" class="form-control ltr-input" placeholder="••••••••" required>
        </div>
    </div>

    <!-- Optional Settings -->
    <div class="section-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        إعدادات إضافية (اختياري)
    </div>

    <div class="form-group">
        <label>مفتاح Google Gemini API Key</label>
        <input type="text" name="gemini_api_key" class="form-control ltr-input" placeholder="AIzaSy..." value="<?= htmlspecialchars($_POST['gemini_api_key'] ?? '') ?>">
        <span class="field-hint">اختياري: لتشغيل ميزات توليد المحتوى الذكي بالذكاء الاصطناعي</span>
    </div>

    <?php if ($alreadyInstalled): ?>
        <div class="form-group" style="margin-top: 20px; padding: 16px; background: rgba(239,68,68,0.1); border: 1px dashed rgba(239,68,68,0.4); border-radius: 12px;">
            <label style="color: #F87171; font-weight: 700;">تأكيد صريح لإعادة التثبيت (سيتم حذف الجداول وإعادة بنائها):</label>
            <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px;">يرجى كتابة كلمة <strong>REINSTALL</strong> بالإنجليزية لتأكيد الرغبة في إعادة التثبيت:</p>
            <input type="text" name="reinstall_confirm" id="reinstall_confirm" class="form-control ltr-input" placeholder="اكتب REINSTALL هنا" style="border-color: #EF4444;">
        </div>
    <?php endif; ?>

    <button type="submit" id="submitBtn" class="btn-primary" <?= !$allReqsOk ? 'disabled' : '' ?>>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        <span id="btnText">بدء التثبيت وتهيئة النظام</span>
    </button>
</form>

<script>
function validateInstallForm() {
    var p1 = document.getElementById('admin_pass').value.trim();
    var p2 = document.getElementById('admin_pass_confirm').value.trim();

    if (p1.length < 8 || !/[a-zA-Z]/.test(p1) || !/\d/.test(p1)) {
        alert('يجب أن تتكون كلمة مرور المدير من 8 خانات على الأقل وتحتوي على حروف وأرقام.');
        return false;
    }

    if (p1 !== p2) {
        alert('كلمة المرور وتأكيدها غير متطابقين.');
        return false;
    }

    <?php if ($alreadyInstalled): ?>
    var reconfirm = (document.getElementById('reinstall_confirm') ? document.getElementById('reinstall_confirm').value.trim() : '');
    if (reconfirm !== 'REINSTALL') {
        alert('يرجى كتابة REINSTALL بحروف كبيرة لتأكيد إعادة التثبيت ومسح البيانات.');
        return false;
    }
    <?php endif; ?>

    var btn = document.getElementById('submitBtn');
    var txt = document.getElementById('btnText');
    btn.disabled = true;
    txt.innerText = 'جارٍ الاتصال واستيراد قاعدة البيانات...';
    return true;
}
</script>

<?php
$content = ob_get_clean();
renderInstallerPage('معالج التثبيت', $content);
