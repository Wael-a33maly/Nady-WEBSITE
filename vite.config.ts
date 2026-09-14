import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

function apiDevPlugin(): Plugin {
  return {
    name: 'api-dev-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/')) {
          return next();
        }

        const url = new URL(req.url, 'http://localhost:3000');
        const pathname = url.pathname;
        const action = url.searchParams.get('action') || '';

        const chunks: Buffer[] = [];
        req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        req.on('end', () => {
          let parsed: Record<string, unknown> = {};
          if (chunks.length > 0) {
            try {
              const bodyStr = Buffer.concat(chunks).toString('utf-8');
              parsed = JSON.parse(bodyStr);
            } catch {
              parsed = {};
            }
          }

          res.setHeader('Content-Type', 'application/json; charset=utf-8');

          // Auth endpoint: /api/auth.php
          if (pathname === '/api/auth.php') {
            if (action === 'login') {
              const pass = String(parsed.password || '').trim();
              if (pass === 'admin123' || pass === 'admin') {
                res.statusCode = 200;
                res.end(
                  JSON.stringify({
                    success: true,
                    token: 'dev-token-' + Date.now(),
                    user: { id: 1, username: 'admin', email: 'admin@hares-niqaa.com' },
                    message: 'تم تسجيل الدخول بنجاح.',
                  })
                );
              } else {
                res.statusCode = 401;
                res.end(
                  JSON.stringify({
                    success: false,
                    error: 'كلمة المرور غير صحيحة.',
                  })
                );
              }
              return;
            }

            if (action === 'check') {
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, valid: true }));
              return;
            }

            if (action === 'logout') {
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true }));
              return;
            }

            if (action === 'change_password') {
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, message: 'تم تحديث كلمة المرور بنجاح.' }));
              return;
            }
          }

          // Content endpoint: /api/content.php
          if (pathname === '/api/content.php') {
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, message: 'تم حفظ البيانات بنجاح.' }));
            return;
          }

          // Quotes, Inquiries, Job Applications:
          if (
            pathname === '/api/quotes.php' ||
            pathname === '/api/inquiries.php' ||
            pathname === '/api/job_applications.php'
          ) {
            res.statusCode = 200;
            res.end(
              JSON.stringify({
                success: true,
                message: 'تم استلام البيانات بنجاح.',
                quotes: [],
                inquiries: [],
                jobApplications: [],
              })
            );
            return;
          }

          next();
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiDevPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
