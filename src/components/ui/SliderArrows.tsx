'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';
import { useTranslations } from 'next-intl';

interface SliderArrowsProps {
  
  onPrev?: () => void;
  onNext?: () => void;
  className?: string;
}

export const SliderArrows: React.FC<SliderArrowsProps> = ({ onPrev, onNext, className = '' }) => {

  const t = useTranslations('Common');
  const buttonStyle = 'w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-black hover:bg-gray-200 active:scale-95 transition-all cursor-pointer';

return (


  <div className={`flex items-center gap-2 ${className}`}>
      
      <button type="button" onClick={onPrev} aria-label={t('previousSlide')} className={buttonStyle}>
        <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
      </button>

      <button type="button" onClick={onNext} aria-label={t('nextSlide')} className={buttonStyle}>
        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
      </button>

  </div>

);
};




