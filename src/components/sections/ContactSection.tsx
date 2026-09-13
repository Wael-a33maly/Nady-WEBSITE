import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SectionHeading } from '../ui/SectionHeading';
import { LeafletMap } from '../ui/LeafletMap';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const ContactSection: React.FC = () => {
  const { lang, theme, settings, addInquiry } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    addInquiry({
      name,
      phone,
      email,
      subject: subject || (lang === 'ar' ? 'استفسار عام' : 'General Inquiry'),
      message,
    });

    setSentSuccess(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setEmail('');
      setSubject('');
      setMessage('');
      setSentSuccess(false);
    }, 4000);
  };

  const contactCards = [
    {
      icon: MapPin,
      titleAr: 'المقر الرئيسي',
      titleEn: 'Headquarters',
      detailAr: settings.addressAr,
      detailEn: settings.addressEn,
    },
    {
      icon: Phone,
      titleAr: 'الهاتف المباشر والطوارئ',
      titleEn: '24/7 Phone & Emergency',
      detailAr: `${settings.phone} / ${settings.phoneSecondary}`,
      detailEn: `${settings.phone} / ${settings.phoneSecondary}`,
      isPhone: true,
    },
    {
      icon: Mail,
      titleAr: 'البريد الإلكتروني الرسمى',
      titleEn: 'Official Email',
      detailAr: settings.email,
      detailEn: settings.email,
      isMail: true,
    },
    {
      icon: Clock,
      titleAr: 'ساعات العمل والإدارة',
      titleEn: 'HQ Operating Hours',
      detailAr: settings.workingHoursAr || 'غرفة العمليات: 24/7 | الإدارة: الأحد - الخميس 8 ص - 5 م',
      detailEn: settings.workingHoursEn || 'Command Center: 24/7 | Admin: Sun - Thu 8AM - 5PM',
    },
  ];

  return (
    <section id="contact" className={`py-24 relative transition-colors overflow-hidden ${
      theme === 'dark' ? 'bg-[#08121f]' : 'bg-slate-100/70'
    }`}>
      <div className="max-w-7xl 2xl:max-w-[1650px] 3xl:max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <SectionHeading
          badge={lang === 'ar' ? 'تواصل معنا' : 'Get In Touch'}
          badgeIcon={MessageSquare}
          title={lang === 'ar' ? 'نحن هنا بخدمتك على مدار الساعة' : 'Direct Line To Operations Command'}
          subtitle={
            lang === 'ar'
              ? 'تواصل معنا مباشرة عبر الهاتف، البريد، أو قم بزيارة مقراتنا الإقليمية في الرياض، جدة، والشرقية.'
              : 'Reach out to our regional command offices or drop a message below for prompt support.'
          }
        />

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14 mb-14">
          {contactCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className={`p-6 rounded-2xl border transition-all duration-300 space-y-4 group relative overflow-hidden flex flex-col justify-between ${
                  theme === 'dark'
                    ? 'bg-[#112236] border-[#C9A961]/30 shadow-xl shadow-black/40 hover:border-[#C9A961] hover:shadow-2xl hover:shadow-[#C9A961]/20'
                    : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50 hover:border-[#C9A961] hover:shadow-2xl'
                }`}
              >
                {/* Subtle top glow highlight on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9A961]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                <div className="space-y-3 relative z-10">
                  <div
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 shadow-lg ${
                      theme === 'dark'
                        ? 'bg-gradient-to-br from-[#1A314D] to-[#0F2338] border-[#C9A961]/50 text-[#C9A961] group-hover:bg-[#C9A961] group-hover:text-[#0B1929] group-hover:scale-110 shadow-[#C9A961]/15'
                        : 'bg-slate-100 border-[#C9A961]/40 text-[#C9A961] group-hover:bg-[#C9A961] group-hover:text-[#0B1929] group-hover:scale-110 shadow-slate-300/40'
                    }`}
                  >
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>

                  <h4 className={`font-black text-base group-hover:text-[#C9A961] transition-colors leading-snug ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    {lang === 'ar' ? card.titleAr : card.titleEn}
                  </h4>

                  <p className={`text-xs leading-relaxed font-semibold ${
                    theme === 'dark' ? 'text-slate-200' : 'text-slate-600'
                  }`}>
                    {lang === 'ar' ? card.detailAr : card.detailEn}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Map & Inquiry Form Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Map Column */}
          <motion.div
            initial={{ opacity: 0, x: lang === 'ar' ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`lg:col-span-6 rounded-3xl overflow-hidden border p-3 flex flex-col justify-between min-h-[420px] shadow-xl ${
              theme === 'dark'
                ? 'bg-[#112236] border-[#C9A961]/30 shadow-black/40'
                : 'bg-white border-slate-200 shadow-slate-200/50'
            }`}
          >
            <div className="relative w-full h-full min-h-[380px] rounded-2xl overflow-hidden">
              <LeafletMap />
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: lang === 'ar' ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`lg:col-span-6 rounded-3xl border p-8 sm:p-10 flex flex-col justify-between shadow-xl ${
              theme === 'dark'
                ? 'bg-[#112236] border-[#C9A961]/30 shadow-black/40'
                : 'bg-white border-slate-200 shadow-slate-200/50'
            }`}
          >
            <form onSubmit={handleSubmitInquiry} className="space-y-4">
              <h3 className={`text-2xl font-black ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                {lang === 'ar' ? 'أرسل استفسارك المباشر' : 'Send Quick Message'}
              </h3>

              {sentSuccess ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>
                    {lang === 'ar'
                      ? 'تم إرسال رسالتك بنجاح! وسيرد عليك ممثل الخدمة قريباً.'
                      : 'Your message has been received! Our support agent will reply shortly.'}
                  </span>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={lang === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
                      className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all focus:border-[#C9A961] focus:outline-none ${
                        theme === 'dark'
                          ? 'bg-[#0B1929] border border-[#C9A961]/30 text-white placeholder:text-slate-400 focus:bg-[#0F2338]'
                          : 'bg-slate-100 border border-slate-300 text-slate-900 placeholder:text-slate-500 focus:bg-white'
                      }`}
                    />

                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={lang === 'ar' ? 'رقم التواصل *' : 'Phone Number *'}
                      className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all focus:border-[#C9A961] focus:outline-none ${
                        theme === 'dark'
                          ? 'bg-[#0B1929] border border-[#C9A961]/30 text-white placeholder:text-slate-400 focus:bg-[#0F2338]'
                          : 'bg-slate-100 border border-slate-300 text-slate-900 placeholder:text-slate-500 focus:bg-white'
                      }`}
                      dir="ltr"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                      className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all focus:border-[#C9A961] focus:outline-none ${
                        theme === 'dark'
                          ? 'bg-[#0B1929] border border-[#C9A961]/30 text-white placeholder:text-slate-400 focus:bg-[#0F2338]'
                          : 'bg-slate-100 border border-slate-300 text-slate-900 placeholder:text-slate-500 focus:bg-white'
                      }`}
                      dir="ltr"
                    />

                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder={lang === 'ar' ? 'موضوع الاستفسار' : 'Subject'}
                      className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all focus:border-[#C9A961] focus:outline-none ${
                        theme === 'dark'
                          ? 'bg-[#0B1929] border border-[#C9A961]/30 text-white placeholder:text-slate-400 focus:bg-[#0F2338]'
                          : 'bg-slate-100 border border-slate-300 text-slate-900 placeholder:text-slate-500 focus:bg-white'
                      }`}
                    />
                  </div>

                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={lang === 'ar' ? 'اكتب رسالتك أو استفسارك هنا...' : 'Type your message here...'}
                    className={`w-full rounded-xl p-4 text-sm font-semibold transition-all focus:border-[#C9A961] focus:outline-none resize-none ${
                      theme === 'dark'
                        ? 'bg-[#0B1929] border border-[#C9A961]/30 text-white placeholder:text-slate-400 focus:bg-[#0F2338]'
                        : 'bg-slate-100 border border-slate-300 text-slate-900 placeholder:text-slate-500 focus:bg-white'
                    }`}
                  />

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl gold-gradient-bg text-[#0B1929] font-black text-sm flex items-center justify-center gap-2 cursor-pointer hover:brightness-110 shadow-lg shadow-[#C9A961]/20 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'إرسال الرسالة الآن' : 'Send Message Now'}</span>
                  </button>
                </>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
