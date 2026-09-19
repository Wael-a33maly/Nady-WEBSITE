import React from 'react';
import { useApp } from '../../context/AppContext';
import { SectionHeading } from '../ui/SectionHeading';
import { Users } from 'lucide-react';
import { TeamCard } from './TeamCard';

export const TeamSection: React.FC = () => {
  const { lang, team } = useApp();

  return (
    <section id="team" className="py-24 relative bg-slate-50 dark:bg-[#0B1929] transition-colors overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-[1650px] 3xl:max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <SectionHeading
          badge={lang === 'ar' ? 'فريق العمل القيادي' : 'Leadership & Experts'}
          badgeIcon={Users}
          title={lang === 'ar' ? 'خبرات ميدانية وعسكرية وإدارية تقود التميز' : 'Commanders & Operations Strategists'}
          subtitle={
            lang === 'ar'
              ? 'يقود شركتنا نخب من القادة والمختصين في التخطيط الأمني الميداني وإدارة معايير النظافة والبيئة.'
              : 'Our executive team brings military, environmental, and corporate facility management command.'
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {team.map((member, idx) => (
            <TeamCard key={member.id} member={member} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

