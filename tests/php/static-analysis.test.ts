import fs from 'fs';
import path from 'path';
import { describe, it, expect } from 'vitest';

describe('PHP & Installer Static Security Analysis (Task 5)', () => {
  const rootDir = process.cwd();
  const installPhpPath = path.join(rootDir, 'public', 'install.php');
  const rootHtaccessPath = path.join(rootDir, '.htaccess');
  const publicHtaccessPath = path.join(rootDir, 'public', '.htaccess');
  const rootDatabaseSqlPath = path.join(rootDir, 'database.sql');
  const publicDatabaseSqlPath = path.join(rootDir, 'public', 'database.sql');

  const installPhpContent = fs.readFileSync(installPhpPath, 'utf8');

  it('1. install.php verifies file_exists($lockFile) before executing any write/POST action', () => {
    // Must declare lockFile
    expect(installPhpContent).toMatch(/\$lockFile\s*=\s*\$apiDir\s*\.\s*['"]\/install\.lock['"]/);

    // Must check file_exists($lockFile) at step 0 early
    expect(installPhpContent).toMatch(/if\s*\(\s*file_exists\(\$lockFile\)\s*\)/);

    // Verify lock check occurs BEFORE handling POST actions ($action === 'install' or $_POST)
    const lockCheckIndex = installPhpContent.indexOf('file_exists($lockFile)');
    const postHandleIndex = installPhpContent.indexOf("$_POST['action']");

    expect(lockCheckIndex).toBeGreaterThan(-1);
    expect(postHandleIndex).toBeGreaterThan(-1);
    expect(lockCheckIndex).toBeLessThan(postHandleIndex);
  });

  it('2. On successful installation, install.lock is written with non-empty content before rendering success screen', () => {
    // Must call file_put_contents on $lockFile
    expect(installPhpContent).toMatch(/file_put_contents\(\$lockFile,\s*\$lockData\)/);

    // Must define non-empty lock data
    expect(installPhpContent).toMatch(/\$lockData\s*=\s*/);

    // Lock file write must occur before rendering success screen
    const lockWriteIndex = installPhpContent.indexOf('file_put_contents($lockFile');
    const successRenderIndex = installPhpContent.indexOf("renderInstallerPage('اكتمل التثبيت بنجاح'");

    expect(lockWriteIndex).toBeGreaterThan(-1);
    expect(successRenderIndex).toBeGreaterThan(-1);
    expect(lockWriteIndex).toBeLessThan(successRenderIndex);
  });

  it('3. Sensitive data masking: neither $dbPass nor $tokenSecret is echoed/printed in HTML output', () => {
    // Verify that $dbPass is never echoed or concatenated into HTML
    expect(installPhpContent).not.toMatch(/echo\s+[^;]*\$dbPass/i);
    expect(installPhpContent).not.toMatch(/<\?=\s*\$dbPass/i);
    expect(installPhpContent).not.toMatch(/htmlspecialchars\(\$dbPass\)/i);

    // Verify that $tokenSecret is masked in success summary
    expect(installPhpContent).not.toMatch(/<td>\s*<\?=\s*htmlspecialchars\(\$tokenSecret\)/i);
    expect(installPhpContent).not.toMatch(/<td>\s*<\?=\s*\$tokenSecret/i);
    expect(installPhpContent).toMatch(/••••••••/); // Password masked
    expect(installPhpContent).toMatch(/تم التوليد بنجاح ومشفر/); // Secret masked
  });

  it('4. Admin password is encrypted via password_hash(..., PASSWORD_BCRYPT) exclusively', () => {
    expect(installPhpContent).toMatch(/password_hash\(\s*\$adminPass\s*,\s*PASSWORD_BCRYPT\s*\)/);
    // Ensure no insecure md5 or sha1 is used for admin passwords
    expect(installPhpContent).not.toMatch(/md5\(\s*\$adminPass/i);
    expect(installPhpContent).not.toMatch(/sha1\(\s*\$adminPass/i);
  });

  it('5. .htaccess blocks direct access to install.lock and blocks requests to install.php if lock exists', () => {
    const htaccessFiles = [rootHtaccessPath, publicHtaccessPath].filter(fs.existsSync);
    expect(htaccessFiles.length).toBeGreaterThan(0);

    for (const htPath of htaccessFiles) {
      const content = fs.readFileSync(htPath, 'utf8');

      // Must block install.lock in FilesMatch
      expect(content).toMatch(/<FilesMatch[\s\S]*install\\?\.lock[\s\S]*Require all denied[\s\S]*<\/FilesMatch>/);

      // Must have rewrite condition blocking install.php when install.lock exists
      expect(content).toMatch(/RewriteCond[\s\S]*install\.lock\s+-f/);
      expect(content).toMatch(/RewriteRule\s+\^install\\?\.php\$\s+-\s+\[F,L\]/);
    }
  });

  it('6. database.sql and public/database.sql do not contain old broken hash TxfadOlQ and contain valid bcrypt hash $2y$10$HnhGRYVM', () => {
    const sqlFiles = [rootDatabaseSqlPath, publicDatabaseSqlPath].filter(fs.existsSync);
    expect(sqlFiles.length).toBe(2);

    for (const sqlPath of sqlFiles) {
      const content = fs.readFileSync(sqlPath, 'utf8');

      // Must NOT contain old broken hash
      expect(content).not.toContain('TxfadOlQ');

      // Must contain correct initial bcrypt hash
      expect(content).toContain('$2y$10$HnhGRYVM');
    }
  });
});
