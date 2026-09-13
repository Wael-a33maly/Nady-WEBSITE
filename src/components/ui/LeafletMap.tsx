import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, ExternalLink, Building, Shield } from 'lucide-react';

interface LeafletMapProps {
  address?: string;
  popupTitle?: string;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  address: customAddress,
}) => {
  const { lang, settings } = useApp();

  const currentAddress = customAddress || (lang === 'ar' ? settings.addressAr : settings.addressEn);
  const companyName = lang === 'ar' ? settings.companyNameAr : settings.companyNameEn;

  // Google Maps embed URL dynamically generated from current settings address
  const googleMapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(currentAddress)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  const externalGoogleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentAddress)}`;

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden group shadow-xl border border-slate-200 dark:border-slate-800">
      {/* Live Dynamic Google Map Frame based on Admin Settings address */}
      <iframe
        title="Company Headquarters Map"
        width="100%"
        height="100%"
        className="w-full h-full min-h-[400px] border-0 filter dark:contrast-125 dark:brightness-90 transition-all duration-300"
        loading="lazy"
        allowFullScreen
        src={googleMapEmbedUrl}
      />

      {/* Pulsating Glowing Emerald Circular Company Logo Marker Pin */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 flex flex-col items-center">
        <div className="relative group">
          {/* Outer Pulsating Emerald Ripple Aura */}
          <div className="absolute -inset-3 rounded-full bg-emerald-500/40 animate-ping" />
          <div className="absolute -inset-1 rounded-full bg-emerald-400/30 blur-md animate-pulse" />

          {/* Circular Container with Glowing Emerald Border */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0B1929] border-2 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.95)] flex items-center justify-center p-1.5 transition-all overflow-hidden">
            {settings.logoUrl ? (
              <img
                src={settings.logoUrl}
                alt={companyName}
                className="w-full h-full object-contain rounded-full"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-[#C9A961]">
                <Shield className="w-7 h-7 stroke-[2.2]" />
              </div>
            )}
          </div>
        </div>

        {/* Pin Pointer Arrow */}
        <div className="w-0 h-0 border-x-[8px] border-x-transparent border-t-[10px] border-t-emerald-400 drop-shadow-[0_2px_8px_rgba(16,185,129,0.8)] -mt-0.5" />
      </div>

      {/* Dynamic Address Overlay Card */}
      <div className="absolute top-4 right-4 left-4 sm:left-auto sm:max-w-sm bg-slate-900/95 border border-[#C9A961]/50 backdrop-blur-md p-4 rounded-2xl shadow-2xl text-white space-y-3 z-20 transition-all">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl gold-gradient-bg flex items-center justify-center text-[#0B1929] shadow-md shrink-0 mt-0.5">
            <MapPin className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-[#C9A961]" />
              <h5 className="font-bold text-xs text-[#C9A961] line-clamp-1">{companyName}</h5>
            </div>
            <p className="text-xs text-slate-200 font-semibold leading-relaxed">
              {currentAddress}
            </p>
          </div>
        </div>

        <div className="pt-2.5 flex items-center justify-between border-t border-slate-700/80 text-xs">
          <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {lang === 'ar' ? 'عنوان الشركة' : 'Company Address'}
          </span>
          <a
            href={externalGoogleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-lg bg-[#C9A961] text-[#0B1929] hover:bg-[#b5954d] text-[11px] font-bold transition-all flex items-center gap-1.5 shadow cursor-pointer"
          >
            <span>{lang === 'ar' ? 'افتح بالخرائط' : 'Open Map'}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
