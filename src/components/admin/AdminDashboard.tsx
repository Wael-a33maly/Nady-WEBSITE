import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  MessageSquare,
  ShieldCheck,
  Building,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { lang, quotes, inquiries, services, projects, team } = useApp();

  const totalQuotes = quotes.length;
  const newQuotesCount = quotes.filter((q) => q.status === 'new').length;
  const unreadInquiriesCount = inquiries.filter((i) => i.status === 'unread').length;

  // Chart Data
  const monthlyDemandData = [
    { month: 'Jan', security: 12, cleaning: 18 },
    { month: 'Feb', security: 19, cleaning: 22 },
    { month: 'Mar', security: 25, cleaning: 31 },
    { month: 'Apr', security: 30, cleaning: 28 },
    { month: 'May', security: 42, cleaning: 45 },
    { month: 'Jun', security: 55, cleaning: 58 },
  ];

  const categoryDistribution = [
    { name: lang === 'ar' ? 'أمن وحراسة' : 'Security', value: 45, color: '#C9A961' },
    { name: lang === 'ar' ? 'نظافة وتطهير' : 'Cleaning', value: 35, color: '#1E40AF' },
    { name: lang === 'ar' ? 'حلول متكاملة' : 'Integrated', value: 20, color: '#10B981' },
  ];

  return (
    <div className="space-y-8 text-slate-900 dark:text-white">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-arabic">
          {lang === 'ar' ? 'نظرة عامة على لوحة القيادة (Overview Dashboard)' : 'Executive Analytics Dashboard'}
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
          {lang === 'ar'
            ? 'تحليلات الطلبات المباشرة، نمو العقود السنوية، وحالة التجاوب الميداني.'
            : 'Operational metrics, proposal velocity, and request analytics.'}
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 space-y-3 relative overflow-hidden shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {lang === 'ar' ? 'إجمالي الطلبات' : 'Total Proposals'}
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#C9A961]/10 text-[#C9A961] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">{totalQuotes}</div>
          <div className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{newQuotesCount} {lang === 'ar' ? 'طلبات جديدة تحتاج مراجعة' : 'new requests pending'}</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 space-y-3 relative overflow-hidden shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {lang === 'ar' ? 'رسائل الاستفسار' : 'Contact Messages'}
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">{inquiries.length}</div>
          <div className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
            {unreadInquiriesCount} {lang === 'ar' ? 'رسالة غير مقروءة' : 'unread messages'}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 space-y-3 relative overflow-hidden shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {lang === 'ar' ? 'الخدمات المتاحة' : 'Active Services'}
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">{services.length}</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'موزعة بين الأمن والنظافة' : 'Catalog services'}</div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 space-y-3 relative overflow-hidden shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {lang === 'ar' ? 'الكادر والمشرفين' : 'Operational Staff'}
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">2,450+</div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>99.8% {lang === 'ar' ? 'معدل التواجد الميداني' : 'Attendance Rate'}</span>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Area Chart Demand Velocity */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              {lang === 'ar' ? 'نمو طلبات العقود الشهرية (Security vs Cleaning)' : 'Monthly Proposal Growth Velocity'}
            </h3>
            <span className="text-xs font-mono text-[#C9A961]">H1 2026 Trend</span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyDemandData}>
                <defs>
                  <linearGradient id="colorSecurity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C9A961" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#C9A961" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCleaning" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#1E40AF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B1929',
                    borderColor: '#C9A961',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="security" stroke="#C9A961" fillOpacity={1} fill="url(#colorSecurity)" name="Security" />
                <Area type="monotone" dataKey="cleaning" stroke="#3B82F6" fillOpacity={1} fill="url(#colorCleaning)" name="Cleaning" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart Distribution */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col justify-between shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            {lang === 'ar' ? 'توزيع الطلبات حسب القطاع' : 'Demands By Sector'}
          </h3>

          <div className="h-56 w-full my-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B1929',
                    borderColor: '#C9A961',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
            {categoryDistribution.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600 dark:text-slate-300">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Quotes Quick Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 dark:text-white text-base font-arabic">
            {lang === 'ar' ? 'أحدث طلبات عروض الأسعار' : 'Recent Proposal Submissions'}
          </h3>
        </div>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-start">
            <thead className="bg-slate-100 dark:bg-[#0B1929] text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-mono">
              <tr>
                <th className="p-3 text-start">Company</th>
                <th className="p-3 text-start">Service</th>
                <th className="p-3 text-start">Area / Scale</th>
                <th className="p-3 text-start">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {quotes.slice(0, 4).map((q) => (
                <tr key={q.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{q.companyName}</td>
                  <td className="p-3 text-slate-700 dark:text-slate-300">{q.serviceName}</td>
                  <td className="p-3 text-slate-500 dark:text-slate-400">{q.propertyArea}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase">
                      {q.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
