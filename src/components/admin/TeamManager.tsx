import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TeamMember } from '../../types';
import { Plus, Edit2, Trash2, Users, Mail, Phone, Linkedin, X } from 'lucide-react';
import { ImageUploadInput } from '../common/ImageUploadInput';

export const TeamManager: React.FC = () => {
  const { lang, team, addTeamMember, updateTeamMember, deleteTeamMember } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);

  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [roleAr, setRoleAr] = useState('');
  const [roleEn, setRoleEn] = useState('');
  const [image, setImage] = useState('');
  const [bioAr, setBioAr] = useState('');
  const [bioEn, setBioEn] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');

  const openAddModal = () => {
    setEditingMemberId(null);
    setNameAr('');
    setNameEn('');
    setRoleAr('');
    setRoleEn('');
    setImage('https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80');
    setBioAr('');
    setBioEn('');
    setEmail('');
    setLinkedin('');
    setIsModalOpen(true);
  };

  const openEditModal = (member: TeamMember) => {
    setEditingMemberId(member.id);
    setNameAr(member.nameAr);
    setNameEn(member.nameEn);
    setRoleAr(member.roleAr);
    setRoleEn(member.roleEn);
    setImage(member.image);
    setBioAr(member.bioAr);
    setBioEn(member.bioEn);
    setEmail(member.email || '');
    setLinkedin(member.linkedin || '');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameAr || !roleAr) return;

    if (editingMemberId) {
      updateTeamMember(editingMemberId, {
        nameAr,
        nameEn: nameEn || nameAr,
        roleAr,
        roleEn: roleEn || roleAr,
        image: image || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
        bioAr,
        bioEn: bioEn || bioAr,
        email,
        linkedin,
      });
    } else {
      addTeamMember({
        id: `team-${Date.now()}`,
        nameAr,
        nameEn: nameEn || nameAr,
        roleAr,
        roleEn: roleEn || roleAr,
        image: image || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
        bioAr,
        bioEn: bioEn || bioAr,
        email,
        linkedin,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 text-slate-900 dark:text-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-arabic">
            {lang === 'ar' ? 'إدارة فريق العمل القيادي (Leadership Team)' : 'Leadership Team Manager'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'ar'
              ? 'إضافة وتعديل وحذف القيادات والتخصصات الميدانية والإدارية المعروضة في قسم فريق العمل.'
              : 'Add, update, or remove executive leadership and operational managers featured on the site.'}
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl gold-gradient-bg text-[#0B1929] text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md hover:brightness-105 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{lang === 'ar' ? 'إضافة قائد جديد' : 'Add Executive Leader'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <div
            key={member.id}
            className="p-6 rounded-2xl bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm flex flex-col justify-between hover:border-[#C9A961]/40 transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={member.image}
                  alt={member.nameAr}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#C9A961]/40 shadow-md"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {lang === 'ar' ? member.nameAr : member.nameEn}
                  </h4>
                  <p className="text-xs text-[#C9A961] font-semibold mt-0.5">
                    {lang === 'ar' ? member.roleAr : member.roleEn}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                {lang === 'ar' ? member.bioAr : member.bioEn}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-slate-500 text-xs">
                {member.email && (
                  <a href={`mailto:${member.email}`} className="hover:text-[#C9A961]">
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#C9A961]">
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(member)}
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-[#C9A961]/20 text-slate-700 dark:text-slate-300 hover:text-[#C9A961] transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteTeamMember(member.id)}
                  className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TEAM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl text-slate-900 dark:text-white max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-lg font-bold">
                {editingMemberId ? (lang === 'ar' ? 'تعديل بيانات القائد' : 'Edit Executive Profile') : (lang === 'ar' ? 'إضافة قائد جديد' : 'Add Executive Profile')}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1">{lang === 'ar' ? 'الاسم بالكامل (بالعربية) *' : 'Full Name (Arabic)'}</label>
                  <input
                    type="text"
                    required
                    value={nameAr}
                    onChange={(e) => setNameAr(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 focus:border-[#C9A961] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">{lang === 'ar' ? 'الاسم بالكامل (بالإنجليزية)' : 'Full Name (English)'}</label>
                  <input
                    type="text"
                    value={nameEn}
                    onChange={(e) => setNameEn(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 focus:border-[#C9A961] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">{lang === 'ar' ? 'المسمى الوظيفي (بالعربية) *' : 'Role / Position (Arabic)'}</label>
                  <input
                    type="text"
                    required
                    value={roleAr}
                    onChange={(e) => setRoleAr(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 focus:border-[#C9A961] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">{lang === 'ar' ? 'المسمى الوظيفي (بالإنجليزية)' : 'Role / Position (English)'}</label>
                  <input
                    type="text"
                    value={roleEn}
                    onChange={(e) => setRoleEn(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 focus:border-[#C9A961] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">{lang === 'ar' ? 'نبذة عن الخبرة والإنجازات (بالعربية)' : 'Bio / Background (Arabic)'}</label>
                <textarea
                  rows={3}
                  value={bioAr}
                  onChange={(e) => setBioAr(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-4 focus:border-[#C9A961] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">{lang === 'ar' ? 'نبذة عن الخبرة والإنجازات (بالإنجليزية)' : 'Bio / Background (English)'}</label>
                <textarea
                  rows={3}
                  value={bioEn}
                  onChange={(e) => setBioEn(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-4 focus:border-[#C9A961] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 focus:border-[#C9A961] focus:outline-none"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">{lang === 'ar' ? 'رابط لينكد إن' : 'LinkedIn Profile URL'}</label>
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 focus:border-[#C9A961] focus:outline-none"
                    dir="ltr"
                  />
                </div>
              </div>

              <ImageUploadInput
                label={lang === 'ar' ? 'الصورة الشخصية' : 'Profile Image'}
                value={image}
                onChange={setImage}
              />

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl gold-gradient-bg text-[#0B1929] font-black"
                >
                  {lang === 'ar' ? 'حفظ البيانات' : 'Save Executive'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
