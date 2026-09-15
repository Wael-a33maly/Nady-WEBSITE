import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, X, Check, Link as LinkIcon, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ImageUploadInputProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  accept?: string; // e.g. "image/*" or ".pdf,.doc,.docx,image/*"
  helpText?: string;
}

export const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  accept = 'image/*',
  helpText,
}) => {
  const { lang } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    // Check file size (e.g. limit to 8MB for smooth local storage)
    if (file.size > 8 * 1024 * 1024) {
      alert(lang === 'ar' ? 'حجم الملف كبير جداً. يرجى اختيار ملف أقل من 8 ميجابايت' : 'File too large. Please select a file under 8MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onChange(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const isBase64 = value?.startsWith('data:');
  const isDocument = value?.includes('pdf') || value?.includes('doc');

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <label className="text-xs font-bold text-slate-900 dark:text-slate-200">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] font-semibold text-[#C9A961] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <LinkIcon className="w-3 h-3" />
          <span>
            {showUrlInput
              ? lang === 'ar' ? 'رفع من الجهاز' : 'Upload File'
              : lang === 'ar' ? 'أدخل رابط URL' : 'Paste URL'}
          </span>
        </button>
      </div>

      {showUrlInput ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || (lang === 'ar' ? 'أدخل رابط الصورة https://...' : 'Enter image URL https://...')}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-[#C9A961] focus:outline-none"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-rose-500"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-4 transition-all flex flex-col items-center justify-center cursor-pointer text-center group ${
            isDragOver
              ? 'border-[#C9A961] bg-[#C9A961]/10'
              : value
              ? 'border-emerald-500/50 bg-emerald-50/30 dark:bg-emerald-950/20'
              : 'border-slate-300 dark:border-slate-700 hover:border-[#C9A961] bg-slate-50 dark:bg-slate-900/60'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />

          {value ? (
            <div className="flex items-center gap-3 w-full justify-between px-2">
              <div className="flex items-center gap-3 overflow-hidden">
                {isDocument ? (
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-500 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-xl border border-slate-300 dark:border-slate-700 overflow-hidden bg-slate-200 dark:bg-slate-800 shrink-0">
                    <img src={value} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="text-right rtl:text-right ltr:text-left overflow-hidden">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 truncate">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{lang === 'ar' ? 'تم اختيار الملف من الجهاز' : 'File Loaded Successfully'}</span>
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate dir-ltr">
                    {isBase64 ? 'Local File (Stored)' : value}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-[#C9A961] hover:text-[#0B1929] text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors"
                >
                  {lang === 'ar' ? 'تغيير' : 'Change'}
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange('');
                  }}
                  className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500/20"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-1 py-1">
              <div className="w-10 h-10 rounded-2xl bg-[#C9A961]/10 text-[#C9A961] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {lang === 'ar' ? 'اضغط لرفع صورة من جهازك المحلي أو اسحبها هنا' : 'Click to upload from local device or drag file here'}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                {helpText || (lang === 'ar' ? 'يدعم صيغ JPG, PNG, WEBP, SVG' : 'Supports JPG, PNG, WEBP, SVG')}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
