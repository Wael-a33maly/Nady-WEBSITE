# خطة تحويل موقع "حارس ونقاء" إلى استضافة مشتركة (PHP 8.x + MySQL)

## 1. هيكل قاعدة البيانات (MySQL Database Schema)

| اسم الجدول | الوظيفة | الحقول الأساسية |
|---|---|---|
| `admin_users` | حسابات المدراء المشفرة | `id`, `username`, `password_hash`, `email`, `created_at` |
| `admin_tokens` | جلسات التوكن المشفرة للأدمن | `id`, `user_id`, `token`, `expires_at`, `created_at` |
| `settings` | إعدادات الموقع، الهوية، الألوان | `id`, `company_name_ar`, `company_name_en`, `phone`, `email`, `hero_slides` (JSON), `colors`, ... |
| `services` | خدمات الحراسة والنظافة | `id`, `title_ar`, `title_en`, `desc_ar`, `desc_en`, `category`, `icon_name`, `features_ar` (JSON), `image`, `popular` |
| `projects` | المشاريع وسجل الإنجازات | `id`, `title_ar`, `title_en`, `category`, `client_ar`, `location_ar`, `image`, `stats_ar`, `subsidiary_id` |
| `team` | فريق العمل والقيادات | `id`, `name_ar`, `name_en`, `role_ar`, `role_en`, `image`, `bio_ar`, `email`, `phone`, `linkedin` |
| `subsidiaries` | الشركات التابعة للمجموعة | `id`, `name_ar`, `name_en`, `category`, `logo_url`, `hero_image`, `description_ar`, `services_ar` (JSON), `stats` |
| `subsidiary_categories`| تصنيفات الشركات التابعة | `id`, `name_ar`, `name_en`, `sort_order` |
| `why_us_features` | مميزات "لماذا نحن" | `id`, `icon_name`, `title_ar`, `title_en`, `desc_ar`, `desc_en`, `badge_ar` |
| `quotes` | طلبات عروض الأسعار المستلمة | `id`, `service_category`, `service_name`, `property_area`, `company_name`, `contact_name`, `phone`, `email`, `status` |
| `inquiries` | رسائل اتصل بنا والاستفسارات | `id`, `name`, `phone`, `email`, `subject`, `message`, `status`, `created_at` |
| `job_positions` | الوظائف الشاغرة المتاحة | `id`, `title_ar`, `department_ar`, `location_ar`, `type_ar`, `requirements_ar` (JSON), `active` |
| `job_applications` | طلبات التوظيف والسير الذاتية | `id`, `job_position_id`, `job_title`, `applicant_name`, `email`, `phone`, `cv_file_data`, `status` |
| `client_logos` | شعارات شركاء النجاح | `id`, `name`, `logo_url`, `category`, `sort_order` |
| `testimonials` | آراء العملاء والتقييمات | `id`, `name_ar`, `company_ar`, `avatar`, `content_ar`, `rating`, `service_type` |

---

## 2. نقاط النهاية للـ API (RESTful Endpoints)

### أ. الواجهات العامة للزوار (Public Endpoints)
- `GET /api/content.php` : يجلب جميع محتويات الموقع المحدثة دفعة واحدة (Settings, Services, Projects, Team, Subsidiaries, Features, Jobs, Logos, Testimonials).
- `POST /api/quotes.php` : إرسال طلب عرض سعر مع التحقق من المدخلات، حماية ضد الـ Spam وحفظ الـ IP.
- `POST /api/inquiries.php` : إرسال رسالة تواصل واستفسار.
- `POST /api/job_applications.php` : إرسال طلب توظيف مع السيرة الذاتية (Base64/ملف).
- `POST /api/gemini.php` : واجهة وسيطة آمنة (Server Proxy) لأي استعلام ذكاء اصطناعي دون كشف المفتاح للعميل.

### ب. مصادقة الأدمن (Authentication Endpoints)
- `POST /api/auth.php?action=login` : التحقق من اسم المستخدم وكلمة المرور عبر `password_verify` وإنشاء توكن آمن مع تاريخ انتهاء.
- `POST /api/auth.php?action=check` : التحقق من صلاحية التوكن المخزن.
- `POST /api/auth.php?action=logout` : إنهاء الجلسة وإبطال التوكن.
- `POST /api/auth.php?action=change_password` : تغيير كلمة مرور المسؤول بعد التحقق من التوكن.

### ج. واجهات إدارة المحتوى للأدمن (Admin CRUD Endpoints - محمية بالتوكن `Authorization: Bearer <token>`)
- `GET/PUT/DELETE /api/quotes.php` : جلب الطلبات، تحديث حالة الطلب، الحذف.
- `GET/PUT/DELETE /api/inquiries.php` : جلب الرسائل، تحديث حالة القراءة، الحذف.
- `GET/PUT/DELETE /api/job_applications.php` : جلب طلبات التوظيف، تحديث الحالة، الحذف.
- `PUT /api/settings.php` : تحديث إعدادات وهوية الموقع وألوانه وسلايدراته.
- `POST/PUT/DELETE /api/services.php` : إضافة / تعديل / حذف خدمة.
- `POST/PUT/DELETE /api/projects.php` : إضافة / تعديل / حذف مشروع.
- `POST/PUT/DELETE /api/team.php` : إضافة / تعديل / حذف عضو فريق.
- `POST/PUT/DELETE /api/subsidiaries.php` : إضافة / تعديل / حذف شركة تابعة.
- `POST/PUT/DELETE /api/subsidiary_categories.php` : إدارة تصنيفات الشركات.
- `POST/PUT/DELETE /api/why_us.php` : إدارة بنود لماذا نحن.
- `POST/PUT/DELETE /api/job_positions.php` : إدارة الوظائف الشاغرة.
- `POST/PUT/DELETE /api/client_logos.php` : إدارة شعارات العملاء.
- `POST/PUT/DELETE /api/testimonials.php` : إدارة التقييمات.

---

## 3. معمارية ملفات السيرفر والنشر
1. `api/config.php` : إعدادات قاعدة البيانات والمتغيرات مع قراءة آمنة من `getenv()` أو القيم الافتراضية.
2. `api/db.php` : محرك اتصال PDO نقي، UTF-8 mb4، وتهيئة مخرجات JSON ورؤوس CORS والأمان.
3. `api/auth_middleware.php` : دالة فحص التوكن `requireAdmin()`.
4. `database.sql` : السكيما الكاملة مع زراعة البيانات الافتراضية الأولية وحساب الأدمن المشفر (`admin` / `admin123`).
5. `public/.htaccess` : توجيه React SPA History Fallback، حماية الملفات الحساسة (`.sql`, `.env`, `.json`) وتفعيل الكاشينغ.
6. `src/services/api.ts` : طبقة الاتصال البرمجية المتكاملة مع الواجهة الأمامية مع خاصية الـ Fallback في بيئة التطوير.
7. `DEPLOYMENT.md` : خطوات النشر السلسة على Hostinger hPanel.
