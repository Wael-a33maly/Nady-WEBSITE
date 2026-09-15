import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { describe, it, expect, beforeAll } from 'vitest';

describe('Production Build Audit (Task 6)', () => {
  const rootDir = process.cwd();
  const distDir = path.join(rootDir, 'dist');
  const assetsDir = path.join(distDir, 'assets');

  beforeAll(() => {
    // Ensure dist directory exists; build if not already built
    if (!fs.existsSync(distDir) || !fs.existsSync(assetsDir)) {
      execSync('npm run build', { stdio: 'pipe' });
    }
  });

  it('1. Critical distribution files exist in dist/', () => {
    const requiredFiles = [
      'install.php',
      'database.sql',
      '.htaccess',
      'index.html',
    ];

    for (const file of requiredFiles) {
      const fullPath = path.join(distDir, file);
      expect(
        fs.existsSync(fullPath),
        `Expected file ${file} to exist in dist/`
      ).toBe(true);

      const stats = fs.statSync(fullPath);
      expect(stats.size).toBeGreaterThan(0);
    }
  });

  it('2. API backend directory and PHP files exist in dist/api/', () => {
    const apiDistDir = path.join(distDir, 'api');
    expect(
      fs.existsSync(apiDistDir),
      'Expected dist/api directory to exist'
    ).toBe(true);

    const requiredApiFiles = [
      'auth.php',
      'auth_middleware.php',
      'client_logos.php',
      'config.php',
      'content.php',
      'db.php',
      'gemini.php',
      'inquiries.php',
      'job_applications.php',
      'job_positions.php',
      'projects.php',
      'quotes.php',
      'services.php',
      'settings.php',
      'subsidiaries.php',
      'subsidiary_categories.php',
      'team.php',
      'testimonials.php',
      'why_us.php',
    ];

    for (const file of requiredApiFiles) {
      const filePath = path.join(apiDistDir, file);
      expect(
        fs.existsSync(filePath),
        `Expected ${file} to exist in dist/api/`
      ).toBe(true);

      const stats = fs.statSync(filePath);
      expect(stats.size).toBeGreaterThan(0);
    }
  });

  it('3. Production JS bundles in dist/assets/ do NOT contain forbidden/sensitive strings', () => {
    const assetFiles = fs.readdirSync(assetsDir);
    const jsFiles = assetFiles.filter((f) => f.endsWith('.js'));

    expect(jsFiles.length).toBeGreaterThan(0);

    const forbiddenStrings = [
      'admin123',
      '240be518fabd',
      '8c6976e5b541',
      'dev-offline-session',
      'DB_PASS=',
      'TOKEN_SECRET=',
    ];

    for (const jsFile of jsFiles) {
      const content = fs.readFileSync(path.join(assetsDir, jsFile), 'utf8');

      for (const forbidden of forbiddenStrings) {
        expect(
          content.includes(forbidden),
          `Production bundle ${jsFile} must NOT contain sensitive string: "${forbidden}"`
        ).toBe(false);
      }
    }
  });
});
