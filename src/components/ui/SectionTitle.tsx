import React from 'react';

interface SectionTitleProps {

  kicker: string;
  title: string;
  className?: string;
}


export const SectionTitle = ({ kicker, title, className = '' }: SectionTitleProps) => {

  return (

    <div className={`flex flex-col gap-5 ${className}`}>

      <div className="flex items-center gap-4">
        
        <div className="w-5 h-10 bg-[var(--brand)] rounded-[var(--radius-sm)]" />
        <span className="section-kicker font-semibold">{kicker}</span>

      </div>

      <h2 className="section-title text-black font-bold tracking-wide">
        {title}
      </h2>

    </div>
  );


};


