import React, { useState, useEffect } from 'react';
import { X, Download, FileText, ZoomIn, ZoomOut, Maximize2, Minimize2, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JobApplication } from '../../types';

interface CVViewerModalProps {
  application: JobApplication | null;
  onClose: () => void;
}

export const CVViewerModal: React.FC<CVViewerModalProps> = ({ application, onClose }) => {
  const { lang } = useApp();
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!application || (!application.cvFileData && !application.cvFileName)) {
    return null;
  }

  const fileData = application.cvFileData || '';
  const isImage = fileData.startsWith('data:image/');
  const isPdf = fileData.startsWith('data:application/pdf') || fileData.includes('pdf');

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col p-2 sm:p-6 overflow-hidden animate-fade-in">
      {/* Top Controls Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 flex items-center justify-between text-white shadow-2xl mb-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C9A961]/20 border border-[#C9A961]/40 text-[#C9A961] flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>{lang === 'ar' ? 'معاينة السيرة الذاتية (CV)' : 'Full Screen CV Preview'}</span>
              <span className="text-xs text-[#C9A961] font-mono">• {application.applicantName}</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              {application.jobTitle} — {application.appliedAt}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-xl border border-slate-700 text-xs">
            <button
              type="button"
              onClick={() => setZoomLevel((prev) => Math.max(50, prev - 20))}
              className="p-1 hover:text-[#C9A961] cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="font-mono text-[11px] text-slate-300 px-2">{zoomLevel}%</span>
            <button
              type="button"
              onClick={() => setZoomLevel((prev) => Math.min(200, prev + 20))}
              className="p-1 hover:text-[#C9A961] cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <a
            href={fileData}
            download={application.cvFileName || `${application.applicantName}_CV.pdf`}
            className="px-4 py-2 rounded-xl bg-[#C9A961] hover:bg-[#b3914a] text-[#0B1929] font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{lang === 'ar' ? 'تحميل الملف' : 'Download File'}</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Full-Screen Preview Canvas Area */}
      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl overflow-auto p-4 flex items-center justify-center relative shadow-inner">
        {isImage ? (
          <div className="max-w-full max-h-full overflow-auto flex items-center justify-center">
            <img
              src={fileData}
              alt={application.applicantName}
              style={{ width: `${zoomLevel}%` }}
              className="max-w-none rounded-lg shadow-2xl transition-all object-contain border border-slate-700"
            />
          </div>
        ) : isPdf ? (
          <iframe
            src={fileData}
            title="CV Document"
            className="w-full h-full rounded-lg border border-slate-700 bg-white"
          />
        ) : (
          <div className="text-center p-8 space-y-4 max-w-md bg-slate-800 rounded-3xl border border-slate-700">
            <FileText className="w-16 h-16 text-[#C9A961] mx-auto" />
            <h4 className="text-base font-bold text-white">
              {lang === 'ar' ? 'معاينة مستند التوظيف' : 'Document Preview Ready'}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'ar'
                ? `تتوفر السيرة الذاتية باسم "${application.cvFileName || 'مستند CV'}". يمكنك استعراضها مباشرة أو تنزيلها.`
                : `CV document "${application.cvFileName}" is ready for inspection.`}
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <a
                href={fileData}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{lang === 'ar' ? 'فتح في تبويب جديد' : 'Open in New Tab'}</span>
              </a>
              <a
                href={fileData}
                download={application.cvFileName || 'Candidate_CV'}
                className="px-4 py-2 rounded-xl bg-[#C9A961] text-[#0B1929] font-bold text-xs flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>{lang === 'ar' ? 'تحميل' : 'Download'}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
