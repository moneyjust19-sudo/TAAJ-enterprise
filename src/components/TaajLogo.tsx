import React from 'react';

interface TaajLogoProps {
  className?: string;
  light?: boolean;
}

export default function TaajLogo({ className = 'h-8', light = false }: TaajLogoProps) {
  return (
    <div className={`inline-flex items-center select-none ${className}`} id="taaj-logo">
      <span className="font-display font-black italic text-3xl sm:text-4xl tracking-tighter uppercase flex items-center">
        <span className="text-brand-red skew-x-[-10deg] inline-block mr-[1px]">T</span>
        <span className={`${light ? 'text-white' : 'text-brand-black dark:text-white'} skew-x-[-10deg] inline-block tracking-[-0.1em]`}>
          AAJ
        </span>
      </span>
    </div>
  );
}
