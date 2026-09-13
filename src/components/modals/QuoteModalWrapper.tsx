import React from 'react';
import { useApp } from '../../context/AppContext';
import { X } from 'lucide-react';
import { motion } from 'motion/react';
import { QuoteRequestSection } from '../sections/QuoteRequestSection';

export const QuoteModalWrapper: React.FC = () => {
  const { isQuoteModalOpen, setIsQuoteModalOpen } = useApp();

  if (!isQuoteModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-lg overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-[#C9A961]/40 text-slate-900 dark:text-white p-4 sm:p-8 shadow-2xl overflow-hidden my-auto"
      >
        <button
          type="button"
          onClick={() => setIsQuoteModalOpen(false)}
          className="absolute top-4 right-4 rtl:right-4 ltr:left-4 z-20 p-2.5 rounded-full bg-slate-100 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-[#C9A961] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <QuoteRequestSection isModal onClose={() => setIsQuoteModalOpen(false)} />
      </motion.div>
    </div>
  );
};
